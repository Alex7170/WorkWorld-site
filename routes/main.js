const express = require("express")
const router = express.Router()
const controller = require("../controllers/main")
const passport = require("passport")

router.get("/", controller.getMain)

module.exports = router