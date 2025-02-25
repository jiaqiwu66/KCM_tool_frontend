import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroductionPage from './pages/IntroductionPage';
import OperationalData from './pages/OperationalData';
import DepotData from './pages/DepotData';
import WelcomePage from './pages/WelcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/get-started" element={<OperationalData />} />
        <Route path="/depot-data" element={<DepotData />} />
      </Routes>
    </Router>
  );
};

export default App; 