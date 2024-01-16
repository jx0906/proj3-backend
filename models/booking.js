const daoBooking = require("../daos/booking");

module.exports = {
  getAllByUserId,
  getAllByRestaurantId,
  filterAllByRestaurantId,
  getOneById,
  createBooking,
  updateBooking,
  deleteBooking,
};

function getAllByUserId(id) {
  return daoBooking
    .find({
      dateTime: {
        $gte: new Date(),
      },
      // user: id,
    })
    .sort({ dateTime: 1 })
    .populate("restaurant");
}

// TODO:add restaurant id on arguments
function filterAllByRestaurantId({ startDateTime, endDateTime }) {
  // return daoBooking
  //   .find({
  //     restaurant: id,
  //     dateTime: {
  //       $gte: new Date(startDateTime),
  //       $lte: new Date(endDateTime),
  //     },
  //   })
  //   .sort({ dateTime: 1 });

  return daoBooking
    .find({
      dateTime: {
        $gte: new Date(startDateTime),
        $lte: new Date(endDateTime),
      },
    })
    .sort({ dateTime: 1 });
}

// TODO:add restaurant id on arguments
function getAllByRestaurantId(id) {
  // return daoBooking
  //   .find({
  //     restaurant: id,
  //   })
  //   .sort({ dateTime: 1 });

  return daoBooking.find({}).sort({ dateTime: 1 });
}

function getOneById(id) {
  return daoBooking.findById(id).populate("restaurant");
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
