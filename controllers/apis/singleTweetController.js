// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const singleTweetController = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const result = await Tweet.findById(postId);
        await User.populate(result, { path: "tweetedBy" });
        await Tweet.populate(result, { path: "replyTo" });
        await Tweet.populate(result, { path: "replyTweets" });

        await Tweet.populate(result, { path: "replyTweets.replyTo" });
        await User.populate(result, { path: "replyTweets.tweetedBy" });
        await User.populate(result, { path: "replyTo.tweetedBy" });
        await User.populate(result, { path: "replyTweets.replyTo.tweetedBy" });




        return res.json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Module Export
module.exports = singleTweetController;