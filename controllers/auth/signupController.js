// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");
const hashString = require("../../utilities/hashString");
const sendEmail = require("../../utilities/sendEmail");
const fs = require('fs');

// Post Sign Up Page Controller
const signupController = async (req, res, next) => {

    // handle file upload error
    if (Object.keys(req.error ? req.error : {}).length !== 0) {

        // Return response send
        return res.render('pages/signup', {
            user: req.body,
            error: req.error,
        });

    } else {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const userName = req.body.userName;
        const email = req.body.email;
        const password = await hashString(req.body.password);
        // const avatarProfile = req.file?.filename || "avatar.png";
        const avatarProfile = req.file?.filename || "";

        const userObject = User({
            firstName,
            lastName,
            userName,
            email,
            password,
            avatarProfile,
            status: "unverified",
            loves: [],
            retweetUsers: [],


        });
        const user = await userObject.save();

        if (avatarProfile) {
            fs.renameSync(__dirname + `/../../temp/${avatarProfile}`, __dirname + `./../../public/uploads/${user._id}/${avatarProfile}`)
        }

        if (user._id) {
            sendEmail(
                [user.email],
                {
                    subject: "Please, verify your account",
                    template: `Verification link:${process.env.APP_URL}/emailConfirmation/${user._id}`,
                    attachments: [],
                },
                (err, info) => {
                    if (!err && info) {
                        return res.render("pages/auth/confirmation", {
                            email: user.email,
                            title: `Confirmation - ${process.env.APP_NAME}`,
                        });
                    } else {
                        next(createHttpError(500, "Sorry, internal server error!!"))
                    }
                }
            )
        }
    }
}


// Module Export
module.exports = signupController;