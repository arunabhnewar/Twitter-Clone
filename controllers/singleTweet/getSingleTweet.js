// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");


const getSingleTweet = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.id

        const user = await User.findOne({ userName: req.userName }, { password: 0 });

        const userFrontendJs = JSON.stringify(user)

        return res.render('pages/singleTweet/singleTweet', { user: user ? user : {}, userFrontendJs, postId });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}


// Module Export
module.exports = getSingleTweet;