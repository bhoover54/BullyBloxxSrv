import HTTP from "../config/status-code.js"
import token from "../config/token.js"
import Sponsorship from "../model/sponsor.model.js"
import School from "../model/school.model.js"
import Wallet from "../model/wallet.model.js"

const addSchool = async (req, res) => {
  try {
    req.body.sponsor_id = token.decodeToken(req).id
    const school = await School.create(req.body)

    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll()
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
  try {
    const schoolWallet = await Wallet.findOne({ where: { school_id: req.body.school_id } })
    if (!schoolWallet)
      return res.status(HTTP.SUCCESS).json({
        message: "success",
        data: { message: "school not sponsored" }
      })

    let balance = schoolWallet.balance
    console.log(balance)
    // return
    if (balance >= 3600)
      return res.status(HTTP.SUCCESS).json({
        message: "success",
        data: { message: "maximum yearly sponsorhip reached" }
      })
    balance = parseInt(schoolWallet.balance) + parseInt(req.body.amount)
    req.body.school_id = req.params.school_id
    await Sponsorship.create(req.body)
    await Wallet.update({ balance: balance }, { where: { school_id: req.params.school_id } })

    return res.status(HTTP.SUCCESS).json({
      message: "success"
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

const SCHOOL = {
  addSchool,
  getSchool,
  getSchools,
  deleteSchool,
  updateSchool,
  donateSchool,
  getDonators
}
export default SCHOOL
