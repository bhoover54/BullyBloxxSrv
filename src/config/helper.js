import multer from "multer"
import sendgrid from "@sendgrid/mail"
import dotenv from "dotenv"
dotenv.config()

const verifyEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (regex.test(email)) return true
  return false
}

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/")
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]
    const fileName = file.originalname.split(".")[0]
    cb(null, `${fileName}_${Date.now()}.${ext}`)
  }
})

const filter = (req, file, cb) => {
  const mimetype = file.mimetype.split("/")[1].toLowerCase()
  const acceptedMimeTypes = ["mp4", "mov", "avi", "wmv", "mkv", "quicktime", "x-msvideo", "x-ms-wmv", "3gpp", "MP2T", "x-mpegURL", "x-flv"]
  if (acceptedMimeTypes.includes(mimetype)) cb(null, true)
  else {
    cb(new Error("Unsurpported file format"), false)
  }
}

export const emailConfig = async (option) => {
  sendgrid.setApiKey(process.env.SMPT_KEY)
  option.from = "info@bullybloxx.com"
  try {
    await sendgrid.send(option)
    return "sent"
  } catch (err) {
    console.log(err)
    return "error"
    // return err.response.body.errors
  }
}

export const upload = multer({ storage: multerStorage, fileFilter: filter })

export default verifyEmail
