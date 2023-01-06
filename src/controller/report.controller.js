import HTTP from "../config/status-code.js"
import token from "../config/token.js"
import Report from "../model/report.model.js"
import Stripe from "stripe"
import User from "../model/user.model.js"

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

export const uploadFile = (req, res) => {
  console.log(req.file.filename, req.body)
  return res.json(req.body)
}

export const payment = async (req, res) => {
  const stripe = Stripe(process.env.SECRET_KEY)
  console.log("working")
  // const customer = stripe.customer.create({})
  const send = await stripe.charges.create(
    {
      amount: 2000,
      currency: "usd",
      source: "tok_mastercard", // obtained with Stripe.js
      description: "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)"
    },
    {
      idempotencyKey: "dAVrMjj4xweZDC0n"
    }
  )
  const j = await send
  return res.status(200).json({
    j
  })
  // try {

  // } catch (error) {
  //   console.log(error)
  // }
}

export default createReport
