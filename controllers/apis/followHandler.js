// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const followHandler = async (req, res, next) => {
    try {
        const followingUserId = req.params.id;
        const signedInUserId = req.id;

        const newData = await User.findOne({ _id: signedInUserId });

        const isFollowing = newData.following && newData.following.includes(followingUserId);

        const option = isFollowing ? "$pull" : "$addToSet";

        // Update following list
        const modifiedsignedInUser = await User.findOneAndUpdate({ _id: signedInUserId }, {
            [option]: { following: followingUserId }
        }, { new: true });


        // Update followers list
        const modifiedFollowingUser = await User.findOneAndUpdate({ _id: followingUserId }, {
            [option]: { followers: signedInUserId }
        }, { new: true });

        res.json(modifiedFollowingUser)
        // res.json(modifiedsignedInUser)

    } catch (error) {
        next(error)
    }
}



// Module Export
module.exports = followHandler;