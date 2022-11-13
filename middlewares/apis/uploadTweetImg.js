// Dependencies
const upload = require("multer-uploader");
const path = require("path");

function uploadTweetImg(req, res, next) {

    try {
        // Directory
        const upload_dir = path.join(__dirname, `./../../public/uploads/${req.id}/tweetsImg/`);
        // File Size
        const max_file_size = 10000000;
        // File Type
        const allowed_file_mime_type = ["image/png", "image/jpg", "image/jpeg"];

        const uploader = upload(upload_dir, max_file_size, allowed_file_mime_type).any();
        console.log(uploader);
        uploader(req, res, err => {
            if (err) {
                next(err);
            } else {
                next()
            }
        });

    } catch (error) {
        next(error)
    }
}



// Module Export
module.exports = uploadTweetImg;