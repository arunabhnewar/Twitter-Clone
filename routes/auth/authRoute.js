// Dependencies
const { Router } = require('express');
const dotenv = require('dotenv');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const avatarUpload = require('../../middlewares/auth/avatarUpload');
const signUpDataValidator = require('../../middlewares/auth/signUpDataValidator');
const signUpValidationOutput = require('../../middlewares/auth/signUpValidationOutput');
const getSignIn = require('../../controllers/auth/getSignin');
const getSignUp = require('../../controllers/auth/getSignup');
const signupController = require('../../controllers/auth/signupController');


// Router
const router = Router();


// App Initialization and Config
dotenv.config();




// Get Sign In Page 
router.get('/signin', htmlResponse(`Signin - ${process.env.APP_NAME}`), getSignIn)



// Get Sign Up Page 
router.get('/signup', htmlResponse(`Signup - ${process.env.APP_NAME}`), getSignUp)



// Post Sign Up Page Controller
router.post('/signup', htmlResponse(`Signup - ${process.env.APP_NAME}`),
    avatarUpload,
    signUpDataValidator(),
    signUpValidationOutput,
    signupController
);



// Module Export
module.exports = router;