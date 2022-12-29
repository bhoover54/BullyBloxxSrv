import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class School extends Model {}
School.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    sponsor_id: { type: DataTypes.STRING, allowNull: false },
    school_name: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false },
    approved: { type: DataTypes.STRING, defaultValue: "pending" },
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "schools", paranoid: true }
)
export default School
