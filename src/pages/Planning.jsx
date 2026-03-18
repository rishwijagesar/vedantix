// v2-20260318-vedantix
import { useState, useEffect } from "react";
import { Availability, Appointment } from "../api/entities";

// Ensure mobile viewport
if (typeof document !== "undefined") {
  let vp = document.querySelector('meta[name="viewport"]');
  if (!vp) {
    vp = document.createElement("meta");
    vp.name = "viewport";
    vp.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(vp);
  }
}



export default function Planning() {
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", package_interest: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async () => {
    setLoading(true);
    try {
      const data = await Availability.filter({ is_active: true });
      const today = new Date().toISOString().split("T")[0];
      const future = data.filter(a => a.date >= today && a.time_slots && a.time_slots.length > 0);
      future.sort((a, b) => a.date.localeCompare(b.date));
      setAvailabilities(future);
    } catch (e) {
      setAvailabilities([]);
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Appointment.create({
        ...form,
        date: selectedDate,
        time: selectedTime,
        status: "pending"
      });
    } catch (e) {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a1628,#0d2146)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif", padding: "20px" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 48, textAlign: "center", maxWidth: 480, width: "100%" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>📅</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, color: "#0a1628" }}>Afspraak ingepland!</h2>
          <p style={{ color: "#6b7280", marginBottom: 24 }}>We hebben jouw afspraakaanvraag ontvangen en sturen binnen 24 uur een bevestiging.</p>
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12, padding: 20, marginBottom: 28, textAlign: "left" }}>
            <p style={{ fontWeight: 700, color: "#0369a1", marginBottom: 10 }}>📋 Jouw afspraak:</p>
            <p style={{ color: "#0c4a6e", fontSize: "0.9rem", marginBottom: 4 }}>📅 {formatDate(selectedDate)}</p>
            <p style={{ color: "#0c4a6e", fontSize: "0.9rem", marginBottom: 4 }}>🕐 {selectedTime} — {incrementTime(selectedTime)} (30 min)</p>
            <p style={{ color: "#0c4a6e", fontSize: "0.9rem" }}>👤 {form.name}</p>
          </div>
          <a href="/" style={{ background: "#1a73e8", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700, display: "inline-block" }}>Terug naar home</a>
        </div>
      </div>
    );
  }

  return (
    <><WhatsAppWidget />
      <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,textarea,select{font-family:inherit}
        .time-slot{padding:10px 18px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;font-weight:600;font-size:0.9rem;transition:all 0.2s;background:#fff;color:#374151;text-align:center}
        .time-slot:hover{border-color:#1a73e8;color:#1a73e8}
        .time-slot.selected{background:#1a73e8;color:#fff;border-color:#1a73e8}
        .date-card{border:2px solid #e5e7eb;border-radius:14px;padding:18px 20px;cursor:pointer;transition:all 0.2s;background:#fff}
        .date-card:hover{border-color:#1a73e8}
        .date-card.selected{border-color:#1a73e8;background:#eff6ff}
        .form-input{width:100%;padding:13px 16px;border:2px solid #e5e7eb;border-radius:10px;font-size:0.93rem;outline:none;background:#fff;transition:border-color 0.2s;font-family:inherit}
        .form-input:focus{border-color:#1a73e8}
        .btn-main{background:#1a73e8;color:#fff;padding:13px 28px;border-radius:10px;font-weight:700;font-size:0.95rem;border:none;cursor:pointer;transition:all 0.2s}
        .btn-main:hover{background:#00c2ff}
        .btn-out{background:transparent;color:#1a73e8;padding:13px 28px;border-radius:10px;font-weight:600;font-size:0.95rem;border:2px solid #1a73e8;cursor:pointer}
        .btn-out:hover{background:#1a73e8;color:#fff}
        @media(max-width:768px){
          .date-grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr)) !important}
          .time-grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr)) !important}
          .form-grid{grid-template-columns:1fr !important}
          .inner-wrap{padding:clamp(24px,5vw,40px) 5% !important}
        }
        @media(max-width:480px){
          h1{font-size:1.8rem !important}
          .step-btns{flex-direction:column !important;gap:10px !important}
          .step-btns button{width:100% !important}
          .date-grid{grid-template-columns:1fr 1fr !important}
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "clamp(50px,8vw,80px) 5% clamp(40px,6vw,60px)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <a href="/Home" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: 24 }}>← Terug naar Vedantix</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.3)", color: "#00c2ff", padding: "6px 18px", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 600, marginBottom: 20 }}>📅 Gratis kennismaking</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>Plan een <span style={{ color: "#00c2ff" }}>persoonlijk gesprek</span></h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem" }}>Heb je vragen of wil je meer weten? Plan een gratis kennismakingsgesprek van 30 minuten.</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 5%" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 0 }}>
          {["Kies datum", "Kies tijdstip", "Jouw gegevens"].map((s, i) => (
            <div key={s} style={{ flex: 1, padding: "16px 8px", textAlign: "center", borderBottom: step === i+1 ? "3px solid #1a73e8" : "3px solid transparent" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: step === i+1 ? "#1a73e8" : step > i+1 ? "#10b981" : "#9ca3af" }}>
                {step > i+1 ? "✓ " : `${i+1}. `}{s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px" }}>

        {/* STEP 1: DATUM */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>📅 Kies een datum</h2>
            <p style={{ color: "#6b7280", marginBottom: 32 }}>Selecteer een beschikbare datum voor jouw kennismakingsgesprek.</p>
            {loading ? (
              <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>⏳</div>
                <p>Beschikbaarheid laden...</p>
              </div>
            ) : availabilities.length === 0 ? (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 14, padding: 28, textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>😔</div>
                <h3 style={{ fontWeight: 700, color: "#92400e", marginBottom: 8 }}>Momenteel geen beschikbaarheid</h3>
                <p style={{ color: "#b45309", fontSize: "0.9rem" }}>Er zijn op dit moment geen tijdslots beschikbaar. Neem contact op via info@vedantix.nl.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {availabilities.map(av => (
                  <div key={av.id} className={`date-card ${selectedDate === av.date ? "selected" : ""}`} onClick={() => { setSelectedDate(av.date); setSelectedTime(null); }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: "1rem", color: selectedDate === av.date ? "#1e40af" : "#1a1a2e", textTransform: "capitalize" }}>{formatDate(av.date)}</p>
                        <p style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: 2 }}>{av.time_slots.length} tijdslots beschikbaar</p>
                      </div>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${selectedDate === av.date ? "#1a73e8" : "#e5e7eb"}`, background: selectedDate === av.date ? "#1a73e8" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selectedDate === av.date && <span style={{ color: "#fff", fontSize: "0.75rem" }}>✓</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn-main" onClick={() => setStep(2)} disabled={!selectedDate}>Volgende stap →</button>
            </div>
          </div>
        )}

        {/* STEP 2: TIJDSTIP */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 4 }}>🕐 Kies een tijdstip</h2>
            <p style={{ color: "#1a73e8", fontWeight: 600, marginBottom: 24, textTransform: "capitalize" }}>📅 {formatDate(selectedDate)}</p>
            <div className="date-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 10, marginBottom: 32 }}>
              {availabilities.find(a => a.date === selectedDate)?.time_slots?.map(slot => (
                <div key={slot} className={`time-slot ${selectedTime === slot ? "selected" : ""}`} onClick={() => setSelectedTime(slot)}>
                  <div style={{ fontWeight: 700 }}>{slot}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>30 min</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12, padding: 16, marginBottom: 32 }}>
              <p style={{ color: "#0369a1", fontSize: "0.88rem" }}>💡 Het gesprek duurt 30 minuten en vindt plaats via Google Meet of telefoon — jij kiest.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn-out" onClick={() => setStep(1)}>← Terug</button>
              <button className="btn-main" onClick={() => setStep(3)} disabled={!selectedTime}>Volgende stap →</button>
            </div>
          </div>
        )}

        {/* STEP 3: GEGEVENS */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>👤 Jouw gegevens</h2>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 16, marginBottom: 28 }}>
              <p style={{ color: "#1e40af", fontSize: "0.9rem" }}>📅 {formatDate(selectedDate)} &nbsp;•&nbsp; 🕐 {selectedTime} ({incrementTime(selectedTime)}) — 30 min</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input className="form-input" type="text" placeholder="Voornaam & achternaam" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input className="form-input" type="tel" placeholder="Telefoonnummer" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <input className="form-input" type="email" placeholder="E-mailadres" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input className="form-input" type="text" placeholder="Bedrijfsnaam (optioneel)" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              <select className="form-input" value={form.package_interest} onChange={e => setForm({...form, package_interest: e.target.value})}>
                <option value="">Welk pakket interesseert je? (optioneel)</option>
                <option>Starter — €399</option>
                <option>Business — €799</option>
                <option>Premium — €1499</option>
                <option>Weet ik nog niet</option>
              </select>
              <textarea className="form-input" placeholder="Heb je al vragen of wil je iets doorgeven voor het gesprek? (optioneel)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ minHeight: 100, resize: "vertical" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <button type="button" className="btn-out" onClick={() => setStep(2)}>← Terug</button>
                <button type="submit" style={{ background: "#10b981", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer" }}>Afspraak bevestigen 📅</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function incrementTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + 30;
  return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const url = 'https://wa.me/310626219989?text=' + encodeURIComponent('Hallo Vedantix! Ik heb een vraag.');
  return (
    <>
      <style>{`
        .wa-fab{position:fixed;bottom:28px;right:28px;z-index:500}
        .wa-btn{width:58px;height:58px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,0.45);display:flex;align-items:center;justify-content:center;transition:transform 0.2s}
        .wa-btn:hover{transform:scale(1.08)}
        .wa-bubble{position:absolute;bottom:68px;right:0;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);width:290px;overflow:hidden;animation:waPop 0.2s ease}
        @keyframes waPop{from{opacity:0;transform:scale(0.92) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .wa-header{background:#075e54;padding:16px 18px;display:flex;align-items:center;gap:12px;position:relative}
        .wa-avatar{width:40px;height:40px;border-radius:50%;background:#128c7e;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .wa-body{padding:16px 18px}
        .wa-msg{background:#f0f0f0;border-radius:0 10px 10px 10px;padding:10px 13px;font-size:0.85rem;color:#1a1a2e;line-height:1.5;margin-bottom:14px}
        .wa-open{display:block;background:#25d366;color:#fff;text-align:center;padding:11px;border-radius:9px;font-weight:700;text-decoration:none;font-size:0.88rem}
        .wa-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;width:18px;height:18px;border-radius:50%;font-size:0.65rem;font-weight:800;display:flex;align-items:center;justify-content:center}
      `}</style>
      <div className="wa-fab">
        {open && (
          <div className="wa-bubble">
            <div className="wa-header">
              <div className="wa-avatar">V</div>
              <div><div style={{color:'#fff',fontWeight:700,fontSize:'0.9rem'}}>Vedantix</div><div style={{color:'rgba(255,255,255,0.6)',fontSize:'0.75rem'}}>Gemiddeld binnen 1 uur</div></div>
              <button onClick={() => setOpen(false)} style={{position:'absolute',top:10,right:12,background:'none',border:'none',color:'rgba(255,255,255,0.6)',cursor:'pointer',fontSize:'1rem'}}>✕</button>
            </div>
            <div className="wa-body">
              <div className="wa-msg">👋 Hallo! Heb je een vraag? Stuur ons een WhatsApp-bericht — we reageren snel!</div>
              <a href={url} target="_blank" rel="noreferrer" className="wa-open">Chat openen op WhatsApp</a>
            </div>
          </div>
        )}
        <button className="wa-btn" onClick={() => setOpen(p => !p)} aria-label="WhatsApp">
          {!open && <div className="wa-badge">1</div>}
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </button>
      </div>
    </>
  );
}
