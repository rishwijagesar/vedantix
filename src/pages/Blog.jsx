import { blogPosts } from "../data/seoData";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Blog() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <NavBar />

      <h1>Blog</h1>

      {blogPosts.map((post) => (
        <div key={post.slug} style={{ marginBottom: 20 }}>
          <h2>{post.title}</h2>

          <Link to={`/blog/${post.slug}`}>
            Lees artikel →
          </Link>
        </div>
      ))}
    </div>
  );
}