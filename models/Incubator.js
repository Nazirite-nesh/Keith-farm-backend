const mongoose = require("mongoose");

const incubatorSchema = new mongoose.Schema({
  eggs: Number,
  notes: String,
  createdBy: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Incubator", incubatorSchema);
