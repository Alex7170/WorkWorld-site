const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String
    },
    surname:{
        type: String
    },
    age: Number,
    country: String,
    experience: String,
    other: String,
    links: String,
    phone: String,
    messages:{
        type: Array
    },
    imageSrc:{
        type: String,
        default : ""
    }
}, { versionKey: false })

module.exports = model("User", userSchema)