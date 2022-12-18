// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const getPostAll = async (req, res, next) => {
    try {

        const filterObj = {};
        req.query.tweetedBy && (filterObj.tweetedBy = req.query?.tweetedBy);

        req.query.replyTo && (filterObj.replyTo = req.query?.replyTo == "false" ? { $exists: false } : { $exists: true });

        const userProfile = await User.findOne({ _id: req.id });

        userProfile.following = userProfile.following || [];

        const followingUsers = [...userProfile.following];
        followingUsers.push(userProfile._id)

        req.query.followingOnly && req.query.followingOnly == "true" && (filterObj.tweetedBy = { $in: followingUsers });

        const result = await Tweet.find(filterObj);
        await User.populate(result, { path: "tweetedBy", select: "-password" });

        await Tweet.populate(result, { path: "postData" });
        await User.populate(result, { path: "postData.tweetedBy" });
        await Tweet.populate(result, { path: "replyTo" });
        await User.populate(result, { path: "replyTo.tweetedBy" });

        return res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Module Export
module.exports = getPostAll;