
// Get Sign In Page
const getSignIn = (req, res, next) => {

    try {
        res.render('pages/signin')
    } catch (error) {
        next(error)
    }
}


// Module Export
module.exports = getSignIn;
