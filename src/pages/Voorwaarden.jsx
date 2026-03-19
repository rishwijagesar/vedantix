export default function Voorwaarden() {
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
          <h1 style={{ color: "#fff", marginBottom: 16 }}>Algemene Voorwaarden</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>Duidelijk, eerlijk en eerlijk. Geen verborgen voorwaarden.</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "40px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", lineHeight: 1.8 }}>
          
          <p style={{ marginBottom: 28, fontStyle: "italic", color: "#6b7280" }}>
            Deze voorwaarden zijn van toepassing op alle diensten die Vedantix aanbiedt. Door contact met ons op te nemen of een offerte in te accepteren, ga je akkoord met deze voorwaarden.
          </p>

          <h2>1. Wie zijn wij?</h2>
          <p>
            <strong>Vedantix</strong> is een webbureau gespecialiseerd in het bouwen en beheren van websites voor lokale bedrijven in Nederland. We zorgen voor het volledige pakket: ontwerp, ontwikkeling, hosting, updates en onderhoud.
          </p>
          <p><strong>Contact:</strong> info@vedantix.nl | +31 6 26 21 99 89</p>

          <h2>2. Onze diensten</h2>
          <h3>Website development</h3>
          <p>We bouwen jouw website van nul af aan op basis van jouw wensen. Dit omvat pagina-ontwerp, layout, navigatie en integratie met contactformulieren en andere functies.</p>
          
          <h3>Hosting en domein</h3>
          <p>Je website wordt gehost op beveiligde servers. We regelen je domeinnaam, SSL-certificaat en alle technische setup. Dit is inbegrepen in je maandelijks abonnement.</p>
          
          <h3>Updates en onderhoud</h3>
          <p>We houden je website veilig, snel en up-to-date. Dit omvat beveiligingsupdates, software updates en regelmatig onderhoud.</p>
          
          <h3>Support</h3>
          <p>Heb je een vraag of probleem? Je hebt toegang tot onze klantenservice via e-mail en WhatsApp.</p>
          
          <h3>Levertijd</h3>
          <p>We streven ernaar om je website binnen <strong>48 uur</strong> live te zetten, afhankelijk van:</p>
          <ul>
            <li>Snelle reactie van jou met benodigde informatie</li>
            <li>Volledige betaling van de aanbetaling</li>
            <li>Complexiteit van het project</li>
          </ul>
          <p><em>Dit is een streefdoel, geen garantie. Vertraging kan optreden en geeft geen recht op schadevergoeding.</em></p>

          <h2>3. Prijzen en betaling</h2>
          <p>
            De prijzen op onze website zijn in euro's, inclusief 21% BTW.
          </p>
          <ul>
            <li><strong>Eenmalige setup:</strong> €399–€1000 (afhankelijk van pakket)</li>
            <li><strong>Maandelijks abonnement:</strong> €99–€249/maand</li>
          </ul>
          
          <h3>Betalingswijze en termijn</h3>
          <ul>
            <li>50% aanbetaling wordt gevraagd bij akkoord offerte</li>
            <li>Restant betaald bij oplevering (voor eenmalige projecten)</li>
            <li>Maandelijk abonnement wordt in vooruitbetaling gefactureerd</li>
            <li>Betaaltermijn: <strong>14 dagen</strong> na factuurdatum</li>
          </ul>
          
          <h3>Wat gebeurt er bij late betaling?</h3>
          <ul>
            <li>Boven de 14 dagen: aanmaning per e-mail</li>
            <li>Boven de 30 dagen: we kunnen jouw website offline zetten</li>
            <li>Incassokosten en rente volgens wettelijk tarief kunnen in rekening worden gebracht</li>
          </ul>

          <h2>4. Abonnement en opzegging</h2>
          <p>
            Je betaalt maandelijks voor je website, hosting en support. Dit kan je ieder moment stopzetten.
          </p>
          <ul>
            <li>Abonnement loopt per kalendermaand</li>
            <li>Opzegging: <strong>30 dagen</strong> van tevoren per e-mail</li>
            <li>Geen vaste contract of bindingsperiode</li>
          </ul>
          
          <h3>Wat gebeurt er als je stopt?</h3>
          <ul>
            <li>Je website gaat offline na 30 dagen</li>
            <li>Hosting stopt, je domeinnaam blijft van jou</li>
            <li>Je kunt jouw website-bestanden op aanvraag downloaden</li>
            <li>Optie: <strong>je website overnemen</strong> — vraag ons naar de mogelijkheden</li>
          </ul>

          <h2>5. Eigendom van de website</h2>
          <p>
            <strong>Belangrijk:</strong> Zolang je abonnement actief is, blijft de website technisch eigendom van Vedantix. Dit beschermt beide partijen.
          </p>
          <p>
            Wil je je website volledig bezitten? Je kunt de website <strong>overnemen</strong> voor een eenmalig bedrag. Neem contact op voor meer informatie.
          </p>
          <p>
            Je <strong>inhoud</strong> (teksten, afbeeldingen, logo) is altijd jouw eigendom.
          </p>

          <h2>6. Wijzigingen en extra functies</h2>
          <h3>Wat zit inbegrepen?</h3>
          <p>In elk pakket zitten een aantal <strong>gratis aanpassingen</strong>:</p>
          <ul>
            <li><strong>Starter:</strong> 0 gratis wijzigingen na oplevering</li>
            <li><strong>Growth:</strong> 1 gratis wijziging per maand</li>
            <li><strong>Pro:</strong> 3 gratis wijzigingen per maand</li>
          </ul>
          
          <h3>Extra wijzigingen</h3>
          <p>Meer wensen? Extra wijzigingen kosten <strong>€50–€150</strong> per uur (afhankelijk van complexiteit).</p>
          <p>Voorbeelden van extra kosten:</p>
          <ul>
            <li>Extra pagina's toevoegen</li>
            <li>Geavanceerde functies (e-commerce, boekingssystemen)</li>
            <li>Integaties met externe services</li>
            <li>Fotobewerking en grafisch ontwerp</li>
          </ul>

          <h2>7. Aansprakelijkheid</h2>
          <p>
            Vedantix is niet aansprakelijk voor:
          </p>
          <ul>
            <li>Verlies van inkomsten of zakelijke gevolgen</li>
            <li>Downtime of onbeschikbaarheid van je website</li>
            <li>Verlies van data (maak zelf backups!)</li>
            <li>Diefstal van informatie of cyberaanvallen</li>
            <li>Vertraging in levering door omstandigheden buiten onze controle</li>
          </ul>
          <p>
            Vedantix's totale aansprakelijkheid is beperkt tot het bedrag dat je in de afgelopen 3 maanden hebt betaald.
          </p>

          <h2>8. Hosting en beschikbaarheid</h2>
          <p>
            We garanderen <strong>geen 100% uptime</strong>. De internet is niet altijd betrouwbaar, en soms kunnen servers offline gaan.
          </p>
          <ul>
            <li>We streven naar 99% beschikbaarheid</li>
            <li>Onderhoud kan soms 's nachts plaatsvinden</li>
            <li>Cybersecurity-bedreigingen kunnen voorkomen</li>
            <li>Je hosting-provider kan soms fouten maken (buiten onze controle)</li>
          </ul>

          <h2>9. Levering en jouw verantwoordelijkheid</h2>
          <p>
            We kunnen je website pas opleveren als we alle benodigde informatie van jou hebben:
          </p>
          <ul>
            <li>Teksten voor je pagina's</li>
            <li>Logo's en foto's</li>
            <li>Contactgegevens en openingstijden</li>
            <li>Wensen en feedback</li>
          </ul>
          <p>
            Als jij langzaam bent met het aanleveren van informatie, duurt het langer. Dit veroorzaakt geen extra kosten, maar het vertaagt de oplevering.
          </p>

          <h2>10. Intellectueel eigendom</h2>
          <p>
            <strong>Jij:</strong> Bezit je eigen inhoud (teksten, afbeeldingen, bedrijfsgegevens).
          </p>
          <p>
            <strong>Vedantix:</strong> Bezit het design, code en alle custom-gemaakte elementen. Deze mogen we gebruiken als referentie op onze website en in ons portfolio (tenzij je dit niet wilt).
          </p>

          <h2>11. Toepasselijk recht</h2>
          <p>
            Deze voorwaarden vallen onder Nederlands recht. Eventuele geschillen zullen worden opgelost volgens Nederlands recht en de bevoegde rechtbanken in Nederland.
          </p>

          <h2>12. Wijzigingen van voorwaarden</h2>
          <p>
            We kunnen deze voorwaarden van tijd tot tijd bijwerken. Wijzigingen worden minimaal 30 dagen van tevoren aangekondigd. Doorgaan met ons gebruik betekent akkoord met de nieuwe voorwaarden.
          </p>

          <h2>Vragen?</h2>
          <p>
            Iets onduidelijk? Neem gerust contact met ons op:
          </p>
          <p>
            <strong>E-mail:</strong> info@vedantix.nl<br/>
            <strong>Telefoon:</strong> +31 6 26 21 99 89<br/>
            <strong>WhatsApp:</strong> <a href="https://wa.me/310626219989" target="_blank" rel="noreferrer">Chat met ons</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#0a1628", color: "rgba(255,255,255,0.45)", padding: "28px 5%", textAlign: "center", fontSize: "0.83rem", marginTop: 48 }}>
        <p>© 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> — <a href="/Home" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</a> • <a href="/Privacy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Privacybeleid</a> • <a href="/FAQ" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Veelgestelde vragen</a></p>
      </footer>
    </div>
  );
}