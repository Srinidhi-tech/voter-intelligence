import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import DashboardShell from './components/layout/DashboardShell';
import RegistrationPage from './pages/RegistrationPage';
import VotingSimulationPage from './pages/VotingSimulationPage';
import CandidateIntelPage from './pages/CandidateIntelPage';
import PollingDayGuidePage from './pages/PollingDayGuidePage';
import YourRightsPage from './pages/YourRightsPage';
import ResultsPage from './pages/ResultsPage';
import FactCheckPage from './pages/FactCheckPage';
import ComplaintsPage from './pages/ComplaintsPage';
import HeatmapPage from './pages/HeatmapPage'; // New Page for Winner Feature

// API CONFIG: Hardcoded Cloud Run URL for immediate deployment
// API CONFIG: Relative URL for seamless deployment
export const API_URL = "";

// BLIND ACCESSIBILITY: Global TTS Helper
export const speak = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }
};

function App() {
  // Global accessibility focus listener
  useEffect(() => {
    const handleFocus = (e) => {
      const text = e.target.innerText || e.target.ariaLabel || e.target.placeholder;
      if (text && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.hasAttribute('data-tts'))) {
        speak(text);
      }
    };
    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardShell />}>
          <Route index element={<Navigate to="/registration" replace />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="evm-vvpat" element={<VotingSimulationPage />} />
          <Route path="candidate-intel" element={<CandidateIntelPage />} />
          <Route path="polling-day" element={<PollingDayGuidePage />} />
          <Route path="voter-rights" element={<YourRightsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="fact-check" element={<FactCheckPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="heatmap" element={<HeatmapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
