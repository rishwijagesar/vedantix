import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import SEO from "../components/SEO";
import NavBar from "../components/NavBar";
import { fetchPricingSummary } from "../api/pricing.api";
import { CONTACT } from "../constants/contact";
import { createBreadcrumbSchema } from "../utils/schema";
import "../styles/prijzen.css";

const FALLBACK_PACKAGES = [
  {
    code: "STARTER",
    label: "Starter",
    description: "Voor starters en kleine lokale bedrijven.",
    monthlyPriceInclVat: 99,
    setupPriceInclVat: 999,
    featured: false,
    isActive: true,
    sortOrder: 1,
    fit: "Snel professioneel zichtbaar",
    cancelNote: "Maandelijks opzegbaar na oplevering",
    cta: "Kies Starter",
    bullets: [
      "Professionele website voor een sterke eerste indruk",
      "Hosting, SSL en basis onderhoud inbegrepen",
      "Contactformulier en WhatsApp CTA",
    ],
  },
  {
    code: "GROWTH",
    label: "Growth",
    description: "Voor bedrijven die meer aanvragen willen.",
    monthlyPriceInclVat: 149,
    setupPriceInclVat: 1499,
    featured: true,
    isActive: true,
    sortOrder: 2,
    fit: "Meer vertrouwen en meer contactmomenten",
    cancelNote: "Maandelijks opzegbaar na oplevering",
    cta: "Kies Growth",
    bullets: [
      "Meer pagina's en sterkere dienstenstructuur",
      "Reviews, FAQ en lokale SEO-basis",
      "Betere basis voor Google en conversie",
    ],
  },
  {
    code: "PRO",
    label: "Pro",
    description: "Voor bedrijven die online serieus willen doorgroeien.",
    monthlyPriceInclVat: 249,
    setupPriceInclVat: 1999,
    featured: false,
    isActive: true,
    sortOrder: 3,
    fit: "Meer autoriteit en ruimte voor maatwerk",
    cancelNote: "Maandelijks opzegbaar na oplevering",
    cta: "Ga voor Pro",
    bullets: [
      "Uitgebreidere website en commerciële positionering",
      "Meer content, optimalisatie en support",
      "Geschikt voor bedrijven met groeiplannen",
    ],
  },
];

const PACKAGE_VALUE_COPY = {
  STARTER: {
    tone: "starter",
    bestFor: "Voor een professionele basis",
    outcome: "Je staat goed online zonder technische zorgen.",
  },
  GROWTH: {
    tone: "growth",
    bestFor: "Meest gekozen voor lokale groei",
    outcome: "Meer pagina's, meer vertrouwen en meer aanvragen.",
  },
  PRO: {
    tone: "pro",
    bestFor: "Voor maximale online slagkracht",
    outcome: "Meer maatwerk, content en doorlopende optimalisatie.",
  },
  CUSTOM: {
    tone: "custom",
    bestFor: "Voor afwijkende trajecten",
    outcome: "Een oplossing die aansluit op jouw proces.",
  },
};

