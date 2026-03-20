import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
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
import UserNotRegisteredError from './components/UserNotRegisteredError';

function AppRoutes() {
  const { authError, isLoadingPublicSettings, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <div style={{ color: "#fff", textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.2)", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  if (authError?.type === 'auth_required') {
    navigateToLogin();
    return null;
  }

  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Admin" element={<Admin />} />
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
      <Route path="/admin" element={<CRM />} />
      <Route path="/CRM" element={<CRM />} />
      <Route path="/klantenportaal" element={<ClientPortal />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App