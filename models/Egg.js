const mongoose = require("mongoose");

const eggSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  zone: String,
  collected: Number,
  broken: Number,
  net: Number,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Egg", eggSchema);