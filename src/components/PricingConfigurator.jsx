import { useMemo, useState } from "react";
import { Check, Download, Mail, MessageCircle, Minus, Plus, Share2 } from "lucide-react";
import { CONTACT } from "../constants/contact";
import "../styles/pricing-configurator.css";

const WEBSITE_OPTIONS = [
  { code: "STARTER", label: "Starter", price: 399, description: "Professionele onepage met technische SEO-basis." },
  { code: "GROWTH", label: "Growth", price: 599, description: "Tot 5 pagina's met SEO, lokale SEO en AEO-basis.", featured: true },
  { code: "PRO", label: "Pro", price: 999, description: "Tot 10 pagina's met uitgebreidere SEO, AEO en GEO/AIO-basis." },
];

const HOSTING_OPTIONS = [
  { code: "YEAR_1", label: "1 jaar hosting", price: 30, period: "1 jaar" },
  { code: "YEAR_3", label: "3 jaar hosting", price: 85, period: "3 jaar" },
  { code: "YEAR_5", label: "5 jaar hosting", price: 135, period: "5 jaar" },
];

const ONE_TIME_OPTIONS = [
  { code: "SEO_START", label: "SEO Start", price: 149 },
  { code: "AEO_START", label: "AEO Start", price: 99 },
  { code: "GEO_AIO_START", label: "GEO + AIO Start", price: 199 },
  { code: "ANALYTICS", label: "Bezoekersinzichten / Analytics", price: 49 },
  { code: "APPOINTMENTS", label: "Online afspraken", price: 149 },
  { code: "EXTRA_PAGE", label: "Extra pagina", price: 99 },
  { code: "COPY", label: "Teksten laten schrijven", price: 99 },
];

const GROWTH_OPTIONS = [
  { code: "NONE", label: "Geen groeipakket", price: 0 },
  { code: "VISIBILITY", label: "Zichtbaarheid Basis", price: 49 },
  { code: "GOOGLE", label: "Google Groei", price: 99 },
  { code: "GOOGLE_AI", label: "Google + AI Groei", price: 149 },
];

