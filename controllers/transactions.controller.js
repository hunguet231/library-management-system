let Transaction = require('../models/transactions.model');
let User = require('../models/users.model');
let Book = require('../models/books.model');

module.exports.index = async(req, res) => {
    let user = await User.findById(req.signedCookies.userId);
    let isAdmin = user.isAdmin;
    let transactions = await Transaction.find();

    if (isAdmin) {
        res.render('transactions', {
            transactions
        });
    } else {
        res.render('transactions', {
            transactions: transactions.filter(trans => trans.userId == req.signedCookies.userId)
        });
    }
};

module.exports.create = async(req, res) => {
    res.render('transactions/create', {
        users: await User.find(),
        books: await Book.find()
    });
};

module.exports.postCreate = async(req, res) => {
    await Transaction.create(req.body);
    res.redirect('/transactions');
};

module.exports.search = async(req, res) => {
    let q = req.query.q;
    let users = await User.find();
    let usersFilter = users
        .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    let result = [];

    let transactions = await Transaction.find();

    transactions.forEach(trans => {
        usersFilter.forEach(user => {
            if (user.name == trans.user) {
                result.push(trans);
            }
        })
    });

    res.render('transactions', {
        transactions: result
    });
};

module.exports.isComplete = async(req, res) => {
    let id = req.params.id;
    let flag = await Transaction.findById(id);

    if (!flag) {
        res.send('Invalid! Transaction ID not found.');
    } else {
        let transactions = await Transaction.find();
        await Transaction.findByIdAndUpdate(id, { isComplete: true });
        res.render('transactions', {
            transactions
        });
    };
};