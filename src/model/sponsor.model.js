import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Sponsorship extends Model {}
Sponsorship.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    school_id: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.STRING, allowNull: false },
    deletedAt: DataTypes.DATE
  },
  { sequelize, tableName: "sponsors", paranoid: true }
)
export default Sponsorship
