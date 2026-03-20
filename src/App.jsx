import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { base44 } from '@/api/base44Client'
import { useState, useEffect } from 'react'
import Admin from './pages/Admin';
import Home from './pages/Home';
import Planning from './pages/Planning';
import Prijzen from './pages/Prijzen';
import Privacy from './pages/Privacy';
import Proces from './pages/Proces';
import Starters from './pages/Starters';
import Templates from './pages/Templates';
import VedantixHome from './pages/VedantixHome';
import VoorWie from './pages/VoorWie';
import Voorwaarden from './pages/Voorwaarden';
import FAQ from './pages/FAQ';
import CRM from './pages/CRM';
import ClientPortal from './pages/ClientPortal';

// Wrapper that protects a route: redirects to login if not authenticated
function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'redirect'

  useEffect(() => {
    base44.auth.me()
      .then(() => setStatus('ok'))
      .catch(() => {
        base44.auth.redirectToLogin(window.location.href);
        setStatus('redirect');
      });
  }, []);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.2)", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (status === 'redirect') return null;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Planning" element={<Planning />} />
        <Route path="/Prijzen" element={<Prijzen />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Proces" element={<Proces />} />
        <Route path="/Starters" element={<Starters />} />
        <Route path="/Templates" element={<Templates />} />
        <Route path="/VedantixHome" element={<VedantixHome />} />
        <Route path="/VoorWie" element={<VoorWie />} />
        <Route path="/Voorwaarden" element={<Voorwaarden />} />
        <Route path="/FAQ" element={<FAQ />} />

        {/* Protected routes */}
        <Route path="/admin" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
        <Route path="/CRM" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
        <Route path="/klantenportaal" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>} />
        <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App