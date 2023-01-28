import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    forgot_password: DataTypes.STRING,
    country: { type: DataTypes.STRING, defaultValue: "USA" },
    state: DataTypes.STRING,
    role_id: { type: DataTypes.STRING, defaultValue: "1" },
    password: { type: DataTypes.STRING, allowNull: false },
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "users", paranoid: true }
)
export default User
