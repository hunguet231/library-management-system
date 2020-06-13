let Cart = require('../models/carts.model');

module.exports.addToCart = async(req, res, next) => {
    let bookId = req.params.bookId;
    let sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/books');
        return;
    }

    let count = await (await Cart.findById(sessionId)).get('cart.' + bookId, 0);
}