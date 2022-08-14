const User = require("../models/userModel")
const Request = require("../models/requestModel")
const errorHandler = require("../utils/errorHadler")
const { findById } = require("../models/userModel")

module.exports.getMyPage = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        if(user.links) user.links.split(/\r?\n/)
        user.messages.slice(-5)
        user.messages.forEach(item => {
            item.message.slice(0,51)
            item.wroteAt = item.wroteAt.fromNow()
        })
        let imageSrc
        if (!user.imageSrc || user.imageSrc == ""){
            imageSrc = "pureAvatar.jpg"
        } else{
            imageSrc = user.imageSrc
        }
        res.render("myPage.hbs", {user, imageSrc})
        res.status(200)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.getUploadAvatar = (req,res)=>{
    let imageSrc
    if (!req.user.imageSrc || req.user.imageSrc == ""){
        imageSrc = "pureAvatar.jpg"
    } else{
        imageSrc = req.user.imageSrc
    }
    res.render("saveAvatar", {imageSrc})
}

module.exports.uploadAvatar = async (req,res)=>{
    const image = req.file ? req.file.path : ""
    try{
        await User.updateOne({_id: req.user.id}, {imageSrc: image})
        res.status(201).json({
            message: "Added succesfully"
        })
    } catch{
        errorHandler(e)
    }
}

module.exports.getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        let imageSrc
        if (!user.imageSrc || user.imageSrc == ""){
            imageSrc = "pureAvatar.jpg"
        } else{
            imageSrc = user.imageSrc
        }
        res.render("updateProfile", {user, imageSrc})
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
        let imageSrc
        if (!user.imageSrc || user.imageSrc == ""){
            imageSrc = "pureAvatar.jpg"
        } else{
            imageSrc = user.imageSrc
        }
        res.render("myMessages", {emailsGet, emailsSend})
    } catch(e){
        errorHandler(res,e)
    }
}





module.exports.getOneMessage = async (req,res)=>{
    try{
        const sender = await User.findById(req.user.id)
        const message = sender.messages.find(message => message.id == req.params.id)
        message.date = message.date.calender()
        let imageSrc
        if (!sender.imageSrc || sender.imageSrc == ""){
            imageSrc = "pureAvatar.jpg"
        } else{
            imageSrc = sender.imageSrc
        }
        res.render("message", {message, imageSrc})
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


module.exports.getMyRequests = async (req,res)=>{
    try{
        const requests = await Request.find({creator: req.user.id})
        requests.forEach(item=>{
            item.title.slice(0, 20)
            item.other.slice(0,50)
        })
        let imageSrc
        if (!req.user.imageSrc || req.user.imageSrc == ""){
            imageSrc = "pureAvatar.jpg"
        } else{
            imageSrc = req.user.imageSrc
        }
        res.render("myRequests", {requests, imageSrc})
    } catch(e){
        errorHandler(res,e)
    }
    
}

module.exports.deleteRequest = async (req,res) =>{
    try{
        await Request.deleteOne({id:req.params.id})
        const user = await findById(req.user.id)
        const index = user.requests.findIndex(item => item.id == req.params.id)
        user.requests.splice(index,1)
        await user.save()
        res.status(200).json({message: "Deleted Succesfully"})
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.getUpdateRequest = async (req,res) =>{
    try{
        const request = await Request.findById(req.params.id)
        let imageSrc
        if (!req.user.imageSrc || req.user.imageSrc == ""){
            imageSrc = "pureAvatar.jpg"
        } else{
            imageSrc = req.user.imageSrc
        }
        res.render("updateRequest", {request, imageSrc})
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.updateRequest = async (req,res) =>{
    try{
        await Request.findByIdAndUpdate(req.params.id, {
            tltle: req.body.title,
            experience: req.body.experience,
            salary: req.body.salary,
            other: req.body.other
        })
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.getNewRequest = (req,res)=>{
    console.log("here")
    let imageSrc
    if (!req.user.imageSrc || req.user.imageSrc == ""){
        imageSrc = "pureAvatar.jpg"
    } else{
        imageSrc = req.user.imageSrc
    }
    res.render("createRequest", {imageSrc})
}

module.exports.newRequest = async (req,res)=>{
    try{
        const request = new Request({
            creator: req.user.id,
            title: req.body.title,
            experience: req.body.experience,
            salary: req.body.salary,
            other: req.body.other
        })
        await request.save()
        const user = await User.findById(req.user.id)
        user.requests.push(request.id)
        await user.save()
        res.status(201).json({message: "Created succesfully"})
    } catch(e){
        errorHandler(res,e)
    }
}


