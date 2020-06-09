let User = require("../models/users.model");
const bcrypt = require("bcrypt");

module.exports.index = async(req, res) => {
    let users = await User.find();
    res.render("users", {
        users
    });
};

module.exports.search = async(req, res) => {
    let users = await User.find();
    let userProfile = await User.findById(req.signedCookies.userId);
    let q = req.query.q;
    let matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("users", {
        users: matchedUsers,
        value: q,
        userProfile
    });
};

module.exports.create = (req, res) => {
    res.render("users/create");
};

module.exports.postCreate = async(req, res) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, async function(err, hash) {
        // Store hash in your password DB.
        req.body.password = hash;
        await User.create(req.body);
    });
    res.redirect("/users");
};

module.exports.view = async(req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    res.render("users/view", {
        user
    });
};

module.exports.edit = async(req, res) => {
    let user = await User.findById(req.params.id);
    res.render("users/edit", {
        user
    });
};

module.exports.postEdit = async(req, res) => {
    let id = req.params.id;
    if (req.file) {
        req.body.avatar = req.file.path.split("\\").slice(1).join("/");
    }
    await User.findByIdAndUpdate(id, req.body)
    res.redirect("/users");
};

module.exports.delete = async(req, res) => {
    let id = req.params.id;
    await User.findByIdAndRemove(id);
    res.redirect("/users");
};

module.exports.profile = async(req, res) => {
    let user = await User.findById(req.signedCookies.userId);

    res.render("users/profile", {
        user
    });
};

module.exports.postProfile = async(req, res) => {
    let id = req.signedCookies.userId;
    if (req.file) {
        req.body.avatar = req.file.path.split("\\").slice(1).join("/");
    }
    await User.findByIdAndUpdate(id, req.body)
    res.redirect("../");
};

module.exports.logout = async(req, res) => {
    req.logout();
    res.redirect('/');
}