var express = require("express");
var userController = require("../controllers/user");
var securityMiddleware = require("../middlewares/security");
var router = express.Router();

router.get("/login", userController.getLoginDetails);
router.post("/login", userController.loginUser);
router.post("/create", userController.createUser);
router.post(
  "/logout",
  securityMiddleware.checkLogin,
  userController.logoutUser
);

module.exports = router;
