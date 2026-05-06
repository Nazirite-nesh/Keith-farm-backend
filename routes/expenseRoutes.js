const router = require("express").Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  const data = await Expense.find().sort({ date: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  const newData = new Expense({ ...req.body, date: new Date() });
  await newData.save();
  res.json(newData);
});

router.put("/:id", async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;