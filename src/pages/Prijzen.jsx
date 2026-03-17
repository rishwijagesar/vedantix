import { useState } from "react";

const FEATURES = [
  { category: "Website", items: [
    { label: "Aantal pagina's", starter: "1 pagina", business: "Tot 5 pagina's", premium: "Tot 10 pagina's" },
    { label: "Mobielvriendelijk (responsive)", starter: true, business: true, premium: true },
    { label: "Professioneel custom design", starter: false, business: false, premium: true },
    { label: "Standaard premium template", starter: true, business: true, premium: false },
    { label: "Levertijd", starter: "48 uur", business: "48 uur", premium: "48 uur" },
    { label: "Blog / nieuwssectie", starter: false, business: false, premium: true },
    { label: "Meertalig (NL + EN)", starter: false, business: "Op aanvraag (+€150)", premium: true },
  ]},
  { category: "Techniek & Hosting", items: [
    { label: "Hosting inbegrepen", starter: "1 jaar", business: "1 jaar", premium: "1 jaar" },
    { label: "Database opslag", starter: "500 MB", business: "2 GB", premium: "10 GB" },
    { label: "Extra opslag", starter: "€15/maand/GB", business: "€12/maand/GB", premium: "€10/maand/GB" },
    { label: "SSL-certificaat (HTTPS)", starter: true, business: true, premium: true },
    { label: "Domeinnaam registratie", starter: true, business: true, premium: true },
    { label: "Snelle laadtijden (geoptimaliseerd)", starter: true, business: true, premium: true },
    { label: "Bestaand domein koppelen", starter: true, business: true, premium: true },
    { label: "Dagelijkse backups", starter: false, business: true, premium: true },
  ]},
  { category: "Functies", items: [
    { label: "Contactformulier", starter: true, business: true, premium: true },
    { label: "Google Maps integratie", starter: false, business: true, premium: true },
    { label: "Social media knoppen", starter: true, business: true, premium: true },
    { label: "Galerij / fotosectie", starter: false, business: true, premium: true },
    { label: "WhatsApp chat knop", starter: false, business: true, premium: true },
    { label: "Cookie-melding (AVG)", starter: true, business: true, premium: true },
    { label: "Reserverings- of boekingssysteem", starter: false, business: "Op aanvraag (+€150)", premium: true },
    { label: "Webshop (e-commerce)", starter: false, business: false, premium: "Op aanvraag (+€499)" },
  ]},
  { category: "SEO & Marketing", items: [
    { label: "Basis SEO (titels, meta)", starter: true, business: true, premium: true },
    { label: "Geavanceerde SEO-optimalisatie", starter: false, business: false, premium: true },
    { label: "Google Analytics koppeling", starter: false, business: true, premium: true },
    { label: "Sitemap & robots.txt", starter: false, business: true, premium: true },
    { label: "Google Search Console setup", starter: false, business: false, premium: true },
  ]},
  { category: "Service & Support", items: [
    { label: "Gratis aanpassingen na levering", starter: "—", business: "1x", premium: "3x" },
    { label: "Reactietijd bij vragen", starter: "48 uur", business: "24 uur", premium: "24 uur" },
    { label: "Aanpassingen na periode", starter: "€75/uur", business: "€65/uur", premium: "€55/uur" },
    { label: "Privacybeleid & Algemene voorwaarden", starter: true, business: true, premium: true },
  ]},
];

function Cell({ val }) {
  if (val === true) return <span style={{ color: "#10b981", fontSize: "1.1rem" }}>✓</span>;
  if (val === false) return <span style={{ color: "#d1d5db", fontSize: "1rem" }}>—</span>;
  return <span style={{ fontSize: "0.83rem", color: "#374151", fontWeight: 500 }}>{val}</span>;
}

