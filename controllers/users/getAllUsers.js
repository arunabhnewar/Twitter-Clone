// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

const getAllUsers = async (req, res, next) => {
    try {
        let filterObj = {};
        const searchingText = req.query.searchingText;

        if (searchingText) {
            filterObj = { $or: [{ firstName: { $regex: new RegExp(req.query.searchingText, "ig") } }, { lastName: { $regex: new RegExp(req.query.searchingText, "ig") } }, { userName: { $regex: new RegExp(req.query.searchingText, "ig") } }, { email: searchingText }] }
        }
        // console.log(req.query.searchingText)

        const users = await User.find(filterObj);

        res.json(users);

    } catch (error) {
        next(createHttpError(500, "Sorry, internal server error!!"))
    }
}

// Module Export
module.exports = getAllUsers;