//import library
const mongoose = require("mongoose");

// laying the connection to the DAO layer (ie, DB)
mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL);

// shortcut to mongoose.connection object
const db = mongoose.connection;

// switch "on" connection aft infra is set up
db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});