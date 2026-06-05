const SITE_URL = "https://vedantix.nl";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const vedantixEntity = {
  name: "Vedantix",
  url: SITE_URL,
  email: "info@vedantix.nl",
  telephone: "+31626219989",
  description:
    "Vedantix helpt lokale ondernemers groeien met professionele websites, SEO, AI-vriendelijke content, hosting, onderhoud en online zichtbaarheid.",
};

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: vedantixEntity.name,
    url: vedantixEntity.url,
    email: vedantixEntity.email,
    telephone: vedantixEntity.telephone,
    description: vedantixEntity.description,
    sameAs: [
      "https://instagram.com/vedantix.nl",
      "https://www.facebook.com/vedantix",
      "https://www.linkedin.com/company/vedantix-nl",
    ],
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    knowsAbout: [
      "Websites voor lokale ondernemers",
      "SEO",
      "Online zichtbaarheid",
      "AI-vriendelijke contentstructuur",
      "Hosting",
      "Onderhoud",
      "Conversie optimalisatie",
    ],
  };
}

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": LOCAL_BUSINESS_ID,
    name: vedantixEntity.name,
    url: vedantixEntity.url,
    email: vedantixEntity.email,
    telephone: vedantixEntity.telephone,
    description: vedantixEntity.description,
    priceRange: "€€",
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    parentOrganization: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Vedantix",
    url: SITE_URL,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: "nl-NL",
    about: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function createFAQSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createServiceSchema({
  name,
  slug,
  description,
  audienceType,
  serviceType,
  areaServed = "Nederland",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${SITE_URL}/${slug}`,
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType,
    },
    provider: {
      "@id": LOCAL_BUSINESS_ID,
    },
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
      item: item.url,
    })),
  };
}
