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
const getSignOut = require('../../controllers/auth/getSignOut');
const getResetPassword = require('../../controllers/auth/getResetPassword');
const resetPasswordController = require('../../controllers/auth/resetPasswordController');
const verifyOTPController = require('../../controllers/auth/verifyOTPController');
const passwordUpdateController = require('../../controllers/auth/passwordUpdateController');
const passwordUpdateDataValidator = require('../../middlewares/auth/passwordUpdateDataValidator');
const passwordUpdateDataValidatorOutput = require('../../middlewares/auth/passwordUpdateDataValidatorOutput');





// Router
const router = Router();


// App Initialization and Config
dotenv.config();




// Get Sign In Page 
router.get('/signin', htmlResponse(`SignIn - ${process.env.APP_NAME}`), signInChecker, getSignIn)



// Post Sign In Page Handler
router.post('/signin', htmlResponse(`SignIn - ${process.env.APP_NAME}`),
    signinDataValidator(),
    signInValidationOutput,
    signinController)


// Get Sign Up Page 
router.get('/signup', htmlResponse(`SignUp - ${process.env.APP_NAME}`), signInChecker, getSignUp)



// Post Sign Up Page Handler
router.post('/signup', htmlResponse(`SignUp - ${process.env.APP_NAME}`),
    avatarUpload,
    signUpDataValidator(),
    signUpValidationOutput,
    signupController
);


// Email Confirmation
router.get('/emailConfirmation/:id', emailConfirmation);


// Sign Out 
router.get('/signout', getSignOut);



// Get Reset Password Page
router.get("/resetPassword", htmlResponse(`Reset Password - ${process.env.APP_NAME}`), getResetPassword);



// Post Reset Password Page Handler
router.post('/resetPassword', htmlResponse(`Reset Password - ${process.env.APP_NAME}`), resetPasswordController);



// Post OTP Verification Handler
router.post('/verificationOTP', htmlResponse(`Verify OTP - ${process.env.APP_NAME}`), verifyOTPController);


// Post Create New Password Handler
router.post('/createNewPassword', htmlResponse(`Create New Password - ${process.env.APP_NAME}`),
    passwordUpdateDataValidator,
    passwordUpdateDataValidatorOutput,
    passwordUpdateController
)



// Module Export
module.exports = router;