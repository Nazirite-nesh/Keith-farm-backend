const router = require("express").Router();
const EggSale = require("../models/EggSale");
const Income = require("../models/Income");

router.get("/", async (req, res) => {
  const data = await EggSale.find().sort({ date: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  const { quantity, pricePerEgg, buyer, notes, createdBy } = req.body;
  const total = quantity * pricePerEgg;
  const sale = new EggSale({ quantity, pricePerEgg, total, buyer, notes, createdBy });
  await sale.save();
  await Income.create({
    source: "Egg Sale",
    category: "Poultry",
    quantity,
    unitPrice: pricePerEgg,
    total,
    createdBy
  });
  res.json(sale);
});

router.delete("/:id", async (req, res) => {
  await EggSale.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
