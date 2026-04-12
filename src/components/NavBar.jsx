export default function NavBar() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "14px 5%",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.05rem",
            letterSpacing: "-0.2px",
          }}
        >
          <img
            src="/logo.png"
            alt="Vedantix"
            style={{ height: "34px", width: "34px", objectFit: "contain" }}
          />
          <span>Vedantix</span>
        </a>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <a href="#pricing" style={navLinkStyle}>Prijzen</a>
          <a href="#how" style={navLinkStyle}>Hoe het werkt</a>
          <a href="/contact" style={navLinkStyle}>Contact</a>
          <a href="/blog" style={navLinkStyle}>Blog</a>
          <a href="/faq" style={navLinkStyle}>FAQ</a>

          <a
            href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20meer%20weten%20over%20een%20website."
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "42px",
              padding: "0 18px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: ".88rem",
              whiteSpace: "nowrap",
            }}
          >
            Start je website →
          </a>
        </nav>
      </div>
    </header>
  );
}

const navLinkStyle = {
  color: "rgba(255,255,255,0.82)",
  textDecoration: "none",
  fontSize: ".88rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
};