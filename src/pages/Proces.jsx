import { useState } from "react";

export default function Proces() {
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      num: 1, icon: "📋", title: "Offerte aanvragen",
      desc: "Vul het aanvraagformulier in of gebruik onze Starters configurator. Geef aan wat voor bedrijf je hebt, welk pakket je wil en eventuele extra wensen.",
      detail: "Je ontvangt binnen 24 uur een reactie met een vrijblijvende offerte op maat.",
      tags: ["Gratis", "Geen verplichting", "Binnen 24 uur reactie"],
    },
    {
      num: 2, icon: "🤝", title: "Akkoord & aanbetaling",
      desc: "Na akkoord op de offerte wordt een aanbetaling van 50% gefactureerd. Daarna gaan wij direct aan de slag.",
      detail: "Je ontvangt een bevestigingsmail met een samenvatting van jouw bestelling — inclusief pakket, functies en afgesproken levertijd.",
      tags: ["50% aanbetaling", "Direct bevestiging", "Factuur per mail"],
    },
    {
      num: 3, icon: "🚀", title: "Wij bouwen jouw website",
      desc: "Binnen 48 uur bouwen wij jouw professionele, mobielvriendelijke website. Domein, hosting en SSL worden volledig ingericht.",
      detail: "We werken met bewezen technologieën zodat jouw site snel, veilig en schaalbaar is — zonder dat jij er iets technisch voor hoeft te doen.",
      tags: ["48 uur levertijd", "Hosting inbegrepen", "SSL & domein"],
    },
    {
      num: 4, icon: "✅", title: "Oplevering & restbetaling",
      desc: "We sturen je een preview van de website. Na jouw akkoord gaat de site live en wordt het resterende bedrag (50%) gefactureerd.",
      detail: "Je ontvangt een opleveringsmail met de live URL, inloggegevens (indien van toepassing) en informatie over jouw gratis wijzigingen.",
      tags: ["Preview eerst", "Dan live", "50% restbetaling"],
    },
    {
      num: 5, icon: "🔧", title: "Gratis wijzigingen",
      desc: "Elk pakket bevat een aantal gratis wijzigingen na oplevering. Starter: 0, Business: 1, Premium: 3.",
      detail: "Een gratis wijziging moet worden ingediend binnen 14 dagen na oplevering. Denk aan kleine aanpassingen zoals tekst, afbeeldingen of kleuren — geen nieuwe functionaliteiten.",
      tags: ["0–3 gratis", "Binnen 14 dagen", "Kleine aanpassingen"],
      highlight: true,
    },
    {
      num: 6, icon: "💶", title: "Betaalde wijzigingen daarna",
      desc: "Na gebruik van alle gratis wijzigingen, of na 14 dagen, worden verdere aanpassingen in rekening gebracht. Dit geldt ook voor nieuwe functionaliteiten.",
      detail: "De kosten zijn afhankelijk van het pakket: Starter €75/uur, Business €65/uur, Premium €55/uur. Voor kleine standaard aanpassingen hanteren wij een vast tarief van €75 per aanpassing.",
      tags: ["Vanaf €55/aanpassing", "Snel geregeld", "Transparant tarief"],
      highlight: true,
    },
    {
      num: 7, icon: "📅", title: "Hosting verlenging",
      desc: "Hosting is inbegrepen voor het eerste jaar. Daarna ontvang je een verlengingsvoorstel van ~€50/jaar.",
      detail: "Wil je overstappen naar eigen hosting? Geen probleem — wij leveren alle bestanden en helpen je bij de migratie.",
      tags: ["1 jaar inbegrepen", "~€50/jaar daarna", "Of eigen hosting"],
    },
  ];

  const changeExamples = [
    { type: "✅ Gratis", example: "Tekst op de homepage aanpassen", desc: "Valt binnen gratis wijzigingen indien nog beschikbaar" },
    { type: "✅ Gratis", example: "Foto of logo vervangen", desc: "Valt binnen gratis wijzigingen indien nog beschikbaar" },
    { type: "✅ Gratis", example: "Contactgegevens bijwerken", desc: "Valt binnen gratis wijzigingen indien nog beschikbaar" },
    { type: "💶 Betaald (€75)", example: "Nieuwe pagina toevoegen", desc: "Extra pagina buiten het pakket" },
    { type: "💶 Betaald (€75)", example: "Nieuw formulier of sectie", desc: "Nieuwe functionaliteit" },
    { type: "💶 Betaald (€75+)", example: "Webshop of boekingssysteem", desc: "Complexe functionaliteit — prijs op aanvraag" },
    { type: "💶 Betaald (€75)", example: "4e wijziging bij Premium", desc: "Na gebruik van 3 gratis wijzigingen" },
    { type: "💶 Betaald (€75)", example: "2e wijziging bij Business", desc: "Na gebruik van 1 gratis wijziging" },
    { type: "💶 Betaald (€75)", example: "1e wijziging bij Starter", desc: "Starter bevat geen gratis wijzigingen" },
  ];

  const faqs = [
    ["Wat telt als een 'gratis wijziging'?", "Een gratis wijziging is een kleine aanpassing aan bestaande inhoud: tekst, afbeelding, kleur, contactgegevens. Het toevoegen van een nieuwe pagina of functionaliteit valt buiten de gratis wijzigingen."],
    ["Kan ik meerdere kleine aanpassingen in één keer indienen?", "Ja! Als je meerdere kleine aanpassingen tegelijk instuurt, telt dat als één wijziging. Wij raden aan alles in één bericht te combineren."],
    ["Binnen welke termijn moet ik gratis wijzigingen indienen?", "Gratis wijzigingen moeten worden ingediend binnen 14 dagen na oplevering. Daarna gelden de standaard tarieven."],
    ["Hoelang duurt het voordat een betaalde wijziging klaar is?", "Kleine betaalde wijzigingen zijn doorgaans binnen 48 uur verwerkt. Grotere aanpassingen plannen we in overleg."],
    ["Wat als ik meer opslagruimte nodig heb?", "Je kunt je opslagruimte uitbreiden. Neem contact op voor de actuele tarieven. In de meeste gevallen is uitbreiding snel geregeld."],
    ["Kan ik upgraden naar een hoger pakket?", "Ja. Je betaalt dan het prijsverschil tussen de pakketten, plus een kleine migratievergoeding als er extra pagina's gebouwd moeten worden."],
  ];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .step-card{background:#fff;border-radius:18px;padding:30px 28px;border:1px solid #e5e7eb;transition:box-shadow 0.2s}
        .step-card:hover{box-shadow:0 6px 20px rgba(0,0,0,0.08)}
        .step-card.highlight{border-color:#1a73e8;background:#eff6ff}
        .tag-pill{background:#f1f5f9;color:#475569;padding:4px 12px;border-radius:100px;font-size:0.76rem;font-weight:600}
        .step-card.highlight .tag-pill{background:#dbeafe;color:#1e40af}
        .faq-row{background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;margin-bottom:10px}
        .faq-q{padding:16px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:0.92rem;transition:background 0.15s}
        .faq-q:hover{background:#f8fafc}
        .faq-a{padding:0 20px 16px;color:#6b7280;font-size:0.88rem;line-height:1.7}
        .change-row{display:flex;align-items:flex-start;gap:14px;padding:12px 0;border-bottom:1px solid #f1f5f9}
        .change-row:last-child{border-bottom:none}
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", display: "inline-block", marginBottom: 28 }}>← Terug naar Vedantix</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.3)", color: "#00c2ff", padding: "6px 18px", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 700, marginBottom: 22 }}>📋 Hoe het werkt</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 18, letterSpacing: -1 }}>
            Van aanvraag tot live —<br/><span style={{ color: "#00c2ff" }}>alles uitgelegd</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto" }}>
            Transparant, eerlijk en zonder verrassingen. Zo werkt het proces bij Vedantix.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 5%" }}>

        {/* Process steps */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ color: "#1a73e8", fontWeight: 700, fontSize: "0.78rem", letterSpacing: 1.5, textTransform: "uppercase" }}>Het proces</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, marginTop: 8, letterSpacing: -0.5 }}>Stap voor stap</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {steps.map((s, i) => (
              <div key={s.num} className={`step-card ${s.highlight ? "highlight" : ""}`}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, background: s.highlight ? "#1a73e8" : "linear-gradient(135deg,#0a1628,#1a73e8)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ background: s.highlight ? "#1a73e8" : "#f1f5f9", color: s.highlight ? "#fff" : "#64748b", padding: "2px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 800 }}>Stap {s.num}</span>
                      <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: s.highlight ? "#1e40af" : "#0a1628" }}>{s.title}</h3>
                    </div>
                    <p style={{ color: "#374151", marginBottom: 8, lineHeight: 1.6 }}>{s.desc}</p>
                    <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: 14, lineHeight: 1.6 }}>{s.detail}</p>
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                      {s.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wijzigingen explained */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb", marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ color: "#1a73e8", fontWeight: 700, fontSize: "0.78rem", letterSpacing: 1.5, textTransform: "uppercase" }}>Wijzigingen</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: 6, marginBottom: 8 }}>Gratis vs. betaald — zo werkt het</h2>
            <p style={{ color: "#6b7280" }}>Elk pakket bevat een aantal gratis wijzigingen. Zodra die op zijn, worden aanpassingen afzonderlijk in rekening gebracht.</p>
          </div>

          {/* Package wijzigingen overzicht */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28 }}>
            {[
              { name: "Starter", gratis: 0, color: "#6b7280", note: "Elke wijziging vanaf dag 1 is betaald" },
              { name: "Business", gratis: 1, color: "#1a73e8", note: "Wijziging 2 en verder is betaald" },
              { name: "Premium", gratis: 3, color: "#8b5cf6", note: "Wijziging 4 en verder is betaald" },
            ].map(pkg => (
              <div key={pkg.name} style={{ background: "#f8fafc", borderRadius: 14, padding: "20px 16px", textAlign: "center", border: `2px solid ${pkg.color}20` }}>
                <div style={{ fontWeight: 800, color: pkg.color, fontSize: "0.85rem", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{pkg.name}</div>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0a1628", lineHeight: 1 }}>{pkg.gratis}</div>
                <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: 4, marginBottom: 10 }}>gratis wijzigingen</div>
                <p style={{ color: "#94a3b8", fontSize: "0.75rem", lineHeight: 1.5 }}>{pkg.note}</p>
              </div>
            ))}
          </div>

          {/* Visual example */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 14, padding: "20px 22px", marginBottom: 24 }}>
            <p style={{ fontWeight: 700, color: "#92400e", marginBottom: 12 }}>📌 Voorbeeld — Premium pakket (3 gratis)</p>
            {[
              { n: 1, label: "Tekst homepage aanpassen", cost: "Gratis", ok: true },
              { n: 2, label: "Logo vervangen", cost: "Gratis", ok: true },
              { n: 3, label: "Pagina herschrijven", cost: "Gratis", ok: true },
              { n: 4, label: "Nieuwe sectie toevoegen", cost: "€75", ok: false },
              { n: 5, label: "Extra contactpagina", cost: "€75", ok: false },
            ].map(r => (
              <div key={r.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: r.n < 5 ? "1px solid #fde68a" : "none" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ background: r.ok ? "#d1fae5" : "#fee2e2", color: r.ok ? "#065f46" : "#991b1b", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>{r.n}</span>
                  <span style={{ fontSize: "0.88rem", color: "#374151" }}>{r.label}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: r.ok ? "#10b981" : "#ef4444" }}>{r.cost}</span>
              </div>
            ))}
          </div>

          {/* Change examples table */}
          <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: "1rem" }}>Voorbeelden van wijzigingen</h3>
          <div>
            {changeExamples.map((c, i) => (
              <div key={i} className="change-row">
                <span style={{ background: c.type.startsWith("✅") ? "#d1fae5" : "#fef3c7", color: c.type.startsWith("✅") ? "#065f46" : "#92400e", padding: "3px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>{c.type}</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.88rem" }}>{c.example}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opslag */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb", marginBottom: 48 }}>
          <span style={{ color: "#1a73e8", fontWeight: 700, fontSize: "0.78rem", letterSpacing: 1.5, textTransform: "uppercase" }}>Database & Opslag</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: 6, marginBottom: 8 }}>Opslagruimte per pakket</h2>
          <p style={{ color: "#6b7280", marginBottom: 24 }}>Elke website krijgt database-opslagruimte voor formulierinzendingen, klantgegevens en content. Dit is per pakket anders.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 24 }}>
            {[
              { name: "Starter", storage: "500 MB", color: "#6b7280", extra: "€15/maand per extra GB", icon: "💾" },
              { name: "Business", storage: "2 GB", color: "#1a73e8", extra: "€12/maand per extra GB", icon: "🗄️" },
              { name: "Premium", storage: "10 GB", color: "#8b5cf6", extra: "€10/maand per extra GB", icon: "🏦" },
            ].map(p => (
              <div key={p.name} style={{ background: "#f8fafc", borderRadius: 14, padding: "22px 18px", border: `2px solid ${p.color}20`, textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontWeight: 800, color: p.color, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "#0a1628" }}>{p.storage}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.76rem", marginTop: 8, lineHeight: 1.5 }}>Uitbreiden: {p.extra}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12, padding: "14px 18px" }}>
            <p style={{ color: "#0369a1", fontSize: "0.88rem" }}>💡 In de meeste gevallen is 500 MB ruim voldoende voor een kleine website. Grotere webshops of sites met veel uploads hebben meer nodig. Wij informeren je proactief als je de limiet nadert.</p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: -0.5 }}>Veelgestelde vragen</h2>
          </div>
          {faqs.map(([q, a], i) => (
            <div key={i} className="faq-row">
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{q}</span>
                <span style={{ color: "#1a73e8", fontWeight: 800, fontSize: "1.1rem" }}>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div className="faq-a">{a}</div>}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "#0a1628", borderRadius: 20, padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.1rem)", marginBottom: 14 }}>Klaar om te beginnen?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>Vraag gratis en vrijblijvend een offerte aan. Geen verrassingen, geen kleine lettertjes.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/Starters" style={{ background: "#1a73e8", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>🚀 Start configurator</a>
            <a href="/Prijzen" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 600, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)" }}>💰 Bekijk prijzen</a>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem" }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> &nbsp;|&nbsp; <a href="/Prijzen" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Prijzen</a> &nbsp;|&nbsp; <a href="/Privacy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Privacy</a></p>
      </footer>
    </div>
  );
}
