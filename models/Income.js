const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  source: String,
  category: String,
  quantity: Number,
  unitPrice: Number,
  total: Number,
  createdBy: String
});

module.exports = mongoose.model("Income", incomeSchema);