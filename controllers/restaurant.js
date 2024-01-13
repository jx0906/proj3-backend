const modelRestaurant = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  // getRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
};

async function getAllRestaurants(req, res) {
  try {
    const data = await modelRestaurant.getAllRestaurants(req.query);
    res.json({ restaurants: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

// async function getRestaurant(req, res) {
//   const data = await modelRestaurant.getRestaurantById(req.params.restId);
//   if (data == "no restaurant found") {
//     res.json("no data found");
//   } else {
//     res.json(data);
//   }
// }

async function createRestaurant(req, res) {
  try {
    const data = await modelRestaurant.createRestaurant(req.body);
    res.json(data);
    // Always redirect after CUD data
    // To refactor to redirect to the restaurant listing we implement it
    // res.redirect('/restaurant/:restId');
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function editRestaurant(req, res) {
  const data = await modelRestaurant.editRestaurant(req.body);
  res.json(data);
  // To refactor to redirect to the restaurant listing we implement it
  // res.redirect('/restaurant/:restId');
}

async function deleteRestaurant(req, res) {
  try {
    await modelRestaurant.deleteRestaurant(req.params.restId);
    res.json("data has been deleted.");
    // res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
