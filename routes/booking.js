var express = require("express");
var router = express.Router();
var bookingController = require("../controllers/booking");
var securityMiddleware = require("../middlewares/security");

// @desc    Get all bookings(by user id)
// @route   GET /booking/
// @access  Private (bearer token passed in header)
router.get(
  "/",
  securityMiddleware.checkLogin,
  bookingController.getAllByUserId
);

// @desc    Get all bookings (by restaurant id)
// @route   GET /booking/restaurant?startDateTime=2024-02-01T00%3A00%3A00%2B08%3A00&endDateTime=2024-02-29T23%3A59%3A59%2B08%3A00
// @access  Private (bearer token passed in header/ check if user is an owner of restaurant)
router.get(
  "/restaurant",
  securityMiddleware.checkIfOwner,
  bookingController.getAllByRestaurantId
);

// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private (bearer token passed in header)
router.get("/:id", securityMiddleware.checkLogin, bookingController.getOneById);

// @desc    Create a booking (Restaurant ID is passed in the body)
// @route   POST /booking/create
// @access  Private (bearer token passed in header)
router.post(
  "/create",
  securityMiddleware.checkLogin,
  bookingController.createBooking
);

// @desc    Update a booking
// @route   POST /booking/:id
// @access  Private (bearer token passed in header)
router.post("/:id", bookingController.updateBooking);

// @desc    Delete a booking
// @route   DELETE /booking/:id
// @access  Private (bearer token passed in header)
router.delete(
  "/:id",
  securityMiddleware.checkLogin,
  bookingController.deleteBooking
);

module.exports = router;
