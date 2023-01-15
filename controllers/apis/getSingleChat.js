// Dependencies
const User = require("../../models/User");
const Chat = require("../../models/Chat");
const mongoose = require("mongoose");


const getSingleChat = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        const userId = req.id;

        if (!mongoose.isValidObjectId(chatId)) {
            return res.status(400).json({
                error: "Chat did not exist"
            })
        }


        const chatData = await Chat.findOne({
            _id: chatId,
            users: {
                $elemMatch: {
                    $eq: userId
                }
            }
        })

        await User.populate(chatData, { path: "users" })


        if (!chatData) {
            // Chat id is a user id checked
            const userData = await User.findById(chatId);

            if (userData) {
                const privateChatData = await Chat.findOneAndUpdate(
                    {
                        isGroupChat: false,
                        users: {
                            $size: 2,
                            $all: [
                                {
                                    $elemMatch: {
                                        $eq: mongoose.Types.ObjectId(userId),
                                    }
                                },
                                {
                                    $elemMatch: {
                                        $eq: mongoose.Types.ObjectId(chatId)
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $setOnInsert: {
                            users: [userId, chatId],
                            latestMessage: null,
                        }
                    }, { new: true, upsert: true }
                ).populate("users");

                if (privateChatData) {
                    return res.json(privateChatData)
                } else {
                    return res.status(500).json({
                        error: "Something went wrong!"
                    })
                }

            } else {
                return res.status(400).json({
                    error: "You have no access"
                })
            }
        }



        return res.json(chatData)

    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = getSingleChat;