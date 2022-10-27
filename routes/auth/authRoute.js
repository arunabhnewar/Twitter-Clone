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
const emailConfirmation = require('../../controllers/auth/confirmation');
const signinController = require('../../controllers/auth/signinController');
const signinDataValidator = require('../../middlewares/auth/signinDataValidator');
const signInValidationOutput = require('../../middlewares/auth/signinDataValidationOutput');
const signInChecker = require('../../middlewares/common/signinChecker');
const signOutController = require('../../controllers/auth/signOutController');



// Router
const router = Router();


// App Initialization and Config
dotenv.config();




// Get Sign In Page 
router.get('/signin', htmlResponse(`SignIn - ${process.env.APP_NAME}`), signInChecker, getSignIn)



// Post Sign In Page Controller
router.post('/signin', htmlResponse(`SignIn - ${process.env.APP_NAME}`),
    signinDataValidator(),
    signInValidationOutput,
    signinController)


// Get Sign Up Page 
router.get('/signup', htmlResponse(`SignUp - ${process.env.APP_NAME}`), signInChecker, getSignUp)



// Post Sign Up Page Controller
router.post('/signup', htmlResponse(`SignUp - ${process.env.APP_NAME}`),
    avatarUpload,
    signUpDataValidator(),
    signUpValidationOutput,
    signupController
);


// Email Confirmation
router.get('/emailConfirmation/:id', emailConfirmation);


// Sign Out 
router.get('/signout', signOutController)

// Module Export
module.exports = router;