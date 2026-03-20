import NavBar from "../components/NavBar";

export default function WebsiteFotograaf() {
  return (
    <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <NavBar />

      <h1>Website laten maken voor fotografen</h1>

      <p>
        Wil je meer shoots boeken als fotograaf? Dan moet je portfolio online zichtbaar zijn.
        Steeds meer klanten zoeken via Google naar een fotograaf in hun buurt.
        Zonder professionele website mis je dagelijks aanvragen.
      </p>

      <h2>Meer klanten via jouw portfolio</h2>
      <p>
        Een sterke website laat jouw werk zien en overtuigt bezoekers om contact op te nemen.
        Dit zorgt voor meer boekingen en een professionele uitstraling.
      </p>

      <ul>
        <li>Professionele portfolio pagina</li>
        <li>Contactformulier voor aanvragen</li>
        <li>Supersnelle laadtijd</li>
        <li>Mobielvriendelijk design</li>
        <li>WhatsApp integratie</li>
      </ul>

      <h2>Waarom een website essentieel is</h2>
      <p>
        Klanten kiezen bijna altijd voor een fotograaf die online goed zichtbaar is.
        Zonder website verlies je vertrouwen én opdrachten aan concurrenten.
      </p>

      <h2>Vraag gratis website analyse aan</h2>
      <p>
        Wil jij weten hoe je meer klanten krijgt via jouw website?
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
          placeholder="Type fotografie (bruiloft, portret, etc.)"
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