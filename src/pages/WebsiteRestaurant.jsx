import NavBar from "../components/NavBar";

export default function WebsiteRestaurant() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <NavBar />

      <h1>Website laten maken voor restaurants</h1>

      <p>
        Wil je meer reserveringen voor jouw restaurant? Dan heb je een sterke online aanwezigheid nodig.
        Steeds meer mensen zoeken via Google naar restaurants in de buurt.
        Zonder professionele website loop je dagelijks gasten mis.
      </p>

      <h2>Meer gasten via Google</h2>
      <p>
        Een goede website zorgt ervoor dat mensen jouw restaurant vinden, vertrouwen en direct reserveren.
        Dit betekent meer tafels gevuld zonder afhankelijk te zijn van platforms.
      </p>

      <ul>
        <li>Meer online reserveringen</li>
        <li>Professionele uitstraling</li>
        <li>Altijd zichtbaar voor nieuwe gasten</li>
        <li>Direct contact via telefoon of WhatsApp</li>
      </ul>

      <h2>Wat wij bouwen voor restaurants</h2>
      <p>
        Wij maken websites die gericht zijn op reserveringen, zichtbaarheid en conversie.
        Alles wat jouw restaurant nodig heeft om online te groeien.
      </p>

      <ul>
        <li>Online reserveringssysteem</li>
        <li>Menu overzicht (ook mobiel perfect zichtbaar)</li>
        <li>Google Maps integratie</li>
        <li>Mobielvriendelijk design</li>
        <li>Snelle laadtijd</li>
        <li>Binnen 48 uur online</li>
      </ul>

      <h2>Waarom een website essentieel is</h2>
      <p>
        Gasten kiezen vaak het restaurant dat er online het beste uitziet.
        Zonder goede website verlies je reserveringen aan concurrenten die beter zichtbaar zijn.
      </p>

      <h2>Wat kost een website voor restaurants?</h2>
      <p>
        Onze pakketten starten vanaf €99 per maand, inclusief hosting en support.
        Zo ben je snel professioneel online zonder grote investering vooraf.
      </p>

      <h2>Meer reserveringen krijgen?</h2>
      <p>
        Wil jij weten hoe je meer gasten via jouw website krijgt?
        Vraag een gratis analyse aan en ontdek jouw kansen.
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
          placeholder="Naam restaurant"
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