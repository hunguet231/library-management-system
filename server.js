require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let User = require('./models/users.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Defined middlewares
const cookieMiddleware = require("./middlewares/cookie");
const authMiddleware = require("./middlewares/auth");

// Pug engine setup
app.set("view engine", "pug");
app.set("views", "./views");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie parser Middleware
app.use(cookieParser(process.env.SESSION_SECRET));

// Serving static files
app.use(express.static("public"));

// Index
app.get("/", async(req, res) => {
    let userProfile = await User.findById(req.signedCookies.userId);
    res.render("index", {
        userProfile
    });
});

app.use(require('./middlewares/session'));
// Routers
app.use("/auth", cookieMiddleware.cookie, require("./routes/auth.route"));

app.use('/books', cookieMiddleware.cookie, require("./routes/books.route"));

app.use(
    "/users",
    cookieMiddleware.cookie,
    authMiddleware.requireAuth,
    require("./routes/users.route")
);

app.use(
    "/transactions",
    cookieMiddleware.cookie,
    authMiddleware.requireAuth,
    require("./routes/transactions.route")
);

app.use("/cart", require("./routes/cart.route"));

const PORT = process.env.PORT || 5000
    // listen for requests :)
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});