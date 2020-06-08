let Book = require('../models/books.model');
let User = require('../models/users.model');

module.exports.index = async(req, res) => {
    let userProfile = await User.findById(req.signedCookies.userId);
    // let page = parseInt(req.query.page) || 1;
    // const perPage = 5;

    // const startIndex = (page - 1) * perPage;
    // const endIndex = page * perPage;
    let books = await Book.find();
    res.render('books', {
        books,
        userProfile
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
        books: matchedBooks,
        value: q
    });
};

module.exports.create = async(req, res) => {
    let userProfile = await User.findById(req.signedCookies.userId);
    res.render("books/create", {
        userProfile
    });
};

module.exports.postCreate = async(req, res) => {
    req.body.cover = req.file.path.split("\\").slice(1).join("/");
    await Book.create(req.body);
    res.redirect("/books");
};

module.exports.view = async(req, res) => {
    let userProfile = await User.findById(req.signedCookies.userId);
    let id = req.params.id;
    let book = await Book.findById(id);
    res.render("books/view", {
        book,
        userProfile
    });
};

module.exports.edit = async(req, res) => {
    let userProfile = await User.findById(req.signedCookies.userId);
    let id = req.params.id;
    let book = await Book.findById(id);
    res.render("books/edit", {
        book,
        userProfile
    });
};

module.exports.postEdit = async(req, res) => {
    let id = req.params.id;
    if (req.file) {
        req.body.cover = req.file.path.split("\\").slice(1).join("/");
        await Book.findByIdAndUpdate(id, req.body);
    }
    res.redirect("/books");
};

module.exports.delete = async(req, res) => {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
};