const mongoose = require('mongoose');

const factCheckReportSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Verified', 'Fake'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FactCheckReport', factCheckReportSchema);
