var express = require("express");
var router = express.Router();
var bookingsController = require("../controllers/bookings");

// @desc    Get all bookings(by user id)
// @route   GET /bookings/
// @access  Private (bearer token passed in header)
router.get("/", bookingsController.getAllByUserId);

// @desc    Get all bookings (by restaurant id)
// @route   GET /bookings/restaurant/:id
// @access  Private (bearer token passed in header)
router.get("/restaurant/:id", bookingsController.getAllByRestaurantId);

// @desc    Get one booking by ID
// @route   GET /bookings/:id
// @access  Private (bearer token passed in header)
router.get("/:id", bookingsController.getOneById);

// @route   POST /bookings/create/:restaurantId
// @access  Private (bearer token passed in header)
// router.post("/create/:restaurantId", bookingsController.createBooking);
// temporary
router.post("/create/", bookingsController.createBooking);

// @desc    Update a booking
// @route   PUT /bookings/:id/edit
// @access  Private (bearer token passed in header)
router.put("/:id/edit", bookingsController.updateBooking);

// @desc    Delete a booking
// @route   DELETE /bookings/:id/delete
// @access  Private (bearer token passed in header)
router.delete("/:id/delete", bookingsController.deleteBooking);

module.exports = router;
