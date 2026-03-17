export default function VoorWie() {
  const branches = [
    { icon: "✂️", title: "Kapper & Barbershop", desc: "Van klassieke kapper tot moderne barbershop — een strakke website trekt nieuwe klanten en laat jouw werk zien.", usecases: ["Online afspraken boeken", "Fotogalerij van jouw werk", "Prijslijst per behandeling", "Google Maps & openingstijden", "Reviews tonen"] },
    { icon: "🍽️", title: "Restaurant & Café", desc: "Laat gasten je menu ontdekken, een tafel reserveren en jouw sfeer proeven — nog vóór ze binnenstappen.", usecases: ["Digitaal menu met foto's", "Reserveringssysteem", "Bezorg- & afhaalinformatie", "Evenementen & acties", "Instagram koppeling"] },
    { icon: "📸", title: "Fotograaf & Videograaf", desc: "Jouw portfolio is je visitekaartje. Wij bouwen een site die jouw werk laat spreken.", usecases: ["Portfolio galerij met lightbox", "Pakketten & tarieven", "Online boekingsformulier", "Blog & behind the scenes", "Social media integratie"] },
    { icon: "🔨", title: "Klusbedrijf & Vakman", desc: "Laat klanten zien wat je kan. Van loodgieter tot schilder — een professionele site wekt vertrouwen.", usecases: ["Projecten & referenties", "Offerteformulier", "Werkgebied kaart", "Certificaten & diploma's", "Klantreviews"] },
    { icon: "💆", title: "Schoonheidssalon & Spa", desc: "Een verzorgde website past bij een verzorgde zaak. Laat jouw behandelingen en sfeer zien.", usecases: ["Online afsprakensysteem", "Behandelingen & prijzen", "Cadeaubon aanvragen", "Voor/na foto's", "Team & specialisten"] },
    { icon: "🏋️", title: "Fitness coach & Personal trainer", desc: "Motiveer potentiële klanten met resultaten, schema's en pakketten — direct via jouw site.", usecases: ["Lesrooster & groepslessen", "Pakketten & lidmaatschappen", "Gratis proefles aanmelden", "Blog / voedingstips", "Video demonstraties"] },
    { icon: "🏪", title: "Winkel & Retail", desc: "Online zichtbaar zijn is voor een fysieke winkel net zo belangrijk als een mooie etalage.", usecases: ["Productoverzicht of webshop", "Openingstijden & locatie", "Acties & aanbiedingen", "WhatsApp bestelknop", "Loyaliteitsprogramma info"] },
    { icon: "🏗️", title: "Aannemer & Bouwbedrijf", desc: "Grote projecten vragen om een professionele uitstraling. Wij zetten jouw portfolio op de kaart.", usecases: ["Projecten portfolio", "Offerteformulier", "Certificaten & keurmerken", "Voor/na foto's slider", "Werkgebied & regio"] },
    { icon: "🚀", title: "Starter & ZZP'er", desc: "Net begonnen of al even actief als zzp'er — een eigen website maakt je geloofwaardig en vindbaar.", usecases: ["Diensten overzicht", "Over mij pagina", "Contactformulier", "LinkedIn & social links", "Referenties & reviews"] },
    { icon: "🎵", title: "Muzikant & Artiest", desc: "Jouw muziek verdient een eigen podium online. Laat fans en boekingsbureaus jou vinden.", usecases: ["Muziekplayer & tracks", "Agenda & optredens", "Booking aanvragen", "EPK (Elektronisch Perskaartje)", "YouTube & Spotify embeds"] },
    { icon: "🎨", title: "Schilder & Decorateur", desc: "Kleur en vakmanschap — laat het zien op een site die net zo verzorgd is als jouw werk.", usecases: ["Portfolio & projectfoto's", "Offerteformulier", "Werkgebied informatie", "Reviews & testimonials", "Certificaten"] },
    { icon: "🏘️", title: "Andere branches", desc: "Werkt jouw bedrijf niet in de bovenstaande lijst? Geen probleem — wij bouwen voor elke branche.", usecases: ["Maatwerk op aanvraag", "Flexibele pagina-indeling", "Elke gewenste functionaliteit", "Persoonlijk adviesgesprek"] },
  ];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .branch-card{background:#fff;border-radius:18px;padding:32px 28px;box-shadow:0 2px 12px rgba(0,0,0,0.06);transition:transform 0.2s,box-shadow 0.2s;border:1px solid #e8eef5}
        .branch-card:hover{transform:translateY(-4px);box-shadow:0 8px 28px rgba(0,0,0,0.1);border-color:#bfdbfe}
        .use-tag{background:#eff6ff;color:#1e40af;padding:4px 12px;border-radius:100px;font-size:0.78rem;font-weight:600;display:inline-block;margin:3px 3px 3px 0}
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", display: "inline-block", marginBottom: 28 }}>← Terug naar Vedantix</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.3)", color: "#00c2ff", padding: "6px 18px", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 700, marginBottom: 22 }}>🏢 Voor wie</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 18, letterSpacing: -1 }}>
            Een website voor<br/><span style={{ color: "#00c2ff" }}>elk type bedrijf</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
            Of je nu kapper bent, restaurant uitbaat of net begint als zzp'er — wij bouwen de website die bij jou past.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {branches.map(b => (
            <div key={b.title} className="branch-card">
              <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>{b.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: 10, color: "#0a1628" }}>{b.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>{b.desc}</p>
              <div style={{ marginBottom: 20 }}>
                {b.usecases.map(u => <span key={u} className="use-tag">✓ {u}</span>)}
              </div>
              <a href="/Starters" style={{ display: "inline-block", background: "#1a73e8", color: "#fff", padding: "10px 20px", borderRadius: 9, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", transition: "background 0.2s" }}>
                Website aanvragen →
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "#0a1628", borderRadius: 20, padding: "48px 40px", marginTop: 60, textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: 14, letterSpacing: -0.5 }}>Klaar om te beginnen?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32, fontSize: "1rem" }}>Vraag een gratis offerte aan of plan een kennismakingsgesprek in — geheel vrijblijvend.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/Starters" style={{ background: "#1a73e8", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>🚀 Configureer jouw website</a>
            <a href="/Planning" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 600, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)", fontSize: "0.95rem" }}>📅 Plan een gesprek</a>
          </div>
        </div>
      </div>

      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem" }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> &nbsp;|&nbsp; <a href="/Prijzen" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Prijzen vergelijken</a></p>
      </footer>
    </div>
  );
}
