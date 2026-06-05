import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import {
  downloadOnlineGrowthAuditPdf,
  fetchOnlineGrowthAudit,
  startOnlineGrowthAudit,
} from "../api/onlineGrowthAudit.api";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { CONTACT } from "../constants/contact";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "../utils/schema";

const INITIAL_FORM = {
  name: "",
  companyName: "",
  email: "",
  websiteUrl: "",
  competitorUrl1: "",
  competitorUrl2: "",
};

const STATUS_LABELS = {
  PENDING: "Audit staat in de wachtrij",
  RUNNING: "Analyse wordt uitgevoerd",
  COMPLETED: "Audit afgerond",
  FAILED: "Audit mislukt",
};

const PRIORITY_LABELS = {
  CRITICAL: "Kritiek",
  IMPORTANT: "Belangrijk",
  OPTIMIZATION: "Optimalisatie",
};

const FEATURE_CARDS = [
  {
    icon: Search,
    title: "SEO, GEO, AEO en AI",
    text: "De backend analyseert vindbaarheid, vraag-antwoordstructuur, entities en AI-zichtbaarheid.",
  },
  {
    icon: Zap,
    title: "Performance en security",
    text: "PageSpeed, headers, HTTPS, SPF en DMARC worden server-side gecontroleerd.",
  },
  {
    icon: Target,
    title: "Conversie en vertrouwen",
    text: "CTA's, WhatsApp, reviews, contactroutes en trust-signalen worden meegenomen.",
  },
];

const FAQS = [
  {
    question: "Wordt de Online Groei Audit in de browser berekend?",
    answer:
      "Nee. De frontend verzamelt alleen invoer en toont resultaten. Alle analyses, scores en PDF-generatie gebeuren in de Vedantix backend.",
  },
  {
    question: "Waarom duurt de audit soms even?",
    answer:
      "De backend crawlt de website en kan externe bronnen zoals PageSpeed, DNS en toekomstige marketing-integraties raadplegen. Daarom draait de audit asynchroon.",
  },
  {
    question: "Kan ik het rapport downloaden?",
    answer:
      "Ja. Zodra de audit is afgerond genereert de backend een professioneel PDF-rapport dat je direct kunt downloaden.",
  },
];

const canonical = "https://vedantix.nl/online-groei-audit";
const serviceSchema = createServiceSchema({
  name: "Online Groei Audit",
  slug: "online-groei-audit",
  description:
    "Gratis backend-gedreven audit voor SEO, GEO, AEO, AIO, performance, security, Google Business, reviews, conversie en lokale vindbaarheid.",
  audienceType: "Lokale ondernemers",
  serviceType: "Online groei audit en conversie analyse",
});
const faqSchema = createFAQSchema(FAQS);
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: "https://vedantix.nl/" },
  { name: "Online Groei Audit", url: canonical },
]);

function scoreTone(score) {
  if (score === null || score === undefined) return "unknown";
  if (score >= 75) return "good";
  if (score >= 55) return "mid";
  return "low";
}

function scoreLabel(score) {
  return score === null || score === undefined ? "UNKNOWN" : `${score}/100`;
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 400);
}

function StatusBadge({ status }) {
  return (
    <span className={`audit-status-badge ${String(status || "PENDING").toLowerCase()}`}>
      {status === "COMPLETED" ? (
        <CheckCircle2 size={16} aria-hidden="true" />
      ) : status === "FAILED" ? (
        <AlertTriangle size={16} aria-hidden="true" />
      ) : (
        <Loader2 size={16} aria-hidden="true" className="spin" />
      )}
      {STATUS_LABELS[status] || STATUS_LABELS.PENDING}
    </span>
  );
}

function ScoreCard({ score }) {
  const tone = scoreTone(score.score);
  return (
    <article className={`audit-score-card ${tone}`}>
      <div>
        <p>{score.label}</p>
        <strong>{scoreLabel(score.score)}</strong>
      </div>
      <span>{score.status}</span>
      <p>{score.summary}</p>
      {score.recommendations?.[0] ? <em>{score.recommendations[0]}</em> : null}
    </article>
  );
}

