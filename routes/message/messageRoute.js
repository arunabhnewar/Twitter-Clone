// Dependencies
const messageRoute = require('express').Router();
require("dotenv").config();
const getChatPage = require('../../controllers/messages/getChatPage');
const getMessagePage = require('../../controllers/messages/getMessagePage');
const getNewMessagePage = require('../../controllers/messages/getNewMessagePage');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');

// Get Messages Page
messageRoute.get("/", htmlResponse(`Message Page - ${process.env.APP_Name}`), signInChecker, getMessagePage)


// Get Messages Page
messageRoute.get("/new", htmlResponse(`New Message Page - ${process.env.APP_Name}`), signInChecker, getNewMessagePage)


// Get a single chat Page
messageRoute.get("/:chatId", htmlResponse(`New Chat Page - ${process.env.APP_Name}`), signInChecker, getChatPage)


// Module Export
module.exports = messageRoute;