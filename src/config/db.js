import Sequelize from "sequelize"

const option = {
  host: "afrilens.com.ng",
  dialect: "mysql"
  // port: 3360
}

const sequelize = new Sequelize("afrilens_bullybloxx", "afrilens_victor", "Bullyvax2022", option)

try {
  await sequelize.authenticate()
  console.log("connection successful")
} catch (error) {
  console.log(error)
}

export default sequelize