function PriorityColumn({ label, items }) {
  return (
    <article className="audit-priority-card">
      <h3>{label}</h3>
      {items?.length ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Geen directe punten.</p>
      )}
    </article>
  );
}

function CompetitorTable({ competitors }) {
  if (!competitors?.length) return null;

  return (
    <section className="audit-section-card" aria-labelledby="competitors-title">
      <div className="audit-section-heading">
        <p>Vergelijking</p>
        <h2 id="competitors-title">Concurrentieanalyse</h2>
      </div>
      <div className="audit-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>SEO</th>
              <th>Reviews</th>
              <th>FAQ</th>
              <th>Speed</th>
              <th>Google Business</th>
              <th>Conversie</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr key={competitor.url}>
                <td>{competitor.url}</td>
                <td>{scoreLabel(competitor.seoScore)}</td>
                <td>{competitor.reviewSignals}</td>
                <td>{competitor.faqCount}</td>
                <td>{scoreLabel(competitor.speedScore)}</td>
                <td>{competitor.googleBusinessSignals}</td>
                <td>{competitor.conversionSignals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function OnlineGrowthAudit() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [auditId, setAuditId] = useState(() => {
    try {
      return window.localStorage.getItem("vedantix_online_growth_audit_id") || "";
    } catch {
      return "";
    }
  });
  const [audit, setAudit] = useState(null);
  const [error, setError] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resultRef = useRef(null);

  const status = audit?.status || (auditId ? "PENDING" : null);
  const results = audit?.results || null;
  const isActive = status === "PENDING" || status === "RUNNING";

  const whatsappUrl = useMemo(() => {
    const message = results
      ? `Hallo Vedantix, mijn Online Groei Audit is afgerond met score ${results.overallScore ?? "UNKNOWN"}/100. Ik wil graag een vrijblijvend gesprek plannen.`
      : "Hallo Vedantix, ik wil graag een Online Groei Audit bespreken.";
    return `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  }, [results]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const refreshAudit = async (id = auditId, options = {}) => {
    if (!id) return null;
    if (!options.silent) setIsRefreshing(true);
    try {
      const nextAudit = await fetchOnlineGrowthAudit(id);
      setAudit(nextAudit);
      setError("");
      return nextAudit;
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Audit ophalen is mislukt.");
      return null;
    } finally {
      if (!options.silent) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!auditId) return undefined;
    void refreshAudit(auditId, { silent: true });
    return undefined;
  }, [auditId]);

  useEffect(() => {
    if (!auditId || !isActive) return undefined;
    const interval = window.setInterval(() => {
      void refreshAudit(auditId, { silent: true });
    }, 2500);
    return () => window.clearInterval(interval);
  }, [auditId, isActive]);

  useEffect(() => {
    if (results) {
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [results]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.companyName.trim() || !form.email.trim() || !form.websiteUrl.trim()) {
      setError("Vul naam, bedrijfsnaam, e-mailadres en website URL in om de audit te starten.");
      return;
    }

    setIsStarting(true);
    try {
      const started = await startOnlineGrowthAudit({
        name: form.name,
        companyName: form.companyName,
        email: form.email,
        websiteUrl: form.websiteUrl,
        competitorUrl1: form.competitorUrl1,
        competitorUrl2: form.competitorUrl2,
      });
      setAuditId(started.auditId);
      setAudit({ auditId: started.auditId, status: started.status });
      window.localStorage.setItem("vedantix_online_growth_audit_id", started.auditId);
      await refreshAudit(started.auditId, { silent: true });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Audit starten is mislukt.");
    } finally {
      setIsStarting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!auditId) return;
    setIsDownloading(true);
    setError("");
    try {
      const { blob, filename } = await downloadOnlineGrowthAuditPdf(auditId);
      saveBlob(blob, filename);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "PDF downloaden is mislukt.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <SEO
        title="Gratis Online Groei Audit | Vedantix"
        description="Start een backend-gedreven Online Groei Audit en ontdek kansen voor SEO, GEO, AEO, AI-zichtbaarheid, security, reviews, conversie en lokale vindbaarheid."
        canonical={canonical}
        schemas={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <style>{AUDIT_STYLES}</style>

      <div className="audit-page">
        <NavBar />
        <main className="audit-shell">
          <section className="audit-hero" aria-labelledby="audit-title">
            <div className="audit-panel audit-hero-copy">
              <div className="audit-kicker">
                <Sparkles size={16} aria-hidden="true" />
                Online Groei Audit™
              </div>
              <h1 id="audit-title">Ontdek waar jouw website groei laat liggen</h1>
              <p>
                Vul je gegevens in. De Vedantix backend crawlt en analyseert je website
                asynchroon op vindbaarheid, AI-zichtbaarheid, performance, security,
                vertrouwen en conversie.
              </p>
              <div className="audit-feature-grid">
                {FEATURE_CARDS.map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <Icon size={22} aria-hidden="true" />
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </article>
                ))}
              </div>
            </div>

            <form className="audit-panel audit-form" onSubmit={handleSubmit}>
              <div className="audit-form-grid">
                <label>
                  <span>Naam</span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  <span>Bedrijfsnaam</span>
                  <input
                    value={form.companyName}
                    onChange={(event) => updateField("companyName", event.target.value)}
                    autoComplete="organization"
                    required
                  />
                </label>
                <label>
                  <span>E-mailadres</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  <span>Website URL</span>
                  <input
                    value={form.websiteUrl}
                    onChange={(event) => updateField("websiteUrl", event.target.value)}
                    placeholder="https://jouwbedrijf.nl"
                    inputMode="url"
                    required
                  />
                </label>
                <label>
                  <span>Concurrent URL 1 <em>optioneel</em></span>
                  <input
                    value={form.competitorUrl1}
                    onChange={(event) => updateField("competitorUrl1", event.target.value)}
                    placeholder="https://concurrent.nl"
                    inputMode="url"
                  />
                </label>
                <label>
                  <span>Concurrent URL 2 <em>optioneel</em></span>
                  <input
                    value={form.competitorUrl2}
                    onChange={(event) => updateField("competitorUrl2", event.target.value)}
                    placeholder="https://andere-concurrent.nl"
                    inputMode="url"
                  />
                </label>
              </div>

              {error ? (
                <div className="audit-error" role="alert">
                  <AlertTriangle size={18} aria-hidden="true" />
                  <span>{error}</span>
                </div>
              ) : null}

              <button className="audit-submit" type="submit" disabled={isStarting}>
                {isStarting ? (
                  <Loader2 size={18} aria-hidden="true" className="spin" />
                ) : (
                  <ArrowRight size={18} aria-hidden="true" />
                )}
                Start backend audit
              </button>
            </form>
          </section>

          {status ? (
            <section className="audit-status-panel" aria-live="polite">
              <div>
                <StatusBadge status={status} />
                <p>
                  Audit ID: <strong>{auditId}</strong>
                </p>
              </div>
              <button type="button" onClick={() => refreshAudit()} disabled={isRefreshing}>
                <RefreshCw size={16} aria-hidden="true" className={isRefreshing ? "spin" : ""} />
                Status verversen
              </button>
            </section>
          ) : null}

          {isActive ? (
            <section className="audit-progress-card">
              <Clock3 size={28} aria-hidden="true" />
              <div>
                <h2>De backend analyseert je website</h2>
                <p>
                  Je hoeft deze pagina niet open te houden. Met hetzelfde audit-id kan de status
                  opnieuw worden opgehaald.
                </p>
              </div>
            </section>
          ) : null}

          {status === "FAILED" ? (
            <section className="audit-progress-card failed">
              <AlertTriangle size={28} aria-hidden="true" />
              <div>
                <h2>Audit mislukt</h2>
                <p>{audit?.request?.errorMessage || "De backend kon deze audit niet afronden."}</p>
              </div>
            </section>
          ) : null}

          {results ? (
            <section className="audit-results" ref={resultRef}>
              <div className="audit-result-hero">
                <div>
                  <p>Online Groei Score</p>
                  <strong>{scoreLabel(results.overallScore)}</strong>
                  <span>{results.executiveSummary}</span>
                </div>
                <button type="button" onClick={handleDownloadPdf} disabled={isDownloading}>
                  {isDownloading ? (
                    <Loader2 size={18} aria-hidden="true" className="spin" />
                  ) : (
                    <Download size={18} aria-hidden="true" />
                  )}
                  Download PDF
                </button>
              </div>

              <section className="audit-section-card" aria-labelledby="scores-title">
                <div className="audit-section-heading">
                  <p>Scorecards</p>
                  <h2 id="scores-title">Analyse per categorie</h2>
                </div>
                <div className="audit-score-grid">
                  {results.scores?.map((score) => (
                    <ScoreCard key={score.key} score={score} />
                  ))}
                </div>
              </section>

              <section className="audit-section-card" aria-labelledby="priority-title">
                <div className="audit-section-heading">
                  <p>Actieplan</p>
                  <h2 id="priority-title">Prioriteitenmatrix</h2>
                </div>
                <div className="audit-priority-grid">
                  {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                    <PriorityColumn
                      key={key}
                      label={label}
                      items={results.priorityMatrix?.[key] || []}
                    />
                  ))}
                </div>
              </section>

              <section className="audit-section-card audit-list-grid" aria-labelledby="wins-title">
                <div>
                  <div className="audit-section-heading">
                    <p>Snel verbeteren</p>
                    <h2 id="wins-title">Quick wins</h2>
                  </div>
                  <ul>
                    {results.quickWins?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="audit-section-heading">
                    <p>Roadmap</p>
                    <h2>Aanbevelingen</h2>
                  </div>
                  <ul>
                    {results.recommendations?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <CompetitorTable competitors={results.competitors} />

              <section className="audit-final-cta">
                <div>
                  <FileText size={26} aria-hidden="true" />
                  <h2>Bespreek je belangrijkste groeikansen</h2>
                  <p>
                    We vertalen het rapport naar concrete stappen voor meer zichtbaarheid,
                    vertrouwen en aanvragen.
                  </p>
                </div>
                <div>
                  <Link to="/planning">Plan een gesprek</Link>
                  <a href={whatsappUrl}>WhatsApp Vedantix</a>
                </div>
              </section>
            </section>
          ) : null}
        </main>
      </div>
    </>
  );
}

const AUDIT_STYLES = `
.audit-page {
  min-height: 100vh;
  background: #f4f7fb;
  color: #0f172a;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.audit-page a {
  text-decoration: none;
}

.audit-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 118px 0 74px;
}

.audit-hero {
  display: grid;
  gap: 18px;
  align-items: stretch;
}

.audit-panel,
.audit-section-card,
.audit-status-panel,
.audit-progress-card,
.audit-result-hero,
.audit-final-cta {
  border: 1px solid #dbe4f0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 20px 60px rgba(15, 23, 42, .07);
}

.audit-hero-copy {
  padding: clamp(24px, 5vw, 42px);
  color: #fff;
  background:
    radial-gradient(circle at 82% 15%, rgba(96, 165, 250, .26), transparent 32%),
    radial-gradient(circle at 20% 82%, rgba(34, 197, 94, .16), transparent 30%),
    linear-gradient(145deg, #061023, #0c1f3d 58%, #0e2c52);
}

.audit-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-bottom: 18px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: rgba(255, 255, 255, .08);
  color: rgba(255, 255, 255, .88);
  font-size: .72rem;
  font-weight: 950;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.audit-hero h1 {
  max-width: 720px;
  margin: 0;
  color: #fff;
  font-size: clamp(2.55rem, 9vw, 5rem);
  font-weight: 950;
  line-height: .98;
  letter-spacing: 0;
}

.audit-hero-copy > p {
  max-width: 680px;
  margin: 18px 0 0;
  color: rgba(255, 255, 255, .78);
  font-size: 1.05rem;
  line-height: 1.75;
}

.audit-feature-grid {
  display: grid;
  gap: 12px;
  margin-top: 26px;
}

.audit-feature-grid article {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, .13);
  border-radius: 8px;
  background: rgba(255, 255, 255, .07);
}

.audit-feature-grid svg {
  color: #93c5fd;
}

.audit-feature-grid strong {
  color: #fff;
  font-size: .98rem;
}

.audit-feature-grid span {
  color: rgba(255, 255, 255, .72);
  font-size: .88rem;
  line-height: 1.55;
}

.audit-form {
  padding: clamp(22px, 4vw, 30px);
}

.audit-form-grid {
  display: grid;
  gap: 14px;
}

.audit-form label {
  display: grid;
  gap: 7px;
}

.audit-form span {
  color: #334155;
  font-size: .84rem;
  font-weight: 900;
}

.audit-form em {
  color: #94a3b8;
  font-style: normal;
  font-weight: 760;
}

.audit-form input {
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  outline: none;
}

.audit-form input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, .11);
}

.audit-submit,
.audit-status-panel button,
.audit-result-hero button,
.audit-final-cta a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 950;
  cursor: pointer;
}

.audit-submit {
  width: 100%;
  margin-top: 18px;
  background: #0f172a;
  color: #fff;
  box-shadow: 0 18px 42px rgba(15, 23, 42, .18);
}

.audit-submit:disabled,
.audit-status-panel button:disabled,
.audit-result-hero button:disabled {
  cursor: not-allowed;
  opacity: .68;
}

.audit-error {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 16px;
  padding: 13px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fff1f2;
  color: #b91c1c;
  font-size: .9rem;
  font-weight: 850;
}

.audit-status-panel,
.audit-progress-card,
.audit-result-hero,
.audit-section-card,
.audit-final-cta {
  margin-top: 18px;
}

.audit-status-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
}

