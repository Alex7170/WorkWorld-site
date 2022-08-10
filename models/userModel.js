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
    links: String,
    phone: String,
    other: String,
    messages:[
        {
            send: Boolean,
            wroteAt: Number,
            title: String,
            message: String,
            email: String, //user's email you talking with
            id: String,
            file: {
                type: String,
                default: ""
            }
        },
    ],
    imageSrc:{
        type: String,
        default : ""
    }
}, { versionKey: false })

module.exports = model("User", userSchema)