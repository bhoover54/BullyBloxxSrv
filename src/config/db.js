import Sequelize from "sequelize"

const option = {
  host: "localhost",
  dialect: "mysql"
  // port: 3360
}

const sequelize = new Sequelize("bullyvax", "root", "root", option)

try {
  await sequelize.authenticate()
  console.log("connection successful")
} catch (error) {
  console.log(error)
}

export default sequelize
