const restaurantModel = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
};

async function getAllRestaurants(req, res) {
  try {
    const data = await restaurantModel.getAllRestaurants(req.query);
    res.json({ restaurants: data });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
} // output from test: {"restaurants":[]}

async function getRestaurant(req, res) {
  const data = await restaurantModel.getRestaurantById(req.params.id);
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
  await restaurantModel.deleteRestaurant(req.params.id);
  res.json("data has been deleted.");
  // res.redirect('/');
}
