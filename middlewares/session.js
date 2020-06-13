const shortid = require('shortid');

module.exports = (req, res, next) => {
    let sessionId = shortid.generate();
    if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, {
            signed: true
        });
    }
    next();
}