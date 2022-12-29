import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Report extends Model {}
Report.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    report_type: DataTypes.STRING,
    email: DataTypes.STRING,
    school_name: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    admin_email: DataTypes.STRING,
    bully_teacher: DataTypes.STRING,
    bully_fname: DataTypes.STRING,
    bully_lname: DataTypes.STRING,
    bully_gender: DataTypes.STRING,
    bully_grade: DataTypes.STRING,
    incident_date: DataTypes.STRING,
    incident_time: DataTypes.STRING,
    incident_time: DataTypes.STRING,
    staff_witnessed: DataTypes.STRING,
    staff_witness: DataTypes.STRING,
    staff_action: DataTypes.STRING,
    incident_place: DataTypes.STRING,
    physical_abused: DataTypes.STRING,
    victim_handicapped: DataTypes.STRING,
    victim_younger: DataTypes.STRING,
    details: DataTypes.STRING,
    serail_bully: DataTypes.STRING,
    other_incidents: DataTypes.STRING,
    video_link: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "reports", paranoid: true }
)
export default Report
