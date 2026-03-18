// v2-20260318-vedantix
import { useState } from "react";

// Template data — each template has pages per package
const TEMPLATES = [
  {
    id: "modern-clean",
    name: "Modern Clean",
    category: "Algemeen",
    tags: ["Minimalistisch", "Modern", "Zakelijk"],
    accent: "#1a73e8",
    preview_bg: "linear-gradient(135deg,#0a1628,#1a73e8)",
    description: "Strak, modern en professioneel. Werkt voor vrijwel elk type bedrijf.",
    packages: {
      starter: {
        pages: ["Home (hero, diensten, contact)"],
        features: ["Hero sectie", "Diensten blok", "Contactformulier", "Footer"],
      },
      business: {
        pages: ["Home", "Over ons", "Diensten", "Contact", "FAQ"],
        features: ["Alles van Starter", "Over ons pagina", "Uitgebreide dienstenpagina", "FAQ sectie", "Google Maps"],
      },
      premium: {
        pages: ["Home", "Over ons", "Diensten", "Portfolio", "Blog", "Team", "Contact", "FAQ", "Vacatures", "Partners"],
        features: ["Alles van Business", "Portfolio galerij", "Blog / nieuws", "Team pagina", "Vacatures", "Partners sectie"],
      },
    },
    mockup: { nav: "#0a1628", hero: "#1a73e8", sec1: "#f7f9fc", sec2: "#fff", footer: "#0a1628" },
  },
  {
    id: "warm-organic",
    name: "Warm Organic",
    category: "Horeca & Lifestyle",
    tags: ["Warm", "Organisch", "Sfeer"],
    accent: "#d97706",
    preview_bg: "linear-gradient(135deg,#78350f,#d97706)",
    description: "Warme tinten en organische vormen. Perfect voor restaurants, cafés en lifestyle brands.",
    packages: {
      starter: {
        pages: ["Home (sfeer, menu-preview, reservering)"],
        features: ["Hero met sfeerfoto", "Menu-preview sectie", "Reserveringsknop", "Openingstijden", "Contact"],
      },
      business: {
        pages: ["Home", "Menu", "Reserveren", "Over ons", "Contact"],
        features: ["Alles van Starter", "Volledig digitaal menu", "Online reserveringspagina", "Galerij", "Google Maps"],
      },
      premium: {
        pages: ["Home", "Menu", "Reserveren", "Galerij", "Evenementen", "Over ons", "Team", "Blog", "Contact", "Cadeaubon"],
        features: ["Alles van Business", "Evenementen pagina", "Team introductie", "Blog / recepten", "Cadeaubon aanvragen"],
      },
    },
    mockup: { nav: "#78350f", hero: "#d97706", sec1: "#fef3c7", sec2: "#fff", footer: "#78350f" },
  },
  {
    id: "bold-portfolio",
    name: "Bold Portfolio",
    category: "Creatief & Portfolio",
    tags: ["Creatief", "Groot beeld", "Portfolio"],
    accent: "#7c3aed",
    preview_bg: "linear-gradient(135deg,#1e1b4b,#7c3aed)",
    description: "Grote beelden, gedurfd design. Voor fotografen, designers en creatieven.",
    packages: {
      starter: {
        pages: ["Home (portfolio-grid, over, contact)"],
        features: ["Hero met groot beeld", "Portfolio grid (6 foto's)", "Korte bio", "Contactformulier"],
      },
      business: {
        pages: ["Home", "Portfolio", "Diensten & tarieven", "Over mij", "Contact"],
        features: ["Alles van Starter", "Uitgebreide portfolio pagina", "Lightbox weergave", "Pakketten & tarieven", "Boekingsformulier"],
      },
      premium: {
        pages: ["Home", "Portfolio", "Categorieën", "Diensten", "Tarieven", "Blog", "Over mij", "Testimonials", "Boeken", "Press"],
        features: ["Alles van Business", "Portfolio per categorie", "Blog / behind the scenes", "Testimonials", "Press kit pagina"],
      },
    },
    mockup: { nav: "#1e1b4b", hero: "#7c3aed", sec1: "#f5f3ff", sec2: "#fff", footer: "#1e1b4b" },
  },
  {
    id: "fresh-health",
    name: "Fresh & Health",
    category: "Fitness & Gezondheid",
    tags: ["Energiek", "Gezond", "Actief"],
    accent: "#10b981",
    preview_bg: "linear-gradient(135deg,#064e3b,#10b981)",
    description: "Fris, energiek en motiverend. Ideaal voor fitness coaches, yoga en gezondheidsmerken.",
    packages: {
      starter: {
        pages: ["Home (hero, diensten, aanmelden, contact)"],
        features: ["Hero met CTA", "Diensten / lessen overzicht", "Aanmeldformulier proefles", "Contact & locatie"],
      },
      business: {
        pages: ["Home", "Lessen & schema", "Pakketten", "Over mij", "Contact"],
        features: ["Alles van Starter", "Lesrooster / schema", "Prijspakketten pagina", "Testimonials", "WhatsApp knop"],
      },
      premium: {
        pages: ["Home", "Lessen", "Lesrooster", "Pakketten", "Blog", "Recepten", "Over mij", "Team", "Testimonials", "Contact"],
        features: ["Alles van Business", "Blog / voedingstips", "Receptenpagina", "Team overzicht", "Video sectie"],
      },
    },
    mockup: { nav: "#064e3b", hero: "#10b981", sec1: "#f0fdf4", sec2: "#fff", footer: "#064e3b" },
  },
  {
    id: "pro-services",
    name: "Pro Services",
    category: "Zakelijk & B2B",
    tags: ["Professioneel", "Vertrouwen", "Zakelijk"],
    accent: "#0369a1",
    preview_bg: "linear-gradient(135deg,#0c4a6e,#0369a1)",
    description: "Uitstraling van vertrouwen en expertise. Voor aannemers, adviseurs en zakelijke diensten.",
    packages: {
      starter: {
        pages: ["Home (diensten, werkgebied, offerte, contact)"],
        features: ["Hero met USP's", "Diensten sectie", "Werkgebied info", "Offerteformulier"],
      },
      business: {
        pages: ["Home", "Diensten", "Projecten", "Over ons", "Contact"],
        features: ["Alles van Starter", "Dienstenpagina per categorie", "Projecten / referenties", "Certificaten sectie", "Reviews"],
      },
      premium: {
        pages: ["Home", "Diensten", "Projecten", "Over ons", "Team", "Blog", "Vacatures", "Werkgebied", "Reviews", "Contact"],
        features: ["Alles van Business", "Team pagina", "Blog / nieuws", "Vacatures", "Uitgebreid werkgebied", "Partner logo's"],
      },
    },
    mockup: { nav: "#0c4a6e", hero: "#0369a1", sec1: "#f0f9ff", sec2: "#fff", footer: "#0c4a6e" },
  },
  {
    id: "beauty-salon",
    name: "Beauty & Care",
    category: "Schoonheid & Wellness",
    tags: ["Elegant", "Vrouwelijk", "Luxe"],
    accent: "#db2777",
    preview_bg: "linear-gradient(135deg,#831843,#db2777)",
    description: "Elegant en verzorgd. Perfect voor kappers, schoonheidssalons en spa's.",
    packages: {
      starter: {
        pages: ["Home (sfeer, behandelingen, afspraak, contact)"],
        features: ["Sfeervolle hero", "Behandelingen & prijzen", "Online afsprakknop", "Openingstijden & locatie"],
      },
      business: {
        pages: ["Home", "Behandelingen", "Afspraak maken", "Over ons", "Contact"],
        features: ["Alles van Starter", "Uitgebreide behandelingenpagina", "Online boekingssysteem", "Galerij", "Reviews"],
      },
      premium: {
        pages: ["Home", "Behandelingen", "Afspraak", "Galerij", "Team", "Cadeaubon", "Blog", "Over ons", "Reviews", "Contact"],
        features: ["Alles van Business", "Team & specialisten", "Cadeaubon aanvragen", "Before/after galerij", "Blog / beauty tips"],
      },
    },
    mockup: { nav: "#831843", hero: "#db2777", sec1: "#fdf2f8", sec2: "#fff", footer: "#831843" },
  },
];

