// Dependencies
const { validationResult } = require("express-validator");

const signInValidationOutput = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {

        try {
            console.log(mappedErrors)
            return res.render("pages/signin", {
                user: req.body ? req.body : {},
                error: mappedErrors,
            })
        } catch (error) {
            throw error;
            console.log(error)
        }
    }


}


// Module Export
module.exports = signInValidationOutput;