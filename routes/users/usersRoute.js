// Dependencies
const usersRoute = require('express').Router();
require("dotenv").config();

const getAllUsers = require('../../controllers/users/getAllUsers');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');



// Get Search User 
usersRoute.get("/", htmlResponse(`Search Page - ${process.env.APP_Name}`), signInChecker, getAllUsers)


// Module Export
module.exports = usersRoute;