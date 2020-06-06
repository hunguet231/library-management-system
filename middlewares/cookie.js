module.exports.cookie = function(req, res, next){
  let countUserCookie = req.cookies['user-id'];
  if (!countUserCookie) {
    countUserCookie = 0;
  }
  countUserCookie ++;
  res.cookie('user-id', countUserCookie);
  console.log(`${Object.keys(req.cookies)}: ${countUserCookie}`);
  next();
};