const express = require("express")
const router = express.Router()
const controller = require("../controllers/main")
const accesMain = require("../middleware/accesMain")
const passport  = require("passport")
const upload = require("../middleware/loadAny")

router.use(express.static("views/uploads"))

router.get("/", accesMain, controller.getMain)
router.get("/:id", accesMain, controller.getRequest)
router.get("/newMessage", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getNewMessage)
router.post("/newMessage", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), upload.single("any"), controller.newMessage)

module.exports = router