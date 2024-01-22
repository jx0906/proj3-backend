// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
// import CORS
var cors = require("cors");
require("dotenv").config();
require("./config/backend");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/account");
var restaurantRouter = require("./routes/restaurant");
var bookingRouter = require("./routes/booking");
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
app.use("/account", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/booking", bookingRouter);

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
