let User = require("../models/users.model");
let users = User.find();

module.exports.index = (req, res) => {
  res.render("users", {
    users
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let matchedUsers = users.filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users", {
    users: matchedUsers,
    value: q
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  User.create(req.body);
  res.redirect("users");
};

module.exports.view = (req, res) => {
  let id = req.params.id;
  let user = User.findById(id);
  res.render("users/view", {
    user
  });
};

module.exports.edit = (req, res) => {
  let id = req.params.id;
  let user = User.findById(id);
  res.render("users/edit", {
    user
  });
};

module.exports.postEdit = (req, res) => {
  let id = req.params.id;
  let user = User.findById(id);
  user.update(req.body);
  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  User.findById(id).remove();
  res.redirect("/users");
};

module.exports.profile = (req, res) => {
  let id = req.params.id;
  let user = User.findById(id);
  res.render("users/profile", {
    user
  });
};

module.exports.postProfile = (req, res) => {
  let id = req.params.id;
  req.body.avatar = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  User.findByIdAndUpdate(id, req.body)
  res.redirect("../");
};
