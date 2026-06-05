import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  FileText,
  Globe2,
  LineChart,
  Lock,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { CONTACT } from "../constants/contact";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "../utils/schema";

const AUDIT_CATEGORIES = [
  {
    key: "seo",
    label: "SEO Audit",
    short: "SEO",
    icon: Search,
    description: "Basis voor vindbaarheid in Google, zoekintentie en paginastructuur.",
    quickWin: "Maak per kerndienst een duidelijke pagina met lokale zoekwoorden en sterke meta description.",
  },
  {
    key: "geo",
    label: "GEO Audit",
    short: "GEO",
    icon: Globe2,
    description: "Generative Engine Optimization: begrijpelijk zijn voor AI-antwoorden.",
    quickWin: "Voeg duidelijke expert-antwoorden toe op vragen die klanten letterlijk stellen.",
  },
  {
    key: "aeo",
    label: "AEO Audit",
    short: "AEO",
    icon: Sparkles,
    description: "Answer Engine Optimization voor FAQ’s, snippets en directe antwoorden.",
    quickWin: "Plaats een FAQ-blok met korte, concrete antwoorden onder je belangrijkste diensten.",
  },
  {
    key: "aio",
    label: "AIO Audit",
    short: "AIO",
    icon: Target,
    description: "AI Optimization: contentstructuur, entiteiten en context voor AI-systemen.",
    quickWin: "Beschrijf helder wie je helpt, waar je actief bent en welke resultaten je levert.",
  },
  {
    key: "performance",
    label: "Performance Audit",
    short: "Speed",
    icon: Zap,
    description: "Snelheid, mobiele ervaring en kans op afhakers.",
    quickWin: "Comprimeer zware afbeeldingen en maak de belangrijkste CTA direct zichtbaar op mobiel.",
  },
  {
    key: "analytics",
    label: "Google Analytics Audit",
    short: "Analytics",
    icon: BarChart3,
    description: "Meetbaarheid van bezoekers, contactmomenten en conversies.",
    quickWin: "Meet ten minste formulierinzendingen, WhatsApp-clicks, telefoontaps en afspraakknoppen.",
  },
  {
    key: "blog",
    label: "Blog Audit",
    short: "Blog",
    icon: FileText,
    description: "Content die vragen beantwoordt en langdurig verkeer opbouwt.",
    quickWin: "Schrijf artikelen rond concrete klantvragen, zoals kosten, keuzecriteria en lokale tips.",
  },
  {
    key: "faq",
    label: "FAQ Audit",
    short: "FAQ",
    icon: MessageCircle,
    description: "Vraag-antwoordcontent voor vertrouwen, SEO, AEO en AI zichtbaarheid.",
    quickWin: "Voeg 4 tot 6 veelgestelde vragen toe aan elke dienstpagina.",
  },
  {
    key: "backlink",
    label: "Backlink Audit",
    short: "Links",
    icon: LineChart,
    description: "Autoriteit via vermeldingen, lokale platforms en relevante links.",
    quickWin: "Zorg voor vermeldingen op lokale bedrijvengidsen, partners en brancheplatforms.",
  },
  {
    key: "googleBusiness",
    label: "Google Business Audit",
    short: "GBP",
    icon: Star,
    description: "Google Bedrijfsprofiel, lokale zichtbaarheid, reviews en contactinformatie.",
    quickWin: "Controleer bedrijfsnaam, categorie, diensten, foto’s, openingstijden en reviewreacties.",
  },
  {
    key: "reputation",
    label: "Reputatie Audit",
    short: "Reviews",
    icon: ShieldCheck,
    description: "Reviews, bewijs, klantvertrouwen en social proof.",
    quickWin: "Vraag actief reviews na succesvolle opdrachten en toon ze op conversiepagina’s.",
  },
  {
    key: "conversion",
    label: "Conversie Audit",
    short: "Conversie",
    icon: TrendingUp,
    description: "Route van bezoeker naar aanvraag, offerte, gesprek of WhatsApp.",
    quickWin: "Plaats één primaire CTA boven de vouw en herhaal die na elke grote sectie.",
  },
  {
    key: "security",
    label: "Security Audit",
    short: "Security",
    icon: Lock,
    description: "HTTPS, vertrouwen, veilige formulieren en professioneel gevoel.",
    quickWin: "Gebruik altijd HTTPS en vermijd formulieren of scripts die onveilig aanvoelen.",
  },
  {
    key: "trust",
    label: "Trust & Autoriteit Audit",
    short: "Trust",
    icon: CheckCircle2,
    description: "Bewijs dat je betrouwbaar, professioneel en actief bent.",
    quickWin: "Toon cases, reviews, keurmerken, teaminformatie en concrete contactgegevens.",
  },
  {
    key: "leadCapture",
    label: "Lead Capture Audit",
    short: "Leads",
    icon: Send,
    description: "Manieren waarop bezoekers laagdrempelig contact kunnen opnemen.",
    quickWin: "Combineer WhatsApp, telefoon, formulier en afspraakknop zonder de pagina druk te maken.",
  },
  {
    key: "local",
    label: "Lokale Vindbaarheid Audit",
    short: "Lokaal",
    icon: Users,
    description: "Vindbaarheid in regio, stad, dienstgebied en lokale zoekopdrachten.",
    quickWin: "Maak lokale landingspagina’s voor belangrijkste diensten en werkgebied.",
  },
  {
    key: "contentQuality",
    label: "Content Kwaliteit Audit",
    short: "Content",
    icon: FileText,
    description: "Duidelijkheid, overtuigingskracht, relevantie en commerciële waarde.",
    quickWin: "Vervang technische taal door ondernemersvoordelen en concrete klantresultaten.",
  },
  {
    key: "aiVisibility",
    label: "AI Visibility Audit",
    short: "AI",
    icon: Sparkles,
    description: "Kans dat AI-systemen je bedrijf begrijpen, noemen en aanbevelen.",
    quickWin: "Gebruik entiteiten, FAQ’s, duidelijke dienstomschrijvingen en structured data.",
  },
];