const PACKAGE_OUTCOME_COPY = {
  STARTER: {
    badge: "Voor starters en lokale ondernemers",
    title: "Professioneel zichtbaar worden",
    intro:
      "Ideaal voor ondernemers die online serieus genomen willen worden en een professionele eerste indruk willen maken.",
    benefits: [
      "Professionele uitstraling",
      "Klanten kunnen je online vinden",
      "Meer vertrouwen bij potentiële klanten",
      "Betere eerste indruk",
      "Geen technische zorgen",
    ],
    result:
      "Je bedrijf staat professioneel online en maakt direct een betere indruk op potentiële klanten.",
  },
  GROWTH: {
    badge: "Voor ondernemers die willen groeien",
    title: "Meer kansen op nieuwe klanten",
    intro:
      "Voor ondernemers die hun website actief willen inzetten om meer aanvragen en contactmomenten te genereren.",
    benefits: [
      "Meer zichtbaarheid in Google",
      "Meer bezoekers op je website",
      "Meer contactaanvragen",
      "Meer WhatsApp gesprekken",
      "Sterkere positie tegenover lokale concurrenten",
      "Meer kansen op nieuwe klanten",
    ],
    result:
      "Je website wordt een actief marketingkanaal in plaats van alleen een online visitekaartje.",
  },
  PRO: {
    badge: "Voor ondernemers die willen vooroplopen",
    title: "Online groeien met een langetermijnstrategie",
    intro:
      "Voor ondernemers die online willen investeren in zichtbaarheid, autoriteit en continue groei.",
    benefits: [
      "Maximale online zichtbaarheid",
      "Doorlopende optimalisatie",
      "Sterkere marktpositie",
      "Meer autoriteit binnen jouw branche",
      "Meer kwalitatieve aanvragen",
      "Continue verbetering van prestaties",
      "Een website die meegroeit met jouw bedrijf",
    ],
    result:
      "Een complete online groeistrategie die blijft bijdragen aan de ontwikkeling van je bedrijf.",
  },
  CUSTOM: {
    badge: "Voor ondernemers met maatwerkwensen",
    title: "Een groeiaanpak op maat",
    intro:
      "Voor bedrijven met afwijkende wensen, specifieke processen of extra functionaliteit.",
    benefits: [
      "Oplossing afgestemd op jouw bedrijf",
      "Ruimte voor specifieke workflows",
      "Techniek die aansluit op je groeiplannen",
    ],
    result:
      "Je krijgt een online oplossing die past bij hoe jouw bedrijf echt werkt.",
  },
};

