import jwt_decode from "jwt-decode"

const verifyEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (regex.test(email)) return true
  return false
}

export const decodeToken = (reqs) => {
  let token = reqs.headers.authorization
  if (!token) return false
  token = token.split(" ")[1]
  return jwt_decode(token)
}

export default verifyEmail
