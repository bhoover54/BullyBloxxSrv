import HTTP from "../config/status-code.js"
import Role from "../model/role.model.js"
const newRole = async (req, res) => {
  try {
    const role = await Role.create(req.body)
    return res.status(HTTP.SUCCESS).json({
      message: "success",
      id: role.id
    })
  } catch (error) {
    console.log(error)
  }
}

export default newRole

// Role