const VALUE_ROWS = [
  {
    key: "website",
    label: "Website",
    outcome: "Een professionele eerste indruk die vertrouwen wekt.",
    icon: Sparkles,
    values: {
      STARTER: "Compacte professionele website",
      GROWTH: "Meer pagina's en sterkere structuur",
      PRO: "Uitgebreidere commerciële website",
      CUSTOM: "Scope op maat",
    },
  },
  {
    key: "hosting",
    label: "Hosting",
    outcome: "Snelle en betrouwbare website zonder losse leverancier.",
    icon: Zap,
    values: {
      STARTER: "Inbegrepen",
      GROWTH: "Inbegrepen",
      PRO: "Inbegrepen",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "email",
    label: "Zakelijke e-mail",
    outcome: "Professionele uitstraling met een e-mailadres op je domein.",
    icon: Mail,
    values: {
      STARTER: "1 mailadres",
      GROWTH: "5 mailadressen",
      PRO: "10 mailadressen",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "seo",
    label: "SEO",
    outcome: "Meer zichtbaarheid in Google bij lokale zoekopdrachten.",
    icon: Search,
    values: {
      STARTER: "Basis SEO",
      GROWTH: "Lokale SEO-basis",
      PRO: "Sterkere SEO-opbouw",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "maintenance",
    label: "Onderhoud",
    outcome: "Geen technische zorgen over updates, veiligheid en werking.",
    icon: Wrench,
    values: {
      STARTER: "Basis onderhoud",
      GROWTH: "Onderhoud + kleine optimalisaties",
      PRO: "Doorlopende optimalisatie",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "support",
    label: "Support",
    outcome: "Eén aanspreekpunt als je iets wilt wijzigen of vragen hebt.",
    icon: MessageCircle,
    values: {
      STARTER: "Support per mail/WhatsApp",
      GROWTH: "Snellere ondersteuning",
      PRO: "Prioriteitssupport",
      CUSTOM: "Volgens afspraak",
    },
  },
  {
    key: "blogs",
    label: "Blogs",
    outcome: "Meer kansen om gevonden te worden op relevante zoekvragen.",
    icon: Star,
    values: {
      STARTER: "Optioneel",
      GROWTH: "Blog mogelijk",
      PRO: "Blog + contentstructuur",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "faq",
    label: "FAQ optimalisatie",
    outcome: "Bezoekers krijgen sneller antwoord en haken minder snel af.",
    icon: HelpCircle,
    values: {
      STARTER: "Optioneel",
      GROWTH: "Inbegrepen",
      PRO: "Uitgebreid",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "google",
    label: "Google optimalisatie",
    outcome: "Een betere basis voor vindbaarheid, indexatie en groei.",
    icon: Search,
    values: {
      STARTER: "Basis",
      GROWTH: "Sterker ingericht",
      PRO: "Uitgebreid",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "reviews",
    label: "Reviews",
    outcome: "Meer vertrouwen voordat iemand belt, appt of een offerte aanvraagt.",
    icon: ShieldCheck,
    values: {
      STARTER: "Reviewsectie",
      GROWTH: "Reviewsectie + bewijsvoering",
      PRO: "Reviewstrategie",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "custom",
    label: "Maatwerk",
    outcome: "Ruimte voor extra wensen als je bedrijf daarom vraagt.",
    icon: Wrench,
    values: {
      STARTER: "Beperkt",
      GROWTH: "Licht maatwerk",
      PRO: "Meer maatwerkruimte",
      CUSTOM: "Volledig op maat",
    },
  },
];

const SUBSCRIPTION_REASONS = [
  "Onderhoud blijft geregeld zonder losse technische taken.",
  "Optimalisatie loopt mee met zoekmachines en concurrenten.",
  "Veiligheid, hosting en updates blijven onder controle.",
  "Je website blijft waarde toevoegen terwijl je bedrijf groeit.",
];

const BUSINESS_BENEFITS = [
  {
    title: "Meer vertrouwen",
    text: "Een professionele online uitstraling die klanten vertrouwen geeft.",
    icon: ShieldCheck,
  },
  {
    title: "Meer zichtbaarheid",
    text: "Beter gevonden worden door potentiële klanten in jouw regio.",
    icon: Search,
  },
  {
    title: "Meer aanvragen",
    text: "Meer kansen op telefoontjes, WhatsApp-berichten en offerteaanvragen.",
    icon: MessageCircle,
  },
  {
    title: "Minder zorgen",
    text: "Wij regelen techniek, onderhoud en hosting zodat jij kunt ondernemen.",
    icon: Wrench,
  },
];

function currency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function normalizePackages(payload) {
  const packages = Array.isArray(payload?.packages)
    ? payload.packages
    : Array.isArray(payload?.data?.packages)
      ? payload.data.packages
      : [];

  return packages.length > 0 ? packages : FALLBACK_PACKAGES;
}

function activePackages(packages) {
  return [...packages]
    .filter((item) => item?.isActive !== false)
    .sort((a, b) => Number(a?.sortOrder || 0) - Number(b?.sortOrder || 0));
}

function codeOf(pkg) {
  return String(pkg?.code || "").toUpperCase();
}

function valueFor(row, pkg) {
  const code = codeOf(pkg);
  return row.values[code] || row.values.CUSTOM || "Op maat";
}

function outcomeFor(pkg) {
  return PACKAGE_OUTCOME_COPY[codeOf(pkg)] || PACKAGE_OUTCOME_COPY.CUSTOM;
}

function shouldLoadRemotePricing() {
  if (import.meta.env.VITE_API_BASE_URL) return true;
  if (typeof window === "undefined") return false;
  return ["vedantix.nl", "www.vedantix.nl"].includes(window.location.hostname);
}

function whatsappFor(pkg) {
  return `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(
    `Hallo Vedantix, ik wil graag weten welk abonnement het beste past bij mijn bedrijf. Ik kijk nu naar ${pkg.label || "een pakket"}.`
  )}`;
}

export default function Prijzen() {
  const [pricing, setPricing] = useState({ packages: FALLBACK_PACKAGES });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    if (!shouldLoadRemotePricing()) {
      setStatus("static");
      return () => {
        active = false;
      };
    }

    fetchPricingSummary()
      .then((summary) => {
        if (!active) return;
        setPricing({ packages: normalizePackages(summary) });
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setPricing({ packages: FALLBACK_PACKAGES });
        setStatus("fallback");
      });

    return () => {
      active = false;
    };
  }, []);

  const packages = useMemo(() => activePackages(pricing.packages), [pricing.packages]);
  const featuredPackage = packages.find((pkg) => pkg.featured) || packages[1] || packages[0];
  const canonical = "https://vedantix.nl/prijzen";
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Prijzen", url: canonical },
  ]);

  return (
    <>
      <SEO
        title="Transparante prijzen voor ondernemers | Vedantix"
        description="Vergelijk de Vedantix abonnementen voor lokale ondernemers. Kies het pakket dat past bij jouw bedrijf, zonder technische zorgen of verborgen kosten."
        canonical={canonical}
        schemas={[breadcrumbSchema]}
      />

      <div className="prices-page">
        <NavBar />

        <main>
          <section className="prices-hero">
            <div className="prices-wrap">
              <div className="prices-hero-grid">
                <div className="prices-hero-copy">
                  <div className="prices-eyebrow">Abonnementen voor online groei</div>
                  <h1>Transparante prijzen voor ondernemers</h1>
                  <p>
                    Kies het pakket dat past bij jouw bedrijf. Geen technische zorgen,
                    geen verborgen kosten.
                  </p>
                  <div className="prices-hero-actions">
                    <Link className="prices-btn primary" to="/planning">
                      Plan een kennismaking <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    <a className="prices-btn secondary" href="#vergelijk">
                      Vergelijk pakketten
                    </a>
                  </div>
                  <div className="prices-trust-row" aria-label="Belangrijkste prijsbeloftes">
                    <span><CheckCircle2 size={16} /> Maandelijks duidelijk</span>
                    <span><CheckCircle2 size={16} /> Hosting inbegrepen</span>
                    <span><CheckCircle2 size={16} /> Geen technische zorgen</span>
                  </div>
                </div>

                <aside className="prices-hero-panel" aria-label="Aanbevolen abonnement">
                  <span className="prices-panel-label">Meest gekozen</span>
                  <h2>{featuredPackage?.label || "Growth"}</h2>
                  <p>{featuredPackage?.fit || "Meer inhoud, meer vertrouwen, meer aanvragen"}</p>
                  <div className="prices-panel-price">
                    {currency(featuredPackage?.monthlyPriceInclVat)}
                    <span>/maand</span>
                  </div>
                  <div className="prices-panel-setup">
                    + {currency(featuredPackage?.setupPriceInclVat)} eenmalige setup
                  </div>
                </aside>
              </div>

              <div className="prices-package-grid" aria-label="Abonnementen">
                {packages.map((pkg) => {
                  const code = codeOf(pkg);
                  const copy = PACKAGE_VALUE_COPY[code] || PACKAGE_VALUE_COPY.CUSTOM;
                  const monthly = Number(pkg.monthlyPriceInclVat ?? pkg.monthlyPrice ?? 0);
                  const setup = Number(pkg.setupPriceInclVat ?? pkg.setupPrice ?? 0);
                  const bullets = Array.isArray(pkg.bullets) && pkg.bullets.length > 0
                    ? pkg.bullets
                    : FALLBACK_PACKAGES.find((item) => item.code === code)?.bullets || [
                        "Pakketinhoud wordt afgestemd op jouw bedrijf",
                        "Hosting en ondersteuning via Vedantix",
                        "Duidelijke afspraken zonder verborgen kosten",
                      ];
                  const outcome = outcomeFor(pkg);

                  return (
                    <article
                      key={pkg.code || pkg.label}
                      className={`prices-package-card ${pkg.featured ? "featured" : ""}`}
                    >
                      {pkg.featured ? <div className="prices-badge">Meest gekozen</div> : null}
                      <div className={`prices-package-tone ${copy.tone}`}>{copy.bestFor}</div>
                      <h2>{pkg.label}</h2>
                      <p>{pkg.description || copy.outcome}</p>
                      <div className="prices-card-price">
                        {currency(monthly)}
                        <span>/m</span>
                      </div>
                      <div className="prices-card-setup">
                        + {currency(setup)} eenmalige setup
                      </div>
                      <ul>
                        {bullets.slice(0, 4).map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>

                      <section className="prices-package-outcome" aria-label={`Wat levert ${pkg.label} jou op?`}>
                        <div className={`prices-outcome-badge ${copy.tone}`}>{outcome.badge}</div>
                        <h3>Wat levert dit pakket jou op?</h3>
                        <h4>{outcome.title}</h4>
                        <p>{outcome.intro}</p>
                        <div className="prices-outcome-list">
                          {outcome.benefits.map((benefit) => (
                            <span key={benefit}>
                              <CheckCircle2 size={15} aria-hidden="true" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                        <div className="prices-result-box">
                          {outcome.result}
                        </div>
                      </section>

                      <a className="prices-card-cta" href={whatsappFor(pkg)} target="_blank" rel="noreferrer">
                        {pkg.cta || `Bespreek ${pkg.label}`} <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>

              {status === "fallback" ? (
                <div className="prices-data-note">
                  Live pricing kon niet geladen worden. De standaard abonnementsprijzen worden getoond.
                </div>
              ) : null}
            </div>
          </section>

          <section className="prices-section prices-section-muted">
            <div className="prices-wrap">
              <div className="prices-subscription-block">
                <div>
                  <div className="prices-eyebrow light">Waarom een abonnement?</div>
                  <h2>Waarom kiezen ondernemers voor een abonnement?</h2>
                  <p>Een website is nooit echt af.</p>
                  <p>
                    Zoekmachines veranderen voortdurend, concurrenten blijven zich ontwikkelen en
                    jouw bedrijf groeit mee.
                  </p>
                  <p>
                    Daarom leveren wij niet alleen een website op, maar zorgen wij ook voor
                    onderhoud, optimalisatie, veiligheid en online zichtbaarheid.
                  </p>
                  <p>
                    Zo blijft jouw website waarde toevoegen aan je bedrijf.
                  </p>
                  <Link className="prices-btn primary" to="/planning">
                    Plan een kennismaking <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>

                <div className="prices-reason-list">
                  {SUBSCRIPTION_REASONS.map((reason) => (
                    <div key={reason} className="prices-reason-item">
                      <CheckCircle2 size={18} aria-hidden="true" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="prices-section">
            <div className="prices-wrap">
              <div className="prices-section-header center">
                <div className="prices-eyebrow light">Ondernemersvoordelen</div>
                <h2>Wat levert Vedantix jou op?</h2>
                <p>
                  De techniek is de basis. De echte waarde zit in vertrouwen, zichtbaarheid,
                  aanvragen en rust.
                </p>
              </div>

              <div className="prices-benefit-grid">
                {BUSINESS_BENEFITS.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <article className="prices-benefit-card" key={benefit.title}>
                      <span><Icon size={21} aria-hidden="true" /></span>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="prices-section" id="vergelijk">
            <div className="prices-wrap">
              <div className="prices-section-header">
                <div className="prices-eyebrow light">Vergelijken zonder kleine lettertjes</div>
                <h2>Wat zit erin en wat levert het op?</h2>
                <p>
                  De beste keuze hangt niet alleen af van functies, maar van wat jouw bedrijf nodig
                  heeft om meer vertrouwen, zichtbaarheid en aanvragen te krijgen.
                </p>
              </div>

              <div className="prices-table-shell">
                <table className="prices-compare-table">
                  <thead>
                    <tr>
                      <th>Onderdeel</th>
                      {packages.map((pkg) => (
                        <th key={pkg.code || pkg.label}>{pkg.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VALUE_ROWS.map((row) => {
                      const Icon = row.icon;
                      return (
                        <tr key={row.key}>
                          <td>
                            <div className="prices-feature-cell">
                              <span><Icon size={17} aria-hidden="true" /></span>
                              <div>
                                <strong>{row.label}</strong>
                                <small>{row.outcome}</small>
                              </div>
                            </div>
                          </td>
                          {packages.map((pkg) => (
                            <td key={`${row.key}-${pkg.code || pkg.label}`}>
                              {valueFor(row, pkg)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}
