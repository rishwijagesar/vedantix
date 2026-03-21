import fs from "fs";
import path from "path";
import {
  basePages,
  nichePages,
  blogPosts,
  locationPages,
} from "../data/seoData.js";

const DOMAIN = "https://vedantix.nl";
const OUTPUT_FILE = path.resolve("./public/sitemap.xml");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const rawUrls = [
  ...basePages,
  ...nichePages,
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: post.priority ?? "0.7",
    changefreq: "monthly",
  })),
  ...locationPages.map((page) => ({
    path: page.path,
    priority: page.priority ?? "0.8",
    changefreq: "weekly",
  })),
];

const excludedPaths = new Set([
  "/admin",
  "/klantenportaal",
  "/home",
]);

const urls = Array.from(
  new Map(
    rawUrls
      .filter((item) => item?.path && typeof item.path === "string")
      .map((item) => {
        const normalizedPath =
          item.path === "/"
            ? "/"
            : `/${item.path.replace(/^\/+/, "").replace(/\/+$/, "")}`;

        return [
          normalizedPath,
          {
            path: normalizedPath,
            priority: item.priority ?? "0.7",
            changefreq: item.changefreq ?? "monthly",
          },
        ];
      })
      .filter(([normalizedPath]) => !excludedPaths.has(normalizedPath))
  ).values()
);

const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${escapeXml(`${DOMAIN}${path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(OUTPUT_FILE, xml, "utf8");

console.log(`sitemap.xml generated: ${urls.length} URLs written to ${OUTPUT_FILE}`);