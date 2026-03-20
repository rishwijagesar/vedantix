import { useParams, Link, Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { blogPosts } from "../../data/seoData";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>
          Blog
        </Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>{post.title}</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        {post.intro}
      </p>

      {post.sections?.map((section) => (
        <div key={section.title}>
          <h2 style={{ marginTop: 28, marginBottom: 12 }}>{section.title}</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.8 }}>{section.text}</p>
        </div>
      ))}

      <div style={{ marginTop: 34 }}>
        <Link
          to={post.ctaLink || "/Home"}
          style={{
            display: "inline-block",
            background: "#111827",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          {post.ctaLabel || "Ga terug naar home →"}
        </Link>
      </div>

      <section style={{ marginTop: 48 }}>
        <h3 style={{ marginBottom: 16 }}>Gerelateerde blogs</h3>

        <div style={{ display: "grid", gap: 14 }}>
          {relatedPosts.map((item) => (
            <Link
              key={item.slug}
              to={`/blog/${item.slug}`}
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
              <strong style={{ display: "block", marginBottom: 6 }}>{item.title}</strong>
              {item.excerpt && (
                <span style={{ color: "#6b7280", lineHeight: 1.6 }}>{item.excerpt}</span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}