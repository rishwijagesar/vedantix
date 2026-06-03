import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  LifeBuoy,
  Mail,
  MessageCircle,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Wrench,
  XCircle,
} from "lucide-react";
import SEO from "../components/SEO";
import NavBar from "../components/NavBar";
import BigFooter from "../components/BigFooter";
import { CONTACT } from "../constants/contact";
import { createBreadcrumbSchema, createServiceSchema } from "../utils/schema";
import "../styles/groeimodel.css";

const canonical = "https://vedantix.nl/groeimodel";

const websiteOnly = [
  "Mooie homepage",
  "Online visitekaartje",
  "Weinig bezoekers",
  "Geen SEO strategie",
  "Geen groei",
];

const vedantixModel = [
  "Professionele website",
  "SEO geoptimaliseerd",
  "Google vindbaarheid",
  "Content strategie",
  "Reviews",
  "Autoriteit",
  "Meer aanvragen",
];

const buildingBlocks = [
  {
    title: "Fundament",
    icon: ShieldCheck,
    intro: "Een sterke online aanwezigheid begint met een stabiele basis.",
    lead: "Wij verzorgen:",
    items: [
      "Hosting",
      "Domeinnamen",
      "Zakelijke e-mail",
      "SSL certificaten",
      "Beveiliging",
      "Backups",
    ],
    outro: "De ondernemer hoeft nergens meer naar om te kijken.",
  },
  {
    title: "Vindbaarheid",
    icon: Search,
    intro: "Een website heeft alleen waarde als mensen hem kunnen vinden.",
    lead: "Daarom optimaliseren wij:",
    items: [
      "Technische SEO",
      "Metadata",
      "Zoekwoorden",
      "Lokale SEO",
      "Sitemap",
      "Google indexering",
      "Structured data",
    ],
  },
  {
    title: "Content",
    icon: FileText,
    intro: "Google beloont websites die waardevolle informatie bieden.",
    lead: "Daarom helpen wij met:",
    items: [
      "SEO pagina's",
      "Blogs",
      "FAQ's",
      "Dienstenpagina's",
      "Lokale landingspagina's",
    ],
    outro:
      "Elke pagina wordt geschreven met zowel bezoekers als zoekmachines in gedachten.",
  },
  {
    title: "Vertrouwen",
    icon: Star,
    intro: "Mensen kopen van bedrijven die vertrouwen uitstralen.",
    lead: "Wij helpen met:",
    items: [
      "Google Reviews",
      "Trustoo Reviews",
      "Social proof",
      "Resultaten",
      "Klantverhalen",
      "Trust elementen",
    ],
  },
  {
    title: "Groei",
    icon: TrendingUp,
    intro: "Een website is nooit af.",
    lead: "Wij blijven optimaliseren op basis van data.",
    items: [
      "Analytics",
      "Zoekposities",
      "Conversies",
      "Nieuwe content",
      "SEO verbeteringen",
      "Prestatie optimalisaties",
    ],
  },
];

const ecosystem = [
  { label: "Website", icon: Globe2 },
  { label: "Hosting", icon: Server },
  { label: "Zakelijke E-mail", icon: Mail },
  { label: "SEO", icon: Search },
  { label: "Content", icon: FileText },
  { label: "Reviews", icon: Star },
  { label: "Onderhoud", icon: Wrench },
  { label: "Support", icon: LifeBuoy },
];

const differentiators = [
  {
    title: "Geen standaard templates",
    text: "Wij bouwen websites die passen bij jouw bedrijf, doelgroep en doelstellingen.",
  },
  {
    title: "SEO vanaf dag één",
    text: "Zoekmachineoptimalisatie wordt niet achteraf toegevoegd maar direct meegenomen tijdens de ontwikkeling.",
  },
  {
    title: "Focus op resultaat",
    text: "Wij kijken niet alleen naar design maar vooral naar aanvragen, zichtbaarheid en groei.",
  },
  {
    title: "Persoonlijke samenwerking",
    text: "Je werkt direct samen met iemand die meedenkt over jouw online strategie.",
  },
  {
    title: "Lokaal ondernemen begrijpen",
    text: "Wij richten ons specifiek op lokale ondernemers die beter zichtbaar willen worden in hun regio.",
  },
  {
    title: "Doorlopende ondersteuning",
    text: "Ook na oplevering blijven we beschikbaar voor onderhoud, verbeteringen en groei.",
  },
];

