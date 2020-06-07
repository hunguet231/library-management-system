const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: {
        type: String,
        default: 'https://api.adorable.io/avatars/42/' + Math.random()
    },
    detail: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    countWrongLogin: {
        type: Number,
        default: 0
    }
});

let User = mongoose.model("User", UserSchema, "users");

module.exports = User;