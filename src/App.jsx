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

// Blog pages
import Blog from './pages/Blog';
import MeerKlantenKapper from './pages/blog/MeerKlantenKapper';
import MeerKlantenSalon from './pages/blog/MeerKlantenSalon';
import MeerOffertesKlusbedrijf from './pages/blog/MeerOffertesKlusbedrijf';
import MeerReserveringenRestaurant from './pages/blog/MeerReserveringenRestaurant';
import MeerBoekingenFotograaf from './pages/blog/MeerBoekingenFotograaf';
import MeerKlantenSchoonmaakbedrijf from './pages/blog/MeerKlantenSchoonmaakbedrijf';

// Dynamic SEO city page
import SeoCityPage from './pages/SeoCityPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Canonical routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/prijzen" element={<Prijzen />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/proces" element={<Proces />} />
          <Route path="/starters" element={<Starters />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/vedantixhome" element={<VedantixHome />} />
          <Route path="/voorwie" element={<VoorWie />} />
          <Route path="/voorwaarden" element={<Voorwaarden />} />
          <Route path="/faq" element={<FAQ />} />

          {/* SEO niche pages */}
          <Route path="/website-kapper" element={<WebsiteKapper />} />
          <Route path="/website-salon" element={<WebsiteSalon />} />
          <Route path="/website-klusbedrijf" element={<WebsiteKlusbedrijf />} />
          <Route path="/website-restaurant" element={<WebsiteRestaurant />} />
          <Route path="/website-fotograaf" element={<WebsiteFotograaf />} />
          <Route path="/website-schoonmaakbedrijf" element={<WebsiteSchoonmaakbedrijf />} />

          {/* Dynamic SEO city pages */}
          <Route path="/website/:niche/:stad" element={<SeoCityPage />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/meer-klanten-kapper" element={<MeerKlantenKapper />} />
          <Route path="/blog/meer-klanten-salon" element={<MeerKlantenSalon />} />
          <Route path="/blog/meer-offertes-klusbedrijf" element={<MeerOffertesKlusbedrijf />} />
          <Route path="/blog/meer-reserveringen-restaurant" element={<MeerReserveringenRestaurant />} />
          <Route path="/blog/meer-boekingen-fotograaf" element={<MeerBoekingenFotograaf />} />
          <Route path="/blog/meer-klanten-schoonmaakbedrijf" element={<MeerKlantenSchoonmaakbedrijf />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminCRM />} />
          <Route path="/klantenportaal" element={<KlantenPortaal />} />

          {/* Legacy redirects */}
          <Route path="/Home" element={<Navigate to="/home" replace />} />
          <Route path="/Planning" element={<Navigate to="/planning" replace />} />
          <Route path="/Prijzen" element={<Navigate to="/prijzen" replace />} />
          <Route path="/Privacy" element={<Navigate to="/privacy" replace />} />
          <Route path="/Proces" element={<Navigate to="/proces" replace />} />
          <Route path="/Starters" element={<Navigate to="/starters" replace />} />
          <Route path="/Templates" element={<Navigate to="/templates" replace />} />
          <Route path="/VedantixHome" element={<Navigate to="/vedantixhome" replace />} />
          <Route path="/VoorWie" element={<Navigate to="/voorwie" replace />} />
          <Route path="/Voorwaarden" element={<Navigate to="/voorwaarden" replace />} />
          <Route path="/FAQ" element={<Navigate to="/faq" replace />} />
          <Route path="/CRM" element={<Navigate to="/admin" replace />} />
          <Route path="/ClientPortal" element={<Navigate to="/klantenportaal" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;