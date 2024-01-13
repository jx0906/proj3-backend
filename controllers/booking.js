const modelBooking = require("../models/booking");
// const modelRestaurant = require("../models/restaurants");

module.exports = {
  getAllByUserId,
  getAllByRestaurantId,
  getOneById,
  createBooking,
  updateBooking,
  deleteBooking,
};

// @desc    Get all bookings(by user id)
// @route   GET /booking/
// @access  Private
async function getAllByUserId(req, res) {
  // const bookings = await modelBooking.getAllByUserId(req.user._id);
  const bookings = await modelBooking.getAllByUserId();
  res.json(bookings);
}

// @desc    Get all bookings (by restaurant id)
// @route   GET /booking/restaurant/:id
// @access  Private
async function getAllByRestaurantId(req, res) {
  // const restaurant = await modelRestaurant.getOneById(req.params.id);
  // if (!restaurant) return res.status(404).json("no restaurant with such id");
  // if (restaurant.user != req.user._id)
  // return res.status(401).json("Unauthorized");

  // const bookings = await modelBooking.getAllByRestaurantId(req.params.id);
  const bookings = await modelBooking.getAllByRestaurantId();

  res.json(bookings);
}

// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private
async function getOneById(req, res) {
  const booking = await modelBooking.getOneById(req.params.id);
  // const restaurant = await modelRestaurant.getOneById(booking.restaurant);

  if (booking == "no restaurant with such id") {
    res.status(404).json("no restaurant with such id");
  }

  //   success wehn the user who made the booking matches the token user, or the restaurant owner matches the token user
  //   if (booking.user == req.user._id || restaurant.user == req.user._id) {
  //     res.json({
  //       booking,
  //     });
  //   } else {
  //     res.status(401).json("Unauthorized");
  //   }

  res.json({
    booking,
  });
}

// @desc    Create a booking
// @route   POST /booking/create/:restaurantId
// @access  Private
async function createBooking(req, res) {
  // const restaurantId = req.params.restaurantId;
  // const restaurant = await modelRestaurant.getOneById(restaurantId);
  // const user = req.user._id;

  try {
    const booking = await modelBooking.createBooking({
      ...req.body,
      // user,
      // restaurant,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

// @desc    Update a booking by ID
// @route   POST /booking/:id
// @access  Private
async function updateBooking(req, res) {
  const bookingByParams = await modelBooking.getOneById(req.params.id);
  // Check if the user who made the booking matches the token user
  // if (bookingByParams.user != req.user._id) {
  //   return res.status(401).json("Unauthorized");
  // }

  try {
    const booking = await modelBooking.updateBooking(req.params.id, req.body);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

// @desc    Delete a booking by ID
// @route   DELETE /booking/:id
// @access  Private
async function deleteBooking(req, res) {
  // Check if the user who made the booking matches the token user
  // const bookingByParams = await modelBooking.getOneById(req.params.id);
  // if (bookingByParams.user != req.user._id) {
  // return res.status(401).json("Unauthorized");
  // }

  try {
    const booking = await modelBooking.deleteBooking(req.params.id);
    res.status(200).json("booking deleted");
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}
