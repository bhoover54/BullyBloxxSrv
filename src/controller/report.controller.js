import HTTP from "../config/status-code.js"
import token from "../config/token.js"
import Report from "../model/report.model.js"
import Stripe from "stripe"
import User from "../model/user.model.js"
import { response } from "express"
import { Op, Sequelize } from "sequelize"

Report.belongsTo(User, { as: "user", foreignKey: "user_id" })

const createReport = async (req, res) => {
  try {
    const decode = token.decodeToken(req)

    req.body.user_id = decode.id
    req.body.video_link = req.file.filename

    const report = await Report.create(req.body)
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      id: report.id
    })
  } catch (error) {
    console.log(req)
    console.log(error)
  }
}

export const getReport = async (req, res) => {
  try {
    const report = await Report.findAll({
      include: {
        model: User,
        as: "user"
      }
    })
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: report
    })
  } catch (error) {
    console.log(req)
    console.log(error)
  }
}

export const periscope = async (req, res) => {
  const stripe = Stripe(process.env.SECRET_KEY)
  try {
    const send = await stripe.charges.create(
      {
        amount: 25 * 100,
        currency: "usd",
        source: req.body.token.id,
        receipt_email: req.body.token.email,
        description: "periscode payment"
      },
      {
        idempotencyKey: `${new Date()}${token}`
      }
    )
    const result = await send
    if (result.status !== "succeeded")
      return res.status(HTTP.SERVER_ERROR).json({
        message: "payment not successful"
      })
    const filter = await Report.findAll({
      where: {
        school_name: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("school_name")),
          "Like",
          `%` + req.body.school_name.trim() + `%`
        ),
        zip_code: req.body.zip_code.trim(),
        [Op.or]: {
          school_name: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("school_name")),
            "Like",
            `%` + req.body.school_name + `%`
          ),
          zip_code: req.body.zip_code
        }
      }
    })

    return res.status(HTTP.SUCCESS).json({
      message: "succes",
      data: filter
    })
  } catch (error) {
    console.log(error)
  }
}

export const uploadFile = (req, res) => {
  console.log(req.file.filename, req.body)
  return res.json(req.body)
}

export default createReport
