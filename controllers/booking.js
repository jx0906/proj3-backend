const modelBooking = require("../models/booking");
const modelRestaurant = require("../models/restaurant");
const { sendEmail } = require("../util/sendEmail");

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
// @route   GET /booking/restaurant?startDateTime=2024-02-01T00%3A00%3A00%2B08%3A00&endDateTime=2024-02-29T23%3A59%3A59%2B08%3A00
// @access  Private (bearer token passed in header/ check if user is an owner of restaurant)
async function getAllByRestaurantId(req, res) {
  // const restaurant = await modelRestaurant.getOneByUserId(req.user._id);
  // if (!restaurant) return res.status(401).json("Unauthorized");
  // const bookings = await modelBooking.getAllByRestaurantId(restaurant._id, {
  //   startDateTime: req.query.startDateTime,
  //   endDateTime: req.query.endDateTime,
  // });

  if (req.query.startDateTime > req.query.endDateTime) {
    return res
      .status(400)
      .json("startDateTime must be earlier than endDateTime");
  }
  if (!req.query.startDateTime && !req.query.endDateTime) {
    const bookings = await modelBooking.getAllByRestaurantId();
    return res.json(bookings);
  }

  const bookings = await modelBooking.filterAllByRestaurantId({
    startDateTime: req.query.startDateTime,
    endDateTime: req.query.endDateTime,
  });
  res.json(bookings);
}

// @desc    Get one booking by ID
// @route   GET /booking/:id
// @access  Private
async function getOneById(req, res) {
  const booking = await modelBooking.getOneById(req.params.id);
  res.json(booking);
}

// @desc    Create a booking (Restaurant ID is passed in the body)
// @route   POST /booking/create
// @access  Private (bearer token passed in header)
async function createBooking(req, res) {
  let booking;
  // const user = req.user._id;
  try {
    // check if the restaurant exists
    const restaurant = await modelRestaurant.getRestaurantById(
      req.body.restaurant
    );
    if (!restaurant) return res.status(400).json("no restaurant with such id");
    booking = await modelBooking.createBooking({
      ...req.body,
      // user,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }

  try {
    await sendEmail({
      type: "reservationCompleted",
      payload: {
        userName: "Username",
        userEmail: process.env.EMAIL_USER,
        pax: booking.pax,
        restaurant: booking.restaurant.name,
        dateTime: booking.dateTime,
      },
    });
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
  }
}

// @desc    Update a booking by ID
// @route   POST /booking/:id
// @access  Private
async function updateBooking(req, res) {
  // const bookingByParams = await modelBooking.getOneById(req.params.id);
  // Check if the user who made the booking matches the token user
  // if (bookingByParams.user != req.user._id) {
  //   return res.status(401).json("Unauthorized");
  // }

  if (req.body.restaurant) {
    return res.status(400).json("restaurant cannot be updated");
  }

  let booking;

  try {
    booking = await modelBooking.updateBooking(req.params.id, req.body);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }

  try {
    await sendEmail({
      type: "reservationChanged",
      payload: {
        // TODO
        userName: "Username",
        userEmail: process.env.EMAIL_USER,
        pax: booking.pax,
        restaurant: booking.restaurant.name,
        dateTime: booking.dateTime,
      },
    });
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
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
    await modelBooking.deleteBooking(req.params.id);
    res.status(200).json("booking deleted");
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }

  try {
    await sendEmail({
      type: "reservationCancelled",
      payload: {
        // TODO
        userName: "Username",
        userEmail: process.env.EMAIL_USER,
      },
    });
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
  }
}
