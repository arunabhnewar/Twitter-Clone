// Dependencies
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const OTP = require("../../models/OTP");
require("dotenv").config();

const verifyOTPController = async (req, res) => {
    try {
        const otpInput = req.body.otp;
        const otpId = req.body.otpId;
        const otpObj = await OTP.findOne({ _id: otpId });

        if (Number(otpInput) === otpObj.OTP && otpObj?.expireIn.getTime() > Date.now()) {

            const output = await OTP.findOneAndUpdate(
                { _id: otpObj._id, },
                {
                    $set: {
                        status: true,
                    }
                },
            )


            if (output) {
                res.render("pages/auth/createNewPassword", {
                    user: {},
                    error: {},
                    otp: {
                        otpId: output._id,
                        otp: output.OTP,
                    },
                })
            } else {
                throw createHttpError(500, "Sorry, internal server error!!")
            };

        } else {
            const errMsg = otpObj.expireIn.getTime() > Date.now() ? "Your OTP invalid!!" : "Oops!! Your OTP expired!"

            res.render("pages/auth/verifyOtp", {
                error: {
                    otp: { msg: errMsg }
                },
                otp: {
                    value: otpInput,
                    otpId: otpId,
                    email: otpObj.email,
                },
            });
        }
    } catch (error) {
        res.render("pages/auth/verifyOtp", {
            error: {
                otp: { msg: "Your OTP invalid!!" }
            },
            otp: {
                value: otpInput,
                token: otpId,
                email: otpObj.email,
            },
        })
    }
}


// Module Export
module.exports = verifyOTPController;