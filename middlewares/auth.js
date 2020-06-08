let User = require('../models/users.model');

module.exports.requireAuth = async(req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    let userProfile = await User.findById(req.signedCookies.userId);

    if (!userProfile) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.userProfile = userProfile;
    next();
};