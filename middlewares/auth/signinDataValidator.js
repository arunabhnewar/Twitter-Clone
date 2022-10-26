// Dependencies
const { check } = require('express-validator');
const User = require('./../../models/User');
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");

const signinDataValidator = () => {
    return [
        // User name or email
        check('username').trim().notEmpty().withMessage("User name is required").toLowerCase()
            .custom(async (value, { req }) => {
                try {
                    const user = await User.findOne(
                        {
                            $or: [
                                {
                                    username: value,
                                },
                                {
                                    email: value,
                                },
                            ],
                        },
                        {
                            username: 1,
                            email: 1,
                            password: 1
                        }
                    );

                    if (user) {
                        req.username = user.username;
                        req.email = user.email;
                        req.password = user.password;

                        return promise.resolve();

                    } else {
                        return promise.reject();
                    }

                } catch (error) {
                    throw createHttpError(500, error)
                }
            }).withMessage("Sorry, user is not found!!"),

        // Password
        check("password").trim().notEmpty().withMessage("User password is required")
            .custom(async (password, { req }) => {

                if (!req.password) return true;

                try {
                    const isUserValid = await bcrypt.compare(password, req.password);

                    if (isUserValid) {
                        req.userValid = true;
                        return promise.resolve();
                    } else {
                        return promise.reject();
                    }
                } catch (error) {
                    throw createHttpError(500, error);
                }
            }).withMessage("Your password is wrong!!"),
    ]
};


// Module Export
module.exports = signinDataValidator;