// Dependencies
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweetTxtContent: {
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
},
    {
        timestamps: true,
    }
)


// Model
const Tweet = mongoose.model("Tweet", tweetSchema)


// Module Export
module.exports = Tweet;