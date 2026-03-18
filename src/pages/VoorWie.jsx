
function WAWidget() {
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState([
    { from: "agent", text: "👋 Hoi! Welkom bij Vedantix. Heb je een vraag of wil je een offerte? Ik help je graag!" }
  ]);
  const url = "https://wa.me/310626219989";

  const sendMessage = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    const updated = [...messages, { from: "user", text: trimmed }];
    setMessages(updated);
    setInputVal("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "agent", text: "Bedankt voor je bericht! 🙏 Klik hieronder om verder te chatten op WhatsApp." }]);
    }, 800);
  };

  const waLink = `${url}?text=${encodeURIComponent(inputVal || messages.filter(m => m.from === "user").map(m => m.text).join(" ") || "Hallo Vedantix!")}`;

  return (
    <>
      <style>{`
        .wa-fab{position:fixed;bottom:28px;right:28px;z-index:9999;font-family:'Inter',sans-serif}
        .wa-toggle{width:60px;height:60px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 24px rgba(37,211,102,0.5);display:flex;align-items:center;justify-content:center;transition:transform 0.2s;position:relative}
        .wa-toggle:hover{transform:scale(1.08)}
        .wa-badge{position:absolute;top:-3px;right:-3px;background:#ef4444;color:#fff;width:20px;height:20px;border-radius:50%;font-size:0.65rem;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
        .wa-popup{position:absolute;bottom:74px;right:0;width:320px;background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(0,0,0,0.18);overflow:hidden;animation:waPop 0.22s cubic-bezier(.34,1.56,.64,1)}
        @keyframes waPop{from{opacity:0;transform:scale(0.88) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .wa-head{background:linear-gradient(135deg,#075e54,#128c7e);padding:16px 18px;display:flex;align-items:center;gap:12px}
        .wa-avatar{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.1rem;color:#fff;flex-shrink:0}
        .wa-info{flex:1}
        .wa-name{color:#fff;font-weight:700;font-size:0.95rem}
        .wa-status{color:rgba(255,255,255,0.7);font-size:0.73rem;margin-top:1px;display:flex;align-items:center;gap:4px}
        .wa-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;display:inline-block}
        .wa-close{background:none;border:none;color:rgba(255,255,255,0.6);cursor:pointer;font-size:1.1rem;padding:4px;line-height:1}
        .wa-close:hover{color:#fff}
        .wa-body{background:#e5ddd5;padding:14px 14px 8px;min-height:140px;max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:8px}
        .wa-msg-agent{background:#fff;border-radius:0 10px 10px 10px;padding:9px 13px;font-size:0.84rem;color:#1a1a2e;line-height:1.5;max-width:85%;box-shadow:0 1px 2px rgba(0,0,0,0.08)}
        .wa-msg-user{background:#dcf8c6;border-radius:10px 0 10px 10px;padding:9px 13px;font-size:0.84rem;color:#1a1a2e;line-height:1.5;max-width:85%;align-self:flex-end;box-shadow:0 1px 2px rgba(0,0,0,0.08)}
        .wa-footer{padding:10px 12px;background:#f0f0f0;border-top:1px solid #e0e0e0}
        .wa-input-row{display:flex;align-items:center;gap:8px;background:#fff;border-radius:24px;padding:6px 6px 6px 14px;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
        .wa-input{border:none;outline:none;flex:1;font-size:0.85rem;background:transparent;color:#1a1a2e;font-family:inherit}
        .wa-send{width:36px;height:36px;border-radius:50%;background:#25d366;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s}
        .wa-send:hover{background:#1da851}
        .wa-wa-btn{display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;border-radius:10px;padding:10px;text-decoration:none;font-weight:700;font-size:0.85rem;margin-top:8px;transition:background 0.15s}
        .wa-wa-btn:hover{background:#1da851}
        @media(max-width:420px){.wa-popup{width:calc(100vw - 40px);right:-14px}}
      `}</style>
      <div className="wa-fab">
        {open && (
          <div className="wa-popup">
            <div className="wa-head">
              <div className="wa-avatar">V</div>
              <div className="wa-info">
                <div className="wa-name">Vedantix Support</div>
                <div className="wa-status"><span className="wa-dot"/> Online</div>
              </div>
              <button className="wa-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="wa-body">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "agent" ? "wa-msg-agent" : "wa-msg-user"}>{m.text}</div>
              ))}
            </div>
            <div className="wa-footer">
              <div className="wa-input-row">
                <input
                  className="wa-input"
                  placeholder="Typ een bericht..."
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                />
                <button className="wa-send" onClick={sendMessage}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
              </div>
              <a href={waLink} target="_blank" rel="noreferrer" className="wa-wa-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Doorgaan op WhatsApp
              </a>
            </div>
          </div>
        )}
        <button className="wa-toggle" onClick={() => setOpen(p => !p)} aria-label="WhatsApp chat">
          {!open && <div className="wa-badge">1</div>}
          {open
            ? <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            : <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          }
        </button>
      </div>
    </>
  );
}


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
      <WAWidget />
    </div>
  );
}
