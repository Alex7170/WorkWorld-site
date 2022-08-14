const express = require("express")
const router = express.Router()
const controller = require("../controllers/myPage")
const passport = require("passport")
const upload = require("../middleware/loadImage")

router.use(express.static("views/uploads")) 

router.get("/", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getMyPage)
router.get("/profile", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getProfile)
router.put("/profile", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.updateUser)
router.get("/uploadAvatar", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getUploadAvatar)
router.post("uploadAvatar", passport.authenticate('jwt', {session: false, failureRedirect: "/api/auth/login"}), upload.single("image"), controller.uploadAvatar)
router.get("/messages", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getMessages)
router.get("/messages/:id", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getOneMessage)
router.delete("/messages/:id", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.deleteOneMessage)
router.get("/myRequests", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getMyRequests)
router.get("/myRequests/:id", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getUpdateRequest)
router.delete("/myRequests/:id", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.deleteRequest)
router.put("/myRequests/:id", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.updateRequest)
router.get("/myRequests/newRequest", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.getNewRequest)
router.post("/myRequests/newRequest", passport.authenticate('jwt', {session:false, failureRedirect: "/api/auth/login"}), controller.newRequest)

module.exports = router