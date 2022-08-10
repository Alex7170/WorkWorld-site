const {ofEmail, passwordOfEmail} = require("../keys/keys")
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ofEmail,
        pass: passwordOfEmail
    }
})

module.exports = nodemailer({transporter})