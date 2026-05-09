const router = require("express").Router();
const Feed = require("../models/Feed");

router.get("/", async (req, res) => {
  const data = await Feed.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const item = new Feed(req.body);
  await item.save();
  res.json(item);
});

router.post("/update", async (req, res) => {
  const { feedId, type, quantity } = req.body;
  const feed = await Feed.findById(feedId);
  if (type === "IN") feed.quantity += Number(quantity);
  if (type === "OUT") feed.quantity -= Number(quantity);
  if (type === "ADJUST") feed.quantity = Number(quantity);
  await feed.save();
  res.json(feed);
});

router.put("/:id", async (req, res) => {
  const updated = await Feed.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Feed.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
