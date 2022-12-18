// Dependencies
const upload = require("multer-uploader");
const path = require("path");

function avatarUpdateImg(req, res, next) {

    try {
        // Directory
        const uploadDirectory = path.join(__dirname, `./../../public/uploads/`);

        // File Size
        const maxFileSize = 10000000000;

        // File Type
        const allowedMimeType = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];

        const uploader = upload(uploadDirectory, maxFileSize, allowedMimeType).any();

        uploader(req, res, (err) => {
            if (err) {
                next(err);

            } else {
                next();
            }
        })

    } catch (error) {
        next(error)
    }
}



// Module Export
module.exports = avatarUpdateImg;