// Dependencies
const { check } = require("express-validator");

const passwordUpdateDataValidator = [
    check("password")
        .isStrongPassword()
        .withMessage("Your password is not strong!!")
        .custom((value, { req }) => {
            req.password = value;
            return true;
        }),

    check("confirmPassword")
        .custom((value, { req }) => {
            const password = req.password;

            if (value === password) {
                return true
            } else {
                return false;
            }
        }).withMessage("Your password doesn't matched!!")
]

// Module Export
module.exports = passwordUpdateDataValidator;