// Dependencies
const createPost = require('../../controllers/apis/createPost');
const getPostAll = require('../../controllers/apis/getPostAll');
const loveHandler = require('../../controllers/apis/loveHandler');
const replyHandler = require('../../controllers/apis/replyHandler');
const retweetHandler = require('../../controllers/apis/retweetHandler');
const singleTweetController = require('../../controllers/apis/singleTweetController');
const getSingleTweet = require('../../controllers/singleTweet/getSingleTweet');
const uploadTweetImg = require('../../middlewares/apis/uploadTweetImg');
const signInChecker = require('../../middlewares/common/signinChecker');
const postRoute = require('express').Router();
require('dotenv').config();




// New Tweet Post
postRoute.post('/', signInChecker, uploadTweetImg, createPost);


// Get Single Tweet Page
postRoute.get('/:postId', signInChecker, getSingleTweet);
postRoute.get('/status/:postId', signInChecker, singleTweetController);


// Get All Post
postRoute.get('/', signInChecker, getPostAll);


// Love React Route
postRoute.put('/love/:id', signInChecker, loveHandler);


// Retweet Route
postRoute.post('/retweet/:id', signInChecker, retweetHandler);


// Reply Route
postRoute.post('/reply/:id', signInChecker, uploadTweetImg, replyHandler);


// Module Export
module.exports = postRoute;