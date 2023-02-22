import HTTP from "../config/status-code.js"
import School from "../model/school.model.js"
import Wallet from "../model/wallet.model.js"

const approveSponsor = async (req, res) => {
  const dt = req?.query?.type ? "denied" : "approved"
  try {
    const approve = await School.update({ approved: dt }, { where: { id: req.params.school_id, approved: "pending" } })
    if (!approve[0]) {
      return res.status(HTTP.FORBIDDEN).json({
        message: "fail",
        data: { message: "already approved" }
      })
    }
    if (dt === "denied")
      return res.status(HTTP.SUCCESS).json({
        message: "success"
      })
    await Wallet.create({
      school_id: req.params.school_id,
      balance: 535
    })
    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

export default approveSponsor
