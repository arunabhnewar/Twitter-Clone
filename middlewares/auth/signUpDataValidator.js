// Dependencies
const User = require('./../../models/User');
const { check } = require('express-validator');


//  Sign up data validator
const signUpDataValidator = () => {

    return [
        // First Name
        check("firstName").trim().notEmpty().withMessage("First name is required"),


        // Last Name
        check("lastName").trim().notEmpty().withMessage("Last name is required"),


        // User Name
        check("userName").trim().toLowerCase().notEmpty().withMessage("User name is required")
            .custom(async (value, { req }) => {

                try {
                    const user = await User.findOne({ userName: value }, { userName: 1 });

                    if (user) {
                        return Promise.reject()
                    } else {
                        return Promise.resolve()
                    }

                } catch (error) {
                    throw error;
                }
            }).withMessage("This user name is already taken").isLength({ min: 5 })
            .withMessage('User name should be at least 5 characters'),


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
        check("confirmPassword").notEmpty().withMessage("Confirm password is required")
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