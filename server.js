var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// import CORS
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bookingsRouter = require("./routes/bookings");
var testRouter = require("./routes/test");

require("dotenv").config();
require("./config/backend");

var app = express();

//mount middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// mount routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/test", testRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).json("Not Found");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
