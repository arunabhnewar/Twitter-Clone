// Dependencies
const createHttpError = require("http-errors");
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const getFollowers = async (req, res, next) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({ _id: req.id });

        const userProfile = await User.findOne({ userName: userName });

        const userAllTweets = await Tweet.find({ tweetedBy: userProfile._id });

        await User.populate(userProfile, { path: "followers" });
        await User.populate(userProfile, { path: "following" });

        const userFrontendJs = JSON.stringify(user);
        const profileUserJs = JSON.stringify(userProfile);

        return res.render('pages/follow/follow', { user: user ? user : {}, userFrontendJs, userProfile, userAllTweets, profileUserJs, tab: "followers" });

    } catch (error) {
        console.log(error)
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}


// Module Export
module.exports = getFollowers;