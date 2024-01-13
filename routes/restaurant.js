var express = require("express");
var router = express.Router();

// import controllers
var restaurantController = require("../controllers/restaurant");

// @desc    Get all restaurants
// @route   GET /restaurant/
// @access  Public
router.get("/", restaurantController.getAllRestaurants);

// @desc    Get restaurants(by rest id)
// @route   GET /restaurant/:restID
// @access  Public
// router.get("/:restId", restaurantController.getRestaurant);

// @desc    Create restaurants
// @route   POST /restaurant/create
// @access  Public
router.post("/create", restaurantController.createRestaurant);

// @desc    Edit restaurant
// @route   POST /restaurant/:restId/edit
// @access  Private (bearer token passed in header)
router.post("/:restId/edit", restaurantController.editRestaurant);

// @desc    Edit restaurant
// @route   POST /restaurant/:restId/edit
// @access  Private (bearer token passed in header)
router.delete("/:restId/delete", restaurantController.deleteRestaurant);

module.exports = router;
