const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// import related daos (to facilitate retrieval of idUser in schemaUser and idBooking in schemaBooking)
// const daoBooking = require('./booking');
// const daoRestaurant = require('./restaurant');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleRest: {
      type: Boolean,
    },
    salt: {
      type: String,
      required: true,
    },
    iterations: {
      type: Number,
      required: true,
    }
  },
  {
    // For mongoose to automatically create createdAt and updatedAt fields to every document
    timestamps: true,
  }
);

// Compile schema into model and export it
module.exports = mongoose.model("User", userSchema);
