const express = require("express")
const hbs = require("hbs")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth")
const myPageRoutes = require("./routes/myPage")
const mainRoutes = require("./routes/main")
const methodOverride = require("method-override")
const urlencodedParser = express.urlencoded({extended: false});
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const Schema = mongoose.Schema
mongoose.connect("mongodb+srv://ALex:7170@workworld.6dz4g.mongodb.net/?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true}).catch(err=> console.log(err))
app.use(require("morgan")("dev"))
app.use(require("cors")())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require("./middleware/passport")(passport)
app.use(methodOverride("_method"))
app.set("view engine", "hbs")
app.use("/api/auth", authRoutes)
app.use("/api/myPage", myPageRoutes)
app.use("/api", mainRoutes)
app.listen(3000) // http://localhost:3000/api

