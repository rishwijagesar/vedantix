export default function Privacy() {
  if (typeof document !== "undefined") {
    let vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      vp.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(vp);
    }
  }

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900; letter-spacing: -1px; line-height: 1.1; }
        h2 { font-size: 1.25rem; font-weight: 800; margin: 32px 0 16px; color: #0a1628; }
        h3 { font-size: 1rem; font-weight: 700; margin: 20px 0 8px; color: #1a1a2e; }
        p { color: #374151; line-height: 1.7; margin-bottom: 14px; font-size: 0.95rem; }
        ul, ol { margin: 0 0 16px 20px; color: #374151; font-size: 0.95rem; line-height: 1.7; }
        li { margin-bottom: 8px; }
        strong { color: #0a1628; font-weight: 700; }
        em { color: #6b7280; }
        a { color: #1a73e8; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 50px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <a href="/Home" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
            ← Terug naar Vedantix
          </a>
          <h1 style={{ color: "#fff", marginBottom: 16 }}>Privacybeleid</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>Jouw privacygegevens zijn belangrijk voor ons.</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "40px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", lineHeight: 1.8 }}>
          
          <p style={{ marginBottom: 28, fontStyle: "italic", color: "#6b7280" }}>
            Dit privacybeleid is van toepassing op de website van Vedantix en alle diensten die wij aanbieden. We hechten veel waarde aan jouw privacy en willen transparant zijn over hoe wij jouw gegevens gebruiken.
          </p>

          <h2>1. Wie zijn wij?</h2>
          <p>
            <strong>Vedantix</strong> — een webbureau dat websites bouwt en beheert voor lokale bedrijven in Nederland.
          </p>
          <p>
            <strong>Contact:</strong><br/>
            E-mail: <a href="mailto:info@vedantix.nl">info@vedantix.nl</a><br/>
            Telefoon: +31 6 26 21 99 89<br/>
            Locatie: Nederland
          </p>

          <h2>2. Welke gegevens verzamelen we?</h2>
          <p>
            We verzamelen gegevens <strong>alleen wanneer je contact met ons opneemt</strong> of onze diensten gebruikt:
          </p>
          
          <h3>Via contactformulier</h3>
          <ul>
            <li>Naam en achternaam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer</li>
            <li>Bedrijfsnaam</li>
            <li>Jouw bericht</li>
          </ul>
          
          <h3>Bij afspraken maken</h3>
          <ul>
            <li>Voornaam en achternaam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer</li>
            <li>Gekozen datum en tijd</li>
            <li>Pakketkeuze</li>
          </ul>
          
          <h3>Als je klant bent</h3>
          <ul>
            <li>Facturatiegegevens</li>
            <li>Bankgegevens (voor betaling)</li>
            <li>Website-inhoud (jouw teksten, afbeeldingen, logo)</li>
            <li>Communicatie via e-mail en WhatsApp</li>
          </ul>
          
          <h3>Automatisch verzameld</h3>
          <ul>
            <li>IP-adres (voor veiligheid en voorkoming van misbruik)</li>
            <li>Browsgegevens via Google Analytics (anoniem)</li>
          </ul>

          <h2>3. Hoe gebruiken we jouw gegevens?</h2>
          <p>
            We gebruiken jouw gegevens uitsluitend voor:
          </p>
          <ul>
            <li><strong>Contact:</strong> Om je te bereiken over offertes en vragen</li>
            <li><strong>Diensten:</strong> Om jouw website te bouwen en onderhouden</li>
            <li><strong>Facturen:</strong> Om facturen te sturen en betalingen te verwerken</li>
            <li><strong>Support:</strong> Om je te helpen met vragen en problemen</li>
            <li><strong>Verbetering:</strong> Om onze diensten beter te maken</li>
          </ul>
          
          <p>
            <strong>We sturen je nooit spam, marketing of anderszins ongewenste berichten.</strong>
          </p>

          <h2>4. Hoe lang bewaren we jouw gegevens?</h2>
          <p>
            We houden je gegevens alleen zo lang als nodig:
          </p>
          <ul>
            <li><strong>Klanten:</strong> Tot maximaal 7 jaar (wettelijke verplichting voor boekhouding)</li>
            <li><strong>Geïnteresseerden:</strong> 1 jaar na laatste contact</li>
            <li><strong>Website-inhoud:</strong> Zolang je klant bent + 1 maand na opzegging</li>
          </ul>
          
          <p>
            Je hebt altijd het recht om te verzoeken dat we jouw gegevens eerder verwijderen (zie "Jouw rechten").
          </p>

          <h2>5. Delen we jouw gegevens?</h2>
          <p>
            <strong>Nee, we verkopen jouw gegevens nooit aan derden.</strong>
          </p>
          
          <p>
            We delen gegevens alleen met partners die we nodig hebben voor jouw diensten:
          </p>
          <ul>
            <li><strong>Hostingprovider:</strong> Jouw website-bestanden (noodzakelijk)</li>
            <li><strong>Email-service:</strong> Voor facturen en support</li>
            <li><strong>Betaaldiensten:</strong> Voor creditcard/bankverwerking (gebruikt je bank, niet wij)</li>
          </ul>
          
          <p>
            Deze partners volgen dezelfde privacyregels als wij.
          </p>

          <h2>6. Google Analytics</h2>
          <p>
            Onze website gebruikt Google Analytics om te begrijpen hoe bezoekers onze site gebruiken. Dit helpt ons het beter te maken.
          </p>
          <ul>
            <li>Google verzamelt anonieme gegevens (geen namen of e-mailadressen)</li>
            <li>Je IP-adres wordt geanonimiseerd</li>
            <li>Je kunt dit uitschakelen in je browserinstellingen</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            Een cookie is een klein bestandje dat je browser opslaat.
          </p>
          
          <h3>Cookies die we gebruiken</h3>
          <ul>
            <li><strong>Functioneel:</strong> Om de website correct te laten werken (nodig)</li>
            <li><strong>Analytics:</strong> Google Analytics (anoniem)</li>
          </ul>
          
          <p>
            <strong>We plaatsen geen tracking- of advertentiecookies.</strong> Je hoeft niet in te stemmen voor functionele cookies — die zijn nodig voor de website.
          </p>

          <h2>8. Veiligheid</h2>
          <p>
            We nemen je gegevens serieus en beveiligen ze goed:
          </p>
          <ul>
            <li>SSL-certificaat (beveiligde verbinding met 🔒)</li>
            <li>Sterke wachtwoorden en toegangscontroles</li>
            <li>Regelmatig beveiligingsonderhoud</li>
            <li>Geen opslag van gevoelige gegevens op onveilige plekken</li>
          </ul>
          
          <p>
            <em>Helaas kan geen systeem 100% veilig zijn. Wij doen ons best.</em>
          </p>

          <h2>9. Jouw rechten (AVG)</h2>
          <p>
            De Europese privacywet (AVG) geeft je deze rechten:
          </p>
          
          <h3>Recht op inzage</h3>
          <p>Je kunt zien welke gegevens we over jou hebben.</p>
          
          <h3>Recht op correctie</h3>
          <p>Je kunt foutieve gegevens laten corrigeren.</p>
          
          <h3>Recht op verwijdering</h3>
          <p>Je kunt verzoeken dat we je gegevens verwijderen (onder bepaalde voorwaarden).</p>
          
          <h3>Recht op beperking</h3>
          <p>Je kunt verzoeken dat we je gegevens niet meer gebruiken.</p>
          
          <h3>Recht op bezwaar</h3>
          <p>Je kunt bezwaar maken tegen bepaald datagebruik.</p>
          
          <h3>Recht op gegevensoverdraagbaarheid</h3>
          <p>Je kunt jouw gegevens in een standaardformaat opvragen (bijv. CSV).</p>
          
          <p style={{ marginTop: 20 }}>
            Wil je een van deze rechten uitoefenen? Stuur een e-mail naar <strong>info@vedantix.nl</strong> met "Privacyverzoek" in de onderwerp-regel.
          </p>

          <h2>10. Contact en klachten</h2>
          <p>
            <strong>Privacy-gerelateerde vragen:</strong><br/>
            E-mail: <a href="mailto:info@vedantix.nl">info@vedantix.nl</a>
          </p>
          
          <p>
            <strong>Klacht indienen:</strong><br/>
            Je kunt een klacht indienen bij de <strong>Autoriteit Persoonsgegevens (AP)</strong> via <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noreferrer">autoriteitpersoonsgegevens.nl</a>
          </p>

          <h2>11. Wijzigingen in dit beleid</h2>
          <p>
            We kunnen dit privacybeleid van tijd tot tijd aanpassen. Grote wijzigingen melden we via e-mail of via deze website.
          </p>
          
          <p>
            <strong>Laatst bijgewerkt: maart 2026</strong>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem", marginTop: 48 }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/Home" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> • <a href="/Voorwaarden" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Algemene voorwaarden</a> • <a href="/FAQ" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Veelgestelde vragen</a></p>
      </footer>
    </div>
  );
}