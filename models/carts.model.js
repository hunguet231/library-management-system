const mongoose = require('mongoose');

let CartSchema = new mongoose.Schema({
    _id: String,
    cart: Object
});

let Cart = mongoose.model('Cart', CartSchema, 'carts');

module.exports = Cart;