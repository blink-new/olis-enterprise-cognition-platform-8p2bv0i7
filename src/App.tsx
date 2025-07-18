import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import SystemArchitecture from './pages/SystemArchitecture';
import DocumentIngestion from './pages/DocumentIngestion';
import MemorySchema from './pages/MemorySchema';
import CognitionEngine from './pages/CognitionEngine';
import SecurityModel from './pages/SecurityModel';
import ValidationFlow from './pages/ValidationFlow';
import FederatedLearning from './pages/FederatedLearning';
import SurfacingLogic from './pages/SurfacingLogic';
import TechnicalBlueprint from './pages/TechnicalBlueprint';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<TechnicalBlueprint />} />
            <Route path="/architecture" element={<SystemArchitecture />} />
            <Route path="/document-ingestion" element={<DocumentIngestion />} />
            <Route path="/memory-schema" element={<MemorySchema />} />
            <Route path="/cognition-engine" element={<CognitionEngine />} />
            <Route path="/security" element={<SecurityModel />} />
            <Route path="/validation" element={<ValidationFlow />} />
            <Route path="/federated-learning" element={<FederatedLearning />} />
            <Route path="/surfacing-logic" element={<SurfacingLogic />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;