import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";

const Planning = lazy(() => import("./pages/Planning"));
const Prijzen = lazy(() => import("./pages/Prijzen"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Proces = lazy(() => import("./pages/Proces"));
const Starters = lazy(() => import("./pages/Starters"));
const Templates = lazy(() => import("./pages/Templates"));
const VedantixHome = lazy(() => import("./pages/VedantixHome"));
const VoorWie = lazy(() => import("./pages/VoorWie"));
const Voorwaarden = lazy(() => import("./pages/Voorwaarden"));
const FAQ = lazy(() => import("./pages/FAQ"));
const AdminCRM = lazy(() => import("./pages/AdminCRM.jsx"));
const KlantenPortaal = lazy(() => import("./pages/KlantenPortaal.jsx"));
const PricingDetails = lazy(() => import("./pages/PricingDetails.jsx"));

const WebsiteKapper = lazy(() => import("./pages/WebsiteKapper"));
const WebsiteSalon = lazy(() => import("./pages/WebsiteSalon"));
const WebsiteKlusbedrijf = lazy(() => import("./pages/WebsiteKlusbedrijf"));
const WebsiteRestaurant = lazy(() => import("./pages/WebsiteRestaurant"));
const WebsiteFotograaf = lazy(() => import("./pages/WebsiteFotograaf"));
const WebsiteSchoonmaakbedrijf = lazy(() => import("./pages/WebsiteSchoonmaakbedrijf"));
const WebsiteZZP = lazy(() => import("./pages/WebsiteZZP"));

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const SeoCityPage = lazy(() => import("./pages/SeoCityPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/prijzen" element={<Prijzen />} />
            <Route path="/pakketvergelijking" element={<PricingDetails />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/proces" element={<Proces />} />
            <Route path="/starters" element={<Starters />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/vedantixhome" element={<VedantixHome />} />
            <Route path="/voorwie" element={<VoorWie />} />
            <Route path="/voorwaarden" element={<Voorwaarden />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/website-kapper" element={<WebsiteKapper />} />
            <Route path="/website-salon" element={<WebsiteSalon />} />
            <Route path="/website-klusbedrijf" element={<WebsiteKlusbedrijf />} />
            <Route path="/website-restaurant" element={<WebsiteRestaurant />} />
            <Route path="/website-fotograaf" element={<WebsiteFotograaf />} />
            <Route path="/website-schoonmaakbedrijf" element={<WebsiteSchoonmaakbedrijf />} />
            <Route path="/website-zzp" element={<WebsiteZZP />} />

            <Route path="/website/:niche/:stad" element={<SeoCityPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            <Route path="/admin" element={<AdminCRM />} />
            <Route path="/klantenportaal" element={<KlantenPortaal />} />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/Home" element={<Navigate to="/" replace />} />
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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;