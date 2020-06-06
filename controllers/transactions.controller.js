let Transaction = require('../models/transactions.model');
let transactions = Transaction.find();

let User = require('../models/users.model');
let Book = require('../models/books.model');

module.exports.index = (req, res) => {
  let user = User.findById(req.signedCookies.userId);
  let isAdmin = user.isAdmin ? user.isAdmin : false;
  
  if(isAdmin){
      res.render('transactions', {
      transactions
    });
  } else{
      res.render('transactions', {
      transactions: transactions.filter(trans => trans.userId == req.signedCookies.userId)
    });
  }
};

module.exports.create = (req, res) => {
  res.render('transactions/create',{
    users: User.find(),
    books: Book.find()
  });
};

module.exports.postCreate = (req, res) => {
  Transaction.create(req.body);
  res.redirect('/transactions');
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let usersFilter = User.find()
    .filter( user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 );
  
  let usersId = usersFilter.map( user => user.id );
  
  let result = [];
  
  usersId.forEach( id => {
    transactions.forEach( transaction => {
      if (transaction.userId ===  id)
        result.push( transaction ) 
    });
  }); 
  res.render('transactions', {
    transactions: result
  });
};

module.exports.isComplete = (req, res) => {
  let id = req.params.id;
  let flag = Transaction.findById(id);
  if (flag === undefined) {
    res.send('Invalid! Transaction ID not found.');
  } else {
      Transaction.findByIdAndUpdate(id, { isComple: true });
      res.render('transactions',{
        transactions
      });
  };
};