// Dependencies



// Get  Reset Password Page
const getResetPassword = (req, res, next) => {
    try {
        res.render('pages/auth/resetPassword', { user: {}, error: {} })
    } catch (error) {
        next(error)
    }
};


// Module Export
module.exports = getResetPassword;