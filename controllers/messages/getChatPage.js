// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

const getChatPage = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.id });
        const chatId = req.params.chatId;

        const userFrontendJs = JSON.stringify(user);

        return res.render('pages/messages/chat', { user: user ? user : {}, userFrontendJs, chatId });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}



// Module Export
module.exports = getChatPage;