// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

const getMessagePage = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.userName }, { password: 0 });
        // const userProfile = await User.findOne({ userName: req.params.userName }, { password: 0 });

        // const userAllTweets = await Tweet.find({ tweetedBy: userProfile._id });

        const userFrontendJs = JSON.stringify(user);

        return res.render('pages/messages/messages', { user: user ? user : {}, userFrontendJs });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}



// Module Export
module.exports = getMessagePage;