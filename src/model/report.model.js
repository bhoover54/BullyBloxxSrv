import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Report extends Model {}
Report.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.STRING, allowNull: false },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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

    threat_name: DataTypes.STRING,
    threat_gender: DataTypes.STRING,
    threat_grade: DataTypes.STRING,
    threat_teacher: DataTypes.STRING,
    threat_date: DataTypes.STRING,
    threat_student_aware: DataTypes.STRING,
    threat_other_student: DataTypes.STRING,
    threat_details: DataTypes.STRING,

    w_name: DataTypes.STRING,
    w_gender: DataTypes.STRING,
    w_grade: DataTypes.STRING,
    w_teacher: DataTypes.STRING,
    w_type: DataTypes.STRING,
    w_other_students: DataTypes.STRING,
    w_sknow: DataTypes.STRING,
    w_details: DataTypes.STRING,
    bully_witnessed: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "reports", paranoid: true }
)
export default Report

// principal email
// threat_name
// threat_gender
// threat_grage
// threat_teacher
// threat_date
// threat_student_aware
// threat_other_student
// threat_details

// w_name
// w_gender
// w_grade
// w_teacher
// w_type
// w_other_students
// w_sknow
// w_details

// bully_witnessed
