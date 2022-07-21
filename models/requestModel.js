const mongoose = require("mongoose")
const Schema = mongoose.Schema

const requestScheme = new Schema({
    
}, { versionKey: false })

module.exports = mongoose.model("requests", requestScheme)