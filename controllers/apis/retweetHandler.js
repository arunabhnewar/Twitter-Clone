// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const retweetHandler = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.id;

        const deletedTweet = await Tweet.findOneAndDelete({
            tweetedBy: userId, postData: postId
        });

        let retweetObj = deletedTweet;
        if (retweetObj === null) {
            const tweet = Tweet({
                tweetedBy: userId,
                postData: postId,
            });
            retweetObj = await tweet.save();
        }

        const option = deletedTweet !== null ? "$pull" : "$addToSet";


        // Update retweet users
        const post = await Tweet.findOneAndUpdate({ _id: postId }, {
            [option]: { retweetUsers: userId }
        }, { new: true });


        // Update User Loves
        const modifiedUser = await User.findOneAndUpdate({ _id: userId }, {
            [option]: { retweets: postId }
        }, { new: true });

        return res.json(post);

    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = retweetHandler;