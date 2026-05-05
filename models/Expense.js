const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  category: String,
  amount: Number,
  notes: String,
  createdBy: String
});

module.exports = mongoose.model("Expense", expenseSchema);