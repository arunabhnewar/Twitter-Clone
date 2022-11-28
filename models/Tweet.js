// Dependencies
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweetTxtContent: {
        type: String,
        trim: true,
        default: "",
    },
    replyTextContent: {
        type: String,
        trim: true,
        default: "",
    },
    images: [
        {
            type: String
        }
    ],
    tweetedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    loves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    retweetUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    postData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
    },
    replyTweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        },
    ],

},
    {
        timestamps: true,
    }
)


// Model
const Tweet = mongoose.model("Tweet", tweetSchema)


// Module Export
module.exports = Tweet;