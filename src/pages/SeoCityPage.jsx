import { Link, useParams, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { niches, cities, blogPosts } from "../data/seoData";

function prettyNicheLabel(key) {
  return niches[key]?.label ?? key;
}

export default function SeoCityPage() {
  const { niche, stad } = useParams();

  const nicheData = niches[niche];
  const cityData = cities.find((city) => city.slug === stad);

  if (!nicheData || !cityData) {
    return <Navigate to="/" replace />;
  }

  const stadNaam = cityData.name;
  const relatedCities = cities.filter((city) => city.slug !== stad).slice(0, 6);
  const relatedBlogs = blogPosts.filter((post) => post.niche === niche).slice(0, 3);

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/" style={{ color: "#6b7280", textDecoration: "none" }}>
          Home
        </Link>
        {" / "}
        <span>{prettyNicheLabel(niche)}</span>
        {" / "}
        <span>{stadNaam}</span>
      </div>

      <h1 style={{ fontSize: 42, lineHeight: 1.1, marginBottom: 18 }}>
        {nicheData.heroTitle(stadNaam)}
      </h1>

      <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.8, marginBottom: 28 }}>
        {nicheData.intro(stadNaam)}
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>
        {nicheData.section1Title(stadNaam)}
      </h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 16 }}>
        {nicheData.section1Text(stadNaam)}
      </p>

      <ul style={{ paddingLeft: 22, marginBottom: 28, lineHeight: 1.9 }}>
        {nicheData.bullets1(stadNaam).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>
        {nicheData.section2Title(stadNaam)}
      </h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 16 }}>
        {nicheData.section2Text(stadNaam)}
      </p>

      <ul style={{ paddingLeft: 22, marginBottom: 28, lineHeight: 1.9 }}>
        {nicheData.bullets2(stadNaam).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>
        {nicheData.section3Title(stadNaam)}
      </h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 28 }}>
        {nicheData.section3Text(stadNaam)}
      </p>

      <div
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 24,
          marginTop: 30,
          marginBottom: 34,
        }}
      >
        <h2 style={{ marginBottom: 12 }}>{nicheData.ctaTitle(stadNaam)}</h2>
        <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
          {nicheData.ctaText(stadNaam)}
        </p>

        <form
          action="https://formspree.io/f/mqeyjgna"
          method="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxWidth: 420,
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Naam"
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #d1d5db" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{ padding: 12, borderRadius: 8, border: "1px solid #d1d5db" }}
          />
          <input
            type="text"
            name="business"
            placeholder={nicheData.businessPlaceholder(stadNaam)}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #d1d5db" }}
          />
          <button
            type="submit"
            style={{
              background: "#111827",
              color: "#fff",
              padding: 14,
              borderRadius: 8,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            Gratis analyse aanvragen →
          </button>
        </form>

        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 10 }}>
          Reactie binnen 24 uur • 100% gratis
        </p>

        <div style={{ marginTop: 18 }}>
          <a
            href="https://wa.me/310626219989"
            style={{
              display: "inline-block",
              background: "#25d366",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Of stuur direct een WhatsApp →
          </a>
        </div>
      </div>

      <section style={{ marginTop: 38 }}>
        <h3 style={{ marginBottom: 16 }}>Gerelateerde steden</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {relatedCities.map((city) => (
            <Link
              key={city.slug}
              to={`/website/${niche}/${city.slug}`}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: "#f3f4f6",
                color: "#111827",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {prettyNicheLabel(niche)} in {city.name}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 42 }}>
        <h3 style={{ marginBottom: 16 }}>Gerelateerde blogs</h3>
        <div style={{ display: "grid", gap: 14 }}>
          {relatedBlogs.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{
                display: "block",
                padding: 18,
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                textDecoration: "none",
                color: "#111827",
                background: "#fff",
              }}
            >
              <strong style={{ display: "block", marginBottom: 6 }}>{post.title}</strong>
              <span style={{ color: "#6b7280", lineHeight: 1.6 }}>{post.intro}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}