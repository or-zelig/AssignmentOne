const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
await mongoose.connect(uri);

module.exports = mongoose;
