// import related daos (to facilitate retrieval of idUser in userSchema)
const daoRestaurant = require("../daos/restaurant");

module.exports = {
    getAllRestaurants,
    // getRestaurant,
    createRestaurant,
    // editRestaurant,
    // deleteRestaurant,
};


  // function to dynamically construct a query based on the properties present
  // in the query object. 
  async function getAllRestaurants(query) {
    // variable for querying specific fields in database
    var findQuery = {}
    // array variable to contain the properties that are expected in the query object.
    // idRest? also assume now these fields are single sel fields
    var queryFields = ["name", "category", "location"] 
    // loop to check if the query object has a property with that name using
    // query.hasOwnProperty(field). if yes, add it to the findQuery object.
    for (field of queryFields) {
        console.log(field)
        if (query.hasOwnProperty(field)) {
            findQuery[field] = query[field]
        }
    }
    console.log(findQuery)

    // query for booking ID or user ID should be in the respective models, so no need
    // to include in query fields
    
    // query daoMovies using findQuery.If there is casting criteria (casts.length > 0),
    // filter movies based on casting (ie, .where("cast").in(casts))
    var restaurant
    if (casts.length > 0) {
        movies = await daoMovies.find(findQuery).where("cast").in(casts)
    } else {
        restaurants = await daoRestaurant.find(findQuery)
    }
    return restaurants;
  }

//   async function getRestaurant(param) {
//     const restaurant = await daoRestaurant.findOne({idRest: param})
//     if (restaurant == null || Object.keys(restaurant).length == 0) {
//         return "no restaurant with such name or id"
//     } else {
//         return restaurant
//     }
//   }

  function createRestaurant(restaurant) {
    return daoRestaurant.create(restaurant);
  }
