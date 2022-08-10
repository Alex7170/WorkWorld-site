const User = require("../models/userModel")
const errorHandler = require("../utils/errorHadler")
const moment = require("moment")
const nodemailer = require("nodemailer")
const transporter = require("../utils/transporter")

module.exports.getMyPage = async (req,res)=>{
    console.log(req.user)
    try{
        const user = await User.findById(req.user.id)
        const result = user.links.split(/\r?\n/)
        const messages = user.messages.slice(-5)
        messages.forEach(item => {
            item.message.slice(0,51)
            item.wroteAt = item.wroteAt.fromNow()
        })
        res.render("myPage.hbs", {
            avatar: user.imageSrc,
            name: user.name,
            surname: user.surname,
            email: user.email,
            links: result,
            phone: user.phone,
            other: user.other,
            messages: messages
        })
        res.status(200)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.render("updateProfile", {
            email: user.email,
            avatar: user.imageSrc,
            name: user.name,
            surname: user.surname,
            age: user.age,
            country: user.country,
            experience: user.experience,
            links: user.links,
            phone: user.phone,
            other: user.other
        })
        res.status(200)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.updateUser = async (req,res)=>{
    try{
        if (!req.body){
            return res.status(200)
        }
        await User.findByIdAndUpdate(req.user.id, {
            imageSrc: req.body.imageSrc,
            avatar: req.body.imageSrc,
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            country: req.body.country,
            experience: req.body.experience,
            links: req.body.links,
            phone: req.body.phone,
            other: req.body.other
        })
        res.status(201).json({
            message: "User updated succesfully."
        })
    } catch(e){
        errorHandler(res,e)
    }
    
}

module.exports.getMessages = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        const messages = user.messages
        const emailsSend = []
        const emailsGet = []
        messages.forEach(item => {
            item.message.slice(0,51)
            item.wroteAt = item.wroteAt.fromNow()
        })
        for (let i=0; i<messages.length; i++){
            if (messages[i].send){
                emailsSend.push(messages[i])
            } else{
                emailsGet.push(messages[i])
            }
        }
        res.render("myMessages", {emailsGet, emailsSend})
        res.status(200)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.getNewMessage = (req,res)=>{
    const recipient = req.headers.recipient
    res.render("newMessage", {recipient})
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
            mesage: message,
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
        const transporterMessage = "You have unread message on your WorkWorld account"
        await transporter.sendMail({
            from: " WorkWorld <yaroshenko.sashko@gmail.com>",
            to: recipient,
            subject: "New email",
            message: transporterMessage,
            html: `<p>${transporterMessage}</p><br><a href="/api/auth/login"><img src="writeMessage.png"></a>`
        })
        res.status(200).json({
            message: "Message has been sent succesfully."
        })
    } catch(e){
        errorHandler(res,e)
    }

}

module.exports.getOneMessage = async (req,res)=>{
    try{
        const sender = await User.findById(req.user.id)
        const message = sender.messages.find(message => message.id == req.params.id)
        message.date = message.date.calender()
        res.render("message", {message})
        res.status(200)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.deleteOneMessage = async (req,res)=>{
    try{
        const sender = await User.findById(req.user.id)
        const index = sender.messages.findIndex(message => message.id == req.params.id)
        sender.messages.splice(index,1)
        await sender.save()
        res.status(200)
    } catch(e){
        errorHandler(res,e)
    }
}


module.exports.getMyRequests = (req,res)=>{

}

module.exports.deleteRequest = (req,res)=>{
    
}

module.exports.getUpdateRequest = (req,res) =>{
    
}

module.exports.updateRequest = (req,res) =>{

}

module.exports.getNewRequest = (req,res)=>{
    
}

module.exports.newRequest = (req,res)=>{
    
}


