const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  name: String,
  unit: String,
  quantity: { type: Number, default: 0 },
  reorderLevel: Number
});

module.exports = mongoose.model("Feed", feedSchema);