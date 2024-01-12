var express = require("express");
var router = express.Router();

// import controllers
var controllerRestaurant = require("../controllers/restaurant");

/* base path: /test */
/* GET restaurant listing.
input: -
output: restaurant info */

router.get("/", controllerRestaurant.getAllRestaurants);

module.exports = router;