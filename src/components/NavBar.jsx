import { Link, useLocation } from "react-router-dom";
import VedantixLogo from "../components/VedantixLogo";
import "../styles/navbar.css";

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label="Home">
          <VedantixLogo
            variant="full"
            size="md"
            theme="light"
          />
        </Link>

        <nav className="site-nav" aria-label="Hoofdmenu">
          <div className="site-nav-links">
            <a href={isHomePage ? "#pricing" : "/#pricing"} className="site-nav-link">
              Prijzen
            </a>
            <a href={isHomePage ? "#how" : "/#how"} className="site-nav-link">
              Hoe het werkt
            </a>
            <Link to="/contact" className="site-nav-link">
              Contact
            </Link>
            <Link to="/blog" className="site-nav-link">
              Blog
            </Link>
            <Link to="/faq" className="site-nav-link">
              FAQ
            </Link>
          </div>

          <a
            href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20meer%20weten%20over%20een%20website."
            target="_blank"
            rel="noreferrer"
            className="site-nav-cta"
          >
            Start je website →
          </a>
        </nav>
      </div>
    </header>
  );
}