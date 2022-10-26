// Get Sign Up Page
const getSignUp = (req, res, next) => {

    try {
        res.render('pages/signup', { error: {}, user: {} })
    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = getSignUp;