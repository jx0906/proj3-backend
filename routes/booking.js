var express = require("express");
var router = express.Router();
var bookingsController = require("../controllers/booking");

// @desc    Get all bookings(by user id)
// @route   GET /booking/
// @access  Private (bearer token passed in header)
router.get("/", bookingsController.getAllByUserId);

// @desc    Get all bookings (by restaurant id)
// @route   GET /booking/restaurant?startDateTime=2024-02-01T00%3A00%3A00%2B08%3A00&endDateTime=2024-02-29T23%3A59%3A59%2B08%3A00
// @access  Private (bearer token passed in header/ check if user is an owner of restaurant)
router.get("/restaurant", bookingsController.getAllByRestaurantId);

// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private (bearer token passed in header)
router.get("/:id", bookingsController.getOneById);

// @desc    Create a booking (Restaurant ID is passed in the body)
// @route   POST /booking/create
// @access  Private (bearer token passed in header)
router.post("/create", bookingsController.createBooking);

// @desc    Update a booking
// @route   POST /booking/:id
// @access  Private (bearer token passed in header)
router.post("/:id", bookingsController.updateBooking);

// @desc    Delete a booking
// @route   DELETE /booking/:id
// @access  Private (bearer token passed in header)
router.delete("/:id", bookingsController.deleteBooking);

module.exports = router;
