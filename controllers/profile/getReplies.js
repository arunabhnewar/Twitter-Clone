// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

const getReplies = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.userName }, { password: 0 });
        const userProfile = await User.findOne({ userName: req.params.userName }, { password: 0 });

        const userFrontendJs = JSON.stringify(user)
        const profileUserJs = JSON.stringify(userProfile)

        return res.render('pages/profile/profile', { user: user ? user : {}, userFrontendJs, userProfile, profileUserJs, tab: "replies" });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}



// Module Export
module.exports = getReplies;