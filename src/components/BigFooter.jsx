import { Link } from "react-router-dom";

const FOOTER_STYLES = `
  .big-footer {
    background: linear-gradient(180deg, #0a0f1e 0%, #060b16 100%);
    color: rgba(255,255,255,0.72);
    border-top: 1px solid rgba(255,255,255,0.06);
    margin-top: 0;
  }

  .big-footer__cta {
    max-width: 1200px;
    margin: 0 auto;
    padding: 72px 24px 40px;
  }

  .big-footer__cta-box {
    background: linear-gradient(135deg, rgba(99,102,241,0.16), rgba(59,130,246,0.08));
    border: 1px solid rgba(99,102,241,0.22);
    border-radius: 24px;
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .big-footer__cta-text {
    flex: 1;
    min-width: 260px;
  }

  .big-footer__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #a5b4fc;
    margin-bottom: 12px;
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
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    line-height: 1.15;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.8px;
    margin-bottom: 10px;
  }

  .big-footer__cta-sub {
    font-size: 0.95rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.62);
    max-width: 620px;
  }

  .big-footer__cta-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .big-footer__btn-primary,
  .big-footer__btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: 12px;
    padding: 14px 20px;
    font-size: 0.9rem;
    font-weight: 700;
    transition: all 0.2s ease;
    white-space: nowrap;
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
    border: 1px solid rgba(255,255,255,0.16);
  }

  .big-footer__btn-secondary:hover {
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.28);
  }

  .big-footer__main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 8px 24px 40px;
  }

  .big-footer__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr;
    gap: 32px;
    padding-top: 28px;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .big-footer__brand {
    min-width: 0;
  }

  .big-footer__brand-name {
    font-size: 1.35rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.6px;
    margin-bottom: 12px;
  }

  .big-footer__brand-text {
    font-size: 0.92rem;
    line-height: 1.75;
    color: rgba(255,255,255,0.58);
    margin-bottom: 18px;
    max-width: 360px;
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

  .big-footer__col-title {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    margin-bottom: 16px;
  }

  .big-footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .big-footer__links a {
    color: rgba(255,255,255,0.58);
    text-decoration: none;
    font-size: 0.9rem;
    line-height: 1.5;
    transition: color 0.2s ease;
  }

  .big-footer__links a:hover {
    color: #93c5fd;
  }

  .big-footer__contact-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .big-footer__contact-item {
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.62);
  }

  .big-footer__contact-item strong {
    display: block;
    color: #fff;
    font-size: 0.84rem;
    margin-bottom: 2px;
  }

  .big-footer__contact-item a {
    color: rgba(255,255,255,0.62);
    text-decoration: none;
  }

  .big-footer__contact-item a:hover {
    color: #93c5fd;
  }

  .big-footer__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    padding-top: 22px;
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

  @media (max-width: 1100px) {
    .big-footer__grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (max-width: 760px) {
    .big-footer__cta {
      padding: 56px 20px 28px;
    }

    .big-footer__main {
      padding: 0 20px 32px;
    }

    .big-footer__cta-box {
      padding: 24px;
    }

    .big-footer__grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .big-footer__meta {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function BigFooter() {
  return (
    <>
      <style>{FOOTER_STYLES}</style>

      <footer className="big-footer">
        <div className="big-footer__cta">
          <div className="big-footer__cta-box">
            <div className="big-footer__cta-text">
              <div className="big-footer__eyebrow">Klaar voor een professionele website?</div>
              <h2 className="big-footer__cta-title">
                Eén partij voor je website, hosting, onderhoud en ondersteuning
              </h2>
              <p className="big-footer__cta-sub">
                Vedantix helpt lokale ondernemers met een professionele online basis
                die verzorgd blijft. Geen losse leveranciers, geen technisch gedoe.
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
          <div className="big-footer__grid">
            <div className="big-footer__brand">
              <div className="big-footer__brand-name">Vedantix</div>
              <p className="big-footer__brand-text">
                Websites voor lokale ondernemers, inclusief hosting, onderhoud en
                doorlopende ondersteuning. Gebouwd voor bedrijven die professioneel
                online zichtbaar willen zijn zonder technisch gedoe.
              </p>

              <div className="big-footer__badges">
                <span className="big-footer__badge">Hosting inbegrepen</span>
                <span className="big-footer__badge">Onderhoud inbegrepen</span>
                <span className="big-footer__badge">Vast aanspreekpunt</span>
              </div>
            </div>

            <div>
              <div className="big-footer__col-title">Navigatie</div>
              <ul className="big-footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/prijzen">Prijzen</Link></li>
                <li><Link to="/proces">Proces</Link></li>
                <li><Link to="/voorwie">Voor wie</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <div className="big-footer__col-title">Pagina&apos;s</div>
              <ul className="big-footer__links">
                <li><Link to="/planning">Planning</Link></li>
                <li><Link to="/starters">Starters</Link></li>
                <li><Link to="/templates">Templates</Link></li>
                <li><Link to="/vedantixhome">Vedantix Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div>
              <div className="big-footer__col-title">Branches</div>
              <ul className="big-footer__links">
                <li><Link to="/website-kapper">Website voor kappers</Link></li>
                <li><Link to="/website-salon">Website voor salons</Link></li>
                <li><Link to="/website-klusbedrijf">Website voor klusbedrijven</Link></li>
                <li><Link to="/website-restaurant">Website voor restaurants</Link></li>
                <li><Link to="/website-fotograaf">Website voor fotografen</Link></li>
                <li><Link to="/website-schoonmaakbedrijf">Website voor schoonmaakbedrijven</Link></li>
              </ul>
            </div>

            <div>
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

          <div className="big-footer__meta">
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