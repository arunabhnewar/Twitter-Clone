// Dependencies
const { validationResult } = require("express-validator");



const signUpValidationOutput = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        req.error ? req.error : {};
        req.error = { ...req.error, ...mappedErrors };
        next();
    }
};

// Module Export
module.exports = signUpValidationOutput;