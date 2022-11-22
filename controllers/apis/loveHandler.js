// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");


const loveHandler = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.id;

        const newData = await User.findOne({ _id: req.id });

        const isLoved = newData?.loves && newData?.loves?.includes(postId);
        const option = isLoved ? "$pull" : "$addToSet";


        // Update post loves
        const post = await Tweet.findOneAndUpdate({ _id: postId }, {
            [option]: { loves: userId }
        }, { new: true });


        // Update User Loves
        const modifiedUser = await User.findOneAndUpdate({ _id: userId }, {
            [option]: { loves: postId }
        }, { new: true });

        res.json(post);

    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = loveHandler;