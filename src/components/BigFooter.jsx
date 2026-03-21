import { Link } from "react-router-dom";

const FOOTER_STYLES = `
  .big-footer {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 18% 0%, rgba(99,102,241,0.10), transparent 24%),
      radial-gradient(circle at 85% 10%, rgba(59,130,246,0.07), transparent 22%),
      linear-gradient(180deg, #08101d 0%, #050b16 100%);
    color: rgba(255,255,255,0.72);
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .big-footer::before {
    content: "";
    position: absolute;
    top: -120px;
    left: -140px;
    width: 360px;
    height: 220px;
    background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
    transform: rotate(-14deg);
    border-radius: 28px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.9;
  }

  .big-footer::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.02), transparent 30%);
    pointer-events: none;
    z-index: 0;
  }

  .big-footer__inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 72px 24px 28px;
    position: relative;
    z-index: 1;
  }

  .big-footer__grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr 0.95fr 1.1fr;
    gap: 42px;
    align-items: start;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .big-footer__brand-name {
    font-size: 1.7rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.7px;
    margin-bottom: 14px;
  }

  .big-footer__brand-text {
    max-width: 320px;
    font-size: 0.92rem;
    line-height: 1.8;
    color: rgba(255,255,255,0.58);
    margin-bottom: 22px;
  }

  .big-footer__socials {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .big-footer__social {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(circle at 30% 30%, rgba(168,85,247,0.18), rgba(99,102,241,0.08) 60%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(167,139,250,0.18);
    color: #f8fafc;
    text-decoration: none;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.02) inset,
      0 0 18px rgba(139,92,246,0.12),
      0 8px 18px rgba(0,0,0,0.22);
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease,
      border-color 0.22s ease,
      background 0.22s ease;
  }

  .big-footer__social:hover {
    transform: translateY(-2px) scale(1.04);
    border-color: rgba(196,181,253,0.32);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.03) inset,
      0 0 26px rgba(139,92,246,0.22),
      0 12px 24px rgba(0,0,0,0.28);
    background:
      radial-gradient(circle at 30% 30%, rgba(192,132,252,0.26), rgba(99,102,241,0.12) 60%, rgba(255,255,255,0.03) 100%);
  }

  .big-footer__social:active {
    transform: translateY(0) scale(1.01);
  }

  .big-footer__social svg {
    width: 17px;
    height: 17px;
    fill: currentColor;
  }

  .big-footer__col-title {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1.3px;
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
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .big-footer__contact-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.92rem;
    line-height: 1.65;
    color: rgba(255,255,255,0.6);
  }

  .big-footer__contact-icon {
    width: 16px;
    min-width: 16px;
    margin-top: 3px;
    color: rgba(255,255,255,0.4);
  }

  .big-footer__contact-icon svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  .big-footer__contact-item a {
    color: rgba(255,255,255,0.62);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .big-footer__contact-item a:hover {
    color: #93c5fd;
  }

  .big-footer__company-meta {
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .big-footer__company-line {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.46);
    line-height: 1.6;
  }

  .big-footer__company-line strong {
    color: rgba(255,255,255,0.78);
    font-weight: 600;
  }

  .big-footer__bottom {
    padding-top: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
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

  @media (max-width: 980px) {
    .big-footer__grid {
      grid-template-columns: 1fr 1fr;
      gap: 34px;
    }

    .big-footer::before {
      width: 300px;
      height: 180px;
      top: -95px;
      left: -120px;
    }
  }

  @media (max-width: 680px) {
    .big-footer__inner {
      padding: 52px 20px 24px;
    }

    .big-footer__grid {
      grid-template-columns: 1fr;
      gap: 30px;
      padding-bottom: 28px;
    }

    .big-footer__bottom {
      flex-direction: column;
      align-items: flex-start;
    }

    .big-footer::before {
      width: 240px;
      height: 150px;
      top: -80px;
      left: -90px;
      transform: rotate(-16deg);
    }
  }
`;

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.4 1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.2c0-.9.3-1.5 1.6-1.5h1.7V5a22 22 0 0 0-2.5-.1c-2.5 0-4.3 1.5-4.3 4.4V11H7v3h2.9v8h3.6Z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 8.5A1.8 1.8 0 1 1 6.5 5a1.8 1.8 0 0 1 0 3.5ZM5 10h3v9H5v-9Zm5 0h2.9v1.2h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.6V19h-3v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3v-9Z" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a7 7 0 0 1 7 7c0 4.8-7 13-7 13S5 13.8 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6.5a2.5 2.5 0 0 0 0 5Z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .4 3 .4.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.5 21.2 2.8 13.5 2.8 4.2 2.8 3.5 3.3 3 4 3h3.5c.7 0 1.2.5 1.2 1.2 0 1 .1 2 .4 3 .1.4 0 .9-.3 1.2l-2.2 2.4Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.2l8 5.3 8-5.3V7H4Zm16 10V9.6l-7.4 4.9a1 1 0 0 1-1.2 0L4 9.6V17h16Z" />
    </svg>
  );
}

export default function BigFooter() {
  return (
    <>
      <style>{FOOTER_STYLES}</style>

      <footer className="big-footer">
        <div className="big-footer__inner">
          <div className="big-footer__grid">
            <div>
              <div className="big-footer__brand-name">Vedantix</div>
              <p className="big-footer__brand-text">
                Websites voor lokale ondernemers, inclusief hosting, onderhoud en
                doorlopende ondersteuning.
              </p>

              <div className="big-footer__socials">
                <a
                  className="big-footer__social"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <IconInstagram />
                </a>
                <a
                  className="big-footer__social"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <IconFacebook />
                </a>
                <a
                  className="big-footer__social"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <IconLinkedIn />
                </a>
              </div>
            </div>

            <div>
              <div className="big-footer__col-title">Snelle links</div>
              <ul className="big-footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/prijzen">Prijzen</Link></li>
                <li><Link to="/proces">Proces</Link></li>
                <li><Link to="/voorwie">Voor wie</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div>
              <div className="big-footer__col-title">Branches</div>
              <ul className="big-footer__links">
                <li><Link to="/website-kapper">Website voor kappers</Link></li>
                <li><Link to="/website-salon">Website voor salons</Link></li>
                <li><Link to="/website-restaurant">Website voor restaurants</Link></li>
                <li><Link to="/website-klusbedrijf">Website voor klusbedrijven</Link></li>
                <li><Link to="/website-fotograaf">Website voor fotografen</Link></li>
              </ul>
            </div>

            <div>
              <div className="big-footer__col-title">Contact & gegevens</div>

              <ul className="big-footer__contact-list">
                <li className="big-footer__contact-item">
                  <span className="big-footer__contact-icon"><IconLocation /></span>
                  <span>Nederland · Lokale ondernemers</span>
                </li>
                <li className="big-footer__contact-item">
                  <span className="big-footer__contact-icon"><IconPhone /></span>
                  <a href="tel:+31626219989">+31 6 26 21 99 89</a>
                </li>
                <li className="big-footer__contact-item">
                  <span className="big-footer__contact-icon"><IconMail /></span>
                  <a href="mailto:info@vedantix.nl">info@vedantix.nl</a>
                </li>
              </ul>

              <div className="big-footer__company-meta">
                <div className="big-footer__company-line">
                  <strong>KvK:</strong> 12345678
                </div>
                <div className="big-footer__company-line">
                  <strong>BTW:</strong> NL123456789B01
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <ul className="big-footer__links">
                  <li><Link to="/privacy">Privacyverklaring</Link></li>
                  <li><Link to="/voorwaarden">Algemene voorwaarden</Link></li>
                </ul>
              </div>
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