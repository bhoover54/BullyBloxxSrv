import HTTP from "../config/status-code"
import Wallet from "../model/wallet.model"

const createWallet = async (req, res) => {
  try {
    const getSchool = await Wallet.findOne({ where: { school_id: req.body.school_id } })
    if (!getSchool) {
      const wallet = await Wallet.create(req.body)
      return res.status(HTTP.CREATED).json({
        messge: "success",
        id: wallet.id
      })
    }

    const balance = parseInt(getSchool.balance) + parseInt(req.body.amount)
    const school_id = getSchool.school_id
    const wallet = Wallet.update({ balance: balance }, { where: { school_id: school_id } })

    return res.status(HTTP.CREATED).json({
      messge: "success",
      id: wallet.id
    })
  } catch (error) {
    console.log(error)
  }
}

export default createWallet
