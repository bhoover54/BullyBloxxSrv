import multer from "multer"

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
  const acceptedMimeTypes = ["jpg", "jpeg", "png", "mp4"]
  if (acceptedMimeTypes.includes(mimetype)) cb(null, true)
  else cb(new Error("Unsurpported file format"), false)
}

export const upload = multer({ storage: multerStorage, fileFilter: filter })

export default verifyEmail
