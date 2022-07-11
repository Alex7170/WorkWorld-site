const express = require("express")
const router = express.Router()
const urlencodedParser = express.urlencoded({extended: false})
const controller = require("../controllers/auth")
const passport = require("passport")

router.get("/login", controller.getLogin)
router.get("/registration1", controller.getFirstRegister)
router.get("/registrationSucces", controller.getSuccesRegister)
router.get("/registration2", passport.authenticate('jwt', {session:false}), controller.getSecondRegister)
router.post("/login", urlencodedParser, controller.login)
router.post("/registration1", urlencodedParser, controller.firstRegister)
router.put("/registration2", passport.authenticate('jwt', {session:false}),  urlencodedParser,  controller.secondRegister)

module.exports = router