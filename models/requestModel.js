const mongoose = require("mongoose")
const Schema = mongoose.Schema

const requestScheme = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    experience: String,
    salary: String,
    other: String
}, { versionKey: false })

module.exports = mongoose.model("requests", requestScheme)