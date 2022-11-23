// Dependencies
const createPost = require('../../controllers/apis/createPost');
const getPostAll = require('../../controllers/apis/getPostAll');
const loveHandler = require('../../controllers/apis/loveHandler');
const retweetHandler = require('../../controllers/apis/retweetHandler');
const uploadTweetImg = require('../../middlewares/apis/uploadTweetImg');
const signInChecker = require('../../middlewares/common/signinChecker');
const postRoute = require('express').Router();
require('dotenv').config();




// New Tweet Post
postRoute.post('/', signInChecker, uploadTweetImg, createPost);


// Get All Post
postRoute.get('/', signInChecker, getPostAll);


// Love React Route
postRoute.put('/love/:id', signInChecker, loveHandler);


// Retweet Route
postRoute.post('/retweet/:id', signInChecker, retweetHandler);


// Module Export
module.exports = postRoute;