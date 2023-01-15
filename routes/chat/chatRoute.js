// Dependencies
const chatRoute = require('express').Router();
require("dotenv").config();
const createChat = require('../../controllers/apis/createChat');
const getSingleChat = require('../../controllers/apis/getSingleChat');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const signInChecker = require('../../middlewares/common/signinChecker');

// Get Chat Page
// chatRoute.get("/", signInChecker,)



chatRoute.post("/", signInChecker, createChat)

chatRoute.get("/:chatId", signInChecker, getSingleChat)


// Module Export
module.exports = chatRoute;