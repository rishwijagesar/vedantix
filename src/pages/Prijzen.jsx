import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  FilePlus2,
  Globe2,
  Headphones,
  HelpCircle,
  Mail,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import SEO from "../components/SEO";
import NavBar from "../components/NavBar";
import { fetchPricingSummary } from "../api/pricing.api";
import { CONTACT } from "../constants/contact";
import { createBreadcrumbSchema, createFAQSchema } from "../utils/schema";
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
      "Wij houden je website veilig en bereikbaar",
      "Contactformulier en WhatsApp-knop",
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
      "Reviews, veelgestelde vragen en lokale vindbaarheid",
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

const SUBSCRIPTION_PACKAGE_BULLETS = {
  STARTER: [
    "Professionele website tot 5 pagina's",
    "Wij houden je website veilig en bereikbaar",
    "Contactformulier en WhatsApp-knop",
    "Hulp bij vragen en kleine wijzigingen",
  ],
  GROWTH: [
    "Uitgebreide website tot 10 pagina's",
    "Sterke diensten-, review- en FAQ-opbouw",
    "Extra aandacht voor lokale vindbaarheid",
    "Snellere hulp en doorlopende verbeteringen",
  ],
  PRO: [
    "Uitgebreide website tot 20 pagina's",
    "Commerciële positionering en groeiruimte",
    "Doorlopende verbetering voor Google en AI-tools",
    "Voorrang bij ondersteuning en meer maatwerk",
  ],
};

