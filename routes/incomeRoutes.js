const router = require("express").Router();
const Income = require("../models/Income");

router.get("/", async (req, res) => {
  const data = await Income.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const newData = new Income({
    ...req.body,
    date: new Date()
  });
  await newData.save();
  res.json(newData);
});

module.exports = router;