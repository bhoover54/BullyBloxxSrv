import verifyEmail, { emailConfig } from "../config/helper.js"
import HTTP from "../config/status-code.js"
import User from "../model/user.model.js"
import { hash, compare } from "bcrypt"
import token from "../config/token.js"
import Role from "../model/role.model.js"
import Report from "../model/report.model.js"

User.belongsTo(Role, { as: "role", foreignKey: "role_id" })
User.hasMany(Report, { as: "reports", sourceKey: "id", foreignKey: "user_id" })
const signUp = async (req, res) => {
  try {
    const getEmail = await User.findOne({ where: { email: req.body.email } })
    const userName = await User.findOne({ where: { username: req.body.username } })
    if (getEmail)
      return res.status(HTTP.CONFLICT).json({
        message: "Email already exist try another email or sign in"
      })
    if (userName)
      return res.status(HTTP.CONFLICT).json({
        message: "username exists, try another"
      })

    if (!verifyEmail(req.body.email))
      return res.status(HTTP.FORBIDDEN).json({
        message: "invalid email format"
      })
    const password = await hash(req.body.password.toString(), 10)
    req.body.password = password
    req.body.fullName = req.body.first_name + " " + req.body.last_name
    const user = await User.create(req.body)
    return res.status(HTTP.CREATED).json({
      message: "success",
      id: user.id
    })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: { exclude: ["role_id"] },
      include: {
        model: Role,
        as: "role",
        attributes: ["name"]
      }
    })
    if (!user)
      return res.status(HTTP.FORBIDDEN).json({
        message: "user not found"
      })
    const pass = await compare(req.body.password.toString(), user.password)

    if (!pass)
      return res.status(HTTP.FORBIDDEN).json({
        message: "invalid email or password"
      })

    const userToken = token.accessToken({
      id: user.id,
      name: user.fullName,
      role: user.role.name
    })
    return res.status(HTTP.CREATED).json({
      message: "success",
      token: userToken,
      role: user.role.name
    })
  } catch (error) {
    console.log(error)
  }
}

const forgotPassword = async (req, res) => {
  try {
    const code = Math.floor(1000 + Math.random() * 9000)
    const forgotP = await User.update({ forgot_password: code }, { where: { email: req.body.email } })
    if (forgotP) {
      await emailConfig({
        to: req.body.email,
        subject: "Password recovery code",
        html: `<p> Your password recovery code is ${code}, it will expire in the next 10min`
      })
    }
    return res.status(HTTP.SUCCESS).json({
      message: "A recovery code has been sent to your email",
      code: code
    })
  } catch (error) {
    console.log(error)
  }
}

const resetPassword = async (req, res) => {
  try {
    const newPassword = await hash(req.body.password.toString(), 10)
    await User.update(
      { password: newPassword, forgot_password: "" },
      {
        where: {
          email: req.body.email,
          forgot_password: req.body.code
        }
      }
    )
    return res.status(HTTP.SUCCESS).json({
      message: "password reset success"
    })
  } catch (error) {}
}

const getUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["role_id", "password"] },
      include: {
        model: Report,
        as: "reports",
        attributes: { exclude: ["deletedAt", "updatedAt", "user_id"] }
      }
    })

    return res.status(HTTP.CREATED).json({
      message: "success",
      data: user
    })
  } catch (error) {
    console.log(error)
  }
}
const getUser = async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "createdAt", "deletedAt", "updatedAt"] }
    })

    return res.status(HTTP.CREATED).json({
      message: "success",
      data: user
    })
  } catch (error) {
    console.log(error)
  }
}

const USER = { login, signUp, getUsers, getUser, forgotPassword, resetPassword }
export default USER
