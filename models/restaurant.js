// import related daos (to facilitate retrieval of idUser in userSchema)
const daoRestaurant = require("../daos/restaurant");

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurantByOwnerId,
};

//basic function to get all restaurant info
//to KIV - code in FE to enable filtering by specific params; update GET function to be a dynamic one
//based on filter params from FE form submission
function getAllRestaurants(query) {
  return daoRestaurant.find(query);
}

async function getRestaurantById(param) {
  const data = await daoRestaurant.findOne({ _id: param });
  return data;
}

async function getRestaurantByOwnerId(param) {
  const data = await daoRestaurant.findOne({ owner: param });
  return data;
}

function createRestaurant(body) {
  return daoRestaurant.create(body);
}

async function editRestaurant(param, body) {
  const data = await daoRestaurant.findOneAndUpdate({ _id: param }, body, {
    new: true, // "true" returns the doc (ie, record) after update was applied. else, it returns e original doc by default
  });
  return data;
}

async function deleteRestaurant(param) {
  const data = await daoRestaurant.findOne({ _id: param });
  return daoRestaurant.deleteOne(data);
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
