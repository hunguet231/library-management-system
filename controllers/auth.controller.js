const bcrypt = require("bcrypt");
let User = require("../models/users.model");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = User.findOne({ email: email });

  if (!user) {
    res.render("auth/login", {
      errors: ["User doesn't exist."],
      values: req.body
    });
    return;
  }

  bcrypt.compare(password, user.password, function(err, result) {
    if (result === false) {
      res.render("auth/login", {
        errors: ["Wrong password."],
        values: req.body
      });
      return;
    }
    if (result == true) {
      res.cookie("userId", user.id, {
        signed: true
      });
      res.redirect("/");
    }
  });
};

module.exports.register = (req, res) => {
  res.render("auth/register");
};

module.exports.postRegister = (req, res) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    // Store hash in your password DB.
    req.body.password = hash;
    User.create(req.body);
  });
  res.redirect("/");
};
