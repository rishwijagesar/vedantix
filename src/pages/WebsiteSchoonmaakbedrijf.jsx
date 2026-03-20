import NavBar from "../components/NavBar";

export default function WebsiteSchoonmaakbedrijf() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <NavBar />

      <h1>Website laten maken voor schoonmaakbedrijven</h1>

      <p>
        Wil je meer klanten voor jouw schoonmaakbedrijf? Dan moet je online goed zichtbaar zijn.
        Bedrijven en particulieren zoeken dagelijks via Google naar schoonmaakdiensten.
        Zonder professionele website mis je offerteaanvragen en opdrachten.
      </p>

      <h2>Meer aanvragen via Google</h2>
      <p>
        Een goede website zorgt ervoor dat klanten jouw bedrijf vinden, vertrouwen en direct contact opnemen.
        Dit betekent meer werk zonder dat je afhankelijk bent van advertenties.
      </p>

      <ul>
        <li>Meer offerte aanvragen</li>
        <li>Betrouwbare en professionele uitstraling</li>
        <li>Altijd zichtbaar voor nieuwe klanten</li>
        <li>Direct contact via telefoon of WhatsApp</li>
      </ul>

      <h2>Wat wij bouwen voor schoonmaakbedrijven</h2>
      <p>
        Wij maken websites die gericht zijn op vertrouwen, duidelijke diensten en conversie.
        Perfect voor zowel zakelijke als particuliere klanten.
      </p>

      <ul>
        <li>SEO geoptimaliseerde website</li>
        <li>Contactformulier voor aanvragen</li>
        <li>Diensten overzicht (kantoren, woningen, etc.)</li>
        <li>Google Maps integratie</li>
        <li>Mobielvriendelijk design</li>
        <li>Snelle laadtijd</li>
        <li>Binnen 48 uur online</li>
      </ul>

      <h2>Waarom een website essentieel is</h2>
      <p>
        Klanten kiezen vaak het bedrijf dat er online het meest betrouwbaar uitziet.
        Zonder goede website verlies je opdrachten aan concurrenten die beter zichtbaar zijn.
      </p>

      <h2>Wat kost een website voor schoonmaakbedrijven?</h2>
      <p>
        Onze pakketten starten vanaf €99 per maand, inclusief hosting en support.
        Zo kun je snel professioneel online staan zonder grote investering vooraf.
      </p>

      <h2>Meer klanten krijgen?</h2>
      <p>
        Wil jij weten hoe je meer aanvragen krijgt via jouw website?
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
          placeholder="Naam schoonmaakbedrijf"
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