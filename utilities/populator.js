// Dependencies
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

async function postPopulate(postObj) {
    await User.populate(postObj, { path: "tweetedBy" });
    await Tweet.populate(postObj, { path: "replyTo" });
    await Tweet.populate(postObj, { path: "replyTweets" });

    await Tweet.populate(postObj, { path: "replyTweets.replyTo" });
    await User.populate(postObj, { path: "replyTweets.tweetedBy" });
    await User.populate(postObj, { path: "replyTo.tweetedBy" });
    await User.populate(postObj, { path: "replyTweets.replyTo.tweetedBy" });
}


// Module Export
module.exports = { postPopulate }