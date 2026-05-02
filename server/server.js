const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { Firestore } = require('@google-cloud/firestore');
const { VertexAI } = require('@google-cloud/vertexai');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const admin = require('firebase-admin');

// Constants
const PROJECT_ID = 'erudite-skill-494516-g8';
const LOCATION = 'us-central1';

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
} catch (e) {
  console.warn("Firebase Admin init warning:", e.message);
}

const app = express();

app.get('/', (req, res) => res.status(200).send('OK'));

// SECURITY FIX: Add CORS to prevent 'Failed to save' errors
app.use(cors());
app.use(express.json());

// Initialize Google Cloud Clients
const firestore = new Firestore({ projectId: PROJECT_ID });
const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// --- reCAPTCHA Enterprise Verification ---
app.post('/api/verify-recaptcha', async (req, res) => {
  try {
    const { token, siteKey } = req.body;
    const projectPath = recaptchaClient.projectPath(PROJECT_ID);

    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: siteKey,
        },
      },
      parent: projectPath,
    };

    const [assessment] = await recaptchaClient.createAssessment(request);

    if (!assessment.tokenProperties.valid) {
      return res.status(400).json({ success: false, message: 'Invalid reCAPTCHA token' });
    }

    // Check score (0.0 to 1.0)
    if (assessment.riskAnalysis.score < 0.5) {
      return res.status(403).json({ success: false, message: 'Bot detected', score: assessment.riskAnalysis.score });
    }

    res.json({ success: true, score: assessment.riskAnalysis.score });
  } catch (error) {
    console.error('reCAPTCHA Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Database Migration: Firestore Complaints ---
app.post('/api/complaints', async (req, res) => {
  try {
    const complaintData = {
      ...req.body,
      createdAt: Firestore.FieldValue.serverTimestamp()
    };
    const docRef = await firestore.collection('complaints').add(complaintData);
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- AI Fact-Check (Vertex AI) ---
app.post('/api/analyze-misinformation', async (req, res) => {
  try {
    const { text } = req.body;
    const model = vertex_ai.preview.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = `Analyze if this text contains election misinformation. Return JSON: {"isMisinformation": bool, "confidence": float, "analysis": string}. Text: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let textResult = response.candidates[0].content.parts[0].text;
    textResult = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
    
    res.json({ success: true, data: JSON.parse(textResult) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- WINNER FEATURE: Live Sentiment & Misinformation Heatmap ---
app.get('/api/integrity-heatmap', async (req, res) => {
  try {
    const snapshot = await firestore.collection('complaints').orderBy('createdAt', 'desc').limit(20).get();
    const complaints = snapshot.docs.map(doc => doc.data().letterContent || doc.data().violationType).join('\n---\n');

    const model = vertex_ai.preview.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = `Analyze these recent voter complaints and generate an "Election Integrity Heatmap". 
    Categorize locations mentioned and assign an Integrity Score (0-100).
    Return a JSON array: [{"location": string, "score": number, "sentiment": "Positive"|"Negative"|"Neutral"}].
    Data: ${complaints}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let textResult = response.candidates[0].content.parts[0].text;
    textResult = textResult.replace(/```json/g, '').replace(/```/g, '').trim();

    res.json({ success: true, heatmap: JSON.parse(textResult) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve Static Files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html')));
}

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('HackerRank Build running on port ' + port);
});
