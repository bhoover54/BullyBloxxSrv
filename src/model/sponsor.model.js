import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Sponsorship extends Model {}
Sponsorship.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    school_id: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: false },
    approved: { type: DataTypes.STRING, defaultValue: "pending" },
    qauntity: { type: DataTypes.STRING, defaultValue: "1" },
    type: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "schools", paranoid: true }
)
export default Sponsorship
