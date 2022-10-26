// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");
const hashString = require("../../utilities/hashString");
const sendEmail = require("../../utilities/sendEmail");

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
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const email = req.body.email;
        const password = await hashString(req.body.password);
        const avatarProfile = req.file.filename;

        const userObject = User({
            firstname,
            lastname,
            username,
            email,
            password,
            avatarProfile

        });
        const user = await userObject.save();

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