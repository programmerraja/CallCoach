const mongoose = require('mongoose');

const callMetricSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  summary: {
    type: String,
    required: true
  },
  analysis: {
    type: Object,
    required: true
  },
  transcript:{
    type:String,
    required:true
  },
  audioUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CallMetric', callMetricSchema); 