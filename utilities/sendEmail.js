// Dependencies
const nodeMailer = require("nodemailer");
const createHttpError = require("http-errors");
require("dotenv").config();

const sendEmail = async (receivers, data, callback) => {

    try {
        // Send EMail
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PWD
            },
        });

        // option
        const options = {
            from: process.env.EMAIL,
            to: receivers.join(","),
            subject: data.subject,
            html: data.template,
            attachments: data.attachments,
        };
        transporter.sendMail(options, callback);

    } catch (error) {
        next(createHttpError("Sorry, internal server error!!"))
    }
}

// Module Export
module.exports = sendEmail;