const faqs = [
  {
    question: "Bouwen jullie alleen websites?",
    answer:
      "Nee. Wij helpen ook met SEO, content, reviews, hosting, zakelijke e-mail en online groei.",
  },
  {
    question: "Kan ik mijn website later zelf aanpassen?",
    answer:
      "Ja. Waar mogelijk zorgen we ervoor dat je zelf teksten en afbeeldingen kunt beheren.",
  },
  {
    question: "Helpen jullie ook met Google vindbaarheid?",
    answer: "Ja. Dit is een belangrijk onderdeel van onze dienstverlening.",
  },
  {
    question: "Kan ik alles bij Vedantix onderbrengen?",
    answer:
      "Ja. Website, hosting, e-mail, onderhoud en ondersteuning kunnen volledig via Vedantix worden verzorgd.",
  },
  {
    question: "Is dit geschikt voor kleine ondernemers?",
    answer:
      "Juist. Het model is ontwikkeld voor lokale ondernemers die professioneel online zichtbaar willen zijn.",
  },
];

const serviceSchema = createServiceSchema({
  name: "Het Vedantix Groei Model",
  slug: "groeimodel",
  description:
    "Ontdek hoe Vedantix lokale ondernemers helpt groeien met websites, SEO, Google optimalisatie, content, reviews en online zichtbaarheid.",
  audienceType: "Lokale ondernemers",
  serviceType: "Online groeiplatform",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "https://vedantix.nl/" },
  { name: "Het Vedantix Groei Model", url: canonical },
]);

