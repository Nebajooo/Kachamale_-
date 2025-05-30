var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const cors = require("cors");

var app = express(); // ✅ define app once only

const PORT = 8080;

// Auth setup
require("./auth/auth");
const login = require("./routes/login");
const loggedInPage = require("./routes/loggedInUser");
const bookingRoute = require("./routes/routeSelection");
var registerRouter = require("./routes/register");

// MongoDB Config
const DB_URL = require("./config/keys").MongoURI;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    throw err;
  });

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routes
app.use("/", login);
app.use("/booking", bookingRoute);
app.use("/register", registerRouter);
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
