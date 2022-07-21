const jwt = require("jsonwebtoken")
const {secret} = require("../keys/keys")
const errorHadler = require("../utils/errorHadler")
module.exports = (req,res,next) =>{
    try{
        if(!req.headers.authorization){
            return next()
        }
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch(e){
        errorHadler(res,e)
    }
}