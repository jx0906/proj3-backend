const modelRestaurant = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  // getRestaurant,
  // createRestaurant,
  // editRestaurant,
  // deleteRestaurant,
};

async function getAllRestaurants(req, res) {
  res.json({
    restaurants: await modelRestaurant.getAllRestaurants(req.query),
  });
}

async function retrieveListing(req, res) {
  const books = await schemaRestaurant.find().populate("users");
  console.log(books);
}

// in movies controller show function
async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  // ie instead of ObjectIDs, populate the performer documents in the cast array
  const movie = await Movie.findById(req.params.id).populate("cast");
  res.json({ title: "Movie Detail", movie });
}
