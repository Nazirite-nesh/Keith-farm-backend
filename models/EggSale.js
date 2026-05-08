const mongoose = require("mongoose");

const eggSaleSchema = new mongoose.Schema({
  quantity: Number,
  pricePerEgg: Number,
  total: Number,
  buyer: String,
  notes: String,
  createdBy: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("EggSale", eggSaleSchema);
