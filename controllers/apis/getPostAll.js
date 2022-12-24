// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const getPostAll = async (req, res, next) => {
    try {

        let filterObj = {};

        // TweetedBy query
        req.query.tweetedBy && (filterObj.tweetedBy = req.query?.tweetedBy);

        // Reply to query
        req.query.replyTo && (filterObj.replyTo = req.query?.replyTo == "false" ? { $exists: false } : { $exists: true });


        // Load following post only query
        if (req.query.followingOnly && req.query.followingOnly == "true") {
            const userProfile = await User.findOne({ _id: req.id });

            userProfile.following = userProfile.following || [];

            const followingUsers = [...userProfile.following];
            followingUsers.push(userProfile._id)

            req.query.followingOnly && req.query.followingOnly == "true" && (filterObj.tweetedBy = { $in: followingUsers });
        }

        // Pinned tweet query
        req.query.pinned && req.query.pinned == "true" && (filterObj.pinned = true);

        // Searching Text query
        if (req.query.searchingText) {
            filterObj = { $or: [{ tweetTxtContent: { $regex: new RegExp(req.query.searchingText, "ig") } }, { replyTextContent: { $regex: new RegExp(req.query.searchingText, "ig") } }] }

        }



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