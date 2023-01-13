import HTTP from "../config/status-code.js"
import token from "../config/token.js"
import Sponsorship from "../model/sponsor.model.js"
import School from "../model/school.model.js"
import Wallet from "../model/wallet.model.js"
import { Op, Sequelize } from "sequelize"
import { emailConfig } from "../config/helper.js"
import Stripe from "stripe"

School.hasOne(Wallet, { as: "wallet", foreignKey: "school_id", sourceKey: "id" })
const filterSchool = async (req) => {
  try {
    const filter = await School.findOne({
      where: {
        school_name: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("school_name")),
          "Like",
          `%` + req.body.school_name.trim() + `%`
        ),
        zip_code: req.body.zip_code,
        [Op.or]: {
          school_name: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("school_name")),
            "Like",
            `%` + req.body.school_name + `%`
          ),
          zip_code: req.body.zip_code
        }
      },
      include: {
        model: Wallet,
        as: "wallet",
        attributes: ["balance"]
      }
    })

    return filter
  } catch (error) {
    console.log(error)
  }
}

const addSchool = async (req, res) => {
  try {
    req.body.sponsor_id = token.decodeToken(req).id
    req.body.video_link = req.file.filename
    const findSchool = await filterSchool(req)
    if (findSchool !== null)
      return res.status(HTTP.CONFLICT).json({
        message: "school already sponsored"
      })
    const school = await School.create(req.body)

    return res.status(HTTP.SUCCESS).json({
      message: "success",
      id: school.id
    })
  } catch (error) {
    console.log(error)
  }
}

const searchSchool = async (req, res) => {
  try {
    const filter = await filterSchool(req)
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: filter
    })
  } catch (error) {}
}

const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll({
      include: {
        model: Wallet,
        as: "wallet",
        attributes: ["balance"]
      }
    })
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: schools
    })
  } catch (error) {
    console.log(error)
  }
}

const getSchool = async (req, res) => {
  try {
    const school = await School.findOne({ where: { id: req.params.id } })
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: school
    })
  } catch (error) {
    console.log(error)
  }
}

// sponsorships
const donateSchool = async (req, res) => {
  const stripe = Stripe(process.env.SECRET_KEY)
  try {
    const schoolWallet = await Wallet.findOne({ where: { school_id: req.body.school_id } })
    if (!schoolWallet)
      return res.status(HTTP.NOT_FOUND).json({
        message: "success",
        data: { message: "school not sponsored" }
      })

    let balance = schoolWallet.balance
    const { name, school_id, amount, token } = req.body
    if (balance >= 3600)
      return res.status(HTTP.FORBIDDEN).json({
        message: "success",
        data: { message: "maximum yearly sponsorhip reached" }
      })

    balance = parseInt(schoolWallet.balance) + parseInt(req.body.amount)
    const send = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "usd",
        source: token.id,
        receipt_email: token.email,
        description: "school support"
      },
      {
        idempotencyKey: `${new Date()}${token}`
      }
    )
    const result = await send
    if (result.status !== "succeeded")
      return res.status(HTTP.SERVER_ERROR).json({
        message: "fail"
      })

    await Sponsorship.create({ name, email: token.email, school_id, amount })
    await Wallet.update({ balance: balance }, { where: { school_id: req.body.school_id } })

    return res.status(HTTP.SUCCESS).json({
      message: "success",
      receipt: result.receipt_url
    })
  } catch (error) {
    console.log(error)
  }
}

const getDonators = async (req, res) => {
  try {
    const donators = await Sponsorship.findAll()
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: donators
    })
  } catch (error) {}
}

const deleteSchool = async (req, res) => {
  try {
    await School.destroy({ where: { id: req.params.id } })
    return res.status(HTTP.NO_CONTENT).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

// admin accesss only
const updateSchool = async (req, res) => {
  try {
    const school = await School.update(req.body, { where: { id: req.params.id } })
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: school
    })
  } catch (error) {
    console.log(error)
  }
}

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body
  if (!html) html = ""
  if (!text) text = ""
  try {
    const send = await emailConfig({
      to: to,
      subject: subject,
      text: text,
      html: html
    })

    // const result = await emailConfig(send)
    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

const SCHOOL = {
  addSchool,
  getSchool,
  getSchools,
  deleteSchool,
  updateSchool,
  donateSchool,
  getDonators,
  searchSchool,
  sendEmail
}
export default SCHOOL
