// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

const getUserSearch = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.id });
        const userFrontendJs = JSON.stringify(user);

        return res.render('pages/search/search', { user: user ? user : {}, userFrontendJs, tab: "users" });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}

// Module Export
module.exports = getUserSearch;