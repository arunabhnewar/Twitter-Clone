// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const getPostAll = async (req, res, next) => {
    try {
        const result = await Tweet.find();
        await User.populate(result, { path: "tweetedBy", select: "-password" });

        await User.populate(result, { path: "postData" });
        await User.populate(result, { path: "postData.tweetedBy" });

        return res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Module Export
module.exports = getPostAll;