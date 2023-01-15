// Dependencies
const Chat = require("../../models/Chat");
const User = require("../../models/User");


const createChat = async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.id });
        const users = req.body;
        users.push(user);

        const chat = Chat({
            chatName: '',
            chatImage: '',
            isGroupChat: true,
            users,
            latestMessage: null,
        });

        const result = await chat.save();

        return res.json(result);

    } catch (error) {
        next(error)
    }
}



// Module Exports
module.exports = createChat;