import approveSponsor from "../controller/admin.controller.js"
import CONTENT from "../controller/content.controller.js"
import createReport, { getReport, payment, uploadFile } from "../controller/report.controller.js"
import newRole, { getRoles } from "../controller/role.controller.js"
import SCHOOL from "../controller/school.controller.js"
import USER from "../controller/user.controller.js"
import { upload } from "./helper.js"
import token from "./token.js"

const { authenticate } = token
const routes = (app) => {
  app.post("/signup", USER.signUp)
  app.post("/signin", USER.login)

  app.post("/sponsor/school", authenticate, SCHOOL.addSchool)
  app.post("/donate/school", SCHOOL.donateSchool)
  app.get("/donators", SCHOOL.getDonators)
  app.get("/schools", SCHOOL.getSchools)
  app.get("/school/:id", SCHOOL.getSchool)
  app.delete("/school/:id", SCHOOL.deleteSchool)
  app.put("/school/:id", SCHOOL.updateSchool)
  app.post("/school/filter", SCHOOL.searchSchool)

  app.post("/upload", upload.single("upload"), uploadFile)
  app.post("/content", CONTENT.createContent)
  app.put("/content/:id", CONTENT.updateContent)
  app.get("/contents", CONTENT.getContents)
  app.get("/content/:id", CONTENT.getContent)
  app.delete("/content/:id", CONTENT.deleteContent)

  app.get("/users", USER.getUsers)
  app.get("/reports", getReport)
  app.post("/role", newRole)
  app.get("/role", getRoles)
  app.post("/payment", payment)
  app.post("/send/mail", SCHOOL.sendEmail)
  app.post("/report", authenticate, upload.single("upload"), createReport)
  app.put("/approve/school/:school_id", approveSponsor)
}

export default routes