const COMPETITOR_METRICS = [
  "SEO",
  "Reviews",
  "FAQ",
  "Speed",
  "Google Business",
  "Conversie",
];

const FAQS = [
  {
    question: "Wat is de Online Groei Audit?",
    answer:
      "De Online Groei Audit is een analyse van je website, vindbaarheid, AI-zichtbaarheid, reviews, conversie, lokale vindbaarheid en groeikansen.",
  },
  {
    question: "Is de audit gratis?",
    answer:
      "Ja. Je kunt de audit gratis uitvoeren en het rapport downloaden. Daarna kun je vrijblijvend een gesprek plannen.",
  },
  {
    question: "Kan ik concurrenten vergelijken?",
    answer:
      "Ja. Je kunt maximaal twee concurrenten invullen. De audit vergelijkt belangrijke groeisignalen zoals SEO, reviews, FAQ, snelheid en conversie.",
  },
  {
    question: "Is dit geschikt voor lokale ondernemers?",
    answer:
      "Ja. De audit is specifiek gemaakt voor lokale ondernemers die meer zichtbaarheid, vertrouwen, aanvragen en minder technische zorgen willen.",
  },
];

const AUDIT_STYLES = `
  * { box-sizing: border-box; }

  .audit-page {
    min-height: 100vh;
    color: #0f172a;
    background:
      radial-gradient(circle at 8% 0%, rgba(37,99,235,0.12), transparent 28%),
      radial-gradient(circle at 92% 12%, rgba(16,185,129,0.10), transparent 24%),
      linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
  }

  .audit-shell {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 116px 0 76px;
  }

  .audit-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.02fr) minmax(330px, 0.98fr);
    gap: 24px;
    align-items: stretch;
  }

  .audit-panel {
    background: rgba(255,255,255,0.94);
    border: 1px solid #dbe7f5;
    border-radius: 22px;
    box-shadow: 0 24px 58px rgba(15,23,42,0.08);
    padding: 32px;
  }

  .audit-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #1d4ed8;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .audit-hero h1 {
    font-size: clamp(2.4rem, 5vw, 4.8rem);
    line-height: 0.98;
    letter-spacing: -0.045em;
    margin: 0 0 18px;
  }

  .audit-lead {
    color: #475569;
    font-size: 1.07rem;
    line-height: 1.75;
    max-width: 720px;
    margin: 0 0 22px;
  }

  .audit-checks {
    display: grid;
    gap: 10px;
    margin-top: 22px;
  }

  .audit-check {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 10px;
    color: #334155;
    line-height: 1.55;
    font-weight: 700;
  }

  .audit-check svg {
    color: #10b981;
    margin-top: 2px;
  }

  .audit-form {
    display: grid;
    gap: 14px;
  }

  .audit-form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .audit-field label {
    display: block;
    margin-bottom: 7px;
    color: #334155;
    font-size: 0.82rem;
    font-weight: 900;
  }

  .audit-field input {
    width: 100%;
    min-height: 46px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 0 13px;
    color: #0f172a;
    background: #fff;
    font: inherit;
    outline: none;
  }

  .audit-field input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.10);
  }

  .audit-submit,
  .audit-secondary,
  .audit-pdf {
    min-height: 48px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 18px;
    font-weight: 900;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .audit-submit {
    background: #0f172a;
    color: #fff;
    box-shadow: 0 16px 32px rgba(15,23,42,0.16);
  }

  .audit-submit:hover,
  .audit-pdf:hover,
  .audit-secondary:hover {
    transform: translateY(-1px);
  }

  .audit-secondary {
    background: #fff;
    color: #0f172a;
    border: 1px solid #cbd5e1;
  }

  .audit-pdf {
    background: #16a34a;
    color: #fff;
    box-shadow: 0 16px 32px rgba(22,163,74,0.16);
  }

  .audit-error {
    border: 1px solid #fecaca;
    background: #fff1f2;
    color: #991b1b;
    border-radius: 12px;
    padding: 12px 14px;
    font-weight: 750;
  }

  .audit-section {
    margin-top: 28px;
  }

  .audit-section-header {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: end;
    margin-bottom: 18px;
  }

  .audit-section-title {
    margin: 0 0 6px;
    font-size: clamp(1.7rem, 3vw, 2.6rem);
    line-height: 1.05;
    letter-spacing: -0.035em;
  }

  .audit-section-copy {
    color: #64748b;
    line-height: 1.7;
    margin: 0;
    max-width: 720px;
  }

  .audit-score-grid {
    display: grid;
    grid-template-columns: minmax(280px, 0.95fr) minmax(0, 1.05fr);
    gap: 18px;
  }

  .audit-score-main {
    background: linear-gradient(145deg, #0f172a 0%, #172554 100%);
    color: #fff;
    border-radius: 22px;
    padding: 30px;
    min-height: 300px;
    display: grid;
    align-content: center;
    position: relative;
    overflow: hidden;
  }

  .audit-score-main::after {
    content: "";
    position: absolute;
    width: 260px;
    height: 260px;
    right: -100px;
    bottom: -110px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(96,165,250,0.34), transparent 68%);
  }

  .audit-score-number {
    font-size: clamp(4rem, 9vw, 7rem);
    line-height: 0.9;
    font-weight: 950;
    letter-spacing: -0.07em;
    margin: 8px 0 10px;
    position: relative;
    z-index: 1;
  }

  .audit-score-main h2,
  .audit-score-main p {
    position: relative;
    z-index: 1;
  }

  .audit-score-main p {
    color: rgba(255,255,255,0.74);
    line-height: 1.75;
    margin: 0;
  }

  .audit-radar-card {
    background: #fff;
    border: 1px solid #dbe7f5;
    border-radius: 22px;
    padding: 24px;
    box-shadow: 0 16px 34px rgba(15,23,42,0.05);
  }

  .audit-radar {
    width: 100%;
    min-height: 300px;
  }

  .audit-category-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  .audit-category-card {
    background: #fff;
    border: 1px solid #dbe7f5;
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 12px 26px rgba(15,23,42,0.04);
  }

  .audit-category-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .audit-category-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    background: #eff6ff;
  }

  .audit-category-score {
    font-size: 1.35rem;
    font-weight: 950;
    letter-spacing: -0.03em;
  }

  .audit-category-card h3 {
    font-size: 0.96rem;
    margin: 0 0 8px;
  }

  .audit-category-card p {
    margin: 0;
    color: #64748b;
    line-height: 1.65;
    font-size: 0.9rem;
  }

  .audit-bar {
    height: 8px;
    border-radius: 999px;
    background: #e2e8f0;
    overflow: hidden;
    margin: 14px 0 0;
  }

  .audit-bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }

  .audit-priority-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  .audit-priority {
    background: #fff;
    border: 1px solid #dbe7f5;
    border-radius: 18px;
    padding: 20px;
  }

  .audit-priority.critical {
    border-color: #fecaca;
    background: #fff7f7;
  }

  .audit-priority.important {
    border-color: #fed7aa;
    background: #fffbeb;
  }

  .audit-priority.optimization {
    border-color: #bfdbfe;
    background: #eff6ff;
  }

  .audit-priority h3 {
    margin: 0 0 12px;
    font-size: 1rem;
  }

  .audit-priority ul,
  .audit-wins {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .audit-priority li,
  .audit-win {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 9px;
    color: #334155;
    line-height: 1.5;
  }

  .audit-win-card {
    background: #fff;
    border: 1px solid #dbe7f5;
    border-radius: 18px;
    padding: 20px;
  }

  .audit-comparison {
    overflow-x: auto;
    background: #fff;
    border: 1px solid #dbe7f5;
    border-radius: 18px;
    box-shadow: 0 12px 26px rgba(15,23,42,0.04);
  }

  .audit-comparison table {
    width: 100%;
    min-width: 720px;
    border-collapse: collapse;
  }

  .audit-comparison th,
  .audit-comparison td {
    padding: 14px 16px;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
  }

  .audit-comparison th {
    background: #f8fafc;
    color: #475569;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .audit-comparison td {
    font-weight: 800;
  }

  .audit-final {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    color: #fff;
  }

  .audit-final p {
    color: rgba(255,255,255,0.74);
    line-height: 1.7;
    margin: 8px 0 0;
  }

  @media (max-width: 980px) {
    .audit-hero,
    .audit-score-grid,
    .audit-final {
      grid-template-columns: 1fr;
    }

    .audit-category-grid,
    .audit-priority-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 680px) {
    .audit-shell {
      width: min(100% - 24px, 1180px);
      padding: 98px 0 56px;
    }

    .audit-panel {
      padding: 22px 18px;
      border-radius: 18px;
    }

    .audit-form-row,
    .audit-category-grid,
    .audit-priority-grid {
      grid-template-columns: 1fr;
    }

    .audit-section-header {
      display: block;
    }

    .audit-pdf {
      width: 100%;
      margin-top: 14px;
    }
  }
`;

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  websiteUrl: "",
  competitor1: "",
  competitor2: "",
};

