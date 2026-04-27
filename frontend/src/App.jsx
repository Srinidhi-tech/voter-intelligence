import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardShell from './components/layout/DashboardShell';
import RegistrationPage from './pages/RegistrationPage';
import VotingSimulationPage from './pages/VotingSimulationPage';
import CandidateIntelPage from './pages/CandidateIntelPage';
import PollingDayGuidePage from './pages/PollingDayGuidePage';
import YourRightsPage from './pages/YourRightsPage';
import ResultsPage from './pages/ResultsPage';
import FactCheckPage from './pages/FactCheckPage';
import ComplaintsPage from './pages/ComplaintsPage';

function App() {
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
