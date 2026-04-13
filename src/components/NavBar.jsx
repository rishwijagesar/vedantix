import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import VedantixLogo from "./VedantixLogo";
import "../styles/navbar.css";

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-has-fixed-navbar", "true");

    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.body.removeAttribute("data-has-fixed-navbar");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label="Home">
          <VedantixLogo variant="full" size="md" theme="light" />
        </Link>

        <nav className="site-nav" aria-label="Hoofdmenu">
          <div className="site-nav-links">
            <a href={isHomePage ? "#pricing" : "/#pricing"} className="site-nav-link">
              Prijzen
            </a>
            <a href={isHomePage ? "#how" : "/#how"} className="site-nav-link">
              Hoe het werkt
            </a>
            <a href={isHomePage ? "#contact" : "/#contact"} className="site-nav-link">
              Contact
            </a>
            <Link to="/blog" className="site-nav-link">
              Blog
            </Link>
            <Link to="/faq" className="site-nav-link">
              FAQ
            </Link>
          </div>

          <a href={isHomePage ? "#cta" : "/#cta"} className="site-nav-cta">
            Start je website <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}