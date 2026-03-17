import { useState } from "react";

const SUGGESTIONS = {
  kapper: { label: "Kapperszaak", icon: "✂️", suggestions: ["Online afsprakensysteem / agenda", "Fotogalerij van jouw werk", "Prijslijst per behandeling", "Team & stylisten overzicht", "Google Maps integratie"] },
  restaurant: { label: "Restaurant / Café", icon: "🍽️", suggestions: ["Online menu met foto's", "Reserveringssysteem", "Openingstijden widget", "Bezorging / afhaal info", "Instagram feed integratie"] },
  fotograaf: { label: "Fotograaf", icon: "📸", suggestions: ["Portfolio galerij", "Online boekingssysteem", "Pakketten & tarieven pagina", "Blog / nieuws sectie", "Lightbox foto weergave"] },
  klusbedrijf: { label: "Klusbedrijf", icon: "🔨", suggestions: ["Offerteformulier", "Projecten / portfolio", "Werkgebied kaart", "Reviews & testimonials", "Certificaten & vakmanschap"] },
  schoonheidssalon: { label: "Schoonheidssalon", icon: "💆", suggestions: ["Online afsprakensysteem", "Behandelingen & prijzen", "Cadeaubon aanvragen", "Before/after fotogalerij", "Team introductie pagina"] },
  fitness: { label: "Fitness coach", icon: "🏋️", suggestions: ["Online lesrooster", "Lidmaatschappen & pakketten", "Gratis proefles aanmelden", "Voortgang tracking info", "Blog / voeding tips"] },
  winkel: { label: "Winkel", icon: "🏪", suggestions: ["Webshop / productoverzicht", "Openingstijden & locatie", "Acties & aanbiedingen", "Loyaliteitsprogramma info", "WhatsApp bestellen knop"] },
  aannemer: { label: "Aannemer", icon: "🏗️", suggestions: ["Projecten portfolio", "Offerteaanvraag formulier", "Certificaten & keurmerken", "Voor/na foto's slider", "Werkgebied & regio pagina"] },
  starter: { label: "Starter / ZZP", icon: "🚀", suggestions: ["Diensten overzicht pagina", "Over mij / persoonlijk verhaal", "Contactformulier", "LinkedIn & social media links", "Referenties & reviews"] },
  muzikant: { label: "Muzikant / Artiest", icon: "🎵", suggestions: ["Muziek player / tracks", "Agenda & optredens", "Booking aanvraagformulier", "EPK (Electronic Press Kit)", "Video embeds (YouTube)"] },
  overig: { label: "Anders", icon: "💼", suggestions: ["Diensten overzicht", "Contactformulier", "Over ons pagina", "Veelgestelde vragen (FAQ)", "Reviews & testimonials"] },
};

const PACKAGES = [
  { id: "starter", name: "Starter", price: 399, pages: "1 pagina", features: ["1-pagina website", "Mobielvriendelijk", "Contactformulier", "Hosting 1 jaar", "SSL", "48u levering"] },
  { id: "business", name: "Business", price: 799, pages: "Tot 5 pagina's", features: ["Tot 5 pagina's", "Mobielvriendelijk design", "Contactformulier + Maps", "Hosting 1 jaar", "SSL", "SEO basis", "48u levering", "1x gratis aanpassing"] },
  { id: "premium", name: "Premium", price: 1499, pages: "Tot 10 pagina's", features: ["Tot 10 pagina's", "Custom design op maat", "Geavanceerde functies", "Hosting 1 jaar", "SSL", "Volledige SEO", "Blog / nieuws", "3x gratis aanpassingen", "48u levering"] },
];

