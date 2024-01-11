const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// import related daos (to facilitate retrieval of idUser in schemaUser and idBooking in schemaBooking)
// const daoBooking = require('./booking');
// const daoRestaurant = require('./restaurant');

const schemaUser = new Schema({
    idUser: {
        type: mongoose.ObjectIds, // a special Mongoose data type that is for storing unique identities
    },
  }, {
    // For mongoose to automatically create createdAt and updatedAt fields to every document
    timestamps: true
  });
  
// Compile schema into model and export it
module.exports = mongoose.model("User", schemaUser);