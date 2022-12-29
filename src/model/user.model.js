import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    role_id: { type: DataTypes.STRING, defaultValue: "1" },
    password: { type: DataTypes.STRING, allowNull: false },
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "users", paranoid: true }
)
export default User
