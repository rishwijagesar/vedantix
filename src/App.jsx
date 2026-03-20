import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

// SEO niche pages
import WebsiteKapper from './pages/WebsiteKapper';
import WebsiteSalon from './pages/WebsiteSalon';
import WebsiteKlusbedrijf from './pages/WebsiteKlusbedrijf';
import WebsiteRestaurant from './pages/WebsiteRestaurant';
import WebsiteFotograaf from './pages/WebsiteFotograaf';
import WebsiteSchoonmaakbedrijf from './pages/WebsiteSchoonmaakbedrijf';

import MeerKlantenSalon from './pages/blog/MeerKlantenSalon';
import MeerOffertesKlusbedrijf from './pages/blog/MeerOffertesKlusbedrijf';
import MeerReserveringenRestaurant from './pages/blog/MeerReserveringenRestaurant';
import MeerBoekingenFotograaf from './pages/blog/MeerBoekingenFotograaf';
import MeerKlantenSchoonmaakbedrijf from './pages/blog/MeerKlantenSchoonmaakbedrijf';

// Dynamic SEO city page
import SeoCityPage from './pages/SeoCityPage';

// Blog
import Blog from './pages/Blog';
import MeerKlantenKapper from './pages/blog/MeerKlantenKapper';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
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

          <Route path="/website-kapper" element={<WebsiteKapper />} />
          <Route path="/website-salon" element={<WebsiteSalon />} />
          <Route path="/website-klusbedrijf" element={<WebsiteKlusbedrijf />} />
          <Route path="/website-restaurant" element={<WebsiteRestaurant />} />
          <Route path="/website-fotograaf" element={<WebsiteFotograaf />} />
          <Route path="/website-schoonmaakbedrijf" element={<WebsiteSchoonmaakbedrijf />} />

          <Route path="/blog/meer-klanten-salon" element={<MeerKlantenSalon />} />
          <Route path="/blog/meer-offertes-klusbedrijf" element={<MeerOffertesKlusbedrijf />} />
          <Route path="/blog/meer-reserveringen-restaurant" element={<MeerReserveringenRestaurant />} />
          <Route path="/blog/meer-boekingen-fotograaf" element={<MeerBoekingenFotograaf />} />
          <Route path="/blog/meer-klanten-schoonmaakbedrijf" element={<MeerKlantenSchoonmaakbedrijf />} />

          {/* 1 component voor alle city SEO pages */}
          <Route path="/website/:niche/:stad" element={<SeoCityPage />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/meer-klanten-kapper" element={<MeerKlantenKapper />} />

          <Route path="/admin" element={<AdminCRM />} />
          <Route path="/klantenportaal" element={<KlantenPortaal />} />

          <Route path="/CRM" element={<Navigate to="/admin" replace />} />
          <Route path="/ClientPortal" element={<Navigate to="/klantenportaal" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;