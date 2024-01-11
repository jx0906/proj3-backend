const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// import related daos (to facilitate retrieval of idUser in schemaUser and idBooking in schemaBooking)
const daoUser = require('./user');
const daoBooking = require('./booking');

/*{
    "idRest": "658ac33fcfe93c8dbf44gb99",
    "imageRest":
    "name":"testsample",
    "category": “Japanese”,
    "location": “East”,
    "timeOpen": "1100",
    "timeClose": "2000",
    "daysClose":"Thursday",
    "address":"59 Devon Road Singapore 777888",
    "phone":"88997788",
    "websiteUrl":"www.testestes.com",
    "maxPax":"30",
    "idUser":"658ac33fcfe93c8dbf43fb28"
    "restDest":"mid-tier jap restaurant in midtown",
    } */

const schemaRestaurant = new Schema({
    idRest: {
        type: mongoose.ObjectIds, // a special Mongoose data type that is for storing unique identities
    },
    nameRest: {
        type: String,
        required: true
      },
    imageRest: {
        // need this to be URL to facilitate FE rendering
        type: String,
        required: false
      },
    category: {
        type: String,
        enum: ["Asian", "Chinese", "Japanese", "Western"],
        required: true
      },
    location: {
        type: string,
        enum: ["North", "South","East", "West", "Central"],
        required: true,
      },
    timeOpen: {
        type: Date, 
        /* to consider using string to facilitate input validation. also no need to use Data type as we are not performing any
        date-related operations (eg, calculating opening duration) */
    },
    timeClose: {
      type: Date,
  },
  daysClose: {
    type: Date,
  },
  address: {
    type: String,
},
  phone: {
    type: Number,
},
  websiteUrl: {
    type: String,
},
  maxPax: {
        type: Number,
        required: true,
        min: 1,
},
  descriptionRest: {
        type: String,
},
    // by refactoring as type: [ObjectID] ref: XXXX 
  // we will be able to inform the populate() method which dao/model's documents
  // (containing the schema) to use to replace the ObjectIds with  
//   idBooking: {
  //     type: mongoose.Schema.Types.ObjectId,
  // ref: daoBooking,
  // },
//   idUser: {
//     type: mongoose.Schema.Types.ObjectId,
//                 ref: daoUser,
// },
  }, {
    // For mongoose to automatically create createdAt and updatedAt fields to every document
    timestamps: true
  });
  
// Compile schema into model and export it
module.exports = mongoose.model("Restaurant", schemaRestaurant);