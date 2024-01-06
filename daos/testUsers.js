const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const testSchema = new Schema({
    test: "hello",
    },{
  timestamps: true
  });

  // Compile the schema into a model and export it
module.exports = mongoose.model("test", testSchema);