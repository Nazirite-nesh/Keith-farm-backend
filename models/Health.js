const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal"
  },
  type: String,
  description: String,
  medication: String,
  cost: Number,
  nextDueDate: Date,
  date: { type: Date, default: Date.now },
  createdBy: String
}, { timestamps: true });

module.exports = mongoose.model("Health", healthSchema);
