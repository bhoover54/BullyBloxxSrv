import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    fullName: DataTypes.STRING,
    amount: DataTypes.STRING,
    school_id: DataTypes.STRING,
    email: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "transactions", paranoid: true }
)
export default User
