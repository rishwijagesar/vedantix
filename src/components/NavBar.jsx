import { useState, useEffect } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
          padding: 16px 5%;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .navbar.scrolled {
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .navbar-logo {
          font-size: 1.3rem;
          font-weight: 900;
          color: #1a1a2e;
          text-decoration: none;
          letter-spacing: -0.5px;
        }
        .navbar-center {
          display: flex;
          gap: 36px;
          align-items: center;
        }
        .navbar-link {
          color: #374151;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.92rem;
          transition: color 0.2s;
          cursor: pointer;
        }
        .navbar-link:hover {
          color: #1a73e8;
        }
        .navbar-cta {
          background: #1a73e8;
          color: #fff;
          padding: 10px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.88rem;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .navbar-cta:hover {
          background: #00c2ff;
        }
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          font-size: 1.4rem;
        }
        @media (max-width: 768px) {
          .navbar-center {
            display: none;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            flex-direction: column;
            gap: 0;
            background: #fff;
            border-bottom: 1px solid #e5e7eb;
            padding: 12px 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-radius: 0 0 12px 12px;
            z-index: 999;
          }
          .navbar-center.mobile-open {
            display: flex;
          }
          .navbar-link {
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
            width: 100%;
            text-align: left;
          }
          .navbar-link:last-child {
            border-bottom: none;
          }
          .navbar-hamburger {
            display: block;
          }
          .navbar-cta {
            width: 100%;
            text-align: center;
            padding: 12px 16px;
            margin-top: 8px;
          }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#" className="navbar-logo">
            Vedantix
          </a>

          {/* Desktop menu + CTA */}
          <div className={`navbar-center ${mobileMenuOpen ? "mobile-open" : ""}`}>
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

      {/* Add top padding to page to account for fixed navbar */}
      <div style={{ height: 60 }} />
    </>
  );
}