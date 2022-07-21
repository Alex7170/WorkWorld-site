const express = require("express")
const router = express.Router()
const controller = require("../controllers/main")
const accesMain = require("../middleware/accesMain")

router.get("/", accesMain, controller.getMain)

module.exports = router