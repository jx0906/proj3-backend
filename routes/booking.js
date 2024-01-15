var express = require("express");
var router = express.Router();
var bookingController = require("../controllers/booking");

// @desc    Get all bookings(by user id)
// @route   GET /booking/
// @access  Private (bearer token passed in header)
router.get("/", bookingController.getAllByUserId);

// @desc    Get all bookings (by restaurant id)
// @route   GET /booking/restaurant/:id
// @access  Private (bearer token passed in header)
router.get("/restaurant/:id", bookingController.getAllByRestaurantId);

// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private (bearer token passed in header)
router.get("/:id", bookingController.getOneById);

// @route   POST /booking/create
// @access  Private (bearer token passed in header)
router.post("/create/", bookingController.createBooking);

// @desc    Update a booking
// @route   POST /booking/:id
// @access  Private (bearer token passed in header)
router.put("/:id", bookingController.updateBooking);

// @desc    Delete a booking
// @route   DELETE /booking/:id
// @access  Private (bearer token passed in header)
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
