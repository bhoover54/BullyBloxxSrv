import Stripe from "stripe"
import HTTP from "../config/status-code.js"

export const payment = async (req, res) => {
  const stripe = Stripe(process.env.SECRET_KEY)
  try {
    console.log(req.body)
    const { token, amount } = req.body

    const send = await stripe.charges.create(
      {
        amount: amount,
        currency: "usd",
        source: token.id,
        receipt_email: token.email,
        description: "school support"
      },
      {
        idempotencyKey: `${new Date()}${token}`
      }
    )
    const result = await send
    // if(result.status === "succeeded")
    return res.status(HTTP.SUCCESS).json({
      data: result
    })
  } catch (error) {
    console.log(error)
  }
}
