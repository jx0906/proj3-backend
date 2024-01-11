const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    // restaurant: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Restaurant",
    // },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    pax: {
      type: Number,
      required: true,
      max: 10,
    },
    dateTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
