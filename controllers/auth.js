const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../keys/keys")
const errorHandler = require("../utils/errorHadler")
module.exports.getLogin = (req,res)=>{
   res.render("login.hbs")
}

module.exports.getFirstRegister = (req,res)=>{
    res.render("register1.hbs")
}

module.exports.getSecondRegister = (req,res)=>{
    res.render("register2.hbs")
}

module.exports.login = async (req,res)=>{
    const requestedUser = await User.findOne({email: req.body.email})
    if (requestedUser){
        const passwordResult = await bcrypt.compare(req.body.password, requestedUser.password)
        if (passwordResult){
            const token = jwt.sign({
                email: requestedUser.email,
                id: requestedUser._id
            }, keys.jwt, {expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`
            })
            res.redirect("/api/")
        } else {
            res.status(401).json({
                message: "Wrong password. Try again."
            })
        }
    } else{
        res.status(404).json({
            message: "User with such an email not found"
        })
    }
}

module.exports.firstRegister = async (req,res)=>{
    const requestedEmail = await User.findOne({email: req.body.email})
    if (requestedEmail){
        res.status(409).json({
            message: "This email is already in use. Try another one."
    })} else if (req.body.password1 !== req.body.password2){
        res.status(401).json({
            message: "Passwords do not match"
        })
    }   else{
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password1
        const user = new User({
            email: req.body.email,
            password : await bcrypt.hash(password, salt)
        })
        try{
            await user.save()
            res.status(201)
            res.redirect("/api/auth/registrationSucces")
        } catch(e){
            errorHandler(res,e)
        }
        
    }
}

module.exports.getSuccesRegister = (req,res)=>{
    res.render("accountCreated")
}

module.exports.secondRegister = async (req,res)=>{
    const name = req.body.name
    const surname = req.body.surname
}