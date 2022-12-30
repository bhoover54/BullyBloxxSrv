import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./config/route.js"
import sequelize from "./config/db.js"

const app = express()
dotenv.config()
app.use(cors({ origin: "*" }))
app.use(json({ limit: "100mb" }))

const PORT = process.env.PORT || 5000
sequelize.sync()
routes(app)
app.listen(PORT, () => console.log(`listening to ${PORT}`))