const PACKAGE_INFO = {
  starter: { label: "Starter", price: "€399", color: "#6b7280", pages: "1 pagina" },
  business: { label: "Business", price: "€799", color: "#1a73e8", pages: "Tot 5 pagina's", hot: true },
  premium: { label: "Premium", price: "€1499", color: "#8b5cf6", pages: "Tot 10 pagina's" },
};

// Mini mockup SVG preview

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


function MockupPreview({ m, accent }) {
  return (
    <svg viewBox="0 0 280 180" style={{ width: "100%", borderRadius: "10px 10px 0 0", display: "block" }}>
      {/* Browser chrome */}
      <rect width="280" height="180" fill="#e2e8f0" rx="10"/>
      <rect x="0" y="0" width="280" height="22" fill="#d1d5db" rx="10"/>
      <rect x="0" y="10" width="280" height="12" fill="#d1d5db"/>
      <circle cx="14" cy="11" r="4" fill="#ef4444" opacity="0.7"/>
      <circle cx="26" cy="11" r="4" fill="#f59e0b" opacity="0.7"/>
      <circle cx="38" cy="11" r="4" fill="#10b981" opacity="0.7"/>
      <rect x="55" y="7" width="120" height="8" rx="4" fill="#e5e7eb"/>
      {/* Nav */}
      <rect x="0" y="22" width="280" height="18" fill={m.nav}/>
      <rect x="8" y="27" width="30" height="6" rx="2" fill="rgba(255,255,255,0.9)"/>
      <rect x="160" y="27" width="20" height="6" rx="2" fill="rgba(255,255,255,0.4)"/>
      <rect x="184" y="27" width="20" height="6" rx="2" fill="rgba(255,255,255,0.4)"/>
      <rect x="208" y="27" width="20" height="6" rx="2" fill="rgba(255,255,255,0.4)"/>
      <rect x="240" y="26" width="32" height="8" rx="4" fill={accent}/>
      {/* Hero */}
      <rect x="0" y="40" width="280" height="60" fill={m.hero}/>
      <rect x="80" y="52" width="120" height="8" rx="3" fill="rgba(255,255,255,0.9)"/>
      <rect x="100" y="64" width="80" height="5" rx="2" fill="rgba(255,255,255,0.55)"/>
      <rect x="96" y="74" width="40" height="10" rx="4" fill="rgba(255,255,255,0.9)"/>
      <rect x="142" y="74" width="40" height="10" rx="4" fill="transparent" style={{stroke:"rgba(255,255,255,0.5)",strokeWidth:1}}/>
      {/* Section 1 */}
      <rect x="0" y="100" width="280" height="40" fill={m.sec1}/>
      <rect x="20" y="108" width="60" height="5" rx="2" fill="#d1d5db"/>
      <rect x="100" y="108" width="60" height="5" rx="2" fill="#d1d5db"/>
      <rect x="180" y="108" width="60" height="5" rx="2" fill="#d1d5db"/>
      <rect x="20" y="117" width="40" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="100" y="117" width="45" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="180" y="117" width="35" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="20" y="124" width="50" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="100" y="124" width="38" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="180" y="124" width="42" height="4" rx="2" fill="#e5e7eb"/>
      {/* Section 2 */}
      <rect x="0" y="140" width="280" height="22" fill={m.sec2}/>
      <rect x="90" y="145" width="100" height="5" rx="2" fill="#e5e7eb"/>
      <rect x="110" y="153" width="60" height="4" rx="2" fill="#f1f5f9"/>
      {/* Footer */}
      <rect x="0" y="162" width="280" height="18" fill={m.footer}/>
      <rect x="20" y="167" width="50" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
      <rect x="180" y="167" width="30" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
      <rect x="214" y="167" width="30" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
    </svg>
  );
}


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
        @media(max-width:768px){
          .tmpl-grid{grid-template-columns:repeat(auto-fill,minmax(260px,1fr)) !important}
          .cat-tabs{flex-wrap:wrap !important;gap:6px !important}
          .modal-inner{grid-template-columns:1fr !important;gap:20px !important}
          .pkg-tabs{flex-wrap:wrap !important}
          .hero-pad{padding:50px 5% 40px !important}
        }
        @media(max-width:480px){
          .tmpl-grid{grid-template-columns:1fr !important}
          h1{font-size:1.8rem !important}
        }
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


