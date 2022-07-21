const User = require('../models/userModel')
const Request = require("../models/requestModel")
const errorHandler = require("../utils/errorHadler")

module.exports.getMain = async (req,res)=>{
    try{
        const requests = await Request.find().sort({_id: -1}).limit(10)
        const isAuthorized = (req.user)? true : false
        requests.map(request => request.title.split("").slice(0,30).join(""))
        requests.map(request => request.other.split("").slice(0,54).join(""))
        if(isAuthorized){
            const id = req.user.userId 
            const user = await User.findById(id)
            res.render("main.hbs", {
                isAuthorized: isAuthorized,
                imageSrc: user.imageSrc,
                name: user.name,
                surname: user.surname,
                title: requests.title,
                experience: requests.experience,
                other: requests.other,
                salary: requests.salary
                
        })} else{
            res.render("main.hbs",{
                isAuthorized: isAuthorized,
                title: requests.title,
                experience: requests.experience,
                other: requests.other,
                salary: requests.salary
            })
        }
        
       
       
    } catch(e){
        errorHandler(res, e)
    }
    
}