// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const removeTweet = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.id;


        // Delete origin tweet
        const removedTweet = await Tweet.findOneAndDelete({ _id: postId, tweetedBy: userId });

        // Remove this tweet id from the replyTweets array of the main Tweet
        if (removedTweet?.replyTo) {
            const replyToTweet = await Tweet.findByIdAndUpdate(removedTweet?.replyTo,
                {
                    $pull: { replyTweets: postId },
                },
                { new: true }

            );

            if (replyToTweet !== null) {
                await User.populate(replyToTweet, { path: "tweetedBy" });
                await Tweet.populate(replyToTweet, { path: "replyTo" });
                await User.populate(replyToTweet, { path: "replyTo.tweetedBy" });
            }
        }



        // Delete the user id from retweeted users array of the origin tweet
        if (removedTweet?.postData) {
            const reTweetedPost = await Tweet.findByIdAndUpdate(removedTweet?.postData,
                {
                    $pull: { retweetUsers: userId }
                },
                { new: true }
            );
            await User.populate(reTweetedPost, { path: "tweetedBy" });
            await Tweet.populate(reTweetedPost, { path: "replyTo" });
            await User.populate(reTweetedPost, { path: "replyTo.tweetedBy" });
        }



        if (removedTweet?.postData) {
            const user = await User.findOneAndUpdate({ _id: removedTweet.tweetedBy },
                {
                    $pull: { retweets: removedTweet?.postData }
                },
                { new: true }
            )
        }


        // Delete postId from the retweets array of users who retweet this tweet
        if (removedTweet?.retweetUsers?.length) {
            removedTweet?.retweetUsers?.forEach(async (uId) => {
                const user = await User.findByIdAndUpdate(
                    uId,
                    {
                        $pull: { retweets: removedTweet?._id },
                    },
                    { new: true }
                );
            })
        }


        // Delete all retweeted tweet
        if (removedTweet?.retweetUsers?.length) {
            removedTweet?.retweetUsers?.forEach(async (userId) => {

                const removedRetweetedPost = await Tweet.findOneAndDelete({
                    tweetedBy: userId,
                    postData: removedTweet._id,
                });
            })
        }


        /* delete all replies of main tweets */
        if (removedTweet?.replyTweets.length) {
            removedTweet?.replyTweets.forEach(async (replyId) => {
                const deleteReplyPosts = await Tweet.findOneAndDelete(
                    {
                        _id: replyId,
                    },
                    { new: true }
                );
                // return console.log(deleteReplyPosts);
            });
        }


        // Delete postId from the loves array of users 
        if (removedTweet?.loves?.length) {
            removedTweet?.loves?.forEach(async (userId) => {
                const user = await User.findByIdAndUpdate(userId,
                    {
                        $pull: { loves: removedTweet._id },
                    },
                    { new: true },
                )
            })
        }

        return res.json(removedTweet)


    } catch (error) {
        next(error)
    }
}






// Module Export
module.exports = removeTweet;