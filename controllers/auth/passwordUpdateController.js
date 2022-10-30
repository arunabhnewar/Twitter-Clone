// Dependencies
const createHttpError = require("http-errors");
const OTP = require("../../models/OTP");
const User = require("../../models/User");
const hashString = require("../../utilities/hashString");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const passwordUpdateController = async (req, res, next) => {
    try {
        const otp = req.body.otp;
        const password = req.password;
        const otpId = req.body.otpId;
        const otpObj = await OTP.findOne({ _id: otpId });

        if (Number(otp) === otpObj.OTP && otpObj.status) {
            const hashedPassword = await hashString(password);
            const output = await User.findOneAndUpdate(
                { email: otpObj.email },
                {
                    $set: {
                        password: hashedPassword,
                    },
                }
            )

            if (output) {
                const token = await jwt.sign(
                    {
                        userName: output.userName,
                        email: output.email,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );

                res.status(200);
                res.cookie("access_token", "Bearer " + token, { signed: true, });

                res.redirect("/");

            } else {
                res.send("Something goes wrong!!");
            };
        } else {
            throw createHttpError(500, "Sorry, internal server error!!")
        }
    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = passwordUpdateController;