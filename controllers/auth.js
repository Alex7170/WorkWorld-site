const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {secret} = require("../keys/keys")
const errorHandler = require("../utils/errorHadler")
const controlPassword = require("../utils/controlPassword").controlPassword
const errorHadler = require("../utils/errorHadler")
const multer  = require("multer")

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
                userId: requestedUser.id
            }, secret, {expiresIn: 3600})
            res.status(200)
            res.json({
                token: `Bearer ${token}`
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

module.exports.firstRegister = async (req,res)=>{
    const requestedEmail = await User.findOne({email: req.body.email})
    if (requestedEmail){
        return (res.status(409).json({
            message: "This email is already in use. Try another one."
    }))}
    const result = await controlPassword(req.body.password1)
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
    try{
        await user.save()
        res.status(201)
        // res.redirect("/api/auth/registrationSucces")
    } catch(e){
        errorHandler(res,e)
    }        
}


module.exports.getSuccesRegister =(req,res)=>{
    res.render("accountCreated")
    // res.redirect("/api/auth/login"))

}

module.exports.secondRegister = async (req,res)=>{
    const {name, surname, age, country, experience, other, links} = req.body
    try{
        await User.updateOne({_id: req.user.id},{name: name, surname: surname, age: age, country: country, experience: experience, other: other, links:links})
        res.status(200).json({
        message: "Information added succesfully"
        })
        // res.redirect("/api/uploadAvatar")
    } catch (e){
        errorHadler(res,e)
    }
}

module.exports.getUploadAvatar = (req,res)=>{
    res.render("saveAvatar")
}

module.exports.uploadAvatar = async (req,res)=>{
    const image = req.file ? req.file.path : ""
    try{

    } catch{
        errorHadler(e)
    }
    await User.updateOne({_id: req.user.id}, {imageSrc: image})
    res.status(200).json({message: "Added succesfully"})
}