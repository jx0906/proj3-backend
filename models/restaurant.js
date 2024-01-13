// import related daos (to facilitate retrieval of idUser in userSchema)
const daoRestaurant = require("../daos/restaurant");

module.exports = {
  getAllRestaurants,
  // getRestaurantById
  createRestaurant,
  // editRestaurant,
  deleteRestaurant,
};

//basic function
function getAllRestaurants(queryFields) {
  return daoRestaurant.find(queryFields);
}

function createRestaurant(body) {
  return daoRestaurant.create(body);
}

async function deleteRestaurant(param) {
  const data = await daoRestaurant.findOne({ _id: param });
  return daoRestaurant.delete(data);
}

/*
// function to dynamically construct a query based on the properties present in the query object.
async function getAllRestaurants(query) {
  // variable for querying specific fields in database
  var findQuery = {};
  // array variable to contain the properties that are expected in the query object.
  // idRest? also assume now these fields are single sel fields
  // query for booking ID or user ID should be in the respective models, so no need
  // to include in query fields
  var queryFields = ["name", "category", "location"];
  // loop to check if the query object has a property with that name using
  // query.hasOwnProperty(field). if yes, add it to the findQuery object.
  for (field of queryFields) {
    console.log(field);
    if (query.hasOwnProperty(field)) {
      findQuery[field] = query[field];
    }
  }
  console.log(findQuery);
  const restaurants = await daoRestaurant.find(findQuery);
  return restaurants;
}
*/

/*   async function getRestaurantById(param) {
//     const restaurant = await daoRestaurant.findOne({
    email: body.email,
    password: body.password,
  })
//     if (restaurant == null || Object.keys(restaurant).length == 0) {
//         return "no restaurant with such id"
//     } else {
//         return restaurant
//     }
*/
