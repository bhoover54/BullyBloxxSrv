import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./config/route.js"
import sequelize from "./config/db.js"
import compression from "compression"
import path from "path"

dotenv.config()
const app = express()
app.use(compression())

app.use(express.static("public/uploads"))
app.use(cors({ origin: "*" }))
app.use(json())

const PORT = process.env.PORT || 5000
sequelize.sync()
routes(app)
app.listen(PORT, () => console.log(`listening to ${PORT}`))
