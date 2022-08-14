const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth")

router.use(express.static("views/uploads"))

router.get("/login", controller.getLogin)
router.get("/registration", controller.getRegister)
router.get("/registrationSucces", controller.succesRegistration)
router.post("/login", controller.login)
router.post("/registration", controller.register)

module.exports = router