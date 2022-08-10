const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth")
const passport = require("passport")
const multer  = require("multer")
const upload = require("../middleware/loadImage")
const urlencodedParser = express.urlencoded({extended: false})

router.get("/login", controller.getLogin)
router.get("/registration1", controller.getFirstRegister)
router.get("/registrationSucces", controller.getSuccesRegister)
router.get("/registration2", passport.authenticate('jwt', {session:false}), controller.getSecondRegister)
router.post("/login", urlencodedParser, controller.login)
router.post("/registration1", urlencodedParser, controller.firstRegister)
router.post("/registration2", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}),  urlencodedParser,  controller.secondRegister)
router.get("/uploadAvatar", passport.authenticate('jwt', {session: false, failureRedirect: "/api/auth/login"}), controller.getUploadAvatar)
router.post("/uploadAvatar", passport.authenticate('jwt', {session: false, failureRedirect: "/api/auth/login"}), upload.single("image"), controller.uploadAvatar)

module.exports = router