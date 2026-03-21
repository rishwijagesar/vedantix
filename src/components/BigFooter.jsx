import { Link } from "react-router-dom";

const FOOTER_STYLES = `
  .big-footer {
    background:
      radial-gradient(circle at 20% 0%, rgba(99,102,241,0.12), transparent 28%),
      radial-gradient(circle at 85% 15%, rgba(59,130,246,0.08), transparent 24%),
      linear-gradient(180deg, #060b16 0%, #040814 100%);
    color: rgba(255,255,255,0.72);
    border-top: 1px solid rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
  }

  .big-footer::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.015) 50%, transparent 100%);
    pointer-events: none;
  }

  .big-footer__inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  .big-footer__cta-wrap {
    padding-top: 52px;
    padding-bottom: 40px;
  }

  .big-footer__cta {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 24px;
    align-items: center;
    padding: 28px 32px;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(17,24,39,0.88), rgba(30,41,59,0.72));
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow:
      0 20px 60px rgba(0,0,0,0.28),
      inset 0 1px 0 rgba(255,255,255,0.04);
    backdrop-filter: blur(10px);
  }

  .big-footer__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #a5b4fc;
  }

  .big-footer__eyebrow::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #22c55e;
    flex-shrink: 0;
  }

  .big-footer__cta-title {
    font-size: clamp(1.45rem, 2.1vw, 2.05rem);
    line-height: 1.08;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.8px;
    margin-bottom: 10px;
    max-width: 620px;
  }

  .big-footer__cta-sub {
    max-width: 560px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.58);
  }

  .big-footer__cta-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .big-footer__btn-primary,
  .big-footer__btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 0.9rem;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.22s ease;
  }

  .big-footer__btn-primary {
    background: #fff;
    color: #0f172a;
    border: 1px solid #fff;
    box-shadow: 0 8px 24px rgba(0,0,0,0.22);
  }

  .big-footer__btn-primary:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }

  .big-footer__btn-secondary {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.14);
  }

  .big-footer__btn-secondary:hover {
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.24);
    transform: translateY(-1px);
  }

  .big-footer__main {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr 0.9fr 1.1fr;
    gap: 44px;
    padding: 8px 0 36px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    align-items: start;
  }

  .big-footer__brand {
    text-align: left;
    min-width: 0;
  }

  .big-footer__brand-name {
    font-size: 1.7rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.8px;
    margin-bottom: 14px;
  }

  .big-footer__brand-text {
    max-width: 320px;
    font-size: 0.95rem;
    line-height: 1.8;
    color: rgba(255,255,255,0.58);
    margin-bottom: 16px;
  }

  .big-footer__brand-note {
    max-width: 320px;
    font-size: 0.82rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.42);
    margin-bottom: 20px;
  }

  .big-footer__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .big-footer__badge {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03);
    color: rgba(255,255,255,0.72);
    border-radius: 999px;
    padding: 7px 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .big-footer__col {
    text-align: left;
    min-width: 0;
  }

  .big-footer__col-title {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.88);
    margin-bottom: 16px;
  }

  .big-footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .big-footer__links a {
    color: rgba(255,255,255,0.58);
    text-decoration: none;
    font-size: 0.92rem;
    line-height: 1.55;
    transition: color 0.2s ease, transform 0.2s ease;
    display: inline-block;
  }

  .big-footer__links a:hover {
    color: #93c5fd;
    transform: translateX(2px);
  }

  .big-footer__contact-list {
    list-style: none;
    padding: 0;
    margin: 0 0 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .big-footer__contact-item {
    font-size: 0.92rem;
    line-height: 1.65;
    color: rgba(255,255,255,0.6);
  }

  .big-footer__contact-item strong {
    display: block;
    color: #fff;
    font-size: 0.82rem;
    margin-bottom: 3px;
    letter-spacing: 0.2px;
  }

  .big-footer__contact-item a {
    color: rgba(255,255,255,0.62);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .big-footer__contact-item a:hover {
    color: #93c5fd;
  }

  .big-footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    padding: 22px 0 28px;
  }

  .big-footer__copyright {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.38);
  }

  .big-footer__bottom-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .big-footer__bottom-links a {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.42);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .big-footer__bottom-links a:hover {
    color: #93c5fd;
  }

  @media (max-width: 1024px) {
    .big-footer__cta {
      grid-template-columns: 1fr;
    }

    .big-footer__cta-actions {
      justify-content: flex-start;
    }

    .big-footer__main {
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }
  }

  @media (max-width: 680px) {
    .big-footer__inner {
      padding: 0 20px;
    }

    .big-footer__cta-wrap {
      padding-top: 40px;
      padding-bottom: 32px;
    }

    .big-footer__cta {
      padding: 24px;
    }

    .big-footer__main {
      grid-template-columns: 1fr;
      gap: 32px;
      padding-bottom: 28px;
    }

    .big-footer__bottom {
      flex-direction: column;
      align-items: flex-start;
    }

    .big-footer__cta-actions {
      width: 100%;
      flex-direction: column;
    }

    .big-footer__btn-primary,
    .big-footer__btn-secondary {
      width: 100%;
    }
  }
`;

