const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  tag: { type: String, unique: true },
  type: String,
  breed: String,
  weight: Number,
  pen: String,
  sex: String,
  status: {
    type: String,
    default: "Active"
  },
  createdBy: String
}, { timestamps: true });

module.exports = mongoose.model("Animal", animalSchema);
