import NavBar from "./components/NavBar";

export default function WebsiteSalon() {
  return (
    <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <NavBar />

      <h1>Website laten maken voor salons</h1>

      <p>
        Wil je meer klanten voor jouw schoonheidssalon? Dan heb je een professionele website nodig.
        Klanten zoeken dagelijks op Google naar salons in hun omgeving.
      </p>

      <h2>Meer boekingen via jouw website</h2>
      <p>
        Met een goede website kunnen klanten direct een afspraak maken of contact opnemen.
        Zonder website verlies je klanten aan concurrenten.
      </p>

      <ul>
        <li>Online afspraken ontvangen</li>
        <li>Professionele uitstraling</li>
        <li>Meer vertrouwen bij klanten</li>
      </ul>

      <h2>Wat wij bouwen</h2>
      <ul>
        <li>Mobielvriendelijke website</li>
        <li>Boekingsknop</li>
        <li>WhatsApp integratie</li>
        <li>Snelle laadtijd</li>
      </ul>

      <a href="https://wa.me/310626219989">Start vandaag →</a>
    </div>
  );
}