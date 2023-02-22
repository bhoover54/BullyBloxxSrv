import HTTP from "../config/status-code.js"
import token from "../config/token.js"
import Report from "../model/report.model.js"
import Stripe from "stripe"
import User from "../model/user.model.js"
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

export const pay = async (req, res) => {
  console.log("working")
  const stripe = Stripe(process.env.SECRET_KEY)
  const { token } = req.body
  console.log(token)
  try {
    const send = await stripe.charges.create(
      {
        amount: 25 * 100,
        currency: "usd",
        source: token.id,
        receipt_email: token.email,
        description: "periscope payment"
      },
      {
        idempotencyKey: `${new Date()}${token}`
      }
    )
    const result = await send
    console.log(result)
    if (result.status !== "succeeded")
      return res.status(HTTP.SERVER_ERROR).json({
        message: "fail"
      })

    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

export const periscope = async (req, res) => {
  try {
    const { school_name, zip_code, bully_fname, bully_lname, bully_grade, bully_teacher } = req.body
    const filter = await Report.findAll({
      where: {
        school_name: school_name,
        zip_code: zip_code,
        bully_fname: bully_fname,
        bully_lname: bully_lname,
        bully_grade: bully_grade,
        bully_teacher: bully_teacher,
        report_type: "bullying"
      },
      include: {
        model: User,
        as: "user"
      }
    })

    return res.status(HTTP.SUCCESS).json({
      message: "success",
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
