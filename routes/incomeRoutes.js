const router = require("express").Router();
const Income = require("../models/Income");

router.get("/", async (req, res) => {
  const data = await Income.find().sort({ date: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  const total = req.body.quantity * req.body.unitPrice;
  const newData = new Income({ ...req.body, total });
  await newData.save();
  res.json(newData);
});

router.put("/:id", async (req, res) => {
  const total = req.body.quantity * req.body.unitPrice;
  const updated = await Income.findByIdAndUpdate(
    req.params.id,
    { ...req.body, total },
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;