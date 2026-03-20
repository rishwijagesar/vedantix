import NavBar from "../components/NavBar";

export default function WebsiteKlusbedrijf() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <NavBar />

      <h1>Website laten maken voor klusbedrijven</h1>

      <p>
        Wil je als klusbedrijf meer opdrachten krijgen via Google? Dan moet je online goed vindbaar zijn.
        Steeds meer mensen zoeken dagelijks naar een klusbedrijf, aannemer of vakman in de buurt.
        Zonder professionele website mis je offerteaanvragen en laat je werk liggen.
      </p>

      <h2>Meer aanvragen zonder moeite</h2>
      <p>
        Een goede website zorgt voor constante aanvragen zonder dat je direct hoeft te adverteren.
        Bezoekers zien direct wat je doet, krijgen vertrouwen en kunnen snel contact opnemen.
      </p>

      <ul>
        <li>Meer offerte aanvragen</li>
        <li>Professionele uitstraling</li>
        <li>Altijd zichtbaar voor nieuwe klanten</li>
        <li>Direct contact via telefoon of WhatsApp</li>
      </ul>

      <h2>Wat wij bouwen voor klusbedrijven</h2>
      <p>
        Wij maken websites voor klusbedrijven die gericht zijn op vertrouwen, zichtbaarheid en conversie.
        Geen standaard brochure, maar een website die werk oplevert.
      </p>

      <ul>
        <li>Contactformulier voor nieuwe aanvragen</li>
        <li>Project showcase / afgeronde klussen</li>
        <li>SEO basisoptimalisatie</li>
        <li>Mobielvriendelijk design</li>
        <li>Google Maps integratie</li>
        <li>Snelle laadtijd</li>
        <li>Binnen 48 uur online</li>
      </ul>

      <h2>Waarom een website belangrijk is</h2>
      <p>
        Klanten vergelijken meerdere bedrijven voordat ze contact opnemen.
        Zonder goede website kiezen ze vaak voor een concurrent die er betrouwbaarder uitziet.
      </p>

      <h2>Wat kost een website voor een klusbedrijf?</h2>
      <p>
        Onze pakketten starten vanaf €99 per maand, inclusief hosting en support.
        Zo kun je direct professioneel online staan zonder grote investering vooraf.
      </p>

      <h2>Meer werk binnenhalen als klusbedrijf?</h2>
      <p>
        Wil jij weten hoe je meer offerteaanvragen krijgt via jouw website?
        Laat ons gratis kijken naar jouw huidige online zichtbaarheid.
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
          placeholder="Naam klusbedrijf"
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