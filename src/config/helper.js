import jwt_decode from "jwt-decode"

const verifyEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (regex.test(email)) return true
  return false
}
export default verifyEmail
