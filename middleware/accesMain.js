const jwt = require("jsonwebtoken")
const {secret} = require("../keys/keys")
const errorHadler = require("../utils/errorHadler")
const User = require("../models/userModel")
module.exports = async (req,res,next) =>{
    try{
        if(!req.headers.authorization){
            return next()
        }
        const token = req.headers.authorization.split(' ')[1]
        try{
            var decoded = jwt.verify(token, secret)
        } catch(err){
            return next()
        }
        req.user = await User.findById(decoded.userId)
        next()
    } catch(e){
        errorHadler(res,e)
    }
}