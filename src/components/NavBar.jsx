import { Link, useLocation } from "react-router-dom";
import VedantixLogo from "../components/VedantixLogo";

const NAVBAR_STYLES = `
  .site-header{
    position:absolute;
    top:0;
    left:0;
    right:0;
    z-index:60;
    padding:14px 5%;
  }

  .site-header-inner{
    width:100%;
    max-width:1240px;
    margin:0 auto;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:24px;
  }

  .site-brand{
    display:inline-flex;
    align-items:center;
    text-decoration:none;
    flex-shrink:0;
  }

  .site-nav{
    display:flex;
    align-items:center;
    gap:18px;
    margin-left:auto;
    flex-wrap:nowrap;
  }

  .site-nav-links{
    display:flex;
    align-items:center;
    gap:18px;
  }

  .site-nav-link{
    color:rgba(255,255,255,.82);
    text-decoration:none;
    font-size:.88rem;
    font-weight:600;
    white-space:nowrap;
    transition:color .2s ease;
  }

  .site-nav-link:hover{
    color:#fff;
  }

  .site-nav-cta{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:42px;
    padding:0 18px;
    border-radius:10px;
    background:rgba(255,255,255,.14);
    border:1px solid rgba(255,255,255,.12);
    color:#fff;
    text-decoration:none;
    font-weight:800;
    font-size:.88rem;
    white-space:nowrap;
    transition:all .2s ease;
  }

  .site-nav-cta:hover{
    background:rgba(255,255,255,.18);
    transform:translateY(-1px);
  }

  @media (max-width: 980px){
    .site-header{
      padding:12px 5%;
    }

    .site-header-inner{
      gap:16px;
    }

    .site-nav{
      gap:12px;
    }

    .site-nav-links{
      gap:14px;
    }

    .site-nav-link{
      font-size:.84rem;
    }

    .site-nav-cta{
      min-height:40px;
      padding:0 14px;
      font-size:.84rem;
    }
  }

  @media (max-width: 820px){
    .site-nav-links{
      display:none;
    }
  }
`;

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <style>{NAVBAR_STYLES}</style>

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
              <a href={isHomePage ? "#pricing" : "/#pricing"} className="site-nav-link">Prijzen</a>
              <a href={isHomePage ? "#how" : "/#how"} className="site-nav-link">Hoe het werkt</a>
              <Link to="/contact" className="site-nav-link">Contact</Link>
              <Link to="/blog" className="site-nav-link">Blog</Link>
              <Link to="/faq" className="site-nav-link">FAQ</Link>
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
    </>
  );
}