import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MetaPixel from "./components/MetaPixel";
import BigFooter from "./components/BigFooter";
const Home = lazy(() => import("./pages/Home"));
const Planning = lazy(() => import("./pages/Planning"));
const Prijzen = lazy(() => import("./pages/Prijzen"));
const Privacy = lazy(() => import("./pages/Privacy"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));
const Groeimodel = lazy(() => import("./pages/Groeimodel"));
const Proces = lazy(() => import("./pages/Proces"));
const Starters = lazy(() => import("./pages/Starters"));
const Templates = lazy(() => import("./pages/Templates"));
const VedantixHome = lazy(() => import("./pages/VedantixHome"));
const VoorWie = lazy(() => import("./pages/VoorWie"));
const Voorwaarden = lazy(() => import("./pages/Voorwaarden"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const CustomerPreviewPage = lazy(() => import("./pages/CustomerPreviewPage.jsx"));
const Base44LoginRedirect = lazy(() => import("./pages/Base44LoginRedirect.jsx"));
const Resultaten = lazy(() => import("./pages/Resultaten.jsx"));
const IndustryPage = lazy(() => import("./pages/IndustryPage.jsx"));
const OnlineGrowthAudit = lazy(() => import("./pages/OnlineGrowthAudit.jsx"));
const AiVindbaarheid = lazy(() => import("./pages/AiVindbaarheid.jsx"));

const WebsiteKapper = lazy(() => import("./pages/WebsiteKapper"));
const WebsiteSalon = lazy(() => import("./pages/WebsiteSalon"));
const WebsiteKlusbedrijf = lazy(() => import("./pages/WebsiteKlusbedrijf"));
const WebsiteRestaurant = lazy(() => import("./pages/WebsiteRestaurant"));
const WebsiteFotograaf = lazy(() => import("./pages/WebsiteFotograaf"));
const WebsiteSchoonmaakbedrijf = lazy(() => import("./pages/WebsiteSchoonmaakbedrijf"));
const WebsiteZZP = lazy(() => import("./pages/WebsiteZZP"));

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

const KlantenPortaal = lazy(() => import("./pages/KlantenPortaal.jsx"));

const queryClient = new QueryClient();

function PortalApp({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

function PublicLayout() {
  return (
    <>
      <Outlet />
      <BigFooter />
    </>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <MetaPixel />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/prijzen" element={<Prijzen />} />
          <Route path="/pakketvergelijking" element={<Navigate to="/prijzen#vergelijk" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Voorwaarden />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/groeimodel" element={<Groeimodel />} />
          <Route path="/proces" element={<Proces />} />
          <Route path="/starters" element={<Starters />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/vedantixhome" element={<VedantixHome />} />
          <Route path="/voorwie" element={<VoorWie />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resultaten" element={<Resultaten />} />
          <Route path="/online-groei-audit" element={<OnlineGrowthAudit />} />
          <Route path="/ai-vindbaarheid" element={<AiVindbaarheid />} />

          <Route path="/website-kapper" element={<WebsiteKapper />} />
          <Route path="/website-salon" element={<WebsiteSalon />} />
          <Route path="/website-klusbedrijf" element={<WebsiteKlusbedrijf />} />
          <Route path="/website-restaurant" element={<WebsiteRestaurant />} />
          <Route path="/website-fotograaf" element={<WebsiteFotograaf />} />
          <Route path="/website-schoonmaakbedrijf" element={<WebsiteSchoonmaakbedrijf />} />
          <Route path="/website-zzp" element={<WebsiteZZP />} />

          <Route path="/website/:branche" element={<IndustryPage />} />
          <Route path="/website/:branche/:stad" element={<IndustryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>

        <Route path="/voorwaarden" element={<Navigate to="/terms" replace />} />

        <Route path="/login" element={<Base44LoginRedirect />} />

        <Route
          path="/klantenportaal"
          element={
            <PortalApp>
              <KlantenPortaal />
            </PortalApp>
          }
        />
        <Route path="/klantenportaal/login" element={<Navigate to="/klantenportaal" replace />} />
        <Route path="/clientportal/login" element={<Navigate to="/klantenportaal" replace />} />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/Home" element={<Navigate to="/" replace />} />
        <Route path="/Planning" element={<Navigate to="/planning" replace />} />
        <Route path="/Prijzen" element={<Navigate to="/prijzen" replace />} />
        <Route path="/Privacy" element={<Navigate to="/privacy" replace />} />
        <Route path="/Groeimodel" element={<Navigate to="/groeimodel" replace />} />
        <Route path="/Proces" element={<Navigate to="/proces" replace />} />
        <Route path="/Starters" element={<Navigate to="/starters" replace />} />
        <Route path="/Templates" element={<Navigate to="/templates" replace />} />
        <Route path="/VedantixHome" element={<Navigate to="/vedantixhome" replace />} />
        <Route path="/VoorWie" element={<Navigate to="/voorwie" replace />} />
        <Route path="/Voorwaarden" element={<Navigate to="/terms" replace />} />
        <Route path="/Terms" element={<Navigate to="/terms" replace />} />
        <Route path="/DataDeletion" element={<Navigate to="/data-deletion" replace />} />
        <Route path="/FAQ" element={<Navigate to="/faq" replace />} />
        <Route path="/Contact" element={<Navigate to="/contact" replace />} />
        <Route path="/ClientPortal" element={<Navigate to="/klantenportaal" replace />} />

        <Route path="/admin/*" element={<Navigate to="/" replace />} />
        <Route path="/CRM" element={<Navigate to="/" replace />} />
        <Route path="/:previewSlug" element={<CustomerPreviewPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
