// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

const getHomePage = async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.userName }, { password: 0 });

        const userFrontendJs = JSON.stringify(user)

        return res.render('pages/home/home', { user: user ? user : {}, userFrontendJs });

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}



// Module Export
module.exports = getHomePage;