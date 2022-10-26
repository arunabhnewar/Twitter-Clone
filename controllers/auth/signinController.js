// Dependencies
const createHttpError = require("http-errors");


const signinController = (req, res, next) => {
    try {
        console.log(req.body);
    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}


// Module Export
module.exports = signinController;