export default function Prijzen() {
  const [highlighted, setHighlighted] = useState("business");

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .price-table{width:100%;border-collapse:collapse;font-size:0.88rem}
        .price-table th,.price-table td{padding:13px 16px;text-align:center;border-bottom:1px solid #f1f5f9}
        .price-table td:first-child{text-align:left;color:#374151;font-weight:500}
        .price-table th:first-child{text-align:left}
        .price-table tr:hover td{background:#fafafa}
        .cat-row td{background:#f8fafc;font-weight:800;font-size:0.8rem;color:#6b7280;letter-spacing:1px;text-transform:uppercase;padding:10px 16px}
        .col-starter{background:rgba(0,0,0,0.01)}
        .col-business{background:rgba(26,115,232,0.04)}
        .col-premium{background:rgba(139,92,246,0.03)}
        .pkg-header{padding:20px 16px 16px;text-align:center;border-radius:16px 16px 0 0}
        .pkg-header.business{background:linear-gradient(135deg,rgba(26,115,232,0.1),rgba(0,194,255,0.08));border:2px solid #1a73e8;border-bottom:none}
        .pkg-header.starter,.pkg-header.premium{background:#fff;border:1px solid #e5e7eb;border-bottom:none}
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", display: "inline-block", marginBottom: 28 }}>← Terug naar Vedantix</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.3)", color: "#00c2ff", padding: "6px 18px", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 700, marginBottom: 22 }}>💰 Prijsvergelijker</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 18, letterSpacing: -1 }}>
            Alles op een rij —<br/><span style={{ color: "#00c2ff" }}>transparante prijzen</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto" }}>
            Geen kleine lettertjes. Bekijk precies wat je krijgt bij elk pakket.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 5%" }}>

        {/* Package cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
          {[
            { id: "starter", name: "Starter", price: 399, color: "#374151", accent: "#6b7280", desc: "Ideaal voor starters & ZZP'ers met een kleine online aanwezigheid." },
            { id: "business", name: "Business", price: 799, color: "#1a73e8", accent: "#00c2ff", desc: "Het populairste pakket voor groeiende bedrijven die serieus online willen.", hot: true },
            { id: "premium", name: "Premium", price: 1499, color: "#8b5cf6", accent: "#a78bfa", desc: "Maximale impact voor serieuze ondernemers die het beste willen." },
          ].map(pkg => (
            <div key={pkg.id} onClick={() => setHighlighted(pkg.id)}
              style={{ background: "#fff", borderRadius: 18, padding: "28px 24px", border: `2px solid ${highlighted===pkg.id ? pkg.color : "#e5e7eb"}`, cursor: "pointer", transition: "all 0.2s", position: "relative", boxShadow: highlighted===pkg.id ? `0 4px 20px ${pkg.color}25` : "0 1px 4px rgba(0,0,0,0.06)" }}>
              {pkg.hot && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#1a73e8", color: "#fff", padding: "3px 16px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 800, whiteSpace: "nowrap" }}>MEEST GEKOZEN</div>}
              <div style={{ fontWeight: 700, fontSize: "0.78rem", color: pkg.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{pkg.name}</div>
              <div style={{ fontWeight: 900, fontSize: "2rem", color: "#0a1628", lineHeight: 1, marginBottom: 8 }}><sup style={{ fontSize: "1rem", fontWeight: 500, opacity: 0.6 }}>€</sup>{pkg.price}</div>
              <p style={{ color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: 16 }}>{pkg.desc}</p>
              <a href="/Starters" style={{ display: "block", textAlign: "center", padding: "10px", borderRadius: 9, fontWeight: 700, textDecoration: "none", fontSize: "0.85rem", background: highlighted===pkg.id ? pkg.color : "transparent", color: highlighted===pkg.id ? "#fff" : pkg.color, border: `2px solid ${pkg.color}`, transition: "all 0.2s" }}>
                Kies {pkg.name} →
              </a>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
          <table className="price-table">
            <thead>
              <tr>
                <th style={{ padding: "20px 16px", textAlign: "left", background: "#f8fafc", color: "#94a3b8", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Functie</th>
                {[
                  { id: "starter", name: "Starter", color: "#374151" },
                  { id: "business", name: "Business", color: "#1a73e8", hot: true },
                  { id: "premium", name: "Premium", color: "#8b5cf6" },
                ].map(pkg => (
                  <th key={pkg.id} style={{ padding: "20px 16px", background: pkg.hot ? "rgba(26,115,232,0.06)" : "#f8fafc", borderLeft: pkg.hot ? "2px solid #1a73e8" : "1px solid #f1f5f9", borderRight: pkg.hot ? "2px solid #1a73e8" : "none" }}>
                    <div style={{ fontWeight: 800, color: pkg.color, fontSize: "0.95rem" }}>{pkg.name}</div>
                    {pkg.hot && <div style={{ fontSize: "0.7rem", color: "#1a73e8", fontWeight: 700, marginTop: 2 }}>⭐ Populair</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map(cat => (
                <>
                  <tr key={cat.category} className="cat-row">
                    <td colSpan={4}>{cat.category}</td>
                  </tr>
                  {cat.items.map(item => (
                    <tr key={item.label}>
                      <td>{item.label}</td>
                      <td className="col-starter"><Cell val={item.starter} /></td>
                      <td className="col-business" style={{ borderLeft: "2px solid #1a73e826", borderRight: "2px solid #1a73e826", background: "rgba(26,115,232,0.03)" }}><Cell val={item.business} /></td>
                      <td className="col-premium"><Cell val={item.premium} /></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: "#f8fafc" }}>
                <td style={{ padding: "20px 16px", fontWeight: 800, fontSize: "1rem" }}>Totaalprijs (eenmalig)</td>
                <td style={{ textAlign: "center", fontWeight: 900, fontSize: "1.3rem", color: "#374151" }}>€399</td>
                <td style={{ textAlign: "center", fontWeight: 900, fontSize: "1.3rem", color: "#1a73e8", borderLeft: "2px solid #1a73e826", borderRight: "2px solid #1a73e826", background: "rgba(26,115,232,0.04)" }}>€799</td>
                <td style={{ textAlign: "center", fontWeight: 900, fontSize: "1.3rem", color: "#8b5cf6" }}>€1499</td>
              </tr>
              <tr>
                <td style={{ padding: "16px 16px 24px" }}></td>
                <td style={{ textAlign: "center", padding: "16px 16px 24px" }}><a href="/Starters" style={{ background: "#f3f4f6", color: "#374151", padding: "10px 20px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", display: "inline-block" }}>Kies Starter</a></td>
                <td style={{ textAlign: "center", padding: "16px 16px 24px", borderLeft: "2px solid #1a73e826", borderRight: "2px solid #1a73e826", background: "rgba(26,115,232,0.03)" }}><a href="/Starters" style={{ background: "#1a73e8", color: "#fff", padding: "10px 20px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", display: "inline-block", boxShadow: "0 4px 14px rgba(26,115,232,0.35)" }}>Kies Business ⭐</a></td>
                <td style={{ textAlign: "center", padding: "16px 16px 24px" }}><a href="/Starters" style={{ background: "#8b5cf6", color: "#fff", padding: "10px 20px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", display: "inline-block" }}>Kies Premium</a></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{ fontWeight: 900, fontSize: "1.8rem", marginBottom: 32, textAlign: "center", letterSpacing: -0.5 }}>Veelgestelde vragen</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              ["Zijn er maandelijkse kosten?", "Nee. Je betaalt eenmalig. Na het eerste jaar ontvang je een verlengingsvoorstel voor hosting (~€50/jaar). Er zijn geen verborgen abonnementskosten."],
              ["Kan ik later upgraden?", "Ja! Begin je met Starter en wil je later meer pagina's of functies? Wij rekenen alleen het prijsverschil + eventuele aanpassingen."],
              ["Wat als ik al een domein heb?", "Geen probleem. Wij koppelen jouw bestaande domein gratis aan de nieuwe website."],
              ["Hoe snel word ik geholpen?", "We reageren binnen 24 uur op vragen. Bij Starter binnen 48 uur. Na oplevering ben je altijd welkom voor aanpassingen."],
              ["Is de website mijn eigendom?", "Ja. Na volledige betaling is de website 100% van jou. Inclusief alle bestanden en rechten."],
              ["Kan ik zelf aanpassingen doen?", "Op aanvraag bouwen we een eenvoudig beheerpaneel erbij. Anders doen wij aanpassingen snel en goedkoop voor je."],
            ].map(([q, a]) => (
              <div key={q} style={{ background: "#fff", borderRadius: 14, padding: "24px 22px", border: "1px solid #e5e7eb" }}>
                <p style={{ fontWeight: 700, marginBottom: 8, color: "#0a1628", fontSize: "0.95rem" }}>💬 {q}</p>
                <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.6 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#0a1628", borderRadius: 20, padding: "48px 40px", marginTop: 60, textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: 14 }}>Twijfel je nog?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>Plan een gratis kennismakingsgesprek en we helpen je de juiste keuze maken.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/Starters" style={{ background: "#1a73e8", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>🚀 Direct starten</a>
            <a href="/Planning" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 600, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)" }}>📅 Gesprek inplannen</a>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem" }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> &nbsp;|&nbsp; <a href="/Privacy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Privacybeleid</a> &nbsp;|&nbsp; <a href="/Voorwaarden" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Algemene voorwaarden</a></p>
      </footer>
    </div>
  );
}
