import approveSponsor from "../controller/admin.controller.js"
import CONTENT from "../controller/content.controller.js"
import createReport from "../controller/report.controller.js"
import newRole from "../controller/role.controller.js"
import SCHOOL from "../controller/school.controller.js"
import USER from "../controller/user.controller.js"
import token from "./token.js"

const { authenticate } = token
const routes = (app) => {
  app.post("/signup", USER.signUp)
  app.post("/signin", USER.login)

  app.post("/sponsor/school", authenticate, SCHOOL.addSchool)
  app.post("/donate/school/:school_id", SCHOOL.donateSchool)
  app.get("/schools", SCHOOL.getSchools)
  app.get("/school/:id", SCHOOL.getSchool)
  app.delete("/school/:id", SCHOOL.deleteSchool)
  app.put("/school/:id", SCHOOL.updateSchool)

  app.post("/content", CONTENT.createContent)
  app.put("/content/:id", CONTENT.updateContent)
  app.get("/contents", CONTENT.getContents)
  app.get("/content/:id", CONTENT.getContent)
  app.delete("/content/:id", CONTENT.deleteContent)

  app.post("/role", newRole)
  app.post("/report", createReport)
  app.put("/approve/school/:school_id", approveSponsor)
}

export default routes
