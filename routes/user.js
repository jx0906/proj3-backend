var express = require("express");
var userController = require("../controllers/user");
var securityMiddleware = require("../middlewares/security");
var router = express.Router();

router.get("/login", userController.getLoginDetails);
router.post("/login", userController.loginUser);
router.post("/create", userController.createUser);
router.post("/logout", userController.logoutUser);
router.put("/:userId", userController.editUser);  // Use PUT for updating resources

module.exports = router;
