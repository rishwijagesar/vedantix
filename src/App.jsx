import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Starters from './pages/Starters';
import Planning from './pages/Planning';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Voorwaarden from './pages/Voorwaarden';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Starters" element={<Starters />} />
        <Route path="/Planning" element={<Planning />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Voorwaarden" element={<Voorwaarden />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
