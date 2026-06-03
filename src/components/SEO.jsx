import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonical,
  schemas = []
}) {
  useEffect(() => {
    const fallbackSelectors = [
      'meta[name="description"]:not([data-rh])',
      'meta[name="robots"]:not([data-rh])',
      'link[rel="canonical"]:not([data-rh])',
      'meta[property="og:title"]:not([data-rh])',
      'meta[property="og:description"]:not([data-rh])',
      'meta[property="og:type"]:not([data-rh])',
      'meta[property="og:url"]:not([data-rh])',
      'meta[property="og:image"]:not([data-rh])',
      'meta[name="twitter:card"]:not([data-rh])',
      'meta[name="twitter:title"]:not([data-rh])',
      'meta[name="twitter:description"]:not([data-rh])',
      'meta[name="twitter:image"]:not([data-rh])',
    ];

    document.querySelectorAll(fallbackSelectors.join(",")).forEach((element) => {
      element.remove();
    });
  }, [title, description, canonical]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content="https://vedantix.nl/preview.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://vedantix.nl/preview.png" />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
