const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    cover: {
        type: String,
        default: ''
    },
    loves: Number,
    genre: String
});

let Book = mongoose.model('Book', BookSchema, 'books')

module.exports = Book;