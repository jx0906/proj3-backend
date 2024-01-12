const restaurantModel = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
};

async function getAllRestaurants(req, res) {
  res.json({
    restaurants: await restaurantModel.getAll(req.query),
  });
}

async function getRestaurant(req, res) {
  const data = await restaurantModel.findById(req.params.id);
  if (data == "no restaurant found") {
    res.json("no data found");
  } else {
    res.json(data);
  }
}

async function createRestaurant(req, res) {
  const data = await restaurantModel.createRestaurant(req.body);
  res.json(data);
  // Always redirect after CUD data
  // To refactor to redirect to the restaurant listing we implement it
  // res.redirect('/restaurant/:restId');
}

async function editRestaurant(req, res) {
  const data = await restaurantModel.editRestaurant(req.body);
  res.json(data);
  // To refactor to redirect to the restaurant listing we implement it
  // res.redirect('/restaurant/:restId');
}

async function deleteRestaurant(req, res) {
  await restaurantModel.deleteOne(req.params.id);
  res.json("data has been deleted.");
  // res.redirect('/');
}
