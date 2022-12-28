import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class School extends Model {}
School.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    school_id: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false },
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "schools", paranoid: true }
)
export default School
