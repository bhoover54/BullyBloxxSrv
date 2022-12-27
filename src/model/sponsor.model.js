import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class School extends Model {}
School.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false },
    deletedAt: { type: DataTypes.STRING }
  },
  { sequelize, tableName: "schools", paranoid: true }
)
export default School
