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
        type: String,
        default: "Name"
    },
    surname:{
        type: String,
        default: "Surname"
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
    },
    requests:[{
        type: Schema.Types.ObjectId,
        ref: "Request"
    }]
}, { versionKey: false })

module.exports = model("User", userSchema)