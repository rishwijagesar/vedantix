import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import NavBar from "../components/NavBar";
import { createBreadcrumbSchema } from "../utils/schema";

export default function Privacy() {
  const canonical = "https://vedantix.nl/privacy";

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Privacybeleid", url: canonical },
  ]);

  return (
    <>
      <SEO
        title="Privacybeleid | Vedantix"
        description="Lees het privacybeleid van Vedantix over persoonsgegevens, cookies, Google Analytics, bewaartermijnen en jouw rechten onder de AVG."
        canonical={canonical}
        schemas={[breadcrumbSchema]}
      />

      <div
        style={{
          fontFamily: "'Inter',sans-serif",
          color: "#1a1a2e",
          minHeight: "100vh",
          background: "#f7f9fc",
        }}
      >
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
          @media (max-width: 768px) {
            .privacy-card {
              padding: 28px 20px !important;
            }
            .privacy-hero {
              padding: 96px 5% 42px !important;
            }
          }
        `}</style>

        <NavBar />

        <div
          className="privacy-hero"
          style={{
            background: "linear-gradient(135deg,#0a1628,#0d2146)",
            padding: "110px 5% 50px",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Link
              to="/"
              style={{
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                fontSize: "0.88rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 36,
              }}
            >
              ← Terug naar Vedantix
            </Link>

            <h1 style={{ color: "#fff", marginBottom: 16 }}>Privacybeleid</h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem" }}>
              Jouw persoonsgegevens zijn belangrijk voor ons.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px" }}>
          <div
            className="privacy-card"
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "40px 48px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              lineHeight: 1.8,
            }}
          >
            <p style={{ marginBottom: 28, fontStyle: "italic", color: "#6b7280" }}>
              Dit privacybeleid is van toepassing op de website van Vedantix en op alle
              diensten die wij aanbieden. We hechten veel waarde aan jouw privacy en
              willen transparant zijn over hoe wij jouw gegevens gebruiken.
            </p>

            <h2>1. Wie zijn wij?</h2>
            <p>
              <strong>Vedantix</strong> is een webbureau dat websites bouwt en beheert
              voor lokale bedrijven in Nederland.
            </p>
            <p>
              <strong>Contact:</strong><br />
              E-mail: <a href="mailto:info@vedantix.nl">info@vedantix.nl</a><br />
              Telefoon: +31 6 26 21 99 89<br />
              Locatie: Nederland
            </p>

            <h2>2. Welke gegevens verzamelen we?</h2>
            <p>
              We verzamelen gegevens <strong>alleen wanneer je contact met ons opneemt</strong>
              of onze diensten gebruikt.
            </p>

            <h3>Via contactformulier</h3>
            <ul>
              <li>naam en achternaam</li>
              <li>e-mailadres</li>
              <li>telefoonnummer</li>
              <li>bedrijfsnaam</li>
              <li>jouw bericht</li>
            </ul>

            <h3>Bij afspraken maken</h3>
            <ul>
              <li>voornaam en achternaam</li>
              <li>e-mailadres</li>
              <li>telefoonnummer</li>
              <li>gekozen datum en tijd</li>
              <li>pakketkeuze</li>
            </ul>

            <h3>Als je klant bent</h3>
            <ul>
              <li>facturatiegegevens</li>
              <li>bankgegevens voor betaling</li>
              <li>website-inhoud, zoals teksten, afbeeldingen en logo’s</li>
              <li>communicatie via e-mail en WhatsApp</li>
            </ul>

            <h3>Automatisch verzameld</h3>
            <ul>
              <li>IP-adres voor veiligheid en het voorkomen van misbruik</li>
              <li>browsergegevens via Google Analytics, voor zover mogelijk geanonimiseerd</li>
            </ul>

            <h2>3. Hoe gebruiken we jouw gegevens?</h2>
            <p>We gebruiken jouw gegevens uitsluitend voor:</p>
            <ul>
              <li><strong>contact:</strong> om je te bereiken over offertes en vragen</li>
              <li><strong>diensten:</strong> om jouw website te bouwen en te onderhouden</li>
              <li><strong>facturen:</strong> om facturen te sturen en betalingen te verwerken</li>
              <li><strong>support:</strong> om je te helpen met vragen en problemen</li>
              <li><strong>verbetering:</strong> om onze diensten beter te maken</li>
            </ul>

            <p>
              <strong>We sturen je geen spam, marketing of andere ongewenste berichten.</strong>
            </p>

            <h2>4. Hoe lang bewaren we jouw gegevens?</h2>
            <p>We bewaren je gegevens alleen zo lang als nodig is:</p>
            <ul>
              <li><strong>Klanten:</strong> tot maximaal 7 jaar, vanwege wettelijke boekhoudverplichtingen</li>
              <li><strong>Geïnteresseerden:</strong> 1 jaar na het laatste contactmoment</li>
              <li><strong>Website-inhoud:</strong> zolang je klant bent, plus 1 maand na opzegging</li>
            </ul>

            <p>
              Je hebt altijd het recht om te verzoeken dat we jouw gegevens eerder
              verwijderen, voor zover dat wettelijk is toegestaan.
            </p>

            <h2>5. Delen we jouw gegevens?</h2>
            <p>
              <strong>Nee, we verkopen jouw gegevens nooit aan derden.</strong>
            </p>

            <p>
              We delen gegevens alleen met partijen die nodig zijn voor het uitvoeren van
              onze diensten:
            </p>
            <ul>
              <li><strong>hostingprovider:</strong> jouw websitebestanden, voor hosting en beheer</li>
              <li><strong>e-maildiensten:</strong> voor facturen en support</li>
              <li><strong>betaaldiensten:</strong> voor verwerking van betalingen</li>
            </ul>

            <p>Deze partijen moeten zorgvuldig met jouw gegevens omgaan.</p>

            <h2>6. Google Analytics</h2>
            <p>
              Onze website gebruikt Google Analytics om te begrijpen hoe bezoekers onze site
              gebruiken. Dit helpt ons om de website te verbeteren.
            </p>
            <ul>
              <li>Google verzamelt geen namen of e-mailadressen via Analytics</li>
              <li>waar mogelijk wordt je IP-adres geanonimiseerd</li>
              <li>je kunt dit uitschakelen via je browserinstellingen of geschikte tools</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>Een cookie is een klein bestand dat je browser opslaat.</p>

            <h3>Cookies die we gebruiken</h3>
            <ul>
              <li><strong>functionele cookies:</strong> om de website goed te laten werken</li>
              <li><strong>analytics cookies:</strong> voor geanonimiseerde inzichten via Google Analytics</li>
            </ul>

            <p>
              <strong>We plaatsen geen advertentie- of trackingcookies voor marketingdoeleinden.</strong>
            </p>

            <h2>8. Veiligheid</h2>
            <p>We nemen de beveiliging van jouw gegevens serieus en treffen passende maatregelen:</p>
            <ul>
              <li>SSL-certificaat voor een beveiligde verbinding</li>
              <li>sterke wachtwoorden en toegangscontroles</li>
              <li>regelmatig beveiligingsonderhoud</li>
              <li>geen opslag van gevoelige gegevens op onveilige locaties</li>
            </ul>

            <p>
              <em>Geen enkel systeem is volledig risicovrij, maar wij doen ons best om jouw gegevens goed te beschermen.</em>
            </p>

            <h2>9. Jouw rechten (AVG)</h2>
            <p>De AVG geeft je verschillende rechten met betrekking tot jouw persoonsgegevens:</p>

            <h3>Recht op inzage</h3>
            <p>Je kunt opvragen welke gegevens we van jou hebben.</p>

            <h3>Recht op correctie</h3>
            <p>Je kunt onjuiste gegevens laten aanpassen.</p>

            <h3>Recht op verwijdering</h3>
            <p>Je kunt verzoeken dat we je gegevens verwijderen, voor zover dat wettelijk mogelijk is.</p>

            <h3>Recht op beperking</h3>
            <p>Je kunt verzoeken dat we je gegevens tijdelijk of gedeeltelijk niet meer gebruiken.</p>

            <h3>Recht op bezwaar</h3>
            <p>Je kunt bezwaar maken tegen bepaald gebruik van jouw gegevens.</p>

            <h3>Recht op gegevensoverdraagbaarheid</h3>
            <p>Je kunt jouw gegevens in een gangbaar formaat opvragen.</p>

            <p style={{ marginTop: 20 }}>
              Wil je een van deze rechten uitoefenen? Stuur dan een e-mail naar{" "}
              <strong>info@vedantix.nl</strong> met “Privacyverzoek” in de onderwerpregel.
            </p>

            <h2>10. Contact en klachten</h2>
            <p>
              <strong>Privacygerelateerde vragen:</strong><br />
              E-mail: <a href="mailto:info@vedantix.nl">info@vedantix.nl</a>
            </p>

            <p>
              <strong>Klacht indienen:</strong><br />
              Je kunt een klacht indienen bij de <strong>Autoriteit Persoonsgegevens</strong>{" "}
              via{" "}
              <a
                href="https://autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noreferrer"
              >
                autoriteitpersoonsgegevens.nl
              </a>
            </p>

            <h2>11. Wijzigingen in dit beleid</h2>
            <p>
              We kunnen dit privacybeleid van tijd tot tijd aanpassen. Grote wijzigingen
              melden we via deze website of, indien relevant, per e-mail.
            </p>

            <p>
              <strong>Laatst bijgewerkt: maart 2026</strong>
            </p>
          </div>
        </div>

        <footer
          style={{
            background: "#0a1628",
            color: "rgba(255,255,255,0.45)",
            padding: "28px 5%",
            textAlign: "center",
            fontSize: "0.83rem",
            marginTop: 48,
          }}
        >
          <p>
            © 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> —{" "}
            <Link to="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
              Home
            </Link>{" "}
            •{" "}
            <Link
              to="/voorwaarden"
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
            >
              Algemene voorwaarden
            </Link>{" "}
            •{" "}
            <Link
              to="/faq"
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
            >
              Veelgestelde vragen
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}