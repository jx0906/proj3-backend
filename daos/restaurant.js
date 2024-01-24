const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// import related daos (to facilitate retrieval of idUser in schemaUser and idBooking in schemaBooking)
// const userDao = require("./user");
// const bookingDao = require("./booking");

/* Sample CREATE format
{
    "image": "testURL", //to update - https://media.istockphoto.com/id/157440843/photo/traditional-japanese-restaurant.jpg?s=612x612&w=0&k=20&c=0-Qmluxn5MaccmJjPML5DquRrqgnIZVQEuf8c7RKp9c=
    "name":"testsample",
    "category": "Japanese",
    "location": "East",
    "timeOpen": 1100,
    "timeClose": 2000,
    "address":"59 Devon Road Singapore 777888",
    "phone":"88997788",
    "websiteUrl":"www.testestes.com",
    "maxPax":30,
    "description":"mid-tier jap restaurant in midtown"
    } */

const restaurantSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      // need this to be URL to facilitate FE rendering
      type: String,
    },
    category: {
      type: String,
      enum: ["Asian", "Chinese", "Japanese", "Western"],
      required: true,
    },
    location: {
      type: String,
      enum: ["North", "South", "East", "West", "Central"],
      required: true,
    },
    timeOpen: {
      type: Number,
      /* to update type as Date later when util functions are up. keeping it
      as number for now to faciltiate testing. same for timeClose and daysClose*/
    },
    timeClose: {
      type: Number,
    },
    daysClose: {
      type: [String], //use array to enable multiple values
      enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      // type: [Date],
      // using enum to facilitate testing as we will need more work on the validation rules (ie, distill day from
      // date to validate if booking would be valid)
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    maxPax: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
    },
    // by refactoring as type: [ObjectID] ref: XXXX
    // we will be able to inform the populate() method which dao/model's documents
    // (containing the schema) to use to replace the ObjectIds with
    //   idBooking: {
    //     type: mongoose.Schema.Types.ObjectId,
    // ref: bookingDao,
    // },
    //   idUser: {
    //     type: mongoose.Schema.Types.ObjectId,
    //                 ref: userDao,
    // },
  },
  {
    // For mongoose to automatically create createdAt and updatedAt fields to every document
    timestamps: true,
  }
);

// Compile schema into model and export it
module.exports = mongoose.model("Restaurant", restaurantSchema);
