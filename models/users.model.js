const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: "https://ui-avatars.com/api/?rounded=true&name=" //+ this.name.split(" ").join("+")
  },
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
