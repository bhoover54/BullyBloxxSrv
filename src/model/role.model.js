import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Role extends Model {}
Role.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    deletedAt: { type: DataTypes.STRING }
  },
  { sequelize, tableName: "roles", paranoid: true }
)
export default Role