const ONE_TIME_PACKAGES = [
  {
    code: "STARTER",
    label: "Starter",
    description: "Voor starters en zzp'ers die één keer willen betalen.",
    oneTimePriceInclVat: 1295,
    featured: true,
    sortOrder: 1,
    fit: "Compact, professioneel en volledig opgeleverd",
    cancelNote: "Eenmalig betalen · daarna zelf beheren",
    cta: "Kies Starter eenmalig",
    bullets: [
      "Professionele website tot 5 pagina's",
      "Contactformulier en WhatsApp-knop",
      "Sterke basis voor Google en AI-tools",
      "3 feedbackrondes en 30 dagen oplevergarantie",
    ],
  },
  {
    code: "GROWTH",
    label: "Growth",
    description: "Voor bedrijven die meer diensten en groeiruimte nodig hebben.",
    oneTimePriceInclVat: 1995,
    featured: false,
    sortOrder: 2,
    fit: "Meer pagina's, vertrouwen en contactmomenten",
    cancelNote: "Eenmalig betalen · daarna zelf beheren",
    cta: "Kies Growth eenmalig",
    bullets: [
      "Uitgebreide website tot 10 pagina's",
      "Sterke diensten-, review- en FAQ-opbouw",
      "Lokale vindbaarheid en inzicht in aanvragen",
      "3 feedbackrondes en 30 dagen oplevergarantie",
    ],
  },
  {
    code: "PRO",
    label: "Pro",
    description: "Voor bedrijven met meerdere diensten of uitgebreidere wensen.",
    oneTimePriceInclVat: 2995,
    featured: false,
    sortOrder: 3,
    fit: "Uitgebreide website met ruimte voor maatwerk",
    cancelNote: "Vanaf-prijs · definitieve scope vooraf afgesproken",
    cta: "Bespreek Pro eenmalig",
    bullets: [
      "Uitgebreide website tot 20 pagina's",
      "Commerciële structuur en sterke positionering",
      "Uitgebreide vindbaarheid in Google en AI-tools",
      "Koppelingen en extra functies op basis van scope",
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
      "Klaar voor moderne zoekmachines",
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
      "AI-vriendelijke contentstructuur",
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
      "Geoptimaliseerd voor toekomstige AI-platformen",
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

const ONE_TIME_OUTCOME_COPY = {
  STARTER: {
    badge: "Meest gekozen door starters",
    title: "Een professionele website in eigen beheer",
    intro:
      "Je betaalt één keer voor de bouw en oplevering. Daarna kies je zelf of je nog hulp of een online pakket nodig hebt.",
    benefits: [
      "Een duidelijk afgesproken vaste prijs",
      "Geen verplicht maandabonnement",
      "Professionele uitstraling op mobiel en desktop",
      "Klaar om klanten te laten bellen, appen of mailen",
    ],
    result:
      "Je krijgt een complete website die je na oplevering zelf kunt beheren of los door Vedantix online kunt laten houden.",
  },
  GROWTH: {
    badge: "Voor meer diensten en groeiruimte",
    title: "Meer inhoud zonder maandelijkse verplichting",
    intro:
      "Geschikt als je meerdere diensten wilt presenteren en je website serieus wilt inzetten voor nieuwe aanvragen.",
    benefits: [
      "Meer ruimte voor diensten en bewijs",
      "Sterkere lokale vindbaarheid bij oplevering",
      "Duidelijke contactmomenten en formulieren",
      "Geen verplichte doorlopende dienstverlening",
    ],
    result:
      "Je ontvangt een uitgebreidere website met een sterke basis voor vertrouwen, vindbaarheid en nieuwe aanvragen.",
  },
  PRO: {
    badge: "Voor uitgebreide websites",
    title: "Een complete website met ruimte voor maatwerk",
    intro:
      "Voor bedrijven die meerdere diensten, uitgebreide inhoud of aanvullende functies in één project willen laten realiseren.",
    benefits: [
      "Uitgebreide commerciële pagina-opbouw",
      "Meer ruimte voor koppelingen en functies",
      "Sterkere basis voor Google en AI-tools",
      "Scope en prijs vooraf duidelijk afgesproken",
    ],
    result:
      "Je investeert één keer in een uitgebreide online basis die bij oplevering compleet aan je wordt overgedragen.",
  },
  CUSTOM: PACKAGE_OUTCOME_COPY.CUSTOM,
};

const VALUE_ROWS = [
  {
    key: "website",
    label: "Website",
    outcome: "Een professionele eerste indruk die vertrouwen wekt.",
    icon: Sparkles,
    values: {
      STARTER: "Tot 5 pagina's",
      GROWTH: "Tot 10 pagina's",
      PRO: "Tot 20 pagina's of maatwerk",
      CUSTOM: "Scope op maat",
    },
  },
  {
    key: "online",
    label: "Website online houden",
    outcome: "Je website blijft bereikbaar en veilig voor bezoekers.",
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
    key: "google",
    label: "Vindbaarheid in Google",
    outcome: "Een goede basis om gevonden te worden door potentiële klanten.",
    icon: Search,
    values: {
      STARTER: "Sterke basis",
      GROWTH: "Lokale groeibasis",
      PRO: "Uitgebreide opbouw",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "ai",
    label: "Vindbaarheid in AI-tools",
    outcome: "Een duidelijke website die moderne AI-tools beter kunnen begrijpen.",
    icon: Sparkles,
    values: {
      STARTER: "Sterke basis",
      GROWTH: "Uitgebreidere inhoud",
      PRO: "Uitgebreid + optimalisatie",
      CUSTOM: "Op maat",
    },
  },
  {
    key: "care",
    label: "Veilig en actueel houden",
    outcome: "Wij houden de werking in de gaten en helpen problemen voorkomen.",
    icon: ShieldCheck,
    values: {
      STARTER: "Inbegrepen",
      GROWTH: "Inbegrepen + verbeteringen",
      PRO: "Doorlopend inbegrepen",
      CUSTOM: "Volgens afspraak",
    },
  },
  {
    key: "support",
    label: "Hulp bij vragen en wijzigingen",
    outcome: "Eén aanspreekpunt als je iets wilt aanpassen of bespreken.",
    icon: MessageCircle,
    values: {
      STARTER: "Via e-mail of WhatsApp",
      GROWTH: "Snellere hulp",
      PRO: "Voorrang bij ondersteuning",
      CUSTOM: "Volgens afspraak",
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

const ONE_TIME_VALUE_OVERRIDES = {
  online: {
    STARTER: "Los toe te voegen",
    GROWTH: "Los toe te voegen",
    PRO: "Los toe te voegen",
    CUSTOM: "Volgens afspraak",
  },
  email: {
    STARTER: "Los toe te voegen",
    GROWTH: "Los toe te voegen",
    PRO: "Los toe te voegen",
    CUSTOM: "Volgens afspraak",
  },
  care: {
    STARTER: "30 dagen oplevergarantie",
    GROWTH: "30 dagen oplevergarantie",
    PRO: "30 dagen oplevergarantie",
    CUSTOM: "Volgens afspraak",
  },
  support: {
    STARTER: "Tijdens bouw en oplevering",
    GROWTH: "Tijdens bouw en oplevering",
    PRO: "Tijdens bouw en oplevering",
    CUSTOM: "Volgens afspraak",
  },
};

const ONLINE_OPTIONS = [
  {
    period: "1 jaar",
    price: 249,
    description: "Eén jaar veilig en betrouwbaar online, vooraf betaald.",
  },
  {
    period: "3 jaar",
    price: 599,
    description: "Drie jaar online zonder maandelijkse Vedantix-factuur.",
    featured: true,
  },
  {
    period: "5 jaar",
    price: 899,
    description: "Vijf jaar online voor de laagste prijs per jaar.",
  },
];

const ADD_ONS = [
  {
    title: "Zakelijke e-mail",
    price: "Vanaf €149",
    text: "Een professioneel e-mailadres op je eigen bedrijfsnaam, veilig en gebruiksklaar ingesteld.",
    icon: Mail,
  },
  {
    title: "Beter gevonden in Google",
    price: "€299",
    text: "We verbeteren de basis waarmee Google jouw bedrijf, diensten en werkgebied kan vinden.",
    icon: Search,
  },
  {
    title: "Vindbaar in AI-tools",
    price: "€399",
    text: "We maken je website duidelijker voor ChatGPT, Claude, Gemini en andere AI-tools.",
    icon: Sparkles,
  },
  {
    title: "Inzicht in bezoekers",
    price: "€199",
    text: "Bekijk hoeveel mensen je website bezoeken en welke contactacties zij ondernemen.",
    icon: BarChart3,
  },
  {
    title: "Online afspraken",
    price: "Vanaf €299",
    text: "Laat klanten rechtstreeks via je website een afspraak aanvragen of inplannen.",
    icon: CalendarCheck2,
  },
  {
    title: "Extra pagina",
    price: "Vanaf €149",
    text: "Voeg een pagina toe voor een dienst, locatie, product, actie of campagne.",
    icon: FilePlus2,
  },
  {
    title: "Teksten laten schrijven",
    price: "Vanaf €175",
    text: "Professionele webteksten die duidelijk uitleggen wat je aanbiedt en aanzetten tot contact.",
    icon: PenLine,
  },
  {
    title: "Ondersteuning achteraf",
    price: "Vanaf €95",
    text: "Koop los hulp in voor wijzigingen, vragen of kleine verbeteringen na de oplevering.",
    icon: Headphones,
  },
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
    title: "Zelf kiezen",
    text: "Neem alleen het beheer, de ondersteuning en de uitbreidingen af die jij nodig hebt.",
    icon: Wrench,
  },
];

const PRICE_FAQS = [
  {
    question: "Wat kost een website bij Vedantix?",
    answer:
      "Je kunt een website eenmalig laten bouwen vanaf €1.295 of kiezen voor een beheerd abonnement vanaf €99 per maand plus de eenmalige bouw en inrichting. Je kiest dus zelf welke vorm bij jouw bedrijf past.",
  },
  {
    question: "Wat is het verschil tussen eenmalig en een abonnement?",
    answer:
      "Bij eenmalig betalen bouwen en leveren we de website compleet op, waarna je hem zelf beheert. Bij een abonnement blijven wij de website online houden, veilig houden, bijwerken en ondersteunen.",
  },
  {
    question: "Kan ik het online houden ook in één keer betalen?",
    answer:
      "Ja. Met Website Online betaal je vooraf voor één, drie of vijf jaar. Gedurende die gekozen periode ontvang je daarvoor geen maandelijkse Vedantix-factuur. Voor het einde van de periode laten we je weten welke verlengmogelijkheden er zijn.",
  },
  {
    question: "Welk pakket past het beste bij mijn bedrijf?",
    answer:
      "Starter past bij ondernemers die professioneel zichtbaar willen worden. Growth past bij ondernemers die meer aanvragen willen. Pro past bij ondernemers die doorlopend willen groeien met meer content, optimalisatie en maatwerk.",
  },
  {
    question: "Zijn de pakketten geschikt voor Google en AI-zoekmachines?",
    answer:
      "Ja. Alle pakketten krijgen een duidelijke basis voor Google en AI-tools. Met een losse uitbreiding of een uitgebreider pakket kunnen we deze vindbaarheid verder versterken.",
  },
  {
    question: "Kan ik later nog losse uitbreidingen toevoegen?",
    answer:
      "Ja. Je kunt later onder andere zakelijke e-mail, extra pagina's, online afspraken, betere vindbaarheid of losse ondersteuning toevoegen. Je hoeft dit niet allemaal bij de start te beslissen.",
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

function valueFor(row, pkg, paymentModel) {
  const code = codeOf(pkg);
  if (paymentModel === "one-time") {
    const override = ONE_TIME_VALUE_OVERRIDES[row.key];
    if (override) return override[code] || override.CUSTOM || "Volgens afspraak";
  }
  return row.values[code] || row.values.CUSTOM || "Op maat";
}

function outcomeFor(pkg, paymentModel) {
  const outcomes = paymentModel === "one-time" ? ONE_TIME_OUTCOME_COPY : PACKAGE_OUTCOME_COPY;
  return outcomes[codeOf(pkg)] || outcomes.CUSTOM;
}

function shouldLoadRemotePricing() {
  if (import.meta.env.VITE_API_BASE_URL) return true;
  if (typeof window === "undefined") return false;
  return ["vedantix.nl", "www.vedantix.nl"].includes(window.location.hostname);
}

function whatsappFor(pkg, paymentModel) {
  const model = paymentModel === "one-time"
    ? "een website die ik eenmalig betaal"
    : "een beheerd website-abonnement";
  return `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(
    `Hallo Vedantix, ik wil graag meer weten over ${model}. Ik kijk nu naar ${pkg.label || "een pakket"}.`
  )}`;
}

function addonWhatsapp(title) {
  return `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(
    `Hallo Vedantix, ik wil graag meer weten over de losse uitbreiding: ${title}.`
  )}`;
}

export default function Prijzen() {
  const [pricing, setPricing] = useState({ packages: FALLBACK_PACKAGES });
  const [status, setStatus] = useState("loading");
  const [paymentModel, setPaymentModel] = useState("one-time");

  const choosePaymentModel = (model, scrollToPackages = false) => {
    setPaymentModel(model);
    if (!scrollToPackages || typeof window === "undefined") return;

    window.requestAnimationFrame(() => {
      document.getElementById("websitepakketten")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

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
  const displayedPackages = paymentModel === "one-time" ? ONE_TIME_PACKAGES : packages;
  const featuredPackage = displayedPackages.find((pkg) => pkg.featured)
    || displayedPackages[1]
    || displayedPackages[0];
  const canonical = "https://vedantix.nl/prijzen";
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Prijzen", url: canonical },
  ]);
  const faqSchema = createFAQSchema(PRICE_FAQS);

  return (
    <>
      <SEO
        title="Website eenmalig of als abonnement | Vedantix prijzen"
        description="Kies een website die je eenmalig betaalt of een beheerd abonnement. Vergelijk Starter, Growth en Pro en voeg alleen de diensten toe die je nodig hebt."
        canonical={canonical}
        schemas={[breadcrumbSchema, faqSchema]}
      />

      <div className="prices-page">
        <NavBar />

        <main>
          <section className="prices-hero">
            <div className="prices-wrap">
              <div className="prices-hero-grid">
                <div className="prices-hero-copy">
                  <div className="prices-eyebrow">Jij kiest hoe je betaalt</div>
                  <h1>Een professionele website op jouw manier</h1>
                  <p>
                    Betaal je website één keer en beheer hem daarna zelf, of kies voor een
                    abonnement waarbij Vedantix je website online, veilig en actueel houdt.
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
                    <span><CheckCircle2 size={16} /> Eenmalig of per maand</span>
                    <span><CheckCircle2 size={16} /> Duidelijke afspraken</span>
                    <span><CheckCircle2 size={16} /> Uitbreiden wanneer jij wilt</span>
                  </div>
                </div>

                <aside className="prices-hero-panel" aria-label="Aanbevolen pakket">
                  <span className="prices-panel-label">
                    {paymentModel === "one-time" ? "Meest gekozen door starters" : "Meest gekozen voor groei"}
                  </span>
                  <h2>{featuredPackage?.label || "Starter"}</h2>
                  <p>{featuredPackage?.fit || "Meer inhoud, meer vertrouwen, meer aanvragen"}</p>
                  <div className="prices-panel-price">
                    {currency(
                      paymentModel === "one-time"
                        ? featuredPackage?.oneTimePriceInclVat
                        : featuredPackage?.monthlyPriceInclVat ?? featuredPackage?.monthlyPrice
                    )}
                    <span>{paymentModel === "one-time" ? "eenmalig" : "/maand"}</span>
                  </div>
                  {paymentModel === "one-time" ? (
                    <div className="prices-panel-setup">Geen verplicht maandabonnement</div>
                  ) : (
                    <div className="prices-panel-setup">
                      + {currency(featuredPackage?.setupPriceInclVat ?? featuredPackage?.setupPrice)} voor bouw en inrichting
                    </div>
                  )}
                </aside>
              </div>

              <div
                className="prices-payment-switch"
                id="websitepakketten"
                role="group"
                aria-label="Kies je betaalvorm"
              >
                <button
                  type="button"
                  className={paymentModel === "one-time" ? "active" : ""}
                  aria-pressed={paymentModel === "one-time"}
                  onClick={() => choosePaymentModel("one-time")}
                >
                  <strong>Eenmalig betalen</strong>
                  <span>Na oplevering zelf beheren</span>
                </button>
                <button
                  type="button"
                  className={paymentModel === "subscription" ? "active" : ""}
                  aria-pressed={paymentModel === "subscription"}
                  onClick={() => choosePaymentModel("subscription")}
                >
                  <strong>Beheerd abonnement</strong>
                  <span>Wij blijven voor je zorgen</span>
                </button>
              </div>

              <div
                className="prices-package-grid"
                aria-label={paymentModel === "one-time" ? "Eenmalige websitepakketten" : "Website-abonnementen"}
              >
                {displayedPackages.map((pkg) => {
                  const code = codeOf(pkg);
                  const copy = PACKAGE_VALUE_COPY[code] || PACKAGE_VALUE_COPY.CUSTOM;
                  const monthly = Number(pkg.monthlyPriceInclVat ?? pkg.monthlyPrice ?? 0);
                  const setup = Number(pkg.setupPriceInclVat ?? pkg.setupPrice ?? 0);
                  const oneTime = Number(pkg.oneTimePriceInclVat ?? 0);
                  const subscriptionBullets = SUBSCRIPTION_PACKAGE_BULLETS[code]
                    || (Array.isArray(pkg.bullets) && pkg.bullets.length > 0 ? pkg.bullets : []);
                  const bullets = paymentModel === "one-time"
                    ? pkg.bullets
                    : subscriptionBullets.length > 0
                      ? subscriptionBullets
                      : FALLBACK_PACKAGES.find((item) => item.code === code)?.bullets || [
                        "Pakketinhoud wordt afgestemd op jouw bedrijf",
                        "Wij houden je website online en helpen bij vragen",
                        "Duidelijke afspraken zonder verborgen kosten",
                      ];
                  const outcome = outcomeFor(pkg, paymentModel);

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
                        {currency(paymentModel === "one-time" ? oneTime : monthly)}
                        <span>{paymentModel === "one-time" ? "eenmalig" : "/m"}</span>
                      </div>
                      {paymentModel === "one-time" ? (
                        <div className="prices-card-setup">Geen verplichte maandelijkse websitekosten</div>
                      ) : (
                        <div className="prices-card-setup">
                          + {currency(setup)} voor bouw en inrichting
                        </div>
                      )}
                      <div className="prices-card-terms">{pkg.cancelNote}</div>
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

                      <a
                        className="prices-card-cta"
                        href={whatsappFor(pkg, paymentModel)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {pkg.cta || `Bespreek ${pkg.label}`} <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>

              {paymentModel === "subscription" && status === "fallback" ? (
                <div className="prices-data-note">
                  Live pricing kon niet geladen worden. De standaard abonnementsprijzen worden getoond.
                </div>
              ) : null}
            </div>
          </section>

          <section className="prices-section prices-section-muted">
            <div className="prices-wrap">
              <div className="prices-section-header center">
                <div className="prices-eyebrow light">Het belangrijkste verschil</div>
                <h2>Zelf beheren of volledig ontzorgd</h2>
                <p>
                  De website kan hetzelfde professionele niveau hebben. Het verschil is wie er na
                  de oplevering verantwoordelijk blijft.
                </p>
              </div>

              <div className="prices-model-grid">
                <article className={`prices-model-card ${paymentModel === "one-time" ? "active" : ""}`}>
                  <span className="prices-model-icon"><Globe2 size={22} aria-hidden="true" /></span>
                  <div className="prices-model-label">Voor zelfbeheerders</div>
                  <h3>Eenmalig betalen</h3>
                  <p>Wij bouwen en leveren je website compleet op. Daarna bepaal jij zelf wat je nog afneemt.</p>
                  <ul>
                    <li>Geen verplicht maandabonnement</li>
                    <li>3 feedbackrondes tijdens de bouw</li>
                    <li>30 dagen garantie op de oplevering</li>
                    <li>Online houden en ondersteuning los verkrijgbaar</li>
                    <li>Latere wijzigingen betaal je alleen wanneer je ze nodig hebt</li>
                  </ul>
                  <button type="button" onClick={() => choosePaymentModel("one-time", true)}>
                    Bekijk eenmalige pakketten <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>

                <article className={`prices-model-card ${paymentModel === "subscription" ? "active" : ""}`}>
                  <span className="prices-model-icon"><ShieldCheck size={22} aria-hidden="true" /></span>
                  <div className="prices-model-label">Voor volledige ontzorging</div>
                  <h3>Beheerd abonnement</h3>
                  <p>Vedantix blijft je website online houden, veilig houden, bijwerken en ondersteunen.</p>
                  <ul>
                    <li>Website online houden inbegrepen</li>
                    <li>Bescherming en reservekopieën geregeld</li>
                    <li>Doorlopende hulp bij vragen en wijzigingen</li>
                    <li>Vindbaarheid kan blijven meegroeien</li>
                    <li>Eén aanspreekpunt voor je website</li>
                  </ul>
                  <button type="button" onClick={() => choosePaymentModel("subscription", true)}>
                    Bekijk abonnementen <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              </div>
            </div>
          </section>

          <section className="prices-section" id="losse-uitbreidingen">
            <div className="prices-wrap">
              <div className="prices-section-header center">
                <div className="prices-eyebrow light">Alleen wat jij nodig hebt</div>
                <h2>Losse uitbreidingen zonder verplicht abonnement</h2>
                <p>
                  Begin met je websitepakket en voeg alleen toe wat bij jouw bedrijf past. Alles
                  wordt vooraf duidelijk geprijsd en in gewone taal uitgelegd.
                </p>
              </div>

              <article className="prices-online-card">
                <div className="prices-online-intro">
                  <span className="prices-model-icon"><Globe2 size={22} aria-hidden="true" /></span>
                  <div className="prices-model-label">Populaire uitbreiding</div>
                  <h3>Website Online</h3>
                  <p>
                    Wij regelen alles om je website veilig en betrouwbaar online te houden. Je
                    betaalt vooraf voor de gekozen periode en ontvangt gedurende die periode geen
                    maandelijkse Vedantix-factuur voor dit onderdeel.
                  </p>
                  <div className="prices-online-includes">
                    <span><CheckCircle2 size={16} /> Website online plaatsen</span>
                  <span><CheckCircle2 size={16} /> Domeinnaam registreren of koppelen</span>
                    <span><CheckCircle2 size={16} /> Veilige verbinding</span>
                    <span><CheckCircle2 size={16} /> Automatische reservekopieën</span>
                  </div>
                </div>

                <div className="prices-online-options" aria-label="Website Online periodes">
                  {ONLINE_OPTIONS.map((option) => (
                    <a
                      key={option.period}
                      className={`prices-online-option ${option.featured ? "featured" : ""}`}
                      href={addonWhatsapp(`Website Online voor ${option.period}`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {option.featured ? <span>Meest gekozen</span> : null}
                      <strong>{option.period}</strong>
                      <b>{currency(option.price)} eenmalig</b>
                      <small>{option.description}</small>
                    </a>
                  ))}
                </div>
              </article>

              <div className="prices-addon-grid">
                {ADD_ONS.map((addon) => {
                  const Icon = addon.icon;
                  return (
                    <article className="prices-addon-card" key={addon.title}>
                      <span><Icon size={21} aria-hidden="true" /></span>
                      <div className="prices-addon-price">{addon.price}</div>
                      <h3>{addon.title}</h3>
                      <p>{addon.text}</p>
                      <a href={addonWhatsapp(addon.title)} target="_blank" rel="noreferrer">
                        Vraag deze uitbreiding aan <ArrowRight size={15} aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>

              <p className="prices-addon-note">
                Externe abonnementen of kosten van andere leveranciers zijn niet inbegrepen. Als
                die nodig zijn, bespreken we dat altijd vooraf.
              </p>
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

          <section className="prices-section prices-section-muted" aria-labelledby="prices-ai-title">
            <div className="prices-wrap">
              <div className="prices-subscription-block">
                <div>
                  <div className="prices-eyebrow light">AI-readiness</div>
                  <h2 id="prices-ai-title">Toekomstbestendig voor AI</h2>
                  <p>De manier waarop mensen zoeken verandert.</p>
                  <p>
                    Wij zorgen ervoor dat jouw website voorbereid is op zowel traditionele
                    zoekmachines als moderne AI-platformen.
                  </p>
                </div>

                <div className="prices-reason-list">
                  <div className="prices-reason-item">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>Duidelijke contentstructuur voor zoekmachines en AI-systemen.</span>
                  </div>
                  <div className="prices-reason-item">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>FAQ’s en pagina-opbouw die concrete ondernemersvragen beantwoorden.</span>
                  </div>
                  <div className="prices-reason-item">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>Lokale context zodat klanten in jouw regio je beter kunnen vinden.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="prices-section" aria-labelledby="prices-faq-title">
            <div className="prices-wrap">
              <div className="prices-section-header center">
                <div className="prices-eyebrow light">Direct antwoord</div>
                <h2 id="prices-faq-title">Veelgestelde vragen over prijzen</h2>
                <p>
                  Antwoorden die helpen om snel te bepalen welk pakket past bij jouw bedrijf.
                </p>
              </div>

              <div className="prices-benefit-grid">
                {PRICE_FAQS.map((faq) => (
                  <article className="prices-benefit-card" key={faq.question}>
                    <span><HelpCircle size={21} aria-hidden="true" /></span>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="prices-section" id="vergelijk">
            <div className="prices-wrap">
              <div className="prices-section-header">
                <div className="prices-eyebrow light">Vergelijken zonder kleine lettertjes</div>
                <h2>
                  Wat zit er in de {paymentModel === "one-time" ? "eenmalige pakketten" : "abonnementen"}?
                </h2>
                <p>
                  Je bekijkt nu de vergelijking voor <strong>
                    {paymentModel === "one-time" ? "eenmalig betalen" : "het beheerde abonnement"}
                  </strong>. Gebruik de keuze bovenaan om de andere vorm te bekijken.
                </p>
              </div>

              <div className="prices-table-shell">
                <table className="prices-compare-table">
                  <thead>
                    <tr>
                      <th>Onderdeel</th>
                      {displayedPackages.map((pkg) => (
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
                          {displayedPackages.map((pkg) => (
                            <td key={`${row.key}-${pkg.code || pkg.label}`}>
                              {valueFor(row, pkg, paymentModel)}
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
