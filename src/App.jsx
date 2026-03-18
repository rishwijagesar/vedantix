import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Admin from './pages/Admin';
import Home from './pages/Home';
import Planning from './pages/Planning';
import Prijzen from './pages/Prijzen';
import Privacy from './pages/Privacy';
import Proces from './pages/Proces';
import Starters from './pages/Starters';
import VoorWie from './pages/VoorWie';
import Voorwaarden from './pages/Voorwaarden';

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
        <Route path="/VoorWie" element={<VoorWie />} />
        <Route path="/Voorwaarden" element={<Voorwaarden />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
