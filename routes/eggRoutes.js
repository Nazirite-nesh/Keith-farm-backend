const router = require("express").Router();
const Egg = require("../models/Egg");

router.get("/", async (req, res) => {
  const data = await Egg.find().sort({ date: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  const { zone, collected, broken, notes } = req.body;
  const net = collected - broken;
  const record = new Egg({ zone, collected, broken, net, notes });
  await record.save();
  res.json(record);
});

router.put("/:id", async (req, res) => {
  const updated = await Egg.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Egg.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;