const router = require("express").Router();
const { sendAlert } = require("../alerts");
const Feed = require("../models/Feed");
const Health = require("../models/Health");

router.post("/test", async (req, res) => {
  try {
    await sendAlert("Test Alert", "Your farm alert system is working correctly!");
    res.json({ message: "Test alert sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/check", async (req, res) => {
  try {
    const alerts = [];

    // Check feed levels
    const feeds = await Feed.find();
    for (const feed of feeds) {
      if (feed.quantity === 0) {
        const msg = `${feed.name} is OUT OF STOCK!`;
        alerts.push(msg);
        await sendAlert("🔴 Feed Out of Stock", msg);
      } else if (feed.quantity <= feed.reorderLevel) {
        const msg = `${feed.name} is running low - only ${feed.quantity} ${feed.unit} remaining`;
        alerts.push(msg);
        await sendAlert("🟡 Low Feed Stock", msg);
      }
    }

    // Check health due dates
    const health = await Health.find().populate("animalId");
    for (const record of health) {
      if (!record.nextDueDate) continue;
      const diff = (new Date(record.nextDueDate) - new Date()) / (1000 * 60 * 60 * 24);
      if (diff < 0) {
        const msg = `Overdue treatment for ${record.animalId?.tag} - ${record.type}`;
        alerts.push(msg);
        await sendAlert("🔴 Overdue Treatment", msg);
      } else if (diff <= 3) {
        const msg = `Treatment due in ${Math.ceil(diff)} days for ${record.animalId?.tag} - ${record.type}`;
        alerts.push(msg);
        await sendAlert("🟡 Treatment Due Soon", msg);
      }
    }

    if (alerts.length === 0) {
      res.json({ message: "All clear! No alerts.", alerts: [] });
    } else {
      res.json({ message: `${alerts.length} alert(s) sent!`, alerts });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
