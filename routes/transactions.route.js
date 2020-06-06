const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactions.controller');

router.get('/', transactionsController.index);

// Add borrower
router.get('/create', transactionsController.create);

router.post('/create', transactionsController.postCreate);

// Search borrower
router.get('/search', transactionsController.search);

// Status
router.get('/:id/complete', transactionsController.isComplete);

module.exports = router;