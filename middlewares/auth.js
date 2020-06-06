let User = require('../models/users.model');

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userId){
    res.redirect('/auth/login');
    return;
  }
  
  let user = User.findOne({id: req.signedCookies.userId});
  
  if (!user){
    res.redirect('/auth/login');
    return;
  }
  
  res.locals.user = user;
  next();
};