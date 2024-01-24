var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var restaurantRouter = require("./routes/restaurant");
var bookingRouter = require("./routes/booking");
var app = express();
var securityMiddleware = require("./middlewares/security");
require("./config/backend");

//mount middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(securityMiddleware.checkJWT);

// mount routers
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/booking", bookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).json("Not Found");
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
