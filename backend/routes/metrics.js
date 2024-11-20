const express = require("express");
const router = express.Router();
const CallMetric = require("../models/CallMetric");

router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { summary, analysis, audioUrl, transcript } = req.body;

    const callMetric = new CallMetric({
      userId,
      summary,
      analysis,
      transcript,
      audioUrl,
      createdAt: new Date(),
    });

    await callMetric.save();

    res.status(201).json(callMetric);
  } catch (error) {
    console.error("Error storing call metrics:", error);
    res.status(500).json({ error: "Failed to store call metrics" });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = { userId: req.user.id };
    console.log(req.query);
    console.log(req.params);
    if (req.query && req.query.id) {
      query._id = req.query.id;
    }

    const metrics = await CallMetric.find(query).sort({ createdAt: -1 });
    res.json(metrics);
  } catch (error) {
    console.error("Error fetching call metrics:", error);
    res.status(500).json({ error: "Failed to fetch call metrics" });
  }
});

module.exports = router;
