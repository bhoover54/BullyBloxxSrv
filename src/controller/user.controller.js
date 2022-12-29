import verifyEmail from "../config/helper.js"
import HTTP from "../config/status-code.js"
import User from "../model/user.model.js"
import { hash, compare } from "bcrypt"
import token from "../config/token.js"
import Role from "../model/role.model.js"

User.belongsTo(Role, { as: "role", foreignKey: "role_id" })
const signUp = async (req, res) => {
  try {
    if (!verifyEmail(req.body.email))
      return res.status(HTTP.FORBIDDEN).json({
        message: "invalid email format"
      })
    const password = await hash(req.body.password.toString(), 10)
    req.body.password = password
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
      token: userToken
    })
  } catch (error) {
    console.log(error)
  }
}

// const updateProfile = () => {}
const USER = { login, signUp }
export default USER
