var express = require("express");
var router = express.Router();
var bookingsController = require("../controllers/bookings");

router.get("/", bookingsController.getAllByUserId);
router.get("/restaurant/:id", bookingsController.getAllByRestaurantId);
router.get("/:id", bookingsController.getOneById);
router.post("/create/:restaurantId", bookingsController.createBooking);
router.put("/:id/edit", bookingsController.updateBooking);
router.delete("/:id/delete", bookingsController.deleteBooking);

module.exports = router;
