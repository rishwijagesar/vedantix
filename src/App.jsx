import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Pages
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
import AdminCRM from './pages/AdminCRM.jsx';
import KlantenPortaal from './pages/KlantenPortaal.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC - no auth required */}
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

          {/* PROTECTED - auth handled inside each page */}
          <Route path="/admin" element={<AdminCRM />} />
          <Route path="/klantenportaal" element={<KlantenPortaal />} />

          {/* Legacy redirects */}
          <Route path="/CRM" element={<Navigate to="/admin" replace />} />
          <Route path="/ClientPortal" element={<Navigate to="/klantenportaal" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App