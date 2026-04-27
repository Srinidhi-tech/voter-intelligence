const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  violationType: {
    type: String,
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  constituency: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  letterContent: {
    type: String,
    required: true
  },
  userName: String,
  contactInfo: String,
  status: {
    type: String,
    enum: ['pending', 'submitted', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
