import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class School extends Model {}
School.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    sponsor_id: { type: DataTypes.STRING, allowNull: false },
    school_name: { type: DataTypes.STRING, allowNull: false },
    zip_code: { type: DataTypes.STRING, allowNull: false },
    business_name: { type: DataTypes.STRING, allowNull: false },
    business_email: { type: DataTypes.STRING, allowNull: false },
    business_mobile: { type: DataTypes.STRING, allowNull: false },
    business_website: { type: DataTypes.STRING, allowNull: false },
    business_type: { type: DataTypes.STRING, allowNull: false },
    video_link: DataTypes.STRING,
    approved: { type: DataTypes.STRING, defaultValue: "pending" },
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "schools", paranoid: true }
)
export default School
