// Dependencies
const profileRoute = require('express').Router();
const getReplies = require('../../controllers/profile/getReplies');
const getTweets = require('../../controllers/profile/getTweets');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');
require("dotenv").config();


// Get Tweet Page
profileRoute.get('/:userName', htmlResponse(`Home Page - ${process.env.APP_URL}`), signInChecker, getTweets)


// Get Replies Page
profileRoute.get('/:userName/replies', htmlResponse(`Home Page - ${process.env.APP_URL}`), signInChecker, getReplies)


// Module Export
module.exports = profileRoute;