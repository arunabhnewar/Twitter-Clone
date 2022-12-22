// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const pinHandler = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.id;

        const post = await Tweet.findOne({ _id: postId });

        console.log(post.pinned)
        if (post.pinned) {
            post = await Tweet.findOneAndUpdate({ tweetedBy: userId, _id: postId },
                {
                    $set: { pinned: false }
                },
                { new: true }
            );

            await User.populate(post, { path: "tweetedBy" });
            await Tweet.populate(post, { path: "replyTo" });
            await Tweet.populate(post, { path: "replyTo.tweetedBy" })


        } else {
            const prevPinnedPost = await Tweet.findOneAndUpdate({ tweetedBy: userId, pinned: true },
                {
                    $set: { pinned: false }
                },
                { new: true }
            );

            if (prevPinnedPost) {
                await User.populate(prevPinnedPost, { path: "tweetedBy" });
                await Tweet.populate(prevPinnedPost, { path: "replyTo" });
                await Tweet.populate(prevPinnedPost, { path: "replyTo.tweetedBy" })
            }

            post = await Tweet.findOneAndUpdate(
                { tweetedBy: userId, _id: postId },
                {
                    $set: { pinned: true }
                },
                { new: true }
            )

            await User.populate(post, { path: "tweetedBy" });
            await Tweet.populate(post, { path: "replyTo" });
            await Tweet.populate(post, { path: "replyTo.tweetedBy" })
        }

        res.json(post)
    } catch (error) {
        next(error)
    }
}

// Module Export
module.exports = pinHandler;