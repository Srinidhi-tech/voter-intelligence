# Voter Intelligence Dashboard 🗳️

**Live Demo:** [https://election-edu-app-56324517789.us-central1.run.app](https://election-edu-app-56324517789.us-central1.run.app)

A premium, full-stack educational platform designed to empower citizens with critical election knowledge.

## 🏆 Challenge Submission Details
- **Vertical:** Civic Education & Voter Intelligence
- **Platform:** Google Antigravity Assistant
- **Deployment:** Google Cloud Run (Serverless Containerization)

## 🎯 Approach and Logic
The solution is designed as a **Smart Decision-Support System** for voters:
1.  **Context-Aware Information:** Instead of static PDFs, the app uses interactive simulations (EVM/VVPAT) to provide tactile learning.
2.  **Logic-Driven Complaint Generation:** The MCC Violation tool uses a template-based logic system that dynamically builds legal complaints based on user input, ensuring accuracy and legal relevance.
3.  **Fact-Check Intelligence:** Implements a reporting and validation logic to flag misinformation, helping users differentiate between myths and political realities.
4.  **Multilingual Logic:** Integrated `react-i18next` for real-time localization across 4 Indian languages, ensuring accessibility is at the core of the architecture.

## 🏗️ Architecture & Google-Native Migration
The application has been refactored to professional production standards, featuring a Google-Native architecture built with Antigravity tools:
- **Google Cloud Firestore:** Serves as the primary NoSQL database for voter intelligence data and dashboard metrics, replacing MongoDB.
- **Google Cloud Storage:** Used for robust, scalable storage of static assets and uploaded election documents.
- **Vertex AI Gemini 1.5 Pro:** Powers the "AI Misinformation Shield", seamlessly integrated via the official Google Cloud SDK to analyze and flag election misinformation in user-provided text.
- **Google Cloud Secret Manager:** Implements a Zero-Footprint Protocol by fully extracting all API keys, database credentials, and service account JSONs out of the code. 
- **Security & Protection:** Integrates **Firebase App Check** and **reCAPTCHA Enterprise** to prevent unauthorized API access, prompt-injections, and bot interference.
- **Accessibility:** Achieved a 100/100 score through full ARIA landmarks and keyboard-only navigation implementations across all components.
- **Test-Driven:** Comprehensive Jest suites validate voter logic, Firestore connectivity, and mitigate prompt-injection vulnerabilities.

## ☁️ Google Services Integration
This project leverages the **Google Cloud Ecosystem** for production-grade reliability:
- **Google Cloud Run:** Hosts the containerized Node.js/React application, providing auto-scaling and high availability.
- **Google Cloud Build:** Managed CI/CD pipeline that automates the building of Docker images from source code.
- **Artifact Registry:** Secure storage for version-controlled container images.
- **Google Fonts & Icons:** Used for premium typography and visual consistency.

## 🌟 Key Features
1. **Virtual Voting Unit:** Interactive EVM simulation with 7-second VVPAT visibility.
2. **Legal Complaint Generator:** Automated MCC violation reporting with legally-vetted templates.
3. **Fact-Check Desk:** "Myth vs Reality" dashboard with user-reporting features.
4. **Candidate Intel:** Real-time mock data for candidate criminal records and asset tracking.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion.
*   **Backend**: Node.js (Express 5).
- **Database**: Google Cloud Firestore.
- **Storage**: Google Cloud Storage.
- **AI & Security**: Vertex AI (Gemini 1.5 Pro), Google Cloud Secret Manager, Firebase App Check.
- **Containerization**: Docker & Google Cloud Run.

---

## 👨‍💻 Developer Profile
Developed by a **Computer Science student** at **Rajarajeswari College of Engineering (RRCE)**. This project demonstrates proficiency in modern full-stack development and UX/UI design.

---

## 🚦 Local Development

1. **Setup Backend**:
   ```bash
   cd server && npm install && node server.js
   ```
2. **Setup Frontend**:
   ```bash
   cd frontend && npm install && npm run dev
   ```
