// Dependencies
const homeRouter = require('express').Router();
const getHomePage = require('../../controllers/home/getHomePage');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');
require("dotenv").config();


// Get Home Page
homeRouter.get('/', htmlResponse(`Home Page - ${process.env.APP_URL}`), signInChecker, getHomePage)


// Module Export
module.exports = homeRouter;