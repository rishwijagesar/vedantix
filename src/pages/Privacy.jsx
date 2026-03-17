export default function Privacy() {
  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}h2{font-size:1.3rem;font-weight:700;margin:32px 0 12px;color:#0a1628}h3{font-size:1rem;font-weight:700;margin:20px 0 8px}p{color:#374151;line-height:1.7;margin-bottom:12px;font-size:0.95rem}ul{margin:0 0 12px 20px;color:#374151;font-size:0.95rem;line-height:1.7}`}</style>
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 50px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: 20 }}>← Terug naar Vedantix</a>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: -0.5 }}>Privacybeleid</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 10 }}>Laatst bijgewerkt: maart 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "40px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <p>Vedantix ("wij", "ons") hecht veel waarde aan de bescherming van jouw persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij dat doen en hoe wij daarmee omgaan.</p>
          <h2>1. Wie zijn wij?</h2>
          <p>Vedantix is een webbureau gevestigd in Nederland dat professionele websites bouwt voor ZZP'ers, MKB en kleine bedrijven.</p>
          <p><strong>E-mail:</strong> info@vedantix.nl</p>
          <h2>2. Welke gegevens verzamelen wij?</h2>
          <p>Wij verzamelen de volgende persoonsgegevens wanneer jij contact met ons opneemt of gebruik maakt van onze diensten:</p>
          <ul>
            <li>Naam en achternaam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer (optioneel)</li>
            <li>Bedrijfsnaam (optioneel)</li>
            <li>Berichten die je via onze contactformulieren stuurt</li>
            <li>Afspraakgegevens (datum, tijdstip, pakketkeuze)</li>
          </ul>
          <h2>3. Waarvoor gebruiken wij jouw gegevens?</h2>
          <ul>
            <li>Om contact met je op te nemen naar aanleiding van jouw aanvraag of offerte</li>
            <li>Om geplande afspraken te bevestigen en na te komen</li>
            <li>Om onze dienstverlening te verbeteren</li>
            <li>Om te voldoen aan wettelijke verplichtingen</li>
          </ul>
          <h2>4. Hoe lang bewaren wij jouw gegevens?</h2>
          <p>Wij bewaren jouw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld. Gegevens van klanten bewaren wij maximaal 7 jaar in verband met de wettelijke bewaarplicht. Gegevens van bezoekers die geen klant worden, verwijderen wij na 1 jaar.</p>
          <h2>5. Worden jouw gegevens gedeeld?</h2>
          <p>Wij verkopen jouw gegevens nooit aan derden. Wij delen gegevens alleen wanneer dit noodzakelijk is voor onze dienstverlening (bijv. met hostingpartners) of wanneer wij hiertoe wettelijk verplicht zijn.</p>
          <h2>6. Beveiliging</h2>
          <p>Wij nemen passende technische en organisatorische maatregelen om jouw persoonsgegevens te beschermen tegen verlies, misbruik, onbevoegde toegang, openbaarmaking, wijziging of vernietiging.</p>
          <h2>7. Jouw rechten</h2>
          <p>Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je de volgende rechten:</p>
          <ul>
            <li>Recht op inzage in jouw persoonsgegevens</li>
            <li>Recht op correctie van onjuiste gegevens</li>
            <li>Recht op verwijdering van jouw gegevens</li>
            <li>Recht op beperking van de verwerking</li>
            <li>Recht om bezwaar te maken tegen de verwerking</li>
            <li>Recht op gegevensoverdraagbaarheid</li>
          </ul>
          <p>Wil je gebruik maken van een van deze rechten? Stuur een e-mail naar <strong>info@vedantix.nl</strong>.</p>
          <h2>8. Cookies</h2>
          <p>Onze website maakt gebruik van functionele cookies die strikt noodzakelijk zijn voor de werking van de website. Wij plaatsen geen tracking- of advertentiecookies zonder jouw toestemming.</p>
          <h2>9. Wijzigingen</h2>
          <p>Wij behouden het recht om dit privacybeleid te wijzigen. Wijzigingen worden op deze pagina gepubliceerd. Wij raden je aan dit beleid regelmatig te raadplegen.</p>
          <h2>10. Klachten</h2>
          <p>Als je het niet eens bent met de manier waarop wij omgaan met jouw persoonsgegevens, heb je het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens via <strong>autoriteitpersoonsgegevens.nl</strong>.</p>
        </div>
      </div>
      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem" }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> • <a href="/Voorwaarden" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Algemene voorwaarden</a></p>
      </footer>
    </div>
  );
}
