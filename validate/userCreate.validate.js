module.exports.userCreate = function(req, res, next){
  let errors = [];
  if (req.body.name.length > 30){
    errors.push('The name must be at most 30 characters.');
  };
  if (errors.length){
    res.render('users/create', {
      errors
    });
    return;
  }
  next();
};