export default function Templates() {
  const [selectedPkg, setSelectedPkg] = useState("business");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [activeTemplate, setActiveTemplate] = useState(null);

  const categories = ["Alle", ...Array.from(new Set(TEMPLATES.map(t => t.category)))];

  const filtered = TEMPLATES.filter(t =>
    selectedCategory === "Alle" || t.category === selectedCategory
  );

  const pkg = PACKAGE_INFO[selectedPkg];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .tpl-card{background:#fff;border-radius:16px;border:2px solid #e5e7eb;overflow:hidden;transition:all 0.22s;cursor:pointer}
        .tpl-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.1);border-color:#bfdbfe}
        .pkg-tab{padding:10px 22px;border-radius:10px;font-weight:700;font-size:0.88rem;cursor:pointer;border:2px solid transparent;transition:all 0.18s}
        .cat-btn{padding:7px 16px;border-radius:100px;font-weight:600;font-size:0.82rem;cursor:pointer;border:2px solid #e5e7eb;background:#fff;color:#475569;transition:all 0.15s}
        .cat-btn.active{background:#1a73e8;color:#fff;border-color:#1a73e8}
        .cat-btn:hover:not(.active){border-color:#1a73e8;color:#1a73e8}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:22px;max-width:760px;width:100%;max-height:90vh;overflow-y:auto}
        .page-pill{background:#eff6ff;color:#1e40af;padding:5px 14px;border-radius:100px;font-size:0.78rem;font-weight:600;display:inline-block;margin:3px}
        .feat-item{display:flex;gap:8px;align-items:flex-start;padding:6px 0;font-size:0.88rem;color:#374151;border-bottom:1px solid #f1f5f9}
        .feat-item:last-child{border-bottom:none}
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <a href="/Home" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", display: "inline-block", marginBottom: 28 }}>← Terug naar Vedantix</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.3)", color: "#00c2ff", padding: "6px 18px", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 700, marginBottom: 22 }}>Template gallery</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 18, letterSpacing: -1 }}>
            Kies jouw<br/><span style={{ color: "#00c2ff" }}>website template</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto 36px" }}>
            Elk template past zich aan aan jouw pakket. Starter krijgt 1 pagina, Business tot 5, Premium tot 10.
          </p>

          {/* Package selector */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {Object.entries(PACKAGE_INFO).map(([id, info]) => (
              <button key={id} className="pkg-tab"
                onClick={() => setSelectedPkg(id)}
                style={{
                  background: selectedPkg === id ? info.color : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  borderColor: selectedPkg === id ? info.color : "rgba(255,255,255,0.2)",
                  boxShadow: selectedPkg === id ? `0 4px 16px ${info.color}60` : "none"
                }}>
                {info.label} — {info.price}
                {info.hot && <span style={{ background: "#00c2ff", color: "#0a1628", padding: "1px 7px", borderRadius: 100, fontSize: "0.68rem", fontWeight: 800, marginLeft: 7 }}>Populair</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active package info bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "14px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: pkg.color + "15", color: pkg.color, padding: "4px 14px", borderRadius: 100, fontWeight: 800, fontSize: "0.85rem" }}>
              {pkg.label} pakket — {pkg.pages}
            </span>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Klik op een template voor meer details</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} className={`cat-btn ${selectedCategory === cat ? "active" : ""}`} onClick={() => setSelectedCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 5% 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {filtered.map(tpl => {
            const pkgData = tpl.packages[selectedPkg];
            return (
              <div key={tpl.id} className="tpl-card" onClick={() => setActiveTemplate(tpl)}>
                {/* Mockup preview */}
                <div style={{ background: tpl.preview_bg, position: "relative" }}>
                  <MockupPreview m={tpl.mockup} accent={tpl.accent} />
                  <div style={{ position: "absolute", top: 30, right: 10, background: "rgba(0,0,0,0.55)", color: "#fff", padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, backdropFilter: "blur(4px)" }}>
                    {pkgData.pages.length} {pkgData.pages.length === 1 ? "pagina" : "pagina's"}
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "20px 20px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 3 }}>{tpl.name}</h3>
                      <span style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600 }}>{tpl.category}</span>
                    </div>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: tpl.accent, flexShrink: 0, marginTop: 4 }} />
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.83rem", lineHeight: 1.55, marginBottom: 12 }}>{tpl.description}</p>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
                    {tpl.tags.map(t => <span key={t} style={{ background: "#f1f5f9", color: "#475569", padding: "3px 9px", borderRadius: 100, fontSize: "0.73rem", fontWeight: 600 }}>{t}</span>)}
                  </div>
                  {/* Pages for selected package */}
                  <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 14 }}>
                    <p style={{ fontWeight: 700, fontSize: "0.75rem", color: pkg.color, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {pkg.label} — {pkgData.pages.length} {pkgData.pages.length === 1 ? "pagina" : "pagina's"}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {pkgData.pages.map(p => <span key={p} className="page-pill">{p}</span>)}
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); window.location.href = `/Starters`; }}
                    style={{ width: "100%", background: tpl.accent, color: "#fff", padding: "11px", borderRadius: 9, fontWeight: 700, fontSize: "0.88rem", border: "none", cursor: "pointer", transition: "opacity 0.2s" }}
                    onMouseOver={e => e.target.style.opacity = "0.85"}
                    onMouseOut={e => e.target.style.opacity = "1"}>
                    Dit template kiezen →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      {activeTemplate && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setActiveTemplate(null); }}>
          <div className="modal">
            {/* Header */}
            <div style={{ background: activeTemplate.preview_bg, padding: "28px 28px 24px", borderRadius: "22px 22px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "1.5rem", marginBottom: 6 }}>{activeTemplate.name}</h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{activeTemplate.description}</p>
                </div>
                <button onClick={() => setActiveTemplate(null)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", flexShrink: 0 }}>✕ Sluiten</button>
              </div>
            </div>

            {/* Package tabs in modal */}
            <div style={{ padding: "20px 28px 0", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 0 }}>
                {Object.entries(PACKAGE_INFO).map(([id, info]) => (
                  <button key={id} onClick={() => setSelectedPkg(id)}
                    style={{ padding: "8px 18px", borderRadius: "9px 9px 0 0", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", border: "none", background: selectedPkg === id ? "#fff" : "#f1f5f9", color: selectedPkg === id ? info.color : "#64748b", borderTop: selectedPkg === id ? `3px solid ${info.color}` : "3px solid transparent", transition: "all 0.15s" }}>
                    {info.label} — {info.price}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Pages */}
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#374151", marginBottom: 12 }}>
                    Pagina's inbegrepen <span style={{ background: PACKAGE_INFO[selectedPkg].color + "15", color: PACKAGE_INFO[selectedPkg].color, padding: "2px 8px", borderRadius: 100, fontSize: "0.72rem", marginLeft: 6, fontWeight: 800 }}>{activeTemplate.packages[selectedPkg].pages.length}x</span>
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {activeTemplate.packages[selectedPkg].pages.map((p, i) => (
                      <div key={p} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 10px", background: "#f8fafc", borderRadius: 8 }}>
                        <span style={{ background: PACKAGE_INFO[selectedPkg].color, color: "#fff", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontSize: "0.83rem", fontWeight: 500 }}>{p}</span>
                      </div>
                    ))}
                    {/* Show locked pages for lower packages */}
                    {selectedPkg === "starter" && activeTemplate.packages.business.pages.slice(1).map(p => (
                      <div key={p} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 10px", background: "#f8fafc", borderRadius: 8, opacity: 0.4 }}>
                        <span style={{ background: "#e5e7eb", color: "#9ca3af", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", flexShrink: 0 }}>🔒</span>
                        <span style={{ fontSize: "0.82rem", color: "#9ca3af" }}>{p} <span style={{ fontSize: "0.72rem" }}>(Business+)</span></span>
                      </div>
                    ))}
                    {selectedPkg === "business" && activeTemplate.packages.premium.pages.slice(activeTemplate.packages.business.pages.length).map(p => (
                      <div key={p} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 10px", background: "#f8fafc", borderRadius: 8, opacity: 0.4 }}>
                        <span style={{ background: "#e5e7eb", color: "#9ca3af", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", flexShrink: 0 }}>🔒</span>
                        <span style={{ fontSize: "0.82rem", color: "#9ca3af" }}>{p} <span style={{ fontSize: "0.72rem" }}>(Premium)</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#374151", marginBottom: 12 }}>Functies inbegrepen</p>
                  <div>
                    {activeTemplate.packages[selectedPkg].features.map(f => (
                      <div key={f} className="feat-item">
                        <span style={{ color: PACKAGE_INFO[selectedPkg].color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/Starters" style={{ flex: 1, background: activeTemplate.accent, color: "#fff", padding: "13px 24px", borderRadius: 10, fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: "0.92rem" }}>
                  Dit template aanvragen
                </a>
                <button onClick={() => setActiveTemplate(null)} style={{ padding: "13px 24px", borderRadius: 10, fontWeight: 600, fontSize: "0.92rem", border: "2px solid #e5e7eb", background: "#fff", cursor: "pointer", color: "#475569" }}>
                  Terug naar overzicht
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem" }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/Home" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> &nbsp;|&nbsp; <a href="/Starters" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Offerte aanvragen</a></p>
      </footer>
      <WAWidget />
    </div>
  );
}
