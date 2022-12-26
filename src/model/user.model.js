import { Model, DataTypes } from "sequelize"
import sequelize from "../connection/db.js"

class Profile extends Model {}
Profile.init(
  {
    id: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userid: { type: DataTypes.CHAR, allowNull: false, primaryKey: true },
    profile_pics: DataTypes.STRING,
    identificationMeans: DataTypes.STRING,
    identificationNumber: DataTypes.STRING,
    identificationId: DataTypes.STRING
  },
  { sequelize, modelName: "Profile" }
)
export default Profile
