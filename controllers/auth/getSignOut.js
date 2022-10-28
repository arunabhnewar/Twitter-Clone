// Dependencies


const getSignOut = (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/signin')
}

// Module Export
module.exports = getSignOut;