import Sponsorship from "../model/sponsor.model"

const approveSponsor = async (req, res) => {
  try {
    const approve = await Sponsorship.update(
      { approved: "approved" },
      { where: { id: req.params.id } }
    )
    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

export default approveSponsor