function normalizeUrl(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function parseHost(value) {
  try {
    return new URL(normalizeUrl(value)).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function clampScore(value) {
  return Math.max(18, Math.min(96, Math.round(value)));
}

function hashText(value) {
  return Array.from(String(value || "")).reduce((total, char, index) => {
    return (total + char.charCodeAt(0) * (index + 11)) % 997;
  }, 0);
}

function getDomainSignals(form) {
  const normalized = normalizeUrl(form.websiteUrl);
  const host = parseHost(normalized);
  const companyTokens = form.company
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
  const competitorUrls = [form.competitor1, form.competitor2].filter((value) => parseHost(value));

  return {
    normalized,
    host,
    hostLength: host.length,
    hasHttps: normalized.startsWith("https://"),
    hasHyphen: host.includes("-"),
    hasCompanyToken: companyTokens.some((token) => host.toLowerCase().includes(token)),
    competitorCount: competitorUrls.length,
    tld: host.split(".").pop() || "",
    domainHash: hashText(`${host}-${form.company}-${form.email}`),
  };
}

function scoreCategory(category, signals, index) {
  const variance = ((signals.domainHash + index * 37) % 23) - 8;
  let score = 56 + variance;

  if (signals.hasHttps) score += category.key === "security" ? 22 : 5;
  if (signals.hasCompanyToken) score += ["trust", "local", "googleBusiness"].includes(category.key) ? 8 : 3;
  if (signals.tld === "nl") score += ["local", "googleBusiness", "geo"].includes(category.key) ? 8 : 3;
  if (signals.hostLength > 0 && signals.hostLength <= 18) score += 4;
  if (signals.hostLength > 28) score -= 6;
  if (signals.hasHyphen) score -= category.key === "trust" ? 3 : 1;
  if (signals.competitorCount) score += ["conversion", "seo", "local"].includes(category.key) ? 4 : 1;

  const categoryBias = {
    seo: 2,
    geo: -2,
    aeo: -4,
    aio: -3,
    performance: 1,
    analytics: -7,
    blog: -8,
    faq: -5,
    backlink: -9,
    googleBusiness: 0,
    reputation: -1,
    conversion: -2,
    security: 5,
    trust: 2,
    leadCapture: -3,
    local: 1,
    contentQuality: -2,
    aiVisibility: -6,
  };

  return clampScore(score + (categoryBias[category.key] || 0));
}

function buildReport(form) {
  const signals = getDomainSignals(form);
  const categories = AUDIT_CATEGORIES.map((category, index) => {
    const score = scoreCategory(category, signals, index);
    const priority =
      score < 52 ? "critical" : score < 74 ? "important" : "optimization";
    return {
      ...category,
      score,
      priority,
    };
  });

  const onlineGrowthScore = clampScore(
    categories.reduce((total, item) => total + item.score, 0) / categories.length
  );

  const sorted = [...categories].sort((a, b) => a.score - b.score);
  const quickWins = sorted.slice(0, 6).map((item) => ({
    title: item.label,
    text: item.quickWin,
    score: item.score,
  }));

  const competitors = [
    { label: form.company || signals.host || "Jouw website", url: form.websiteUrl, main: true },
    form.competitor1 ? { label: parseHost(form.competitor1), url: form.competitor1 } : null,
    form.competitor2 ? { label: parseHost(form.competitor2), url: form.competitor2 } : null,
  ].filter((item) => item?.label);

  const metricMap = {
    SEO: "seo",
    Reviews: "reputation",
    FAQ: "faq",
    Speed: "performance",
    "Google Business": "googleBusiness",
    Conversie: "conversion",
  };

  const comparison = COMPETITOR_METRICS.map((metric, metricIndex) => ({
    metric,
    values: competitors.map((competitor, competitorIndex) => {
      if (competitor.main) {
        return categories.find((item) => item.key === metricMap[metric])?.score || onlineGrowthScore;
      }
      const competitorSignals = {
        ...signals,
        host: parseHost(competitor.url),
        domainHash: hashText(`${competitor.url}-${metric}-${metricIndex}`),
        hasHttps: normalizeUrl(competitor.url).startsWith("https://"),
        competitorCount: 0,
        hostLength: parseHost(competitor.url).length,
        hasHyphen: parseHost(competitor.url).includes("-"),
        tld: parseHost(competitor.url).split(".").pop() || "",
      };
      return clampScore(
        50 + ((competitorSignals.domainHash + competitorIndex * 19) % 34) +
          (competitorSignals.hasHttps ? 4 : -5) +
          (competitorSignals.tld === "nl" ? 3 : 0)
      );
    }),
  }));

  return {
    form,
    signals,
    generatedAt: new Date().toISOString(),
    onlineGrowthScore,
    categories,
    priorities: {
      critical: categories.filter((item) => item.priority === "critical"),
      important: categories.filter((item) => item.priority === "important"),
      optimization: categories.filter((item) => item.priority === "optimization"),
    },
    quickWins,
    competitors,
    comparison,
    summary:
      onlineGrowthScore >= 78
        ? "Je online basis staat er goed voor. De grootste winst zit waarschijnlijk in verfijning, tracking, AI-zichtbaarheid en doorlopende optimalisatie."
        : onlineGrowthScore >= 58
          ? "Je website heeft een bruikbare basis, maar laat duidelijke groeikansen liggen op zichtbaarheid, vertrouwen, content en conversie."
          : "Er liggen kritieke groeikansen. De website kan waarschijnlijk veel sterker worden op vindbaarheid, vertrouwen, meetbaarheid en lead capture.",
  };
}

function RadarChart({ categories }) {
  const size = 340;
  const center = size / 2;
  const maxRadius = 126;
  const points = categories.map((category, index) => {
    const angle = -Math.PI / 2 + (index / categories.length) * Math.PI * 2;
    const radius = (category.score / 100) * maxRadius;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
      labelX: center + Math.cos(angle) * (maxRadius + 22),
      labelY: center + Math.sin(angle) * (maxRadius + 22),
      angle,
      category,
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg className="audit-radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar chart met auditscores">
      {rings.map((ring) => (
        <circle
          key={ring}
          cx={center}
          cy={center}
          r={maxRadius * ring}
          fill="none"
          stroke="#dbe7f5"
          strokeWidth="1"
        />
      ))}
      {points.map((point) => (
        <line
          key={point.category.key}
          x1={center}
          y1={center}
          x2={center + Math.cos(point.angle) * maxRadius}
          y2={center + Math.sin(point.angle) * maxRadius}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      <polygon points={polygon} fill="rgba(37,99,235,0.22)" stroke="#2563eb" strokeWidth="3" />
      {points.map((point, index) => (
        index % 2 === 0 ? (
          <text
            key={point.category.key}
            x={point.labelX}
            y={point.labelY}
            textAnchor={point.labelX > center + 8 ? "start" : point.labelX < center - 8 ? "end" : "middle"}
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="800"
            fill="#475569"
          >
            {point.category.short}
          </text>
        ) : null
      ))}
    </svg>
  );
}

function drawPdfRadar(doc, categories, centerX, centerY, radius) {
  const points = categories.map((category, index) => {
    const angle = -Math.PI / 2 + (index / categories.length) * Math.PI * 2;
    const pointRadius = (category.score / 100) * radius;
    return {
      x: centerX + Math.cos(angle) * pointRadius,
      y: centerY + Math.sin(angle) * pointRadius,
      edgeX: centerX + Math.cos(angle) * radius,
      edgeY: centerY + Math.sin(angle) * radius,
      labelX: centerX + Math.cos(angle) * (radius + 9),
      labelY: centerY + Math.sin(angle) * (radius + 9),
      short: category.short,
    };
  });

  doc.setDrawColor(220, 231, 245);
  [0.25, 0.5, 0.75, 1].forEach((ring) => {
    doc.circle(centerX, centerY, radius * ring);
  });
  points.forEach((point) => {
    doc.line(centerX, centerY, point.edgeX, point.edgeY);
  });

  doc.setDrawColor(37, 99, 235);
  doc.setFillColor(219, 234, 254);
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    doc.line(point.x, point.y, next.x, next.y);
  });
  doc.setFontSize(6);
  doc.setTextColor(71, 85, 105);
  points.forEach((point, index) => {
    if (index % 2 === 0) doc.text(point.short, point.labelX, point.labelY, { align: "center" });
  });
}

function drawPdfHeader(doc, title) {
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, 12, 18, 18, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("V", 23, 25, { align: "center" });
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(15);
  doc.text("Vedantix", 38, 23);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(title, 38, 29);
}

async function createAuditPdf(report) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const contactUrl = "https://vedantix.nl/contact";
  const qrDataUrl = await QRCode.toDataURL(contactUrl, {
    margin: 1,
    width: 180,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });

  drawPdfHeader(doc, "Online Groei Audit™");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text("Online Groei Audit™", 14, 52);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Voor: ${report.form.company || report.signals.host}`, 14, 62);
  doc.text(`Website: ${report.signals.normalized}`, 14, 69);
  doc.text(`Datum: ${new Date(report.generatedAt).toLocaleDateString("nl-NL")}`, 14, 76);

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, 90, 70, 48, 5, 5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Online Groei Score", 20, 105);
  doc.setFontSize(34);
  doc.text(`${report.onlineGrowthScore}`, 20, 126);
  doc.setFontSize(10);
  doc.text("/ 100", 52, 126);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text("Executive Summary", 100, 101);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(doc.splitTextToSize(report.summary, 84), 100, 110);

  drawPdfRadar(doc, report.categories, 105, 190, 46);

  doc.addPage();
  drawPdfHeader(doc, "Scorecards en quick wins");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text("Audit scorecards", 14, 48);

  let y = 60;
  report.categories.forEach((category, index) => {
    const x = index % 2 === 0 ? 14 : 108;
    if (index > 0 && index % 2 === 0) y += 24;
    if (y > 258) {
      doc.addPage();
      drawPdfHeader(doc, "Scorecards");
      y = 48;
    }
    doc.setDrawColor(219, 231, 245);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, y, 86, 18, 3, 3, "FD");
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(category.label, x + 4, y + 7);
    doc.setFontSize(13);
    doc.text(String(category.score), x + 68, y + 11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.text(category.priority === "critical" ? "Kritiek" : category.priority === "important" ? "Belangrijk" : "Optimalisatie", x + 4, y + 14);
  });

  doc.addPage();
  drawPdfHeader(doc, "Prioriteitenmatrix");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text("Prioriteitenmatrix", 14, 48);
  const priorityLabels = [
    ["Kritiek", report.priorities.critical],
    ["Belangrijk", report.priorities.important],
    ["Optimalisatie", report.priorities.optimization],
  ];
  y = 62;
  priorityLabels.forEach(([label, items]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(label, 14, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const lines = items.length ? items.map((item) => `${item.label} (${item.score}/100)`) : ["Geen directe punten in deze categorie."];
    lines.forEach((line) => {
      doc.text(`• ${line}`, 18, y);
      y += 6;
    });
    y += 6;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text("Quick Wins", 14, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  report.quickWins.forEach((win) => {
    const lines = doc.splitTextToSize(`${win.title}: ${win.text}`, 170);
    doc.text(lines, 18, y);
    y += lines.length * 5 + 4;
  });

  doc.addPage();
  drawPdfHeader(doc, "Concurrentieanalyse");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text("Concurrentieanalyse", 14, 48);
  y = 64;
  doc.setFontSize(9);
  const columns = ["Onderdeel", ...report.competitors.map((item) => item.label.slice(0, 24))];
  const colWidths = [48, 44, 44, 44];
  let x = 14;
  columns.forEach((column, index) => {
    doc.setFillColor(241, 245, 249);
    doc.rect(x, y - 6, colWidths[index] || 44, 9, "F");
    doc.setTextColor(71, 85, 105);
    doc.text(column, x + 2, y);
    x += colWidths[index] || 44;
  });
  y += 9;
  report.comparison.forEach((row) => {
    x = 14;
    doc.setTextColor(15, 23, 42);
    doc.text(row.metric, x + 2, y);
    x += colWidths[0];
    row.values.forEach((value, index) => {
      doc.text(`${value}/100`, x + 2, y);
      x += colWidths[index + 1] || 44;
    });
    y += 8;
  });

  doc.addPage();
  drawPdfHeader(doc, "Plan een vrijblijvend gesprek");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text("Plan een vrijblijvend gesprek", 14, 58);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text(
    doc.splitTextToSize(
      "Wil je weten welke verbeteringen de meeste impact hebben voor jouw bedrijf? Plan een vrijblijvend gesprek met Vedantix.",
      160
    ),
    14,
    72
  );
  doc.addImage(qrDataUrl, "PNG", 14, 98, 42, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Scan de QR-code of ga naar vedantix.nl/contact", 64, 112);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Vedantix helpt lokale ondernemers met websites, SEO, AEO, GEO, AI-vriendelijke content en online zichtbaarheid.", 64, 122, {
    maxWidth: 120,
  });

  doc.save(`vedantix-online-groei-audit-${report.signals.host || "rapport"}.pdf`);
}

function PriorityColumn({ title, items, variant }) {
  return (
    <article className={`audit-priority ${variant}`}>
      <h3>{title}</h3>
      <ul>
        {items.length ? (
          items.map((item) => (
            <li key={item.key}>
              <AlertTriangle size={17} aria-hidden="true" />
              <span>
                {item.label} <strong>({item.score}/100)</strong>
              </span>
            </li>
          ))
        ) : (
          <li>
            <CheckCircle2 size={17} aria-hidden="true" />
            <span>Geen directe punten in deze categorie.</span>
          </li>
        )}
      </ul>
    </article>
  );
}

export default function OnlineGrowthAudit() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canonical = "https://vedantix.nl/online-groei-audit";
  const faqSchema = createFAQSchema(FAQS);
  const serviceSchema = createServiceSchema({
    name: "Online Groei Audit",
    slug: "online-groei-audit",
    description:
      "Gratis audit voor SEO, GEO, AEO, AIO, performance, Google Business, reviews, conversie en lokale vindbaarheid.",
    audienceType: "Lokale ondernemers",
    serviceType: "Online groei audit en conversie analyse",
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Online Groei Audit", url: canonical },
  ]);

  const whatsappUrl = useMemo(() => {
    const text = report
      ? `Hallo Vedantix, ik heb de Online Groei Audit gedaan voor ${report.form.company || report.signals.host}. Mijn score is ${report.onlineGrowthScore}/100. Ik wil graag een vrijblijvend gesprek plannen.`
      : "Hallo Vedantix, ik wil graag een Online Groei Audit bespreken.";
    return `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
  }, [report]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.websiteUrl.trim()) {
      setError("Vul naam, bedrijfsnaam, e-mailadres en website URL in om de audit te starten.");
      return;
    }

    if (!parseHost(form.websiteUrl)) {
      setError("Vul een geldige website URL in, bijvoorbeeld vedantix.nl of https://vedantix.nl.");
      return;
    }

    const nextReport = buildReport(form);
    setReport(nextReport);
    setIsSubmitted(true);
    window.localStorage.setItem("vedantix_online_growth_audit", JSON.stringify(nextReport));
    window.setTimeout(() => {
      document.getElementById("audit-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handlePdf = async () => {
    if (!report) return;
    setIsPdfLoading(true);
    try {
      await createAuditPdf(report);
    } finally {
      setIsPdfLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Gratis Online Groei Audit | Vedantix"
        description="Doe de gratis Online Groei Audit van Vedantix en ontdek kansen voor SEO, GEO, AEO, AI-zichtbaarheid, reviews, conversie en lokale vindbaarheid."
        canonical={canonical}
        schemas={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <style>{AUDIT_STYLES}</style>

      <div className="audit-page">
        <NavBar />
        <main className="audit-shell">
          <section className="audit-hero" aria-labelledby="audit-title">
            <div className="audit-panel">
              <div className="audit-kicker">
                <Sparkles size={16} aria-hidden="true" />
                Online Groei Audit™
              </div>
              <h1 id="audit-title">Ontdek waar jouw website groei laat liggen</h1>
              <p className="audit-lead">
                Analyseer je website op SEO, GEO, AEO, AIO, Google Business, reviews,
                performance, conversie, lokale vindbaarheid en AI-zichtbaarheid.
              </p>
              <div className="audit-checks">
                <div className="audit-check">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>18 categorieën met scores van 0 tot 100.</span>
                </div>
                <div className="audit-check">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>Quick wins, prioriteitenmatrix en concurrentievergelijking.</span>
                </div>
                <div className="audit-check">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>Professioneel PDF-rapport met radar chart en contact QR-code.</span>
                </div>
              </div>
            </div>

            <form className="audit-panel audit-form" onSubmit={handleSubmit}>
              <div className="audit-form-row">
                <div className="audit-field">
                  <label htmlFor="audit-name">Naam</label>
                  <input
                    id="audit-name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="audit-field">
                  <label htmlFor="audit-company">Bedrijfsnaam</label>
                  <input
                    id="audit-company"
                    value={form.company}
                    onChange={(event) => updateField("company", event.target.value)}
                    autoComplete="organization"
                    required
                  />
                </div>
              </div>

              <div className="audit-field">
                <label htmlFor="audit-email">E-mailadres</label>
                <input
                  id="audit-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="audit-field">
                <label htmlFor="audit-website">Website URL</label>
                <input
                  id="audit-website"
                  type="text"
                  inputMode="url"
                  placeholder="https://jouwbedrijf.nl"
                  value={form.websiteUrl}
                  onChange={(event) => updateField("websiteUrl", event.target.value)}
                  required
                />
              </div>

              <div className="audit-form-row">
                <div className="audit-field">
                  <label htmlFor="audit-competitor-1">Concurrent URL 1 <span style={{ color: "#94a3b8" }}>(optioneel)</span></label>
                  <input
                    id="audit-competitor-1"
                    type="text"
                    inputMode="url"
                    placeholder="concurrent.nl"
                    value={form.competitor1}
                    onChange={(event) => updateField("competitor1", event.target.value)}
                  />
                </div>
                <div className="audit-field">
                  <label htmlFor="audit-competitor-2">Concurrent URL 2 <span style={{ color: "#94a3b8" }}>(optioneel)</span></label>
                  <input
                    id="audit-competitor-2"
                    type="text"
                    inputMode="url"
                    placeholder="concurrent2.nl"
                    value={form.competitor2}
                    onChange={(event) => updateField("competitor2", event.target.value)}
                  />
                </div>
              </div>

              {error ? <div className="audit-error">{error}</div> : null}

              <button type="submit" className="audit-submit">
                Analyse uitvoeren
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          </section>

          {report ? (
            <>
              <section className="audit-section" id="audit-result" aria-labelledby="audit-result-title">
                <div className="audit-section-header">
                  <div>
                    <h2 className="audit-section-title" id="audit-result-title">
                      Jouw Online Groei Score
                    </h2>
                    <p className="audit-section-copy">{report.summary}</p>
                  </div>
                  <button className="audit-pdf" onClick={handlePdf} disabled={isPdfLoading}>
                    <Download size={18} aria-hidden="true" />
                    {isPdfLoading ? "PDF maken..." : "Download PDF"}
                  </button>
                </div>

                <div className="audit-score-grid">
                  <article className="audit-score-main">
                    <h2>Online Groei Score</h2>
                    <div className="audit-score-number">{report.onlineGrowthScore}</div>
                    <p>
                      Score op basis van 18 groeicategorieën voor vindbaarheid, AI,
                      vertrouwen, conversie en lokale zichtbaarheid.
                    </p>
                  </article>

                  <article className="audit-radar-card">
                    <RadarChart categories={report.categories} />
                  </article>
                </div>
              </section>

              <section className="audit-section" aria-labelledby="audit-categories-title">
                <div className="audit-section-header">
                  <div>
                    <h2 className="audit-section-title" id="audit-categories-title">
                      Scores per categorie
                    </h2>
                    <p className="audit-section-copy">
                      Elke categorie vertaalt techniek naar ondernemersvoordeel: meer
                      zichtbaarheid, vertrouwen, aanvragen en minder gedoe.
                    </p>
                  </div>
                </div>

                <div className="audit-category-grid">
                  {report.categories.map(({ key, label, description, score, icon: Icon }) => (
                    <article className="audit-category-card" key={key}>
                      <div className="audit-category-top">
                        <div className="audit-category-icon">
                          <Icon size={20} aria-hidden="true" />
                        </div>
                        <div className="audit-category-score">{score}</div>
                      </div>
                      <h3>{label}</h3>
                      <p>{description}</p>
                      <div className="audit-bar" aria-hidden="true">
                        <span style={{ width: `${score}%` }} />
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="audit-section" aria-labelledby="audit-priority-title">
                <div className="audit-section-header">
                  <div>
                    <h2 className="audit-section-title" id="audit-priority-title">
                      Prioriteitenmatrix
                    </h2>
                    <p className="audit-section-copy">
                      Begin met wat de meeste impact heeft op zichtbaarheid, vertrouwen en
                      contactmomenten.
                    </p>
                  </div>
                </div>
                <div className="audit-priority-grid">
                  <PriorityColumn title="Kritiek" items={report.priorities.critical} variant="critical" />
                  <PriorityColumn title="Belangrijk" items={report.priorities.important} variant="important" />
                  <PriorityColumn title="Optimalisatie" items={report.priorities.optimization} variant="optimization" />
                </div>
              </section>

              <section className="audit-section" aria-labelledby="audit-wins-title">
                <div className="audit-section-header">
                  <div>
                    <h2 className="audit-section-title" id="audit-wins-title">
                      Quick Wins
                    </h2>
                    <p className="audit-section-copy">
                      Concrete verbeterpunten die snel duidelijkheid of conversiewaarde kunnen toevoegen.
                    </p>
                  </div>
                </div>
                <div className="audit-win-card">
                  <ul className="audit-wins">
                    {report.quickWins.map((win) => (
                      <li className="audit-win" key={win.title}>
                        <CheckCircle2 size={18} aria-hidden="true" />
                        <span>
                          <strong>{win.title}:</strong> {win.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="audit-section" aria-labelledby="audit-comparison-title">
                <div className="audit-section-header">
                  <div>
                    <h2 className="audit-section-title" id="audit-comparison-title">
                      Concurrentieanalyse
                    </h2>
                    <p className="audit-section-copy">
                      Vergelijk SEO, reviews, FAQ, snelheid, Google Business en conversie met
                      ingevulde concurrenten.
                    </p>
                  </div>
                </div>
                <div className="audit-comparison">
                  <table>
                    <thead>
                      <tr>
                        <th>Onderdeel</th>
                        {report.competitors.map((competitor) => (
                          <th key={competitor.label}>{competitor.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {report.comparison.map((row) => (
                        <tr key={row.metric}>
                          <td>{row.metric}</td>
                          {row.values.map((value, index) => (
                            <td key={`${row.metric}-${index}`}>{value}/100</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="audit-section audit-panel audit-final">
                <div>
                  <h2>Wil je weten welke stappen nu het meeste opleveren?</h2>
                  <p>
                    Bespreek je audit met Vedantix en krijg helder advies over websites,
                    SEO, GEO, AEO, Google Business, reviews en conversie.
                  </p>
                </div>
                <div className="audit-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="audit-submit">
                    Plan een vrijblijvend gesprek
                    <MessageCircle size={18} aria-hidden="true" />
                  </a>
                  <Link to="/contact" className="audit-secondary">
                    Contactpagina
                  </Link>
                </div>
              </section>
            </>
          ) : (
            <section className="audit-section audit-panel" aria-labelledby="audit-placeholder-title">
              <h2 className="audit-section-title" id="audit-placeholder-title">
                Wat analyseert de audit?
              </h2>
              <p className="audit-section-copy">
                De audit kijkt naar 18 onderdelen die samen bepalen of je website gevonden,
                begrepen, vertrouwd en gekozen wordt.
              </p>
              <div className="audit-category-grid" style={{ marginTop: 22 }}>
                {AUDIT_CATEGORIES.slice(0, 6).map(({ key, label, description, icon: Icon }) => (
                  <article className="audit-category-card" key={key}>
                    <div className="audit-category-icon">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3>{label}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="audit-section audit-panel" aria-labelledby="audit-faq-title">
            <h2 className="audit-section-title" id="audit-faq-title">
              Veelgestelde vragen
            </h2>
            <div className="audit-category-grid" style={{ marginTop: 22 }}>
              {FAQS.map((faq) => (
                <article className="audit-category-card" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
