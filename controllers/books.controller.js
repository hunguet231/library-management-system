let Book = require('../models/books.model');

module.exports.index = async(req, res) => {
    // let page = parseInt(req.query.page) || 1;
    // const perPage = 5;

    // const startIndex = (page - 1) * perPage;
    // const endIndex = page * perPage;
    let books = await Book.find();
    res.render('books', {
        books
    });
    // res.render("books", {
    //     books //: books.slice(startIndex, endIndex),
    //     // lastPage: Math.round(books.length/perPage)
    // });
};

module.exports.search = async(req, res) => {
    let books = await Book.find();
    let q = req.query.q;
    let matchedBooks = books
        .filter(function(item) {
            return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    res.render("books", {
        books: matchedBooks
    });
};

module.exports.create = (req, res) => {
    res.render("books/create");
};

module.exports.postCreate = (req, res) => {
    Book.create(req.body);
    res.redirect("/books");
};

module.exports.view = async(req, res) => {
    let id = req.params.id;
    let book = await Book.findById(id);
    res.render("books/view", {
        book
    });
};

module.exports.edit = async(req, res) => {
    let id = req.params.id;
    let book = await Book.findById(id);
    res.render("books/edit", {
        book
    });
};

module.exports.postEdit = async(req, res) => {
    let id = req.params.id;
    let book = await Book.findByIdAndUpdate(id, req.body);
    res.redirect("/books");
};

module.exports.delete = async(req, res) => {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
};