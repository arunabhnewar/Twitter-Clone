// Dependencies
const User = require("../../models/User");

const avatarUpdate = async (req, res, next) => {

    try {
        const fileName = req?.files[0]?.filename;
        // console.log(req.files[0].fileName);
        // console.log(fileName);
        const user = await User.findByIdAndUpdate(req.id,
            {
                avatarProfile: fileName,
            },
            { new: true }
        );

        res.send(user)

    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = avatarUpdate;