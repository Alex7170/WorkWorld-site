const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const {secret} = require("../keys/keys")
const User = require("../models/userModel")
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}
module.exports = (passport) => {
    passport.use(
        
        new JwtStrategy(options, async (payload, done)=>{
            try{
                const user = await User.findById(payload.userId)
                if(user){
                    done(null, user)
                } else{
                    done(null, false)
                }
            } catch(e){
                console.log(e)
            }
            
        })
    )
}