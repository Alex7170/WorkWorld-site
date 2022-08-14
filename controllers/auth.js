const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {secret} = require("../keys/keys")
const errorHandler = require("../utils/errorHadler")
const controlPassword = require("../utils/controlPassword")

module.exports.getLogin = (req,res)=>{
    res.render("login.hbs", )
}

module.exports.getRegister = (req,res)=>{
    res.render("register.hbs")
}

module.exports.login = async (req,res)=>{
    const requestedUser = await User.findOne({email: req.body.email})
    if (requestedUser){
        const passwordResult = await bcrypt.compare(req.body.password, requestedUser.password)
        if (passwordResult){
            const token = jwt.sign({
                email: requestedUser.email,
                userId: requestedUser.id
            }, secret, {expiresIn: 3600})
            res.status(200)
            res.json({
                token: `Bearer ${token}` //(all other request headers must contain Authorization: "jwt")
            })
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

module.exports.register = async (req,res)=>{
    try{
        console.log(req.body)
        const requestedEmail = await User.findOne({email: req.body.email})
        if (requestedEmail){
            return (res.status(409).json({
                message: "This email is already in use. Try another one."
        }))}
        const result = controlPassword(req.body.password1)
        if (result.result == false){
            return res.status(401).json({
                message : result.message
            })
        }
        if (req.body.password1 !== req.body.password2){
            return (res.status(401).json({
                message: "Passwords do not match"
        }))}
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password1
        const user = new User({
            email: req.body.email,
            password : await bcrypt.hash(password, salt)
        })
        await user.save()
        res.status(201).redirect("/api/auth/registrationSucces") 
    } catch(e){
        errorHandler(res,e)
    }        
}

module.exports.succesRegistration = (req,res)=>{
    res.render("succesRegister")
}



