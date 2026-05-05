const router = require("express").Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const newData = new Expense({
    ...req.body,
    date: new Date()
  });
  await newData.save();
  res.json(newData);
});

module.exports = router;