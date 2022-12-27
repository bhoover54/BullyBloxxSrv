import { Model, DataTypes } from "sequelize"
import sequelize from "../config/db.js"

class Wallet extends Model {}
Wallet.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    schoolId: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.STRING, defaultValue: "535" },
    deletedAt: { type: DataTypes.STRING }
  },
  { sequelize, tableName: "wallets", paranoid: true }
)
export default Wallet
