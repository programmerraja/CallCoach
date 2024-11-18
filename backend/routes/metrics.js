const express = require('express');
const router = express.Router();
const passport = require('passport');
const CallMetric = require('../models/CallMetric');

const authenticate = passport.authenticate('jwt', { session: false });

router.post('/', authenticate, async (req, res) => {
  try {
    const metric = new CallMetric({
      userId: req.user._id,
      ...req.body
    });

    await metric.save();
    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const metrics = await CallMetric.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 