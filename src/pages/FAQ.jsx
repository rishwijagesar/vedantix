import { useState } from "react";

export default function FAQ() {
  if (typeof document !== "undefined") {
    let vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      vp.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(vp);
    }
  }

  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      q: "Wat kost een website bij Vedantix?",
      a: "Websites bij Vedantix kosten €99–€249 per maand voor het abonnement. Daar komt eenmalig €399–€1000 setup bovenop (afhankelijk van het pakket). Alles is inclusief: hosting, domein, SSL, updates en onderhoud. Geen verborgen kosten."
    },
    {
      id: 2,
      q: "Hoe snel is mijn website klaar?",
      a: "We streven ernaar je website binnen 48 uur live te zetten — maar dit hangt af van jou. Als jij snel je informatie, foto's en logo aanlevert en betaalt, gaat het snel. Vertraging? Geen probleem, maar het kan iets langer duren."
    },
    {
      id: 3,
      q: "Werkt mijn website ook op mobiel en tablet?",
      a: "100% ja. Elke website die we bouwen is volledig mobielvriendelijk. Je site ziet er goed uit op telefoons, tablets en computers. Dit is standaard inbegrepen."
    },
    {
      id: 4,
      q: "Wat zit er precies in het abonnement?",
      a: "Je maandelijkse abonnement bevat: hosting (servers waar je website op draait), domein, SSL (veiligheid), maandelijkse updates en onderhoud, e-mail support, en voor Growth en Pro ook gratis wijzigingen per maand."
    },
    {
      id: 5,
      q: "Kan ik later nog dingen aanpassen aan mijn website?",
      a: "Ja, absoluut. Hoeveel wijzigingen je gratis krijgt, hangt van je pakket af. Growth: 1 gratis wijziging per maand. Pro: 3 gratis wijzigingen per maand. Wil je meer? Extra wijzigingen kosten €50–€150 per uur."
    },
    {
      id: 6,
      q: "Zit ik vast aan een contract?",
      a: "Nee, je zit niet vast. Je abonnement loopt per maand en je kunt het altijd opzeggen — gewoon 30 dagen van tevoren per e-mail. Geen lange bindingsperiode, geen gedoe."
    },
    {
      id: 7,
      q: "Wat gebeurt er als ik stop met mijn abonnement?",
      a: "Na 30 dagen gaat je website offline. Je domein blijft van jou, en je kunt al je bestanden downloaden. Wil je je website volledig overnemen? Dat kan — neem contact op voor de mogelijkheden."
    },
    {
      id: 8,
      q: "Helpt een website van Vedantix om meer klanten te krijgen?",
      a: "Ja. We bouwen websites gericht op conversie — dus op het ontvangen van klanten en afspraken. Met contactformulieren, WhatsApp-integratie, Google Maps, en mobiel-optimalisatie. Meestal betaalt je website zich terug in maand 1."
    },
    {
      id: 9,
      q: "Moet ik technische kennis hebben?",
      a: "Nee, helemaal niet. Wij regelen alles: hosting, updates, beveiliging, onderhoud. Jij kunt je focussen op je bedrijf. Als je iets wilt veranderen, laat het ons weten — we doen het voor je."
    },
    {
      id: 10,
      q: "Hoe starten we?",
      a: "Makkelijk: bel ons, chat via WhatsApp, of vul ons contactformulier in. We maken een afspraak, bespreken jouw wensen, maken een offerte, en bouwen jouw website. Klaar."
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900; letter-spacing: -1px; line-height: 1.1; }
        h2 { font-size: 1.3rem; font-weight: 800; margin: 28px 0 12px; }
        p { color: #6b7280; line-height: 1.65; }
        a { color: #1a73e8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        
        .faq-item {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .faq-item:hover {
          border-color: #1a73e8;
          box-shadow: 0 4px 12px rgba(26,115,232,0.08);
        }
        
        .faq-trigger {
          width: 100%;
          padding: 18px 20px;
          background: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          text-align: left;
          transition: background 0.15s;
        }
        .faq-trigger:hover {
          background: #f9fafb;
        }
        
        .faq-question {
          font-weight: 700;
          font-size: 1rem;
          color: #1a1a2e;
          flex: 1;
        }
        
        .faq-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a73e8;
          transition: transform 0.2s;
          font-weight: 800;
        }
        
        .faq-item.open .faq-icon {
          transform: rotate(180deg);
        }
        
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .faq-item.open .faq-content {
          max-height: 500px;
        }
        
        .faq-answer {
          padding: 0 20px 18px;
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.7;
          border-top: 1px solid #f1f5f9;
        }
        
        @media(max-width: 768px) {
          .faq-trigger { padding: 14px 16px; }
          .faq-question { font-size: 0.95rem; }
          .faq-answer { padding: 0 16px 14px; font-size: 0.9rem; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 50px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <a href="/Home" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
            ← Terug naar Vedantix
          </a>
          <h1 style={{ color: "#fff", marginBottom: 16 }}>Veelgestelde vragen</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>Heb je vragen? Hieronder vind je antwoorden op veel gestelde vragen.</p>
        </div>
      </div>

      {/* FAQ Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px" }}>
        
        {/* FAQ List */}
        <div style={{ marginBottom: 52 }}>
          {faqs.map(faq => (
            <div
              key={faq.id}
              className={`faq-item ${openId === faq.id ? 'open' : ''}`}
            >
              <button
                className="faq-trigger"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                aria-expanded={openId === faq.id}
              >
                <span className="faq-question">{faq.q}</span>
                <span className="faq-icon">▼</span>
              </button>
              <div className="faq-content">
                <div className="faq-answer">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{ background: "#0a1628", color: "#fff", borderRadius: 16, padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginTop: 0, marginBottom: 12 }}>Klaar om te starten?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28, fontSize: "1rem" }}>
            Geen verborgen kosten. 48-uur levering. 30-daags opzeggen. Gewoon doen.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/Starters"
              style={{
                background: "#1a73e8",
                color: "#fff",
                padding: "13px 32px",
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                display: "inline-block",
                transition: "background 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "#00c2ff"}
              onMouseOut={e => e.currentTarget.style.background = "#1a73e8"}
            >
              Start je website →
            </a>
            <a
              href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20ben%20geinteresseerd%20in%20een%20website."
              target="_blank"
              rel="noreferrer"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "13px 32px",
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                display: "inline-block",
                border: "2px solid #fff",
                transition: "all 0.2s"
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#0a1628";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#fff";
              }}
            >
              💬 Plan gratis gesprek
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem", marginTop: 48 }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/Home" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> • <a href="/Voorwaarden" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Algemene voorwaarden</a> • <a href="/Privacy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Privacybeleid</a></p>
      </footer>
    </div>
  );
}