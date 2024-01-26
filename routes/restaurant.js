var express = require("express");
var router = express.Router();
var securityMiddleware = require("../middlewares/security");
var restaurantController = require("../controllers/restaurant");

// @desc    Get all restaurants
// @route   GET /restaurant/
// @access  Public
router.get("/", restaurantController.getAllRestaurants);

// @desc    Get restaurant by User
// @route   GET /restaurant/byUser
// @access  Public
router.get(
  "/user",
  securityMiddleware.checkIfOwner,
  restaurantController.getRestaurantByOwnerId
);

// @desc    Get restaurants(by rest id)
// @route   GET /restaurant/:restID
// @access  Public
router.get("/:restId", restaurantController.getRestaurant);

// @desc    Create restaurants
// @route   POST /restaurant/create
// @access  Public but to retain user created info
router.post(
  "/create",
  securityMiddleware.checkIfOwner,
  restaurantController.createRestaurant
);

// @desc    Edit restaurant
// @route   POST /restaurant/:restId/edit
// @access  Private (bearer token passed in header - to check if user is owner of restaurant)
router.post(
  "/:restId/edit",
  securityMiddleware.checkIfOwner,
  restaurantController.editRestaurant
);

// @desc    Edit restaurant
// @route   POST /restaurant/:restId/edit
// @access  Private (bearer token passed in header -  to check if user is owner of restaurant))
router.delete(
  "/:restId/delete",
  securityMiddleware.checkIfOwner,
  restaurantController.deleteRestaurant
);

module.exports = router;
