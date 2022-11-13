// Dependencies
const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken')
require('dotenv').config();


const signinController = async (req, res, next) => {
    try {

        if (req.validUser) {
            const token = await jwt.sign(
                {
                    _id: req.id,
                    userName: req.userName,
                    email: req.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "48h" }
            );

            res.status(200);
            res.cookie("access_token", "Bearer " + token, { signed: true });

            res.redirect("/");
        }
        else {
            res.send("Something goes wrong!!")
        }


    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}


// Module Export
module.exports = signinController;