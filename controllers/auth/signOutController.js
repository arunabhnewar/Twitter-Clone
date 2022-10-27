// Dependencies


const signOutController = (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/signin')
}

// Module Export
module.exports = signOutController;