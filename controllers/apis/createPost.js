// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const createPost = async (req, res, next) => {
    try {
        const tweetObj = {
            tweetTxtContent: req.body.tweetTxtContent,
            images: [],
            tweetedBy: req.id,
        };

        [...req.files].forEach(file => {
            tweetObj.images.push(file.filename)
        });

        const tweet = Tweet(tweetObj);
        const result = await tweet.save();

        await User.populate(result, { path: "tweetedBy", select: "-password" });

        return res.json(result);

    } catch (error) {
        next(error);
    }
}



// Module Export
module.exports = createPost;