// Dependencies
const searchRoute = require('express').Router();
require("dotenv").config();
const getTweetSearch = require('../../controllers/search/getTweetSearch');
const getUserSearch = require('../../controllers/search/getUserSearch');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');

// Get Search Page
searchRoute.get("/", htmlResponse(`Search Page - ${process.env.APP_Name}`), signInChecker, getTweetSearch)


// Get Search User 
searchRoute.get("/users", htmlResponse(`Search Page - ${process.env.APP_Name}`), signInChecker, getUserSearch)


// Module Export
module.exports = searchRoute;