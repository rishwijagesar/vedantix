import { useState, useEffect } from "react";
import VedantixLogo from "./VedantixLogo";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Prijzen", href: "#pricing" },
    { label: "Hoe het werkt", href: "#how" },
    { label: "Contact", href: "#cta" },
  ];

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 14px 5%;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          padding: 12px 5%;
        }
        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }
        .navbar-logo {
          font-size: 1.25rem;
          font-weight: 900;
          color: #1a1a2e;
          text-decoration: none;
          letter-spacing: -0.6px;
          flex-shrink: 0;
        }
        .navbar-center {
          display: flex;
          gap: 40px;
          align-items: center;
          flex: 1;
          justify-content: flex-end;
        }
        .navbar-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .navbar-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.2s ease;
          cursor: pointer;
        }
        .navbar-link:hover {
          color: #fff;
        }
        .navbar-cta {
          background: rgba(255,255,255,0.12);
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .navbar-cta:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          font-size: 1.4rem;
          color: rgba(255,255,255,0.8);
          transition: color 0.2s ease;
        }
        /* Scrolled overrides */
        .navbar.scrolled .navbar-link {
          color: #4b5563;
        }
        .navbar.scrolled .navbar-link:hover {
          color: #1a73e8;
        }
        .navbar.scrolled .navbar-cta {
          background: #1a1a2e;
          color: #fff;
          border-color: #1a1a2e;
        }
        .navbar.scrolled .navbar-cta:hover {
          background: #2d2d4e;
        }
        .navbar.scrolled .navbar-hamburger {
          color: #1a1a2e;
        }
        @media (max-width: 768px) {
          .navbar-center {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            gap: 0;
            background: #fff;
            border-bottom: 1px solid #e5e7eb;
            padding: 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-radius: 0;
            z-index: 999;
            margin-top: 8px;
            flex: none;
            justify-content: flex-start;
          }
          .navbar-center.mobile-open {
            display: flex;
          }
          .navbar-links {
            flex-direction: column;
            gap: 0;
            width: 100%;
          }
          .navbar-link {
            padding: 14px 20px;
            border-bottom: 1px solid #f1f5f9;
            width: 100%;
            text-align: left;
          }
          .navbar-link:last-of-type {
            border-bottom: none;
          }
          .navbar-hamburger {
            display: block;
          }
          .navbar-cta {
            width: calc(100% - 40px);
            text-align: center;
            padding: 11px 20px;
            margin: 12px 20px 12px 20px;
            border-radius: 8px;
          }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <VedantixLogo variant="full" size="md" theme={scrolled ? "dark" : "light"} />
          </a>

          {/* Desktop menu + CTA */}
          <div className={`navbar-center ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <div className="navbar-links">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="navbar-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a href="#pricing" className="navbar-cta" onClick={() => setMobileMenuOpen(false)}>
              Start je website →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Top spacing */}
      <div style={{ height: 0 }} />
    </>
  );
}