const router = require("express").Router();
const Egg = require("../models/Egg");

router.get("/", async (req, res) => {
  const data = await Egg.find().sort({ date: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  const { zone, collected, broken, notes } = req.body;
  const net = collected - broken;
  const record = new Egg({
    zone,
    collected,
    broken,
    net,
    notes
  });
  await record.save();
  res.json(record);
});

module.exports = router;