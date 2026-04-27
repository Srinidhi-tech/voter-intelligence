const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Complaint = require('./models/Complaint');
const FactCheckReport = require('./models/FactCheckReport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/election-edu';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/complaints', async (req, res) => {
  try {
    const { violationType, candidateName, constituency, location, date, letterContent, userName, contactInfo } = req.body;
    
    const newComplaint = new Complaint({
      violationType,
      candidateName,
      constituency,
      location,
      date,
      letterContent,
      userName,
      contactInfo
    });

    const savedComplaint = await newComplaint.save();
    
    res.status(201).json({
      success: true,
      message: 'Complaint generated and saved successfully',
      data: savedComplaint
    });
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save complaint',
      error: error.message
    });
  }
});

app.post('/api/factcheck', async (req, res) => {
  try {
    const { query } = req.body;
    
    const newReport = new FactCheckReport({ query });
    const savedReport = await newReport.save();
    
    res.status(201).json({
      success: true,
      message: 'Fact check report submitted successfully',
      data: savedReport
    });
  } catch (error) {
    console.error('Error saving fact check report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report',
      error: error.message
    });
  }
});

// Production: Serve Static Files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
