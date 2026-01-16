const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is missing in .env");
}

mongoose.connect(uri);

module.exports = mongoose;