export default function Starters() {
  const [step, setStep] = useState(1);
  const [domein, setDomein] = useState("");
  const [domeinStatus, setDomeinStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [branche, setBranche] = useState("");
  const [bedrijfsnaam, setBedrijfsnaam] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("business");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ naam: "", email: "", telefoon: "", bericht: "" });

  const currentSuggestions = branche && SUGGESTIONS[branche] ? SUGGESTIONS[branche].suggestions : [];

  const checkDomain = async () => {
    if (!domein.trim()) return;
    setChecking(true);
    setDomeinStatus(null);
    await new Promise(r => setTimeout(r, 1200));
    const clean = domein.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");
    const taken = ["vedantix", "google", "facebook", "apple", "amazon", "microsoft"];
    const isTaken = taken.some(t => clean.includes(t));
    setDomeinStatus(isTaken ? "taken" : "available");
    setChecking(false);
  };

  const toggleFeature = (f) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const totalExtras = selectedFeatures.length * 75;
  const basePrice = PACKAGES.find(p => p.id === selectedPackage)?.price || 799;
  const totalPrice = basePrice + totalExtras;

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a1628,#0d2146)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 48, textAlign: "center", maxWidth: 480, margin: "0 20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, color: "#0a1628" }}>Aanvraag verstuurd!</h2>
          <p style={{ color: "#6b7280", marginBottom: 24 }}>We nemen binnen 24 uur contact op om jouw website te bespreken.</p>
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <p style={{ fontWeight: 700, color: "#0369a1", marginBottom: 8 }}>Jouw samenvatting:</p>
            <p style={{ color: "#0c4a6e", fontSize: "0.9rem" }}>📦 {PACKAGES.find(p=>p.id===selectedPackage)?.name} pakket — €{basePrice}</p>
            {selectedFeatures.length > 0 && <p style={{ color: "#0c4a6e", fontSize: "0.9rem" }}>➕ {selectedFeatures.length} extra functies — €{totalExtras}</p>}
            <p style={{ color: "#0c4a6e", fontSize: "1rem", fontWeight: 800, marginTop: 8 }}>Totaal: €{totalPrice}</p>
          </div>
          <a href="/" style={{ background: "#1a73e8", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700, display: "inline-block" }}>Terug naar home</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,textarea,select{font-family:inherit}
        .step-btn{background:#1a73e8;color:#fff;padding:13px 28px;border-radius:10px;font-weight:700;font-size:0.95rem;border:none;cursor:pointer;transition:all 0.2s}
        .step-btn:hover{background:#00c2ff;transform:translateY(-1px)}
        .step-btn-out{background:transparent;color:#1a73e8;padding:13px 28px;border-radius:10px;font-weight:600;font-size:0.95rem;border:2px solid #1a73e8;cursor:pointer}
        .step-btn-out:hover{background:#1a73e8;color:#fff}
        .domain-input{width:100%;padding:16px 20px;border:2px solid #e5e7eb;border-radius:12px;font-size:1.1rem;outline:none;background:#fff;transition:border-color 0.2s}
        .domain-input:focus{border-color:#1a73e8}
        .feat-chip{padding:10px 16px;border-radius:100px;font-size:0.88rem;font-weight:600;cursor:pointer;transition:all 0.2s;border:2px solid #e5e7eb;background:#fff;color:#374151}
        .feat-chip.selected{background:#1a73e8;color:#fff;border-color:#1a73e8}
        .feat-chip:hover{border-color:#1a73e8}
        .pkg-card{border:2px solid #e5e7eb;border-radius:16px;padding:28px;cursor:pointer;transition:all 0.2s;background:#fff}
        .pkg-card.selected{border-color:#1a73e8;background:#eff6ff}
        .pkg-card:hover{border-color:#1a73e8}
        input[type=text],input[type=email],input[type=tel],textarea{width:100%;padding:13px 16px;border:2px solid #e5e7eb;border-radius:10px;font-size:0.93rem;outline:none;background:#fff;transition:border-color 0.2s}
        input:focus,textarea:focus{border-color:#1a73e8}
        textarea{resize:vertical;min-height:100px}
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "80px 5% 60px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: 24 }}>← Terug naar Vedantix</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.3)", color: "#00c2ff", padding: "6px 18px", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 600, marginBottom: 20 }}>🚀 Starters configurator</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>Bouw jouw website<br/><span style={{ color: "#00c2ff" }}>stap voor stap</span></h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem" }}>Controleer je domeinnaam, kies je functies en ontvang een op maat gemaakte offerte.</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 5%" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: 0 }}>
          {["Domein", "Jouw branche", "Functies & pakket", "Aanvraag"].map((s, i) => (
            <div key={s} onClick={() => i+1 < step && setStep(i+1)} style={{ flex: 1, padding: "16px 8px", textAlign: "center", borderBottom: step === i+1 ? "3px solid #1a73e8" : "3px solid transparent", cursor: i+1 < step ? "pointer" : "default" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: step === i+1 ? "#1a73e8" : step > i+1 ? "#10b981" : "#9ca3af" }}>
                {step > i+1 ? "✓ " : `${i+1}. `}{s}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 20px" }}>

        {/* STEP 1: DOMEIN */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>🌐 Check jouw domeinnaam</h2>
            <p style={{ color: "#6b7280", marginBottom: 32 }}>Voer de gewenste domeinnaam in (zonder www of .nl) om te checken of hij nog beschikbaar is.</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <input className="domain-input" style={{ flex: 1, minWidth: 200 }} placeholder="bijv. mijnkapperszaak" value={domein} onChange={e => { setDomein(e.target.value); setDomeinStatus(null); }} onKeyDown={e => e.key === "Enter" && checkDomain()} />
              <button className="step-btn" onClick={checkDomain} disabled={checking} style={{ flexShrink: 0 }}>{checking ? "Checken..." : "Controleer"}</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {[".nl", ".com", ".be", ".eu"].map(ext => (
                <span key={ext} style={{ background: "#f0f9ff", color: "#0369a1", padding: "4px 12px", borderRadius: 100, fontSize: "0.82rem", fontWeight: 600 }}>{domein || "jouwbedrijf"}{ext}</span>
              ))}
            </div>
            {domeinStatus === "available" && (
              <div style={{ background: "#f0fdf4", border: "2px solid #10b981", borderRadius: 14, padding: 20, marginBottom: 24 }}>
                <p style={{ color: "#065f46", fontWeight: 700, fontSize: "1.05rem" }}>✅ Gelukt! <strong>{domein}.nl</strong> lijkt beschikbaar te zijn.</p>
                <p style={{ color: "#047857", fontSize: "0.9rem", marginTop: 4 }}>Wij registreren de domeinnaam voor jou als onderdeel van jouw pakket.</p>
              </div>
            )}
            {domeinStatus === "taken" && (
              <div style={{ background: "#fef2f2", border: "2px solid #f87171", borderRadius: 14, padding: 20, marginBottom: 24 }}>
                <p style={{ color: "#991b1b", fontWeight: 700 }}>❌ <strong>{domein}.nl</strong> is helaas al bezet.</p>
                <p style={{ color: "#b91c1c", fontSize: "0.9rem", marginTop: 4 }}>Probeer een variatie zoals <strong>{domein}-nl.nl</strong> of <strong>de{domein}.nl</strong>.</p>
              </div>
            )}
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 16, marginBottom: 32 }}>
              <p style={{ color: "#92400e", fontSize: "0.88rem" }}>💡 <strong>Tip:</strong> Heb je al een domeinnaam? Geen probleem, wij kunnen ook jouw bestaande domein koppelen.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="step-btn" onClick={() => setStep(2)}>Volgende stap →</button>
            </div>
          </div>
        )}

        {/* STEP 2: BRANCHE */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>🏢 Wat voor bedrijf heb jij?</h2>
            <p style={{ color: "#6b7280", marginBottom: 32 }}>Kies jouw branche zodat we slimme suggesties kunnen doen voor jouw website.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginBottom: 32 }}>
              {Object.entries(SUGGESTIONS).map(([key, val]) => (
                <div key={key} onClick={() => setBranche(key)} style={{ border: `2px solid ${branche===key?"#1a73e8":"#e5e7eb"}`, background: branche===key?"#eff6ff":"#fff", borderRadius: 14, padding: "18px 12px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{val.icon}</div>
                  <div style={{ fontSize: "0.83rem", fontWeight: 600, color: branche===key?"#1a73e8":"#374151" }}>{val.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 8, fontSize: "0.9rem" }}>Bedrijfsnaam (optioneel)</label>
              <input type="text" placeholder="bijv. Kapper Jan Amsterdam" value={bedrijfsnaam} onChange={e => setBedrijfsnaam(e.target.value)} style={{ width: "100%", padding: "13px 16px", border: "2px solid #e5e7eb", borderRadius: 10, fontSize: "0.93rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="step-btn-out" onClick={() => setStep(1)}>← Terug</button>
              <button className="step-btn" onClick={() => setStep(3)} disabled={!branche}>Volgende stap →</button>
            </div>
          </div>
        )}

        {/* STEP 3: FUNCTIES & PAKKET */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>⚡ Kies jouw functies & pakket</h2>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>Op basis van jouw branche hebben wij slimme suggesties voor je.</p>

            {/* Smart suggestions */}
            {currentSuggestions.length > 0 && (
              <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 16, padding: 24, marginBottom: 32 }}>
                <p style={{ fontWeight: 700, color: "#0369a1", marginBottom: 4 }}>💡 Slimme suggesties voor {SUGGESTIONS[branche]?.icon} {SUGGESTIONS[branche]?.label}</p>
                <p style={{ color: "#0c4a6e", fontSize: "0.88rem", marginBottom: 16 }}>Selecteer de functies die je interessant vindt. Elke extra functie kost +€75.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {currentSuggestions.map(f => (
                    <button key={f} className={`feat-chip ${selectedFeatures.includes(f) ? "selected" : ""}`} onClick={() => toggleFeature(f)}>{selectedFeatures.includes(f) ? "✓ " : "+ "}{f}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Package selector */}
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Kies je basispakket</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {PACKAGES.map(pkg => (
                <div key={pkg.id} className={`pkg-card ${selectedPackage===pkg.id?"selected":""}`} onClick={() => setSelectedPackage(pkg.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>{pkg.name}</span>
                      <span style={{ color: "#6b7280", fontSize: "0.88rem", marginLeft: 8 }}>{pkg.pages}</span>
                    </div>
                    <span style={{ fontWeight: 900, fontSize: "1.3rem", color: "#1a73e8" }}>€{pkg.price}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {pkg.features.map(f => <span key={f} style={{ background: "#f3f4f6", color: "#374151", padding: "3px 10px", borderRadius: 100, fontSize: "0.78rem" }}>✓ {f}</span>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price summary */}
            <div style={{ background: "#0a1628", borderRadius: 16, padding: 24, marginBottom: 32, color: "#fff" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", marginBottom: 8 }}>Jouw configuratie:</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>{PACKAGES.find(p=>p.id===selectedPackage)?.name} pakket</span>
                <span style={{ fontWeight: 700 }}>€{basePrice}</span>
              </div>
              {selectedFeatures.length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span>{selectedFeatures.length}x extra functie(s)</span>
                  <span style={{ fontWeight: 700 }}>+€{totalExtras}</span>
                </div>
              )}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 900 }}>
                <span>Totaal</span>
                <span style={{ color: "#00c2ff" }}>€{totalPrice}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="step-btn-out" onClick={() => setStep(2)}>← Terug</button>
              <button className="step-btn" onClick={() => setStep(4)}>Aanvragen →</button>
            </div>
          </div>
        )}

        {/* STEP 4: AANVRAAG */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>📬 Verstuur jouw aanvraag</h2>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>Bijna klaar! Vul je gegevens in en we nemen binnen 24 uur contact op.</p>

            {/* Summary */}
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 14, padding: 20, marginBottom: 28 }}>
              <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: 8 }}>📋 Jouw samenvatting</p>
              {domein && <p style={{ color: "#1e3a8a", fontSize: "0.9rem" }}>🌐 Domein: <strong>{domein}.nl</strong></p>}
              {branche && <p style={{ color: "#1e3a8a", fontSize: "0.9rem" }}>🏢 Branche: <strong>{SUGGESTIONS[branche]?.label}</strong></p>}
              <p style={{ color: "#1e3a8a", fontSize: "0.9rem" }}>📦 Pakket: <strong>{PACKAGES.find(p=>p.id===selectedPackage)?.name} (€{basePrice})</strong></p>
              {selectedFeatures.length > 0 && <p style={{ color: "#1e3a8a", fontSize: "0.9rem" }}>➕ Extra's: <strong>{selectedFeatures.join(", ")}</strong></p>}
              <p style={{ color: "#1e40af", fontWeight: 800, fontSize: "1rem", marginTop: 8 }}>Totaal: €{totalPrice}</p>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input type="text" placeholder="Voornaam & achternaam" required value={form.naam} onChange={e => setForm({...form, naam: e.target.value})} />
                <input type="tel" placeholder="Telefoonnummer" value={form.telefoon} onChange={e => setForm({...form, telefoon: e.target.value})} />
              </div>
              <input type="email" placeholder="E-mailadres" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <textarea placeholder="Aanvullende wensen of vragen..." value={form.bericht} onChange={e => setForm({...form, bericht: e.target.value})} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, alignItems: "center" }}>
                <button type="button" className="step-btn-out" onClick={() => setStep(3)}>← Terug</button>
                <button type="submit" style={{ background: "#10b981", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer" }}>Aanvraag versturen 🚀</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
