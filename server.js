var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cors = require("cors");
var passport = require("passport");
const config = require("./config/database");
const users = require("./routes/users");
const products = require("./routes/products");
const orders = require("./routes/orders");

// stripe
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
var stripe = require("stripe")("sk_test_4Ai0aNCKBRP2xaRYPlsdW4DJ");

// CORS middleware
app.use(cors());
console.log("env", process.env.NODE_ENV);

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// passport
require("./config/passport")(passport);

// Set Static Folder
app.use(express.static(__dirname + "/angular-app/dist/angular-app"));

// session configuration, will store users cart
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);

// user routes
app.use("/users", users);

// product routes
app.use("/products", products);

// order routes
app.use("/orders", orders);

// connect to DB
mongoose.connect(config.database, { useNewUrlParser: true });
// on connection
mongoose.connection.on("connected", () => {
  console.log("~~~~~connected to database~~~~~~~ " + config.database);
});
// on error
mongoose.connection.on("error", err => {
  console.log("~~~~~DATABASE ERROR~~~~~~~~: " + err);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./angular-app/dist/angular-app/index.html"));
});

// Port Number
const port = process.env.PORT || 4000

// Start Server
app.listen(port, () => {
  console.log("~~~~~~Server started on port~~~~~ " + port);
});
