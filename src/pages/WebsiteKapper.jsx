import NavBar from "../components/NavBar";

export default function WebsiteKapper() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <NavBar />

      <h1>Website laten maken voor kappers</h1>

      <p>
        Wil je als kapper meer klanten krijgen via Google? Dan is een professionele website essentieel.
        Steeds meer mensen zoeken online naar een kapper in de buurt.
        Zonder goede website mis je dagelijks potentiële klanten.
      </p>

      <h2>Waarom een website voor jouw kapsalon belangrijk is</h2>
      <p>
        Een goede website zorgt ervoor dat klanten jou kunnen vinden, vertrouwen en direct contact opnemen.
        Zonder website kiezen mensen vaak voor een concurrent die wel online zichtbaar is.
      </p>

      <ul>
        <li>Word gevonden in Google</li>
        <li>Krijg meer afspraken per week</li>
        <li>Professionele uitstraling</li>
        <li>24/7 zichtbaar voor klanten</li>
      </ul>

      <h2>Wat wij voor kappers bouwen</h2>
      <p>
        Wij maken websites speciaal voor kappers en barbershops.
        Alles is gericht op meer klanten en afspraken.
      </p>

      <ul>
        <li>Mobielvriendelijk design</li>
        <li>Online afspraak knop</li>
        <li>WhatsApp integratie</li>
        <li>Google Maps integratie</li>
        <li>Snelle laadtijd</li>
        <li>Binnen 48 uur online</li>
      </ul>

      <h2>Wat kost een website voor kappers?</h2>
      <p>
        Onze pakketten starten vanaf €99 per maand, inclusief hosting en support.
        Geen grote investering vooraf nodig.
      </p>

      <h2>Meer klanten krijgen als kapper?</h2>
      <p>
        Wil jij ook meer afspraken via je website?
        Laat ons gratis kijken naar jouw situatie.
      </p>

      {/* 🔥 LEAD FORM */}
      <form
        action="https://formspree.io/f/mqeyjgna"
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
          maxWidth: "400px"
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
          placeholder="Naam kapsalon"
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
            cursor: "pointer"
          }}
        >
          Gratis analyse aanvragen →
        </button>
      </form>

      <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "10px" }}>
        ⚡ Reactie binnen 24 uur • 100% gratis
      </p>

      {/* EXTRA CTA */}
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
            textDecoration: "none"
          }}
        >
          💬 Of stuur direct een WhatsApp →
        </a>
      </div>
    </div>
  );
}