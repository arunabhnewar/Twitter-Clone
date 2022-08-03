// Dependencies
const { Router } = require('express');
const dotenv = require('dotenv');
const { getSignIn, getSignUp } = require('../../controllers/auth/authControllers');
const htmlResponse = require('../../middlewares/common/htmlResponse');



// Router
const router = Router();


// App Initialization and Config
dotenv.config();




// Get Sign In Page Controller
router.get('/signin', htmlResponse(`Signin - ${process.env.APP_NAME}`), getSignIn)



// Get Sign Up Page Controller
router.get('/signup', htmlResponse(`Signup - ${process.env.APP_NAME}`), getSignUp)


// Module Export
module.exports = router;