const router = require("express").Router();
const Health = require("../models/Health");
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  const data = await Health.find().populate("animalId");
  res.json(data);
});

router.post("/", async (req, res) => {
  const record = new Health(req.body);
  await record.save();
  if (req.body.cost && req.body.cost > 0) {
    await Expense.create({
      category: "Veterinary",
      amount: req.body.cost,
      notes: req.body.description
    });
  }
  res.json(record);
});

module.exports = router;