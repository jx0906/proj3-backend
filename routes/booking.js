var express = require("express");
var router = express.Router();
var bookingController = require("../controllers/booking");

// @desc    Get all bookings(by user id)
// @route   GET /booking/
// @access  Private (bearer token passed in header)
router.get("/", bookingController.getAllByUserId);

// @desc    Get all bookings (by restaurant id)
// @route   GET /booking/restaurant?startDateTime=2024-02-01T00%3A00%3A00%2B08%3A00&endDateTime=2024-02-29T23%3A59%3A59%2B08%3A00
// @access  Private (bearer token passed in header/ check if user is an owner of restaurant)
router.get("/restaurant", bookingController.getAllByRestaurantId);


// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private (bearer token passed in header)
router.get("/:id", bookingController.getOneById);

// @desc    Create a booking (Restaurant ID is passed in the body)
// @route   POST /booking/create
// @access  Private (bearer token passed in header)
router.post("/create", bookingController.createBooking);

// @desc    Update a booking
// @route   POST /booking/:id
// @access  Private (bearer token passed in header)
router.post("/:id", bookingController.updateBooking);


// @desc    Delete a booking
// @route   DELETE /booking/:id
// @access  Private (bearer token passed in header)
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
