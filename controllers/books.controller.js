let Book = require('../models/books.model');
let books = Book.find();

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  const perPage = 5;

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  
  res.render("books", {
    books: books.slice(startIndex, endIndex),
    lastPage: Math.round(books.length/perPage)
  });
};

module.exports.search = (req, res) => {
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

module.exports.view = (req, res) => {
  let id = req.params.id;
  let book = Book.findById(id);
  res.render("books/view", {
    book
  });
};

module.exports.edit = (req, res) => {
  let id = req.params.id;
  let book = Book.findById(id);
  res.render("books/edit", {
    book
  });
};

module.exports.postEdit = (req, res) => {
  let id = req.params.id;
  let book = Book.findByIdAndUpdate(id);
  res.redirect("/books");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id);
  res.redirect("/books");
};
