var express = require("express");
var router = express.Router();
var bookingsController = require("../controllers/booking");

// @desc    Get all bookings(by user id)
// @route   GET /booking/
// @access  Private (bearer token passed in header)
router.get("/", bookingsController.getAllByUserId);

// @desc    Get all bookings (by restaurant id)
// @route   GET /booking/restaurant/:id
// @access  Private (bearer token passed in header)
router.get("/restaurant/:id", bookingsController.getAllByRestaurantId);

// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private (bearer token passed in header)
router.get("/:id", bookingsController.getOneById);

// @route   POST /booking/create/:restaurantId
// @access  Private (bearer token passed in header)
// router.post("/create/:restaurantId", bookingsController.createBooking);
// temporary
router.post("/create", bookingsController.createBooking);

// @desc    Update a booking
// @route   PUT /booking/:id/edit
// @access  Private (bearer token passed in header)
router.post("/:id", bookingsController.updateBooking);

// @desc    Delete a booking
// @route   DELETE /booking/:id/delete
// @access  Private (bearer token passed in header)
router.delete("/:id", bookingsController.deleteBooking);

module.exports = router;
