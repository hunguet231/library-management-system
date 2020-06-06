const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.controller');

// Books List
router.get('/', booksController.index);

// Search Book
router.get('/search', booksController.search);

// Create Book
router.get('/create', booksController.create);

router.post('/create', booksController.postCreate);

// View Book
router.get('/:id/view', booksController.view);

// Edit Book
router.get('/:id/edit', booksController.edit);

router.post('/:id/edit', booksController.postEdit);

// Delete Book
router.get('/:id/delete', booksController.delete);

module.exports = router;