export default function BigFooter() {
  return (
    <>
      <style>{FOOTER_STYLES}</style>

      <footer className="big-footer">
        <div className="big-footer__inner">
          <div className="big-footer__cta-wrap">
            <div className="big-footer__cta">
              <div>
                <div className="big-footer__eyebrow">Klaar voor een professionele website?</div>
                <h2 className="big-footer__cta-title">
                  Professioneel online, zonder technisch gedoe.
                </h2>
                <p className="big-footer__cta-sub">
                  Website, hosting en onderhoud in één helder abonnement voor lokale ondernemers.
                </p>
              </div>

              <div className="big-footer__cta-actions">
                <Link to="/prijzen" className="big-footer__btn-primary">
                  Bekijk pakketten
                </Link>
                <a
                  href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20meer%20informatie%20over%20een%20website."
                  target="_blank"
                  rel="noreferrer"
                  className="big-footer__btn-secondary"
                >
                  Plan vrijblijvend gesprek
                </a>
              </div>
            </div>
          </div>

          <div className="big-footer__main">
            <div className="big-footer__brand">
              <div className="big-footer__brand-name">Vedantix</div>
              <p className="big-footer__brand-text">
                Websites voor lokale ondernemers, inclusief hosting, onderhoud en
                doorlopende ondersteuning.
              </p>
              <p className="big-footer__brand-note">
                Geen losse leveranciers, geen technisch gedoe, geen website die na
                oplevering blijft stilstaan.
              </p>

              <div className="big-footer__badges">
                <span className="big-footer__badge">Hosting inbegrepen</span>
                <span className="big-footer__badge">Onderhoud inbegrepen</span>
                <span className="big-footer__badge">Vast aanspreekpunt</span>
              </div>
            </div>

            <div className="big-footer__col">
              <div className="big-footer__col-title">Navigatie</div>
              <ul className="big-footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/prijzen">Prijzen</Link></li>
                <li><Link to="/proces">Proces</Link></li>
                <li><Link to="/voorwie">Voor wie</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className="big-footer__col">
              <div className="big-footer__col-title">Branches</div>
              <ul className="big-footer__links">
                <li><Link to="/website-kapper">Website voor kappers</Link></li>
                <li><Link to="/website-salon">Website voor salons</Link></li>
                <li><Link to="/website-restaurant">Website voor restaurants</Link></li>
                <li><Link to="/website-klusbedrijf">Website voor klusbedrijven</Link></li>
                <li><Link to="/website-fotograaf">Website voor fotografen</Link></li>
              </ul>
            </div>

            <div className="big-footer__col">
              <div className="big-footer__col-title">Contact & juridisch</div>

              <ul className="big-footer__contact-list">
                <li className="big-footer__contact-item">
                  <strong>E-mail</strong>
                  <a href="mailto:info@vedantix.nl">info@vedantix.nl</a>
                </li>
                <li className="big-footer__contact-item">
                  <strong>Telefoon / WhatsApp</strong>
                  <a href="tel:+31626219989">+31 6 26 21 99 89</a>
                </li>
                <li className="big-footer__contact-item">
                  <strong>Werkgebied</strong>
                  Nederland · Lokale ondernemers
                </li>
              </ul>

              <ul className="big-footer__links">
                <li><Link to="/privacy">Privacyverklaring</Link></li>
                <li><Link to="/voorwaarden">Algemene voorwaarden</Link></li>
              </ul>
            </div>
          </div>

          <div className="big-footer__bottom">
            <div className="big-footer__copyright">
              © 2026 Vedantix. Alle rechten voorbehouden.
            </div>

            <div className="big-footer__bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/voorwaarden">Voorwaarden</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/prijzen">Prijzen</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}