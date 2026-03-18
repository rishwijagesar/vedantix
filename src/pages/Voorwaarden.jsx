export default function Voorwaarden() {

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


  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#f7f9fc" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}h2{font-size:1.3rem;font-weight:700;margin:32px 0 12px;color:#0a1628}p{color:#374151;line-height:1.7;margin-bottom:12px;font-size:0.95rem}ul{margin:0 0 12px 20px;color:#374151;font-size:0.95rem;line-height:1.7}`}</style>
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "70px 5% 50px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: 20 }}>← Terug naar Vedantix</a>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: -0.5 }}>Algemene Voorwaarden</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 10 }}>Versie 1.0 — van kracht per maart 2026</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "40px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <p>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen Vedantix ("opdrachtnemer") en de opdrachtgever.</p>
          <h2>Artikel 1 — Definities</h2>
          <ul>
            <li><strong>Vedantix:</strong> de eenmanszaak die webdiensten aanbiedt</li>
            <li><strong>Opdrachtgever:</strong> de partij die opdracht geeft tot het bouwen van een website</li>
            <li><strong>Opdracht:</strong> de overeenkomst tussen Vedantix en de opdrachtgever</li>
            <li><strong>Levering:</strong> het beschikbaar stellen van de voltooide website</li>
          </ul>
          <h2>Artikel 2 — Offertes en overeenkomsten</h2>
          <p>Alle offertes van Vedantix zijn vrijblijvend en geldig gedurende 14 dagen. Een overeenkomst komt tot stand op het moment dat de opdrachtgever de offerte schriftelijk (per e-mail) bevestigt en de aanbetaling heeft voldaan.</p>
          <h2>Artikel 3 — Prijzen en betaling</h2>
          <p>Alle prijzen zijn inclusief BTW tenzij anders vermeld. Bij het aangaan van de overeenkomst is een aanbetaling van 50% verschuldigd. Het resterende bedrag dient te worden voldaan vóór oplevering. Bij niet-tijdige betaling is Vedantix gerechtigd de werkzaamheden op te schorten.</p>
          <h2>Artikel 4 — Levering en levertijd</h2>
          <p>Vedantix streeft naar levering binnen 48 uur na ontvangst van alle benodigde informatie en de aanbetaling. Deze termijn is indicatief en geen fatale termijn. Overschrijding geeft de opdrachtgever geen recht op schadevergoeding of ontbinding.</p>
          <h2>Artikel 5 — Aanpassingen</h2>
          <p>Gratis aanpassingen die zijn inbegrepen in het pakket dienen te worden ingediend binnen 14 dagen na oplevering. Aanvullende aanpassingen worden uitgevoerd op basis van uurtarief of een vast afgesproken bedrag.</p>
          <h2>Artikel 6 — Intellectueel eigendom</h2>
          <p>Na volledige betaling gaan alle rechten op de door Vedantix ontwikkelde website over op de opdrachtgever. Vedantix behoudt het recht om de website te vermelden als referentie, tenzij de opdrachtgever hier bezwaar tegen maakt.</p>
          <h2>Artikel 7 — Hosting en domein</h2>
          <p>Hosting is inbegrepen voor de eerste 12 maanden. Na afloop van deze periode ontvangt de opdrachtgever een verlengingsvoorstel. Vedantix is niet aansprakelijk voor downtime of verlies van data bij de hostingprovider.</p>
          <h2>Artikel 8 — Aansprakelijkheid</h2>
          <p>De aansprakelijkheid van Vedantix is beperkt tot het factuurbedrag van de betreffende opdracht. Vedantix is niet aansprakelijk voor indirecte schade, gevolgschade of winstderving.</p>
          <h2>Artikel 9 — Overmacht</h2>
          <p>Vedantix is niet aansprakelijk voor het niet of niet-tijdig nakomen van verplichtingen als gevolg van overmacht. Hieronder vallen onder meer: storingen bij hostingproviders, ziekte, of technische problemen buiten de controle van Vedantix.</p>
          <h2>Artikel 10 — Ontbinding</h2>
          <p>De opdrachtgever kan de overeenkomst ontbinden als Vedantix de opdracht niet binnen een redelijke termijn uitvoert. Vedantix is gerechtigd de overeenkomst te ontbinden als de opdrachtgever niet tijdig betaalt of benodigde informatie niet aanlevert.</p>
          <h2>Artikel 11 — Toepasselijk recht</h2>
          <p>Op alle overeenkomsten met Vedantix is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar Vedantix is gevestigd.</p>
          <h2>Contact</h2>
          <p>Voor vragen over deze voorwaarden: <strong>info@vedantix.nl</strong></p>
        </div>
      </div>
      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem" }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> • <a href="/Privacy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Privacybeleid</a></p>
      </footer>
    </div>
  );
}
