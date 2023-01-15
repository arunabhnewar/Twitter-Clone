// Dependencies
const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    chatImage: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            red: "User",
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },

},
    {
        timestamps: true,
    }
)


// Model
const Chat = mongoose.model("Chat", chatSchema)


// Module Export
module.exports = Chat;