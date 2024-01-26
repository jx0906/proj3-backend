const modelRestaurant = require("../models/restaurant");

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurantByOwnerId,
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

async function getRestaurant(req, res) {
  try {
    const data = await modelRestaurant.getRestaurantById(req.params.restId);
    if (data == "null") {
      res.json("no restaurant data found");
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getRestaurantByOwnerId(req, res) {
  try {
    const data = await modelRestaurant.getRestaurantByOwnerId(req.user.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createRestaurant(req, res) {
  try {
    const data = await modelRestaurant.createRestaurant({
      ...req.body,
      owner: req.user.id,
    });
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
  const restdata = await modelRestaurant.getRestaurantById(req.params.restId);
  if (!restdata.owner || restdata.owner != req.user.id) {
    return res.status(401).json("Unauthorized");
  } else {
    try {
      const data = await modelRestaurant.editRestaurant(
        req.params.restId,
        req.body
      );
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMsg: err.message });
    }
  }
}

async function deleteRestaurant(req, res) {
  const restdata = await modelRestaurant.getRestaurantById(req.params.restId);
  if (!restdata.owner || restdata.owner != req.user.id) {
    return res.status(401).json("Unauthorized");
  } else {
    try {
      await modelRestaurant.deleteRestaurant(req.params.restId);
      res.json("data has been deleted.");
      // res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMsg: err.message });
    }
  }
}
