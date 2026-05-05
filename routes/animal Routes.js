const router = require("express").Router();
const Animal = require("../models/Animal");

router.get("/", async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
});

router.post("/", async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.json(animal);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const updated = await Animal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Animal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;