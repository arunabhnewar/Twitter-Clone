// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const replyHandler = async (req, res, next) => {

    try {
        const postId = req.params.id;
        const userId = req.id;
        const files = req.files;
        const replyTextContent = req.body.replyTextContent;

        const postData = {
            replyTextContent,
            images: [],
            tweetedBy: userId,
            loves: [],
            retweetUsers: [],
            postData: null,
            replyTo: postId,
            replyTweets: [],
        }

        files.forEach(file => {
            postData.images.push(file.filename)
        });

        const tweetObj = await Tweet(postData).save();

        await Tweet.findByIdAndUpdate(postId, {
            $addToSet: { replyTweets: tweetObj._id }
        });

        return res.json(tweetObj)

    } catch (error) {
        next(error)
    }
}




// Module Export
module.exports = replyHandler;