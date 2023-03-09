import Sequelize from "sequelize"

const option = {
  host: "208.109.224.243",
  // host: "afrilens.com.ng",
  dialect: "mysql"
  // port: 3360
}

const sequelize = new Sequelize("bullybloxx", "bullybloxx", "bullybloxx2023", option)

try {
  await sequelize.authenticate()
  console.log("connection successful")
} catch (error) {
  console.log(error)
}

export default sequelize

// DB name: bullybloxx
// username: bullybloxx
// password: Bullyvax2023

// url:bullybloxx.com
