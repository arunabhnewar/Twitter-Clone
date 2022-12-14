// Dependencies
const upload = require("multer-uploader");
const path = require('path')


function avatarUpload(req, res, next) {
    // Directory
    // const uploadDirectory = path.join(__dirname, '/../../public/uploads');
    const uploadDirectory = path.join(__dirname, '/../../temp/');

    // File Size
    const maxFileSize = 10000000;

    // File Type
    const allowedMimeType = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];


    upload(uploadDirectory, maxFileSize, allowedMimeType).single("avatarProfile")(req, res, (err) => {
        if (err) {
            const user = req.body;

            const error = {
                avatarProfile: {
                    msg: err?.message
                },
            };
            req.error = error;
            next();
        } else {
            next();
        }
    })
}





// Module Export
module.exports = avatarUpload;