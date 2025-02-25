import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FleetServiceData from './pages/FleetServiceData';
import ReportView from './pages/ReportView';
import WelcomePage from './pages/WelcomePage';
import IntroductionPage from './pages/IntroductionPage';
import OperationalData from './pages/OperationalData';
import DepotData from './pages/DepotData';
import BusData from './pages/BusData';
import EnergyEfficiencyData from './pages/EnergyEfficiencyData';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/introduction" element={<IntroductionPage />} />
      <Route path="/get-started" element={<OperationalData />} />
      <Route path="/depot-data" element={<DepotData />} />
      <Route path="/bus-data" element={<BusData />} />
      <Route path="/energy-efficiency" element={<EnergyEfficiencyData />} />
      <Route path="/fleet-service" element={<FleetServiceData />} />
      <Route path="/fleet-service/report" element={<ReportView />} />
    </Routes>
  );
}

