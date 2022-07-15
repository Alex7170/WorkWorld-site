const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const userScheme = new Schema({
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
    messages:{
        type: Array
    },
    imageSrc:{
        type: String,
        default : ""
    }
}, { versionKey: false })

module.exports = mongoose.model("users", userScheme)