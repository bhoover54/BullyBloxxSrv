import token from "../config/token.js"
import Report from "../model/report.model.js"

const createReport = async (req, res) => {
  try {
    const decode = token.decodeToken(req)
    if (decode && Object.keys(decode).length) {
      const report = await Report.create(req.body)
    }
  } catch (error) {
    console.log(error)
  }
}

export default createReport
