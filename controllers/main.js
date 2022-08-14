const User = require('../models/userModel')
const Request = require("../models/requestModel")
const errorHandler = require("../utils/errorHadler")
const {host, emailPort, ofEmail, passwordOfEmail} = require("../keys/keys")
const nodemailer = require("nodemailer")
const moment = require("moment")

module.exports.getMain = async (req,res)=>{
    try{
        const requests = await Request.find().sort({_id: -1}).limit(10)
        // here also could be some search system (of requests)
        const isAuthorized = (req.user)? true : false
        // if req.headers.authorization user will see that he is Authorized,
        requests.forEach(item => {
            item.title.split("").slice(0,16).join("")
            item.other.split("").slice(0,54).join("")
        })
        if(isAuthorized){
            let imageSrc
            if (!req.user.imageSrc || req.user.imageSrc == ""){
                imageSrc = "pureAvatar.jpg"
            } else{
                imageSrc = req.user.imageSrc
            }
            res.render("main.hbs", {isAuthorized, imageSrc, requests})
        } else{
            res.render("main.hbs",{isAuthorized, requests})
        }
        
       
       
    } catch(e){
        errorHandler(res, e)
    }
    
}

module.exports.getRequest = async (req,res)=>{
    try{
        const isAuthorized = (req.user)? true : false
        const request = await Request.findById(req.params.id)
        if (isAuthorized){
            let imageSrc
            if (!req.user.imageSrc || req.user.imageSrc == ""){
                imageSrc = "pureAvatar.jpg"
            } else{
                imageSrc = req.user.imageSrc
            }            
            res.render("request", {isAuthorized, request, imageSrc})
        } else{
            res.render("request", {isAuthorized, request})
        }
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.getNewMessage = async (req,res)=>{
    let imageSrc
    if (!req.user.imageSrc || req.user.imageSrc == ""){
        imageSrc = "pureAvatar.jpg"
    } else{
        imageSrc = req.user.imageSrc
    }
    res.render("newMessage", {recipient, imageSrc})
}

module.exports.newMessage = async (req,res)=>{
    try{
        const any = req.file ? req.file.path : ""
        const recipient = req.headers.recipient
        const toUser = await User.findOne({email: recipient})
        const fromUser = await User.findById(req.user.id)
        const {title, message} = req.body
        const id = moment().format("DDMMYYYY-HHmmss_SSS")
        const date = moment()

        fromUser.messages.push({
            send: true,
            wroteAt: date,
            title: title,
            message: message,
            email: recipient,
            id: id,
            file: any
        })
        await fromUser.save()
        toUser.messages.push({
            send: false,
            wroteAt: date,
            title: title,
            message: message, 
            email: req.user.email,
            id: id,
            file: any
        })
        await toUser.save()
        const transporter = nodemailer.createTransport({
            host: host,
            port: emailPort,
            auth: {
                user: ofEmail,
                pass: passwordOfEmail
            }
        });
        const transporterMessage = "You have unread message on your WorkWorld account"
        await transporter.sendMail({
            from: ofEmail,
            to: recipient,
            subject: "New email",
            text: transporterMessage,
            html: `<p>${transporterMessage}</p><br><a href="/api/auth/login"><img src="workWorld.png"></a>`
        })
        res.status(200).json({
            message: "Message has been sent succesfully."
        })
    } catch(e){
        errorHandler(res,e)
    }

}