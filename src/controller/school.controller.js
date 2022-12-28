import HTTP from "../config/status-code.js"
import token from "../config/token.js"
import Sponsorship from "../model/sponsor.model.js"
import School from "../model/sponsor.model.js"
import Wallet from "../model/wallet.model.js"

const addSchool = async (req, res) => {
  try {
    const school = await School.create(req.body)
    if (school.id)
      return res.status(HTTP.SUCCESS).json({
        message: "success",
        id: school.id
      })
    return res.status(HTTP.BAD_REQUEST).json({
      message: "fail"
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
    const school = await School.findAll({ where: { id: req.params.id } })
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: school
    })
  } catch (error) {
    console.log(error)
  }
}

// sponsorships
const sponsorSchool = async (req, res) => {
  try {
    req.body.user_id = token.decodeToken(req).user_id
    const schoolWallet = Wallet.findOne({ where: { schoolId: req.school_id } })
    if (schoolWallet) {
      const balance = schoolWallet.balance
      if (balance >= 3600)
        return res.status(HTTP.SUCCESS).json({
          message: "success",
          data: { message: "maximum yearly sponsorhip reached" }
        })
    }
    await Sponsorship.create(req)
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      data: { message: "" }
    })
  } catch (error) {
    console.log(error)
  }
}

// const supportSchool = (req, res) => {}
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

const SCHOOL = { addSchool, getSchool, getSchools, deleteSchool, updateSchool }
export default SCHOOL
