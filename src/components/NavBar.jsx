import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import VedantixLogo from "./VedantixLogo";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const primaryLinks = [
    {
      label: "Prijzen",
      href: isHomePage ? "#pricing" : "/#pricing",
      type: "anchor",
    },
    {
      label: "Hoe het werkt",
      href: isHomePage ? "#how" : "/#how",
      type: "anchor",
    },
    {
      label: "Contact",
      href: isHomePage ? "#cta" : "/#cta",
      type: "anchor",
    },
    {
      label: "Blog",
      href: "/blog",
      type: "route",
    },
    {
      label: "FAQ",
      href: "/faq",
      type: "route",
    },
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
          transition: all 0.25s ease;
          background: transparent;
        }

        .navbar.scrolled,
        .navbar.solid {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-center {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .navbar-links,
        .navbar-seo-links {
          display: flex;
          gap: 18px;
        }

        .navbar-link,
        .navbar-seo-link {
          text-decoration: none;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
        }

        .navbar.scrolled .navbar-link,
        .navbar.solid .navbar-link,
        .navbar.scrolled .navbar-seo-link,
        .navbar.solid .navbar-seo-link {
          color: #374151;
        }

        .navbar-link:hover,
        .navbar-seo-link:hover {
          color: #111827;
        }

        .navbar-cta {
          background: rgba(255,255,255,0.15);
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          color: white;
        }

        .navbar.scrolled .navbar-cta,
        .navbar.solid .navbar-cta {
          background: #111827;
          color: white;
        }

        .navbar-hamburger {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar-center {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
          }

          .navbar-center.mobile-open {
            display: flex;
          }

          .navbar-link,
          .navbar-seo-link {
            padding: 12px;
            width: 100%;
            color: #374151 !important;
          }

          .navbar-hamburger {
            display: block;
            font-size: 1.4rem;
            background: none;
            border: none;
          }
        }
      `}</style>

      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${!isHomePage ? "solid" : ""
          }`}
      >
        <div className="navbar-container">
          {/* LOGO */}
          <Link to="/" aria-label="Home">
            <VedantixLogo
              variant="full"
              size="md"
              theme={scrolled || !isHomePage ? "dark" : "light"}
            />
          </Link>

          <div className={`navbar-center ${mobileMenuOpen ? "mobile-open" : ""}`}>
            {/* Primary links */}
            <div className="navbar-links">
              {primaryLinks.map((link) =>
                link.type === "anchor" ? (
                  <a key={link.label} href={link.href} className="navbar-link">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href} className="navbar-link">
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* SEO links */}
            <a
              href={isHomePage ? "#pricing" : "/#pricing"}
              className="navbar-cta"
            >
              Start je website →
            </a>

            {/* CTA (BELANGRIJK: anchor voor homepage scroll) */}
            <a
              href={isHomePage ? "#pricing" : "/#pricing"}
              className="navbar-cta"
            >
              Start je website →
            </a>
          </div>

          <button
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* spacing */}
      <div style={{ height: 0 }} />
    </>
  );
}