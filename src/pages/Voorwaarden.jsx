import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import NavBar from "../components/NavBar";
import { createBreadcrumbSchema } from "../utils/schema";

const VOORWAARDEN_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .voorwaarden-page {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1a1a2e;
    min-height: 100vh;
    background: #f7f9fc;
  }

  .voorwaarden-page h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1.1;
  }

  .voorwaarden-page h2 {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 32px 0 16px;
    color: #0a1628;
  }

  .voorwaarden-page h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 20px 0 8px;
    color: #1a1a2e;
  }

  .voorwaarden-page p {
    color: #374151;
    line-height: 1.7;
    margin-bottom: 14px;
    font-size: 0.95rem;
  }

  .voorwaarden-page ul,
  .voorwaarden-page ol {
    margin: 0 0 16px 20px;
    color: #374151;
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .voorwaarden-page li {
    margin-bottom: 8px;
  }

  .voorwaarden-page strong {
    color: #0a1628;
    font-weight: 700;
  }

  .voorwaarden-page em {
    color: #6b7280;
  }

  .voorwaarden-page a {
    color: #1a73e8;
    text-decoration: none;
  }

  .voorwaarden-page a:hover {
    text-decoration: underline;
  }

  .voorwaarden-hero {
    background: linear-gradient(135deg,#0a1628,#0d2146);
    padding: 110px 5% 50px;
  }

  .voorwaarden-hero-inner {
    max-width: 760px;
    margin: 0 auto;
  }

  .voorwaarden-back-link {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    font-size: 0.88rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 36px;
  }

  .voorwaarden-hero-title {
    color: #fff;
    margin-bottom: 16px;
  }

  .voorwaarden-hero-text {
    color: rgba(255,255,255,0.65);
    font-size: 1rem;
  }

  .voorwaarden-content {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 20px;
  }

  .voorwaarden-card {
    background: #fff;
    border-radius: 16px;
    padding: 40px 48px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    line-height: 1.8;
  }

  .voorwaarden-intro {
    margin-bottom: 28px;
    font-style: italic;
    color: #6b7280;
  }

  .voorwaarden-footer {
    background: #0a1628;
    color: rgba(255,255,255,0.45);
    padding: 28px 5%;
    text-align: center;
    font-size: 0.83rem;
    margin-top: 48px;
  }

  .voorwaarden-footer strong {
    color: #fff;
  }

  .voorwaarden-footer-link {
    color: rgba(255,255,255,0.45);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .voorwaarden-card {
      padding: 28px 20px;
    }

    .voorwaarden-hero {
      padding: 96px 5% 42px;
    }
  }
`;

export default function Voorwaarden() {
  const canonical = "https://vedantix.nl/voorwaarden";

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Algemene voorwaarden", url: canonical },
  ]);

  return (
    <>
      <SEO
        title="Algemene voorwaarden | Vedantix"
        description="Lees de algemene voorwaarden van Vedantix over websites, abonnementen, hosting, support, betalingen, opzegging en eigendom."
        canonical={canonical}
        schemas={[breadcrumbSchema]}
      />

      <style>{VOORWAARDEN_STYLES}</style>

      <div className="voorwaarden-page">
        <NavBar />

        <section className="voorwaarden-hero">
          <div className="voorwaarden-hero-inner">
            <Link to="/" className="voorwaarden-back-link">
              ← Terug naar Vedantix
            </Link>

            <h1 className="voorwaarden-hero-title">Algemene voorwaarden</h1>
            <p className="voorwaarden-hero-text">
              Duidelijk en transparant. Geen verborgen voorwaarden.
            </p>
          </div>
        </section>

        <main className="voorwaarden-content">
          <article className="voorwaarden-card">
            <p className="voorwaarden-intro">
              Deze voorwaarden zijn van toepassing op alle diensten die Vedantix aanbiedt.
              Door contact met ons op te nemen of een offerte te accepteren, ga je akkoord
              met deze voorwaarden.
            </p>

            <h2>1. Wie zijn wij?</h2>
            <p>
              <strong>Vedantix</strong> is een webbureau gespecialiseerd in het bouwen en
              beheren van websites voor lokale bedrijven in Nederland. We verzorgen het
              volledige pakket: ontwerp, ontwikkeling, hosting, updates en onderhoud.
            </p>
            <p>
              <strong>Contact:</strong> info@vedantix.nl | +31 6 26 21 99 89
            </p>

            <h2>2. Onze diensten</h2>

            <h3>Website development</h3>
            <p>
              We bouwen jouw website vanaf nul op basis van jouw wensen. Dit omvat
              pagina-ontwerp, layout, navigatie en integratie met contactformulieren en
              andere functies.
            </p>

            <h3>Hosting en domein</h3>
            <p>
              Je website wordt gehost op beveiligde servers. We regelen je domeinnaam,
              SSL-certificaat en de volledige technische setup. Dit is inbegrepen in je
              maandelijkse abonnement.
            </p>

            <h3>Updates en onderhoud</h3>
            <p>
              We houden je website veilig, snel en up-to-date. Dit omvat beveiligingsupdates,
              software-updates en regulier onderhoud.
            </p>

            <h3>Support</h3>
            <p>
              Heb je een vraag of probleem? Dan heb je toegang tot onze klantenservice via
              e-mail en WhatsApp.
            </p>

            <h3>Levertijd</h3>
            <p>
              We streven ernaar om je website binnen <strong>48 uur</strong> live te zetten,
              afhankelijk van:
            </p>
            <ul>
              <li>snelle reactie van jou met de benodigde informatie</li>
              <li>volledige betaling van de aanbetaling</li>
              <li>de complexiteit van het project</li>
            </ul>
            <p>
              <em>
                Dit is een streefdoel, geen garantie. Vertraging kan optreden en geeft geen
                recht op schadevergoeding.
              </em>
            </p>

            <h2>3. Prijzen en betaling</h2>
            <p>De prijzen op onze website zijn in euro’s, inclusief 21% btw.</p>
            <ul>
              <li><strong>Eenmalige setup:</strong> €399–€1000 (afhankelijk van pakket)</li>
              <li><strong>Maandelijks abonnement:</strong> €99–€249 per maand</li>
            </ul>

            <h3>Betalingswijze en termijn</h3>
            <ul>
              <li>50% aanbetaling bij akkoord op de offerte</li>
              <li>restantbetaling bij oplevering (voor eenmalige projecten)</li>
              <li>maandelijks abonnement wordt vooruit gefactureerd</li>
              <li>betaaltermijn: <strong>14 dagen</strong> na factuurdatum</li>
            </ul>

            <h3>Wat gebeurt er bij late betaling?</h3>
            <ul>
              <li>na 14 dagen ontvang je een aanmaning per e-mail</li>
              <li>na 30 dagen kunnen we jouw website tijdelijk offline zetten</li>
              <li>incassokosten en rente volgens wettelijk tarief kunnen in rekening worden gebracht</li>
            </ul>

            <h2>4. Abonnement en opzegging</h2>
            <p>
              Je betaalt maandelijks voor je website, hosting en support. Dit kun je op ieder
              moment stopzetten.
            </p>
            <ul>
              <li>abonnement loopt per kalendermaand</li>
              <li>opzegging: <strong>30 dagen</strong> van tevoren per e-mail</li>
              <li>geen vaste contractduur of minimale bindingsperiode</li>
            </ul>

            <h3>Wat gebeurt er als je stopt?</h3>
            <ul>
              <li>je website gaat offline na 30 dagen</li>
              <li>hosting stopt; je domeinnaam blijft van jou</li>
              <li>je kunt je websitebestanden op aanvraag downloaden</li>
              <li>optie: <strong>je website overnemen</strong> — vraag ons naar de mogelijkheden</li>
            </ul>

            <h2>5. Eigendom van de website</h2>
            <p>
              <strong>Belangrijk:</strong> zolang je abonnement actief is, blijft de website
              technisch eigendom van Vedantix. Dit beschermt beide partijen.
            </p>
            <p>
              Wil je je website volledig bezitten? Dan kun je de website <strong>overnemen</strong>
              voor een eenmalig bedrag. Neem contact op voor meer informatie.
            </p>
            <p>
              Je <strong>inhoud</strong> (teksten, afbeeldingen en logo) blijft altijd jouw eigendom.
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
            <p>
              Meer wensen? Extra wijzigingen kosten <strong>€50–€150</strong> per uur,
              afhankelijk van de complexiteit.
            </p>
            <p>Voorbeelden van extra kosten:</p>
            <ul>
              <li>extra pagina’s toevoegen</li>
              <li>geavanceerde functies zoals e-commerce of boekingssystemen</li>
              <li>integraties met externe services</li>
              <li>fotobewerking en grafisch ontwerp</li>
            </ul>

            <h2>7. Aansprakelijkheid</h2>
            <p>Vedantix is niet aansprakelijk voor:</p>
            <ul>
              <li>verlies van inkomsten of andere zakelijke schade</li>
              <li>downtime of tijdelijke onbeschikbaarheid van je website</li>
              <li>verlies van data</li>
              <li>diefstal van informatie of cyberaanvallen</li>
              <li>vertraging in levering door omstandigheden buiten onze controle</li>
            </ul>
            <p>
              De totale aansprakelijkheid van Vedantix is beperkt tot het bedrag dat je in de
              afgelopen 3 maanden hebt betaald.
            </p>

            <h2>8. Hosting en beschikbaarheid</h2>
            <p>
              We garanderen <strong>geen 100% uptime</strong>. Het internet en hostingdiensten
              zijn niet altijd volledig storingsvrij.
            </p>
            <ul>
              <li>we streven naar 99% beschikbaarheid</li>
              <li>onderhoud kan soms in de nacht plaatsvinden</li>
              <li>cybersecurity-bedreigingen kunnen voorkomen</li>
              <li>je hostingprovider kan soms storingen hebben buiten onze controle</li>
            </ul>

            <h2>9. Levering en jouw verantwoordelijkheid</h2>
            <p>
              We kunnen je website pas opleveren als we alle benodigde informatie van jou hebben:
            </p>
            <ul>
              <li>teksten voor je pagina’s</li>
              <li>logo’s en foto’s</li>
              <li>contactgegevens en openingstijden</li>
              <li>wensen en feedback</li>
            </ul>
            <p>
              Als jij langzaam bent met het aanleveren van informatie, duurt het project langer.
              Dit veroorzaakt geen extra kosten, maar vertraagt de oplevering.
            </p>

            <h2>10. Intellectueel eigendom</h2>
            <p>
              <strong>Jij:</strong> bezit je eigen inhoud, zoals teksten, afbeeldingen en
              bedrijfsgegevens.
            </p>
            <p>
              <strong>Vedantix:</strong> bezit het design, de code en alle maatwerk-elementen.
              Deze mogen we gebruiken als referentie op onze website en in ons portfolio,
              tenzij je aangeeft dat je dit niet wilt.
            </p>

            <h2>11. Toepasselijk recht</h2>
            <p>
              Deze voorwaarden vallen onder Nederlands recht. Eventuele geschillen worden
              behandeld volgens Nederlands recht en door de bevoegde rechtbanken in Nederland.
            </p>

            <h2>12. Wijzigingen van voorwaarden</h2>
            <p>
              We kunnen deze voorwaarden van tijd tot tijd bijwerken. Wijzigingen worden
              minimaal 30 dagen van tevoren aangekondigd. Door gebruik te blijven maken van
              onze diensten ga je akkoord met de nieuwe voorwaarden.
            </p>

            <h2>Vragen?</h2>
            <p>Iets onduidelijk? Neem gerust contact met ons op:</p>
            <p>
              <strong>E-mail:</strong> info@vedantix.nl<br />
              <strong>Telefoon:</strong> +31 6 26 21 99 89<br />
              <strong>WhatsApp:</strong>{" "}
              <a href="https://wa.me/310626219989" target="_blank" rel="noreferrer">
                Chat met ons
              </a>
            </p>
          </article>
        </main>

        <footer className="voorwaarden-footer">
          <p>
            © 2026 <strong>Vedantix</strong> —{" "}
            <Link to="/" className="voorwaarden-footer-link">
              Home
            </Link>{" "}
            •{" "}
            <Link to="/privacy" className="voorwaarden-footer-link">
              Privacybeleid
            </Link>{" "}
            •{" "}
            <Link to="/faq" className="voorwaarden-footer-link">
              Veelgestelde vragen
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}