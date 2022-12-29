import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./config/route.js"
import sequelize from "./config/db.js"

const app = express()
dotenv.config()
app.use(json())
app.use(cors({ origin: "*" }))
const PORT = process.env.PORT || 5000
sequelize.sync()
routes(app)
app.listen(PORT, () => console.log(`listening to ${PORT}`))
