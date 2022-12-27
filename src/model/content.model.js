import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Content extends Model {}
Content.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    deletedAt: { type: DataTypes.STRING }
  },
  { sequelize, tableName: "contents", paranoid: true }
)
export default Content
