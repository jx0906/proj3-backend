const daoBooking = require("../daos/bookings");

module.exports = {
  getAllByUserId,
  getAllByRestaurantId,
  getOneById,
  createBooking,
  updateBooking,
  deleteBooking,
};

function getAllByUserId(id) {
  // return daoBooking.find({ user: id });
  return daoBooking.find({});
}

function getAllByRestaurantId(id) {
  // return daoBooking.find({ restaurant: id });
  return daoBooking.find({});
}

function getOneById(id) {
  return daoBooking.findById(id);
}

function createBooking(booking) {
  return daoBooking.create(booking);
}

function updateBooking(id, booking) {
  return daoBooking.findByIdAndUpdate(id, booking, { new: true });
}

function deleteBooking(id) {
  return daoBooking.findByIdAndDelete(id);
}
