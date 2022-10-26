// Dependencies
const User = require('./../../models/User');
const { check } = require('express-validator');


//  Sign up data validator
const signUpDataValidator = () => {

    return [
        // First Name
        check("firstname").trim().notEmpty().withMessage("First name is required"),


        // Last Name
        check("lastname").trim().notEmpty().withMessage("Last name is required"),


        // User Name
        check("username").trim().notEmpty().withMessage("User name is required")
            .custom(async (value, { req }) => {

                try {
                    const user = await User.findOne({ username: value }, { username: 1 });

                    if (user) {
                        return Promise.reject()
                    } else {
                        return Promise.resolve()
                    }

                } catch (error) {
                    throw error;
                }
            }).withMessage("This user name is already taken").isLength({ min: 3 })
            .withMessage('User name should be at least 3 characters'),


        // Email
        check("email").trim().toLowerCase().notEmpty().withMessage("User email is required").isEmail()
            .withMessage("This email is invalid").custom(async (value, { req }) => {

                try {
                    const user = await User.findOne({ email: value }, { email: 1 });

                    if (user) {
                        return Promise.reject()
                    } else {
                        return Promise.resolve()
                    }

                } catch (error) {
                    throw error;
                }
            }).withMessage("This email is already taken"),


        // Password
        check("password").notEmpty().withMessage("User password is required")
            .isStrongPassword().withMessage("Password should be strong"),


        // Confirm Password
        check("confirmpassword").notEmpty().withMessage("Confirm password is required")
            .isStrongPassword().withMessage("Password should be strong")
            .custom((value, { req }) => {

                const pwd = req.body.password;
                if (value === pwd) {
                    return true;
                } else {
                    return false;
                }

            }).withMessage("Password doesn't matched")

    ]
};


// Module Export
module.exports = signUpDataValidator;