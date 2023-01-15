// Dependencies
const createHttpError = require("http-errors");
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const getNewMessagePage = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.userName }, { password: 0 });
        const userProfile = await User.findOne({ userName: req.params.userName }, { password: 0 });

        // const userAllTweets = await Tweet.find({ tweetedBy: userProfile._id });

        const userFrontendJs = JSON.stringify(user);

        return res.render('pages/messages/newMessages', { user: user ? user : {}, userFrontendJs });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}



// Module Export
module.exports = getNewMessagePage;