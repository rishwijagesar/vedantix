import NavBar from "../components/NavBar";

export default function WebsiteSalon() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <NavBar />

      <h1>Website laten maken voor salons</h1>

      <p>
        Wil je meer klanten voor jouw schoonheidssalon, nagelstudio of beautysalon?
        Dan heb je een professionele website nodig.
        Klanten zoeken dagelijks via Google naar salons in hun omgeving.
        Zonder goede website loop je boekingen en vertrouwen mis.
      </p>

      <h2>Meer boekingen via jouw website</h2>
      <p>
        Met een sterke website kunnen klanten direct een afspraak maken of contact opnemen.
        Een professionele online uitstraling zorgt voor meer vertrouwen en meer conversie.
      </p>

      <ul>
        <li>Online afspraken ontvangen</li>
        <li>Professionele uitstraling</li>
        <li>Meer vertrouwen bij klanten</li>
        <li>Direct contact via WhatsApp</li>
      </ul>

      <h2>Wat wij bouwen voor salons</h2>
      <p>
        Wij maken websites voor salons die gericht zijn op meer afspraken, een luxe uitstraling
        en een soepele ervaring op mobiel en desktop.
      </p>

      <ul>
        <li>Mobielvriendelijke website</li>
        <li>Boekingsknop of afspraakverzoek</li>
        <li>WhatsApp integratie</li>
        <li>Google Maps integratie</li>
        <li>Snelle laadtijd</li>
        <li>Binnen 48 uur online</li>
      </ul>

      <h2>Waarom een website belangrijk is</h2>
      <p>
        Potentiële klanten vergelijken meerdere salons voordat ze boeken.
        Zonder professionele website kiezen ze sneller voor een concurrent die online beter zichtbaar is.
      </p>

      <h2>Wat kost een website voor salons?</h2>
      <p>
        Onze pakketten starten vanaf €99 per maand, inclusief hosting en support.
        Zo kun je snel professioneel online staan zonder grote investering vooraf.
      </p>

      <h2>Meer afspraken krijgen voor jouw salon?</h2>
      <p>
        Wil jij weten hoe je meer boekingen krijgt via jouw website?
        Vraag een gratis analyse aan en ontdek waar jouw kansen liggen.
      </p>

      <form
        action="https://formspree.io/f/mqeyjgna"
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Naam"
          required
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <input
          type="text"
          name="business"
          placeholder="Naam salon"
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            background: "#111827",
            color: "#fff",
            padding: "14px",
            borderRadius: "8px",
            fontWeight: "700",
            border: "none",
            cursor: "pointer",
          }}
        >
          Gratis analyse aanvragen →
        </button>
      </form>

      <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "10px" }}>
        ⚡ Reactie binnen 24 uur • 100% gratis
      </p>

      <div style={{ marginTop: "30px" }}>
        <a
          href="https://wa.me/310626219989"
          style={{
            display: "inline-block",
            background: "#25d366",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          💬 Of stuur direct een WhatsApp →
        </a>
      </div>
    </div>
  );
}