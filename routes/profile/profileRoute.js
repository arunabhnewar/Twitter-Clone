// Dependencies
const profileRoute = require('express').Router();
const avatarUpdate = require('../../controllers/apis/avatarUpdate');
const coverUpdate = require('../../controllers/apis/coverUpdate');
const followHandler = require('../../controllers/apis/followHandler');
const getFollowers = require('../../controllers/follow/getFollowers');
const getFollowing = require('../../controllers/follow/getFollowing');
const getReplies = require('../../controllers/profile/getReplies');
const getTweets = require('../../controllers/profile/getTweets');
const avatarUpdateImg = require('../../middlewares/apis/avatarUpdateImg');
const coverUpdateImg = require('../../middlewares/apis/coverUpdateImg');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');
require("dotenv").config();


// Get Tweet Page
profileRoute.get('/:userName', htmlResponse(`Profile Page - ${process.env.APP_Name}`), signInChecker, getTweets)


// Get Replies Page
profileRoute.get('/:userName/replies', htmlResponse(`Profile Page - ${process.env.APP_Name}`), signInChecker, getReplies)


// Other User Profile Route
profileRoute.put('/:id/follow', signInChecker, followHandler)


// Get Followers and Following route
profileRoute.get('/:userName/following', htmlResponse(`Profile Page - ${process.env.APP_Name}`), signInChecker, getFollowing)


profileRoute.get('/:userName/followers', htmlResponse(`Profile Page - ${process.env.APP_Name}`), signInChecker, getFollowers)



// New Avatar image Update
profileRoute.post('/avatar', signInChecker, avatarUpdateImg, avatarUpdate)


// New Cover image Update
profileRoute.post('/cover', signInChecker, coverUpdateImg, coverUpdate)


// Module Export
module.exports = profileRoute;