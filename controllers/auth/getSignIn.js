// Get Sign In Page
const getSignIn = (req, res, next) => {

    try {
        res.render('pages/signin', { user: {}, error: {} })
    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = getSignIn;