function CheckList({ items, tone }) {
  return (
    <ul className="groei-list">
      {items.map((item) => (
        <li key={item}>
          {tone === "bad" ? (
            <XCircle size={18} aria-hidden="true" />
          ) : (
            <CheckCircle2 size={18} aria-hidden="true" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Groeimodel() {
  const whatsappUrl = `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(
    "Hallo Vedantix, ik wil graag een vrijblijvend gesprek over het Vedantix Groei Model."
  )}`;

  return (
    <>
      <SEO
        title="Het Vedantix Groei Model | Meer dan alleen een website"
        description="Ontdek hoe Vedantix lokale ondernemers helpt groeien met websites, SEO, Google optimalisatie, content, reviews en online zichtbaarheid."
        canonical={canonical}
        schemas={[serviceSchema, faqSchema, breadcrumbSchema]}
      />

      <div className="groei-page">
        <NavBar />

        <main>
          <header className="groei-hero">
            <div className="groei-shell groei-hero-grid">
              <div className="groei-hero-copy groei-reveal">
                <div className="groei-kicker">
                  <Sparkles size={16} aria-hidden="true" />
                  Online groeiplatform voor lokale ondernemers
                </div>
                <h1>Het Vedantix Groei Model</h1>
                <p className="groei-hero-lead">Een website alleen levert geen klanten op.</p>
                <p className="groei-hero-text">
                  Online succes ontstaat wanneer techniek, snelheid, SEO, content, reviews en
                  vertrouwen samenkomen.
                </p>
                <p className="groei-hero-text">
                  Daarom bouwen wij niet alleen websites. Wij bouwen complete online
                  groeiplatformen voor lokale ondernemers.
                </p>
                <div className="groei-actions">
                  <a className="groei-btn groei-btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Plan een vrijblijvend gesprek <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  <Link className="groei-btn groei-btn-secondary" to="/contact">
                    Neem contact op
                  </Link>
                </div>
              </div>

              <aside className="groei-hero-panel groei-reveal" aria-label="Vedantix Groei Model">
                <div className="groei-panel-logo">V</div>
                <div className="groei-panel-title">Website + groei</div>
                <div className="groei-panel-grid">
                  {["Techniek", "SEO", "Content", "Reviews", "Autoriteit", "Onderhoud"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="groei-panel-stat">
                  <strong>1 aanspreekpunt</strong>
                  <span>voor je complete online aanwezigheid</span>
                </div>
              </aside>
            </div>
          </header>

          <section className="groei-section" aria-labelledby="waarom-title">
            <div className="groei-shell">
              <div className="groei-section-heading groei-reveal">
                <p className="groei-label">Waarom websites vastlopen</p>
                <h2 id="waarom-title">Waarom veel websites nooit resultaat opleveren</h2>
              </div>

              <div className="groei-compare-grid">
                <article className="groei-compare-card groei-compare-bad groei-reveal">
                  <h3>Alleen een website</h3>
                  <CheckList items={websiteOnly} tone="bad" />
                </article>

                <article className="groei-compare-card groei-compare-good groei-reveal">
                  <h3>Het Vedantix Groei Model</h3>
                  <CheckList items={vedantixModel} tone="good" />
                </article>
              </div>

              <div className="groei-explain groei-reveal">
                <p>
                  Veel ondernemers investeren in een website en verwachten vervolgens automatisch
                  nieuwe klanten.
                </p>
                <p>In de praktijk werkt Google anders.</p>
                <p>
                  Bedrijven die goed gevonden worden combineren techniek, snelheid, content,
                  autoriteit en vertrouwen.
                </p>
                <p>Precies daarop is het Vedantix Groei Model gebouwd.</p>
              </div>
            </div>
          </section>

          <section className="groei-section groei-section-dark" aria-labelledby="bouwstenen-title">
            <div className="groei-shell">
              <div className="groei-section-heading groei-reveal">
                <p className="groei-label">Roadmap</p>
                <h2 id="bouwstenen-title">De 5 bouwstenen van online groei</h2>
              </div>

              <div className="groei-roadmap">
                {buildingBlocks.map((block, index) => {
                  const Icon = block.icon;
                  return (
                    <article className="groei-step groei-reveal" key={block.title}>
                      <div className="groei-step-number">Stap {index + 1}</div>
                      <div className="groei-step-icon">
                        <Icon size={28} aria-hidden="true" />
                      </div>
                      <h3>{block.title}</h3>
                      <p>{block.intro}</p>
                      <p>{block.lead}</p>
                      <ul>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {block.outro ? <p>{block.outro}</p> : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="groei-section" aria-labelledby="dak-title">
            <div className="groei-shell groei-under-one-roof">
              <div className="groei-section-heading groei-reveal">
                <p className="groei-label">Eén aanspreekpunt</p>
                <h2 id="dak-title">Alles onder één dak</h2>
              </div>

              <div className="groei-ecosystem groei-reveal">
                <div className="groei-ecosystem-center">
                  <Network size={34} aria-hidden="true" />
                  <span>Vedantix</span>
                </div>
                <div className="groei-ecosystem-items">
                  {ecosystem.map(({ label, icon: Icon }) => (
                    <div className="groei-ecosystem-item" key={label}>
                      <Icon size={22} aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="groei-roof-text groei-reveal">
                <p>Veel ondernemers werken met meerdere leveranciers.</p>
                <p>Daardoor ontstaat versnippering, onduidelijkheid en tijdverlies.</p>
                <p>
                  Vedantix brengt alles samen onder één dak zodat je één aanspreekpunt hebt voor je
                  complete online aanwezigheid.
                </p>
              </div>
            </div>
          </section>

          <section className="groei-section groei-section-muted" aria-labelledby="anders-title">
            <div className="groei-shell">
              <div className="groei-section-heading groei-reveal">
                <p className="groei-label">Waarom Vedantix</p>
                <h2 id="anders-title">Wat maakt Vedantix anders?</h2>
              </div>

              <div className="groei-card-grid">
                {differentiators.map((card) => (
                  <article className="groei-info-card groei-reveal" key={card.title}>
                    <div className="groei-card-mark">
                      <CheckCircle2 size={18} aria-hidden="true" />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="groei-quote-section">
            <div className="groei-shell">
              <div className="groei-quote-heading groei-reveal">
                <h2>Van online aanwezig naar online zichtbaar</h2>
              </div>
              <blockquote className="groei-quote groei-reveal">
                <p>Veel bureaus leveren een website op.</p>
                <p>Wij helpen ondernemers groeien.</p>
                <p>Dat is het verschil.</p>
              </blockquote>
            </div>
          </section>

          <section className="groei-section" aria-labelledby="faq-title">
            <div className="groei-shell">
              <div className="groei-section-heading groei-reveal">
                <p className="groei-label">FAQ</p>
                <h2 id="faq-title">Veelgestelde vragen</h2>
              </div>

              <div className="groei-faq-list">
                {faqs.map((faq) => (
                  <details className="groei-faq-item groei-reveal" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="groei-final-cta">
            <div className="groei-shell groei-final-card groei-reveal">
              <div>
                <p className="groei-label">Volgende stap</p>
                <h2>Klaar om online te groeien?</h2>
                <p>
                  Ontdek welke kansen er nog onbenut zijn voor jouw bedrijf.
                </p>
                <p>
                  Plan een vrijblijvend gesprek en ontvang advies over jouw online zichtbaarheid.
                </p>
              </div>
              <div className="groei-final-actions">
                <a className="groei-btn groei-btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Plan een gesprek <MessageCircle size={18} aria-hidden="true" />
                </a>
                <Link className="groei-btn groei-btn-secondary" to="/contact">
                  Neem contact op
                </Link>
              </div>
            </div>
          </section>
        </main>

        <BigFooter />
      </div>
    </>
  );
}
