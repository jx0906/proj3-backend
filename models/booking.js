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
      user: id,
    })
    .sort({ dateTime: 1 })
    .populate("restaurant");
}

function filterAllByRestaurantId({ startDateTime, endDateTime, id }) {
  return daoBooking
    .find({
      restaurant: id,
      dateTime: {
        $gte: new Date(startDateTime),
        $lte: new Date(endDateTime),
      },
    })
    .sort({ dateTime: 1 })
    .populate(
      "user",
      "-password -salt -iterations -expire_at -token -isOwner -createdAt -updatedAt -id"
    );
}

function getAllByRestaurantId(id) {
  return daoBooking
    .find({
      restaurant: id,
    })
    .sort({ dateTime: 1 })
    .populate(
      "user",
      "-password -salt -iterations -expire_at -token -isOwner -createdAt -updatedAt -id"
    );
}

function getOneById(id) {
  return daoBooking.findById(id).populate("restaurant");
}

async function createBooking(booking) {
  const createdBooking = await daoBooking.create(booking);
  return await daoBooking.findById(createdBooking._id).populate("restaurant");
}

function updateBooking(id, booking) {
  return daoBooking
    .findByIdAndUpdate(id, booking, { new: true })
    .populate("restaurant");
}

function deleteBooking(id) {
  return daoBooking.findByIdAndDelete(id);
}
