const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { Firestore } = require('@google-cloud/firestore');
const { VertexAI } = require('@google-cloud/vertexai');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const admin = require('firebase-admin');

// Initialize Firebase Admin for App Check (Security & Zero-Footprint Protocol)
// This will automatically pick up GOOGLE_APPLICATION_CREDENTIALS if set, or use Application Default Credentials.
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
} catch (e) {
  console.warn("Firebase admin initialization failed (might be missing credentials in local dev):", e.message);
}

const app = express();

app.use(cors());
app.use(express.json());

// App Check Middleware
const verifyAppCheck = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    return next(); // Skip in local dev
  }
  const appCheckToken = req.header('X-Firebase-AppCheck');
  if (!appCheckToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No App Check token provided.' });
  }
  try {
    await admin.appCheck().verifyToken(appCheckToken);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid App Check token.' });
  }
};

// Initialize Google Cloud Clients
const firestore = new Firestore();
// Default to empty project ID locally so it doesn't crash on init if env is missing
const vertex_ai = new VertexAI({ project: process.env.GOOGLE_CLOUD_PROJECT || 'local-dev', location: 'us-central1' });
const secretManager = new SecretManagerServiceClient();

async function getSecret(secretName) {
  if (process.env.NODE_ENV !== 'production') {
     return process.env[secretName];
  }
  try {
    const name = `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/latest`;
    const [version] = await secretManager.accessSecretVersion({ name });
    return version.payload.data.toString('utf8');
  } catch(e) {
    console.error(`Failed to get secret ${secretName}:`, e);
    return null;
  }
}

// Routes
app.post('/api/complaints', verifyAppCheck, async (req, res) => {
  try {
    const { violationType, candidateName, constituency, location, date, letterContent, userName, contactInfo } = req.body;
    
    const complaintRef = firestore.collection('complaints').doc();
    const complaintData = {
      violationType,
      candidateName,
      constituency,
      location,
      date,
      letterContent,
      userName,
      contactInfo,
      createdAt: Firestore.FieldValue.serverTimestamp()
    };

    await complaintRef.set(complaintData);
    
    res.status(201).json({
      success: true,
      message: 'Complaint generated and saved to Firestore successfully',
      data: { id: complaintRef.id, ...complaintData }
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

app.post('/api/factcheck', verifyAppCheck, async (req, res) => {
  try {
    const { query } = req.body;
    
    const reportRef = firestore.collection('factCheckReports').doc();
    const reportData = { 
      query,
      createdAt: Firestore.FieldValue.serverTimestamp()
    };
    await reportRef.set(reportData);
    
    res.status(201).json({
      success: true,
      message: 'Fact check report submitted to Firestore successfully',
      data: { id: reportRef.id, ...reportData }
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

// Feature Innovation: AI Misinformation Shield
app.post('/api/analyze-misinformation', verifyAppCheck, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required.' });
    }

    // Initialize Gemini Pro Model
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: 'gemini-1.5-pro-preview-0409',
      generation_config: {
        max_output_tokens: 500,
        temperature: 0.2,
      },
    });

    const prompt = `Analyze the following text regarding Indian elections for potential misinformation. Provide a factual assessment.
Text: "${text}"
Output JSON format exactly without markdown formatting: {"isMisinformation": boolean, "confidenceScore": number (0-100), "analysis": string}`;

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    const responseStream = await generativeModel.generateContentStream(request);
    const aggregatedResponse = await responseStream.response;
    
    let resultJsonStr = aggregatedResponse.candidates[0].content.parts[0].text;
    resultJsonStr = resultJsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(resultJsonStr);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error analyzing misinformation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze text',
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
