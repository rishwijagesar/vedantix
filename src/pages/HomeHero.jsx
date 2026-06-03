import "../styles/home-hero.css";

const HERO_CHECKS = [
  "Eerste versie binnen 48 uur",
  "Hosting inbegrepen",
  "Gebouwd voor meer aanvragen",
  "Niet tevreden? Niet betalen",
];

const MOCKUP_SERVICES = [
  ["✂️", "Knippen", "vanaf €18"],
  ["🧔", "Baardverzorging", "vanaf €12"],
  ["💈", "Fade & Styling", "vanaf €22"],
];

export default function HomeHero() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">Voor lokale ondernemers die meer klanten willen</div>

            <h1>
              Een website die
              <br />
              <span>vertrouwen wekt</span>
              <br />
              en meer aanvragen oplevert
            </h1>

            <p className="hero-sub">
              Wij bouwen snelle websites voor lokale ondernemers die meer afspraken,
              offerteaanvragen en WhatsApp-contact willen.
            </p>

            <div className="hero-checks">
              {HERO_CHECKS.map((item) => (
                <div key={item} className="hero-check">
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-ctas">
              <a
                href="https://wa.me/31626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking%20voor%20mijn%20website."
                target="_blank"
                rel="noreferrer"
                className="hero-btn-primary"
              >
                Plan gratis kennismaking →
              </a>

              <a href="#demo" className="hero-btn-ghost">
                Bekijk voorbeelden →
              </a>
            </div>

            <div className="hero-cta-note">
              Betaling na oplevering · duidelijke afspraken · geen risico
            </div>
          </div>

          <div className="hero-mockup-wrap" aria-hidden="true">
            <div className="hero-mockup">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: "#ff5f57" }} />
                <div className="mockup-dot" style={{ background: "#febc2e" }} />
                <div className="mockup-dot" style={{ background: "#28c840" }} />
                <div className="mockup-url">
                  <span>barbershop-amsterdam.nl</span>
                </div>
              </div>

              <div className="mockup-header">
                <div className="mockup-label">Demo concept voor kapper / barber</div>
                <div className="mockup-title">Barbershop Amsterdam</div>
                <div className="mockup-sub">
                  Duidelijk. Snel. Gericht op afspraak of WhatsApp.
                </div>

                <div className="mockup-meta">
                  <span>⭐ Professionele eerste indruk</span>
                  <span>📱 Mobielvriendelijk</span>
                </div>
              </div>

              <div className="mockup-services">
                {MOCKUP_SERVICES.map(([icon, name, price]) => (
                  <div key={name} className="mockup-item">
                    <span>{icon}</span>
                    <span>{name}</span>
                    <span>{price}</span>
                  </div>
                ))}
              </div>

              <div className="mockup-actions">
                <div className="mockup-action mockup-action-primary">📅 Afspraak maken</div>
                <div className="mockup-action mockup-action-wa">💬 WhatsApp</div>
              </div>
            </div>

            <p className="mockup-note">
              Demo mockup • bedoeld om richting en stijl te laten zien
            </p>
          </div>
        </div>
      </section>

      <section className="hero-trust-section" aria-label="Waarom ondernemers kiezen voor Vedantix">
        <div className="hero-trust-container">
          <div className="hero-trust-item">
            <div className="hero-trust-stat">Sterkere eerste indruk</div>
            <div className="hero-trust-text">Professioneler overkomen vanaf het eerste bezoek</div>
          </div>

          <div className="hero-trust-item">
            <div className="hero-trust-stat">Meer actie</div>
            <div className="hero-trust-text">Gebouwd voor bellen, WhatsApp en aanvragen</div>
          </div>

          <div className="hero-trust-item">
            <div className="hero-trust-stat">Minder gedoe</div>
            <div className="hero-trust-text">Hosting, onderhoud en support onder één partij</div>
          </div>
        </div>
      </section>

      <div className="hero-sticky-cta">
        <a
          href="https://wa.me/31626219989"
          target="_blank"
          rel="noreferrer"
          className="hero-btn-wa"
        >
          💬 Start gesprek
        </a>
      </div>
    </>
  );
}
