import "../styles/home-hero.css";

const HERO_CHECKS = [
  "Sterke eerste versie binnen 48 uur",
  "Gebouwd voor afspraken, aanvragen en WhatsApp",
  "Hosting, onderhoud en support inbegrepen",
  "Betaling na oplevering — niet tevreden, niet betalen",
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
            <div className="hero-eyebrow">
              Voor lokale ondernemers die meer klanten willen
            </div>

            <h1>
              Een website die
              <br />
              <span>vertrouwen wekt</span>
              <br />
              en meer aanvragen oplevert
            </h1>

            <p className="hero-sub">
              Meer afspraken, aanvragen en contactmomenten — zonder technisch gedoe.
              Wij bouwen een website die{" "}
              <strong>professioneel overkomt, direct duidelijk maakt wat je doet</strong>{" "}
              en bezoekers sneller richting WhatsApp, bellen of een aanvraag stuurt.
            </p>

            <div className="hero-microcopy">
              Ook geschikt als je nog geen bestaande website, reviews of uitgebreide content hebt.
            </div>

            <div className="hero-checks">
              {HERO_CHECKS.map((item) => (
                <div key={item} className="hero-check">
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-ctas">
              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking%20voor%20mijn%20website."
                target="_blank"
                rel="noreferrer"
                className="hero-btn-primary"
              >
                Plan gratis kennismaking →
              </a>

              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20website%20scan."
                target="_blank"
                rel="noreferrer"
                className="hero-btn-wa"
              >
                Ontvang gratis website scan
              </a>

              <a href="#demo" className="hero-btn-ghost">
                Bekijk voorbeelden →
              </a>
            </div>

            <div className="hero-cta-note">
              Betaling na oplevering · duidelijke afspraken · geen risico
            </div>

            <div className="hero-social-proof">
              <div className="hero-sp-item">
                <div className="hero-sp-stat">Sterkere eerste indruk</div>
                <div className="hero-sp-text">Professioneler overkomen vanaf het eerste bezoek</div>
              </div>

              <div className="hero-divider" />

              <div className="hero-sp-item">
                <div className="hero-sp-stat">Meer actie</div>
                <div className="hero-sp-text">Gebouwd voor bellen, WhatsApp en aanvragen</div>
              </div>

              <div className="hero-divider" />

              <div className="hero-sp-item">
                <div className="hero-sp-stat">Minder gedoe</div>
                <div className="hero-sp-text">Hosting, onderhoud en support onder één partij</div>
              </div>
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
                <button type="button">📅 Afspraak maken</button>
                <button type="button">💬 WhatsApp</button>
              </div>
            </div>

            <p className="mockup-note">
              Demo mockup • bedoeld om richting en stijl te laten zien
            </p>
          </div>
        </div>
      </section>

      <div className="hero-sticky-cta">
        <a
          href="https://wa.me/310626219989"
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