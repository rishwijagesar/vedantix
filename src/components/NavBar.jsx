import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import VedantixLogo from "../components/VedantixLogo";
import "../styles/navbar.css";

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    document.body.setAttribute("data-has-fixed-navbar", "true");

    return () => {
      document.body.removeAttribute("data-has-fixed-navbar");
    };
  }, []);

  return (
    <header className="site-header">
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
          </div>

          <a
            href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20heb%20een%20vraag."
            target="_blank"
            rel="noreferrer"
            className="site-nav-cta"
          >
            Stel je vraag
          </a>
        </nav>
      </div>
    </header>
  );
}