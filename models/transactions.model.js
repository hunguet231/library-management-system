const mongoose = require("mongoose");

let TransactionSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  dateBorrow: String,
  isComplete: {
    type: Boolean,
    default: false
  }
});

let Transaction = mongoose.model('Transaction', TransactionSchema, 'transactions');

module.exports = Transaction;