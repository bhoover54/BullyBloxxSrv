import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Report extends Model {}
Report.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: DataTypes.TEXT,
    videoLink: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "reports", paranoid: true }
)
export default Report
