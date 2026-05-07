const router = require("express").Router();
const Incubator = require("../models/Incubator");

router.get("/", async (req, res) => {
  const data = await Incubator.find().sort({ date: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  const record = new Incubator(req.body);
  await record.save();
  res.json(record);
});

router.delete("/:id", async (req, res) => {
  await Incubator.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