function euro(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function createReference() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VDX-${date}-${suffix}`;
}

function ascii(value) {
  return String(value ?? "")
    .replace(/€/g, "EUR ")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

function pdfEscape(value) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createPdfBlob(lines) {
  const contentLines = [
    "BT",
    "/F1 18 Tf",
    "50 790 Td",
    `(VEDANTIX) Tj`,
    "0 -24 Td",
    "/F1 10 Tf",
  ];

  lines.slice(0, 42).forEach((line, index) => {
    if (index === 0) {
      contentLines.push(`(${pdfEscape(line)}) Tj`);
    } else {
      contentLines.push("0 -15 Td");
      contentLines.push(`(${pdfEscape(line)}) Tj`);
    }
  });
  contentLines.push("ET");

  const stream = contentLines.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function PricingConfigurator() {
  const [websiteCode, setWebsiteCode] = useState("GROWTH");
  const [hostingCode, setHostingCode] = useState("YEAR_1");
  const [mailboxes, setMailboxes] = useState(0);
  const [oneTimeCodes, setOneTimeCodes] = useState([]);
  const [growthCode, setGrowthCode] = useState("NONE");
  const [details, setDetails] = useState({ name: "", company: "", email: "", phone: "", notes: "" });
  const [formMessage, setFormMessage] = useState("");
  const [reference] = useState(createReference);

  const website = WEBSITE_OPTIONS.find((item) => item.code === websiteCode) || WEBSITE_OPTIONS[1];
  const hosting = HOSTING_OPTIONS.find((item) => item.code === hostingCode) || HOSTING_OPTIONS[0];
  const growth = GROWTH_OPTIONS.find((item) => item.code === growthCode) || GROWTH_OPTIONS[0];
  const selectedOneTime = ONE_TIME_OPTIONS.filter((item) => oneTimeCodes.includes(item.code));

  const totals = useMemo(() => {
    const oneTimeExtras = selectedOneTime.reduce((sum, item) => sum + item.price, 0);
    const yearlyEmail = mailboxes * 30;
    return {
      start: website.price + hosting.price + oneTimeExtras + yearlyEmail,
      yearly: yearlyEmail + (hostingCode === "YEAR_1" ? hosting.price : 0),
      monthly: growth.price,
    };
  }, [website.price, hosting.price, hostingCode, selectedOneTime, mailboxes, growth.price]);

  const updateDetail = (field, value) => {
    setDetails((current) => ({ ...current, [field]: value }));
    if (formMessage) setFormMessage("");
  };

  const toggleOneTime = (code) => {
    setOneTimeCodes((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
    );
  };

  const quoteLines = () => {
    const lines = [
      `Offerte-indicatie ${reference}`,
      `Datum: ${new Date().toLocaleDateString("nl-NL")}`,
      `Naam: ${details.name || "-"}`,
      `Bedrijf: ${details.company || "-"}`,
      `E-mail: ${details.email || "-"}`,
      `Telefoon: ${details.phone || "-"}`,
      "",
      `Website: ${website.label} - ${euro(website.price)} websitebouw`,
      `Hosting: ${hosting.label} - ${euro(hosting.price)}`,
    ];

    if (mailboxes > 0) lines.push(`Zakelijke e-mail: ${mailboxes} mailbox${mailboxes === 1 ? "" : "en"} - ${euro(mailboxes * 30)}/jaar`);
    selectedOneTime.forEach((item) => lines.push(`${item.label} - ${euro(item.price)}`));
    if (growth.price > 0) lines.push(`${growth.label} - ${euro(growth.price)}/maand`);

    lines.push(
      "",
      `Bij de start: ${euro(totals.start)}`,
      `Terugkerend jaarlijks: ${euro(totals.yearly)}/jaar`,
      `Optioneel maandelijks: ${euro(totals.monthly)}/maand`
    );

    if (hostingCode !== "YEAR_1") lines.push(`Hosting voor ${hosting.period} is vooruitbetaald en zit in het startbedrag.`);
    if (details.notes.trim()) lines.push("", `Opmerking: ${details.notes.trim()}`);
    lines.push("", "Vrijblijvende prijsindicatie; definitieve scope en planning worden vooraf bevestigd.");
    return lines;
  };

  const validateCustomer = () => {
    if (!details.name.trim() || !details.email.trim()) {
      setFormMessage("Vul minimaal je naam en e-mailadres in om de offerte te downloaden of delen.");
      return false;
    }
    return true;
  };

  const filename = () => {
    const safe = (details.company || details.name || "offerte")
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/^-|-$/g, "");
    return `Vedantix-${reference}-${safe}.pdf`;
  };

  const buildPdfFile = () => {
    const blob = createPdfBlob(quoteLines());
    return new File([blob], filename(), { type: "application/pdf" });
  };

  const downloadPdf = () => {
    if (!validateCustomer()) return;
    const file = buildPdfFile();
    downloadBlob(file, file.name);
  };

  const messageText = () => [
    `Hallo Vedantix, ik wil offerte-indicatie ${reference} graag bespreken.`,
    "",
    ...quoteLines().slice(7),
  ].join("\n");

  const whatsappUrl = `${CONTACT.WHATSAPP_URL}?text=${encodeURIComponent(messageText())}`;
  const emailUrl = `mailto:info@vedantix.nl?subject=${encodeURIComponent(`Offerte-indicatie ${reference} bespreken`)}&body=${encodeURIComponent(messageText())}`;

  const shareQuote = async () => {
    if (!validateCustomer()) return;
    const file = buildPdfFile();

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: `Vedantix offerte-indicatie ${reference}`,
          text: "Mijn samengestelde Vedantix website-offerte",
          files: [file],
        });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    downloadBlob(file, file.name);
    window.location.href = emailUrl;
  };

  return (
    <section className="quote-configurator" id="samenstellen" aria-labelledby="quote-configurator-title">
      <div className="pricing-container">
        <div className="quote-configurator-heading">
          <div>
            <span className="pricing-kicker">Stel zelf samen</span>
            <h2 id="quote-configurator-title">Bouw je eigen website-offerte.</h2>
            <p>Klik aan wat je nodig hebt. Je ziet direct wat je bij de start betaalt en welke kosten daarna terugkomen.</p>
          </div>
          <div className="quote-reference">Offerte {reference}</div>
        </div>

        <div className="quote-layout">
          <div className="quote-builder">
            <section className="quote-step">
              <div className="quote-step-title"><span>1</span><div><h3>Kies je website</h3><p>De bouwprijs betaal je één keer.</p></div></div>
              <div className="quote-choice-grid three">
                {WEBSITE_OPTIONS.map((option) => (
                  <button type="button" className={`quote-choice ${websiteCode === option.code ? "selected" : ""} ${option.featured ? "featured" : ""}`} onClick={() => setWebsiteCode(option.code)} key={option.code}>
                    {websiteCode === option.code && <span className="quote-selected"><Check size={14} /> Gekozen</span>}
                    <strong>{option.label}</strong>
                    <b>{euro(option.price)}</b>
                    <small>websitebouw</small>
                    <p>{option.description}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="quote-step">
              <div className="quote-step-title"><span>2</span><div><h3>Hosting & e-mail</h3><p>Hosting is nodig om je website via Vedantix online te houden.</p></div></div>
              <div className="quote-choice-grid three compact">
                {HOSTING_OPTIONS.map((option) => (
                  <button type="button" className={`quote-choice ${hostingCode === option.code ? "selected" : ""}`} onClick={() => setHostingCode(option.code)} key={option.code}>
                    <strong>{option.period}</strong>
                    <b>{euro(option.price)}</b>
                    <small>hosting</small>
                  </button>
                ))}
              </div>
              <div className="quote-mailbox-row">
                <div><strong>Zakelijke mailboxen</strong><span>€30 per mailbox per jaar</span></div>
                <div className="quote-counter">
                  <button type="button" onClick={() => setMailboxes((value) => Math.max(0, value - 1))} aria-label="Mailbox verwijderen"><Minus size={16} /></button>
                  <strong>{mailboxes}</strong>
                  <button type="button" onClick={() => setMailboxes((value) => Math.min(20, value + 1))} aria-label="Mailbox toevoegen"><Plus size={16} /></button>
                </div>
              </div>
            </section>

            <section className="quote-step">
              <div className="quote-step-title"><span>3</span><div><h3>Eenmalige uitbreidingen</h3><p>Voeg alleen toe wat je nu nodig hebt.</p></div></div>
              <div className="quote-check-grid">
                {ONE_TIME_OPTIONS.map((option) => {
                  const selected = oneTimeCodes.includes(option.code);
                  return (
                    <button type="button" className={`quote-check ${selected ? "selected" : ""}`} onClick={() => toggleOneTime(option.code)} key={option.code}>
                      <span className="quote-checkbox">{selected ? <Check size={14} /> : null}</span>
                      <span><strong>{option.label}</strong><small>{euro(option.price)} eenmalig</small></span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="quote-step">
              <div className="quote-step-title"><span>4</span><div><h3>Doorlopende groei</h3><p>Optioneel. Kies één pakket of geen.</p></div></div>
              <div className="quote-choice-grid two compact">
                {GROWTH_OPTIONS.map((option) => (
                  <button type="button" className={`quote-choice ${growthCode === option.code ? "selected" : ""}`} onClick={() => setGrowthCode(option.code)} key={option.code}>
                    <strong>{option.label}</strong>
                    <b>{option.price ? `${euro(option.price)}/m` : "€0/m"}</b>
                  </button>
                ))}
              </div>
            </section>

            <section className="quote-step quote-customer-step">
              <div className="quote-step-title"><span>5</span><div><h3>Maak je offerte persoonlijk</h3><p>Naam en e-mail zijn nodig voor de PDF. De rest is optioneel.</p></div></div>
              <div className="quote-form-grid">
                <label>Naam *<input value={details.name} onChange={(event) => updateDetail("name", event.target.value)} placeholder="Voor- en achternaam" /></label>
                <label>Bedrijfsnaam<input value={details.company} onChange={(event) => updateDetail("company", event.target.value)} placeholder="Jouw bedrijf" /></label>
                <label>E-mailadres *<input type="email" value={details.email} onChange={(event) => updateDetail("email", event.target.value)} placeholder="naam@bedrijf.nl" /></label>
                <label>Telefoonnummer<input value={details.phone} onChange={(event) => updateDetail("phone", event.target.value)} placeholder="06 ..." /></label>
                <label className="wide">Opmerking<textarea value={details.notes} onChange={(event) => updateDetail("notes", event.target.value)} placeholder="Bijvoorbeeld gewenste planning, bestaande website of specifieke wensen" /></label>
              </div>
              {formMessage ? <p className="quote-form-message">{formMessage}</p> : null}
            </section>
          </div>

          <aside className="quote-summary">
            <span className="quote-summary-label">Jouw samenstelling</span>
            <h3>{website.label} website</h3>
            <div className="quote-summary-list">
              <div><span>{website.label} websitebouw</span><strong>{euro(website.price)}</strong></div>
              <div><span>{hosting.label}</span><strong>{euro(hosting.price)}</strong></div>
              {mailboxes > 0 && <div><span>{mailboxes} zakelijke mailbox{mailboxes === 1 ? "" : "en"}</span><strong>{euro(mailboxes * 30)}/j</strong></div>}
              {selectedOneTime.map((item) => <div key={item.code}><span>{item.label}</span><strong>{euro(item.price)}</strong></div>)}
              {growth.price > 0 && <div><span>{growth.label}</span><strong>{euro(growth.price)}/m</strong></div>}
            </div>
            <div className="quote-total-block primary"><span>Bij de start</span><strong>{euro(totals.start)}</strong></div>
            <div className="quote-recurring-grid">
              <div><span>Jaarlijks</span><strong>{euro(totals.yearly)}</strong><small>per jaar</small></div>
              <div><span>Maandelijks</span><strong>{euro(totals.monthly)}</strong><small>per maand</small></div>
            </div>
            {hostingCode !== "YEAR_1" && <p className="quote-summary-note">Hosting voor {hosting.period} is al volledig opgenomen in het startbedrag.</p>}
            <p className="quote-summary-note">Alle bedragen zijn inclusief btw. De definitieve scope wordt voor de start bevestigd.</p>
            <div className="quote-actions">
              <button type="button" className="quote-action primary" onClick={downloadPdf}><Download size={17} /> Download offerte PDF</button>
              <button type="button" className="quote-action" onClick={shareQuote}><Share2 size={17} /> Deel offerte</button>
              <a className="quote-action whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Bespreek via WhatsApp</a>
              <a className="quote-action" href={emailUrl}><Mail size={17} /> Bespreek via e-mail</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
