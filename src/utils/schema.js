export function createServiceSchema({
    name,
    slug,
    description,
    audienceType,
    serviceType,
    areaServed = "Nederland"
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      serviceType,
      description,
      url: `https://vedantix.nl/${slug}`,
      areaServed: {
        "@type": "Country",
        name: areaServed
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType
      },
      provider: {
        "@id": "https://vedantix.nl/#professionalservice"
      }
    };
  }
  
  export function createBreadcrumbSchema(items = []) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }