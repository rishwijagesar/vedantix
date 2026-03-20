import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/klantenportaal" element={<ClientPortal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App