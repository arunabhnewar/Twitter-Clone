// Dependencies
const createPost = require('../../controllers/apis/createPost');
const getPostAll = require('../../controllers/apis/getPostAll');
const loveHandler = require('../../controllers/apis/loveHandler');
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


// Module Export
module.exports = postRoute;