.audit-status-panel p {
  margin: 10px 0 0;
  color: #64748b;
  font-size: .85rem;
}

.audit-status-panel button {
  padding: 0 14px;
  border-color: #bfdbfe;
  background: #eff6ff;
  color: #1d4ed8;
}

.audit-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: .78rem;
  font-weight: 950;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.audit-status-badge.completed {
  background: #ecfdf5;
  color: #059669;
}

.audit-status-badge.failed {
  background: #fff1f2;
  color: #dc2626;
}

.audit-progress-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 20px;
}

.audit-progress-card svg {
  flex: 0 0 auto;
  color: #2563eb;
}

.audit-progress-card.failed svg {
  color: #dc2626;
}

.audit-progress-card h2 {
  margin: 0 0 5px;
  font-size: 1.16rem;
  font-weight: 950;
}

.audit-progress-card p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.audit-result-hero {
  display: grid;
  gap: 18px;
  padding: 24px;
  background: linear-gradient(145deg, #071225, #0d2a52);
  color: #fff;
}

.audit-result-hero p {
  margin: 0 0 8px;
  color: #93c5fd;
  font-size: .78rem;
  font-weight: 950;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.audit-result-hero strong {
  display: block;
  margin-bottom: 10px;
  font-size: clamp(2.7rem, 10vw, 4.7rem);
  font-weight: 950;
  line-height: .95;
}

.audit-result-hero span {
  display: block;
  max-width: 780px;
  color: rgba(255, 255, 255, .78);
  line-height: 1.7;
}

.audit-result-hero button {
  width: 100%;
  padding: 0 18px;
  background: #fff;
  color: #0f172a;
}

.audit-section-card {
  padding: 22px;
}

.audit-section-heading {
  margin-bottom: 16px;
}

.audit-section-heading p {
  margin: 0 0 6px;
  color: #2563eb;
  font-size: .72rem;
  font-weight: 950;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.audit-section-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(1.45rem, 5vw, 2.25rem);
  font-weight: 950;
  line-height: 1.06;
}

.audit-score-grid,
.audit-priority-grid,
.audit-list-grid {
  display: grid;
  gap: 14px;
}

.audit-score-card,
.audit-priority-card {
  padding: 17px;
  border: 1px solid #dbe4f0;
  border-radius: 8px;
  background: #f8fafc;
}

.audit-score-card.good {
  border-color: #bbf7d0;
  background: #f0fdf4;
}

.audit-score-card.mid {
  border-color: #bfdbfe;
  background: #eff6ff;
}

.audit-score-card.low {
  border-color: #fed7aa;
  background: #fff7ed;
}

.audit-score-card.unknown {
  border-color: #e2e8f0;
  background: #f8fafc;
}

.audit-score-card > div {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
}

.audit-score-card p {
  margin: 0;
  color: #64748b;
  font-size: .86rem;
  line-height: 1.55;
}

.audit-score-card strong {
  color: #0f172a;
  font-size: 1.55rem;
  font-weight: 950;
  white-space: nowrap;
}

.audit-score-card > span {
  display: inline-flex;
  margin: 9px 0;
  color: #2563eb;
  font-size: .7rem;
  font-weight: 950;
  letter-spacing: .08em;
}

.audit-score-card em {
  display: block;
  margin-top: 10px;
  color: #334155;
  font-size: .84rem;
  font-style: normal;
  font-weight: 850;
  line-height: 1.5;
}

.audit-priority-card h3 {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 1.02rem;
  font-weight: 950;
}

.audit-priority-card ul,
.audit-list-grid ul {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.audit-priority-card li,
.audit-list-grid li {
  position: relative;
  padding-left: 18px;
  color: #334155;
  font-size: .91rem;
  line-height: 1.55;
}

.audit-priority-card li::before,
.audit-list-grid li::before {
  position: absolute;
  top: .62em;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #2563eb;
  content: "";
}

.audit-priority-card p {
  margin: 0;
  color: #64748b;
}

.audit-table-wrap {
  overflow-x: auto;
}

.audit-table-wrap table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}

.audit-table-wrap th,
.audit-table-wrap td {
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
  vertical-align: top;
}

.audit-table-wrap th {
  color: #64748b;
  font-size: .72rem;
  font-weight: 950;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.audit-table-wrap td {
  color: #334155;
  font-size: .88rem;
}

.audit-final-cta {
  display: grid;
  gap: 18px;
  padding: 24px;
}

.audit-final-cta h2 {
  margin: 10px 0 8px;
  color: #0f172a;
  font-size: 1.55rem;
  font-weight: 950;
}

.audit-final-cta p {
  margin: 0;
  color: #64748b;
  line-height: 1.65;
}

.audit-final-cta > div:last-child {
  display: grid;
  gap: 10px;
}

.audit-final-cta a {
  padding: 0 16px;
  background: #0f172a;
  color: #fff;
}

.audit-final-cta a:last-child {
  border-color: #bfdbfe;
  background: #eff6ff;
  color: #1d4ed8;
}

.spin {
  animation: audit-spin .9s linear infinite;
}

@keyframes audit-spin {
  to { transform: rotate(360deg); }
}

@media (min-width: 760px) {
  .audit-hero {
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, .75fr);
  }

  .audit-feature-grid,
  .audit-score-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .audit-form-grid,
  .audit-priority-grid,
  .audit-list-grid,
  .audit-final-cta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .audit-result-hero {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .audit-result-hero button {
    width: auto;
  }
}

@media (min-width: 1100px) {
  .audit-score-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .audit-shell {
    width: min(100% - 24px, 1180px);
    padding-top: 104px;
  }
}
`;
