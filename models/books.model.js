const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    cover: {
        type: String,
        default: ''
    },
    loves: {
        type: Number,
        default: 0
    },
    genre: String
});

let Book = mongoose.model('Book', BookSchema, 'books')

module.exports = Book;