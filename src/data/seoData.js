export const cities = [
  { slug: "amsterdam", name: "Amsterdam" },
  { slug: "rotterdam", name: "Rotterdam" },
  { slug: "utrecht", name: "Utrecht" },
  { slug: "den-haag", name: "Den Haag" },
  { slug: "eindhoven", name: "Eindhoven" },
  { slug: "tilburg", name: "Tilburg" },
  { slug: "breda", name: "Breda" },
  { slug: "groningen", name: "Groningen" },
  { slug: "arnhem", name: "Arnhem" },
  { slug: "haarlem", name: "Haarlem" },
  { slug: "leiden", name: "Leiden" },
  { slug: "delft", name: "Delft" },
  { slug: "dordrecht", name: "Dordrecht" },
  { slug: "amersfoort", name: "Amersfoort" },
  { slug: "apeldoorn", name: "Apeldoorn" },
  { slug: "enschede", name: "Enschede" },
  { slug: "zwolle", name: "Zwolle" },
  { slug: "maastricht", name: "Maastricht" },
  { slug: "leeuwarden", name: "Leeuwarden" },
  { slug: "nijmegen", name: "Nijmegen" },
];

const createNichePage = ({
  key,
  singular,
  plural,
  businessType,
  heroKeyword,
  intro,
  section1,
  section2,
  section3,
  bullets1,
  bullets2,
  cta,
}) => ({
  key,
  singular,
  plural,
  label: plural,

  businessPlaceholder: (city) => `${businessType} in ${city}`,

  heroTitle: (city) => `Website laten maken voor ${plural} in ${city}`,

  intro: (city) => intro(city),

  section1Title: (city) => section1.title(city),
  section1Text: (city) => section1.text(city),
  bullets1: (city) => bullets1(city),

  section2Title: (city) => section2.title(city),
  section2Text: (city) => section2.text(city),
  bullets2: () => bullets2(),

  section3Title: (city) => section3.title(city),
  section3Text: (city) => section3.text(city),

  ctaTitle: (city) => cta.title(city),
  ctaText: (city) => cta.text(city),

  seo: {
    title: (city) => `${heroKeyword} in ${city} | Vedantix`,
    description: (city) =>
      `Professionele website laten maken voor ${plural} in ${city}. Meer aanvragen, betere zichtbaarheid in Google en sneller online met Vedantix.`,
  },
});

export const niches = {
  kapper: createNichePage({
    key: "kapper",
    singular: "kapper",
    plural: "kappers",
    businessType: "Kapsalon",
    heroKeyword: "Website voor kappers",
    intro: (city) =>
      `Ben jij kapper in ${city} en wil je meer afspraken via Google binnenhalen? Dan is een professionele website geen luxe, maar een basisvoorwaarde. Potentiële klanten zoeken dagelijks naar een kapper in ${city}. Zonder sterke online aanwezigheid laat je kansen liggen.`,
    section1: {
      title: (city) => `Meer klanten als kapper in ${city}`,
      text: (city) =>
        `Wanneer iemand zoekt op “kapper ${city}”, wil je dat jouw salon direct zichtbaar is. Een goede website zorgt voor vertrouwen, laat jouw stijl zien en maakt het eenvoudig om direct contact op te nemen of een afspraak te maken.`,
    },
    bullets1: (city) => [
      `Meer afspraken via Google in ${city}`,
      "Professionele en verzorgde uitstraling",
      "Direct contact via WhatsApp",
      "Altijd online zichtbaar voor nieuwe klanten",
    ],
    section2: {
      title: (city) => `Wat wij bouwen voor kappers in ${city}`,
      text: (city) =>
        `Wij maken websites voor kappers en barbershops in ${city} die niet alleen mooi ogen, maar ook gericht zijn op groei. Het doel is simpel: meer zichtbaarheid, meer vertrouwen en meer afspraken.`,
    },
    bullets2: () => [
      "Mobielvriendelijk design",
      "Online afspraakknop",
      "WhatsApp integratie",
      "Google Maps integratie",
      "Snelle laadtijd",
      "Snel live",
    ],
    section3: {
      title: (city) => `Waarom een goede website belangrijk is in ${city}`,
      text: (city) =>
        `Veel klanten vergelijken meerdere salons voordat ze kiezen. Zonder professionele website kiezen zij sneller voor een concurrent in ${city} die online sterker overkomt.`,
    },
    cta: {
      title: (city) => `Meer klanten krijgen als kapper in ${city}?`,
      text: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website meer afspraken en nieuwe klanten kan opleveren.`,
    },
  }),

  salon: createNichePage({
    key: "salon",
    singular: "salon",
    plural: "salons",
    businessType: "Schoonheidssalon",
    heroKeyword: "Website voor salons",
    intro: (city) =>
      `Heb jij een salon in ${city}? Dan wil je online direct goed overkomen. Klanten zoeken via Google naar behandelingen, reviews en een plek waar ze eenvoudig kunnen boeken. Een sterke website helpt je om meer vertrouwen en meer boekingen te krijgen.`,
    section1: {
      title: (city) => `Meer boekingen voor je salon in ${city}`,
      text: (city) =>
        `Een professionele website verlaagt de drempel om contact op te nemen of direct te boeken. Zeker in een concurrerende stad als ${city} is online uitstraling vaak doorslaggevend.`,
    },
    bullets1: (city) => [
      `Meer afspraken via Google in ${city}`,
      "Luxe en professionele uitstraling",
      "Meer vertrouwen bij nieuwe klanten",
      "Snelle contactmogelijkheid via WhatsApp",
    ],
    section2: {
      title: () => "Wat wij bouwen voor salons",
      text: () =>
        "Wij bouwen websites voor salons die gericht zijn op uitstraling, vertrouwen en boekingen. Je website moet niet alleen mooi zijn, maar ook klanten overtuigen.",
    },
    bullets2: () => [
      "Boekingssysteem of afspraakknop",
      "Mobielvriendelijk design",
      "WhatsApp integratie",
      "Google Maps integratie",
      "Snelle website",
      "Snel live",
    ],
    section3: {
      title: (city) => `Waarom dit belangrijk is in ${city}`,
      text: (city) =>
        `Klanten vergelijken vaak meerdere salons in ${city}. Zonder sterke website mis je boekingen aan salons die online overtuigender overkomen.`,
    },
    cta: {
      title: (city) => `Meer salonboekingen in ${city}?`,
      text: () =>
        `Laat gratis analyseren hoe jouw salon online presteert en ontdek hoe je meer afspraken kunt krijgen.`,
    },
  }),

  klusbedrijf: createNichePage({
    key: "klusbedrijf",
    singular: "klusbedrijf",
    plural: "klusbedrijven",
    businessType: "Klusbedrijf",
    heroKeyword: "Website voor klusbedrijven",
    intro: (city) =>
      `Klanten zoeken dagelijks naar betrouwbare vakmannen in ${city}. Zonder duidelijke en professionele website loop je offerteaanvragen mis. Een sterke website helpt je om vertrouwen op te bouwen en meer aanvragen binnen te halen.`,
    section1: {
      title: (city) => `Meer offerteaanvragen in ${city}`,
      text: (city) =>
        `Wanneer mensen in ${city} een klusbedrijf zoeken, willen ze snel zien wat je doet, hoe ze contact opnemen en waarom ze jou moeten kiezen. Een goede website maakt dat direct duidelijk.`,
    },
    bullets1: () => [
      "Meer offerteaanvragen",
      "Professionele uitstraling",
      "Altijd bereikbaar voor nieuwe klanten",
      "Meer vertrouwen door duidelijke presentatie",
    ],
    section2: {
      title: () => "Wat wij bouwen voor klusbedrijven",
      text: () =>
        "Wij maken websites voor klusbedrijven die gericht zijn op aanvragen, vertrouwen en overzicht. Geen overbodige ruis, maar een duidelijke site die werk oplevert.",
    },
    bullets2: () => [
      "SEO-vriendelijke website",
      "Offerteformulier",
      "Project showcase",
      "WhatsApp integratie",
      "Google Maps integratie",
      "Snel live",
    ],
    section3: {
      title: (city) => `Waarom dit werkt in ${city}`,
      text: (city) =>
        `Mensen vergelijken meerdere aanbieders voordat ze iemand benaderen. Met een professionele website vergroot je in ${city} de kans dat ze juist voor jouw klusbedrijf kiezen.`,
    },
    cta: {
      title: (city) => `Meer klusaanvragen in ${city}?`,
      text: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website structureel meer werk kan opleveren.`,
    },
  }),

  restaurant: createNichePage({
    key: "restaurant",
    singular: "restaurant",
    plural: "restaurants",
    businessType: "Restaurant",
    heroKeyword: "Website voor restaurants",
    intro: (city) =>
      `Meer reserveringen krijgen in ${city}? Dan heb je een restaurantwebsite nodig die sfeer uitstraalt en direct vertrouwen wekt. Gasten zoeken online naar menu’s, openingstijden, reviews en een snelle manier om te reserveren.`,
    section1: {
      title: (city) => `Meer gasten via Google in ${city}`,
      text: (city) =>
        `Wanneer iemand zoekt naar een restaurant in ${city}, wil je direct een goede eerste indruk maken. Een sterke website helpt bezoekers om snel te reserveren en jouw restaurant beter te leren kennen.`,
    },
    bullets1: () => [
      "Meer online reserveringen",
      "Menu en sfeer direct zichtbaar",
      "Locatie eenvoudig vindbaar",
      "Professionele uitstraling",
    ],
    section2: {
      title: () => "Wat wij bouwen voor restaurants",
      text: () =>
        "Wij bouwen restaurantwebsites die gericht zijn op zichtbaarheid, reserveringen en gebruiksgemak. Alles draait om snelheid, vertrouwen en een goede eerste indruk.",
    },
    bullets2: () => [
      "Mobielvriendelijk design",
      "Reserveringsknop",
      "Menu of kaart integratie",
      "Google Maps integratie",
      "WhatsApp integratie",
      "Snelle website",
    ],
    section3: {
      title: (city) => `Waarom dit belangrijk is in ${city}`,
      text: (city) =>
        `Gasten kiezen vaak het restaurant dat online het meest aantrekkelijk en betrouwbaar overkomt. Zonder sterke website loop je in ${city} reserveringen mis.`,
    },
    cta: {
      title: (city) => `Meer reserveringen in ${city}?`,
      text: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw restaurantwebsite meer gasten kan opleveren.`,
    },
  }),

  fotograaf: createNichePage({
    key: "fotograaf",
    singular: "fotograaf",
    plural: "fotografen",
    businessType: "Fotografiebedrijf",
    heroKeyword: "Website voor fotografen",
    intro: (city) =>
      `Als fotograaf verkoop je niet alleen foto's, maar vooral vertrouwen en stijl. In ${city} wil je online opvallen met een website die jouw portfolio sterk presenteert en bezoekers omzet in boekingen.`,
    section1: {
      title: (city) => `Meer boekingen als fotograaf in ${city}`,
      text: (city) =>
        `Een professionele fotografie-website laat direct zien wat je kunt. Bezoekers willen voorbeelden bekijken, jouw stijl voelen en snel contact kunnen opnemen.`,
    },
    bullets1: () => [
      "Sterke portfolio-presentatie",
      "Snelle laadtijd",
      "Duidelijk contactformulier",
      "Professionele uitstraling",
    ],
    section2: {
      title: () => "Wat wij bouwen voor fotografen",
      text: () =>
        "Wij maken websites voor fotografen die gericht zijn op zichtbaarheid, vertrouwen en meer aanvragen. Je werk moet centraal staan en direct overtuigen.",
    },
    bullets2: () => [
      "Portfolio pagina",
      "Mobielvriendelijk design",
      "WhatsApp integratie",
      "Leadformulier",
      "SEO basisoptimalisatie",
      "Snel live",
    ],
    section3: {
      title: (city) => `Waarom dit werkt in ${city}`,
      text: (city) =>
        `Mensen vergelijken meerdere fotografen voordat ze boeken. Met een overtuigende website maak je in ${city} sneller het verschil en vergroot je je kans op nieuwe opdrachten.`,
    },
    cta: {
      title: (city) => `Meer shoots boeken in ${city}?`,
      text: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website meer aanvragen kan opleveren.`,
    },
  }),

  schoonmaakbedrijf: createNichePage({
    key: "schoonmaakbedrijf",
    singular: "schoonmaakbedrijf",
    plural: "schoonmaakbedrijven",
    businessType: "Schoonmaakbedrijf",
    heroKeyword: "Website voor schoonmaakbedrijven",
    intro: (city) =>
      `Wil je meer aanvragen voor je schoonmaakbedrijf in ${city}? Dan moet je online professioneel en betrouwbaar overkomen. Bedrijven en particulieren zoeken dagelijks naar schoonmaakdiensten en vergelijken meerdere aanbieders.`,
    section1: {
      title: (city) => `Meer aanvragen via Google in ${city}`,
      text: (city) =>
        `Een professionele website helpt je om jouw diensten helder te presenteren en direct vertrouwen op te bouwen. Zo vergroot je de kans dat bezoekers contact opnemen of een offerte aanvragen.`,
    },
    bullets1: () => [
      "Meer offerteaanvragen",
      "Betrouwbare uitstraling",
      "Altijd online zichtbaar",
      "Direct contact via WhatsApp",
    ],
    section2: {
      title: () => "Wat wij bouwen voor schoonmaakbedrijven",
      text: () =>
        "Wij bouwen websites voor schoonmaakbedrijven die gericht zijn op zichtbaarheid, betrouwbaarheid en conversie. De site moet helder zijn, snel laden en direct aanzetten tot contact.",
    },
    bullets2: () => [
      "SEO-vriendelijke website",
      "Contactformulieren",
      "Snelle performance",
      "Google Maps integratie",
      "Mobielvriendelijk design",
      "Snel live",
    ],
    section3: {
      title: (city) => `Waarom dit belangrijk is in ${city}`,
      text: (city) =>
        `Zonder sterke website kiezen potentiële klanten in ${city} sneller voor een concurrent die professioneler en betrouwbaarder overkomt.`,
    },
    cta: {
      title: (city) => `Meer klanten krijgen in ${city}?`,
      text: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website meer aanvragen en nieuwe klanten kan opleveren.`,
    },
  }),
};

const createBlogPost = ({
  slug,
  title,
  niche,
  intro,
  sections,
  ctaLink,
  ctaLabel,
  priority = "0.7",
}) => ({
  slug,
  title,
  niche,
  intro,
  sections,
  ctaLink,
  ctaLabel,
  priority,
  seo: {
    title: `${title} | Vedantix`,
    description: intro,
  },
});

export const blogPosts = [
  createBlogPost({
    slug: "meer-klanten-kapper",
    title: "Meer klanten krijgen als kapper",
    niche: "kapper",
    intro:
      "Als kapper wil je een volle agenda. De snelste manier om dat te bereiken is door lokaal goed zichtbaar te zijn in Google en bezoekers via je website om te zetten in afspraken.",
    sections: [
      {
        title: "1. Zorg dat je lokaal vindbaar bent",
        text:
          "Maak landingspagina’s en content rondom zoekopdrachten zoals “kapper amsterdam” of “kapper rotterdam”. Daarmee trek je bezoekers aan die al actief op zoek zijn naar jouw dienst.",
      },
      {
        title: "2. Maak een afspraak boeken zo makkelijk mogelijk",
        text:
          "Voeg een duidelijke afspraakknop, WhatsApp-link en contactformulier toe. Hoe minder drempels, hoe groter de kans dat een bezoeker klant wordt.",
      },
      {
        title: "3. Gebruik interne links slim",
        text:
          "Verbind je blogartikelen met je SEO-pagina’s en dienstenpagina’s. Dat helpt Google om je website beter te begrijpen en verhoogt tegelijk de kans op conversie.",
      },
    ],
    ctaLink: "/website-kapper",
    ctaLabel: "Bekijk onze kapper website-oplossing →",
  }),

  createBlogPost({
    slug: "meer-klanten-salon",
    title: "Meer klanten krijgen als salon",
    niche: "salon",
    intro:
      "Als salon wil je meer boekingen en een volle agenda. Een goede website helpt je om lokaal beter gevonden te worden en bezoekers sneller om te zetten in klanten.",
    sections: [
      {
        title: "1. Laat klanten direct online boeken",
        text:
          "Hoe sneller iemand een afspraak kan inplannen, hoe groter de kans op conversie. Zorg dus voor een duidelijke boekingsknop op je website.",
      },
      {
        title: "2. Bouw vertrouwen op met sfeer en duidelijkheid",
        text:
          "Toon reviews, behandelingen, foto's en een nette uitstraling. Bezoekers beslissen vaak binnen enkele seconden of jouw salon professioneel aanvoelt.",
      },
      {
        title: "3. Werk aan lokale SEO",
        text:
          "Gebruik pagina’s per stad of regio om beter te ranken in Google en meer bezoekers uit jouw omgeving aan te trekken.",
      },
    ],
    ctaLink: "/website-salon",
    ctaLabel: "Bekijk onze salon website-oplossing →",
  }),

  createBlogPost({
    slug: "meer-offertes-klusbedrijf",
    title: "Meer offertes krijgen als klusbedrijf",
    niche: "klusbedrijf",
    intro:
      "Als klusbedrijf wil je continu nieuwe aanvragen ontvangen. Een sterke website helpt je om vertrouwen op te bouwen en meer offerteaanvragen binnen te halen.",
    sections: [
      {
        title: "1. Laat eerder werk zien",
        text:
          "Projectfoto’s, voorbeelden en korte cases laten direct zien wat je kunt. Dat vergroot de kans dat bezoekers contact opnemen.",
      },
      {
        title: "2. Maak contact laagdrempelig",
        text:
          "Gebruik formulieren, telefoonlinks en WhatsApp zodat potentiële klanten snel en eenvoudig een aanvraag kunnen doen.",
      },
      {
        title: "3. Gebruik lokale pagina’s",
        text:
          "Door per stad of regio pagina’s te maken, vergroot je jouw vindbaarheid in Google en trek je gerichter klanten aan.",
      },
    ],
    ctaLink: "/website-klusbedrijf",
    ctaLabel: "Bekijk onze klusbedrijf website-oplossing →",
  }),

  createBlogPost({
    slug: "meer-reserveringen-restaurant",
    title: "Meer reserveringen krijgen als restaurant",
    niche: "restaurant",
    intro:
      "Een restaurantwebsite moet vooral reserveringen opleveren. Door de juiste informatie direct zichtbaar te maken, vergroot je de kans dat bezoekers ook echt gasten worden.",
    sections: [
      {
        title: "1. Toon direct je menu en sfeer",
        text:
          "Bezoekers willen meteen zien wat je aanbiedt, hoe je zaak eruitziet en of jouw restaurant bij hen past.",
      },
      {
        title: "2. Optimaliseer voor mobiel",
        text:
          "Veel reserveringen gebeuren via mobiel. Zorg dus dat je website snel laadt en eenvoudig werkt op kleine schermen.",
      },
      {
        title: "3. Versterk je lokale vindbaarheid",
        text:
          "Gebruik stadspagina’s, lokale zoekwoorden en goede metadata om beter zichtbaar te zijn wanneer mensen restaurants in de buurt zoeken.",
      },
    ],
    ctaLink: "/website-restaurant",
    ctaLabel: "Bekijk onze restaurant website-oplossing →",
  }),

  createBlogPost({
    slug: "meer-boekingen-fotograaf",
    title: "Meer boekingen krijgen als fotograaf",
    niche: "fotograaf",
    intro:
      "Als fotograaf moet je website jouw stijl en kwaliteit uitstralen. Een sterke portfolio-site helpt je om vertrouwen op te bouwen en meer shoots te boeken.",
    sections: [
      {
        title: "1. Toon je beste werk direct",
        text:
          "Je portfolio is je sterkste verkoopmiddel. Zorg dat bezoekers meteen jouw beste beelden zien en begrijpen welk type fotografie je aanbiedt.",
      },
      {
        title: "2. Maak aanvragen eenvoudig",
        text:
          "Gebruik duidelijke call-to-actions, formulieren en WhatsApp-links zodat geïnteresseerden direct contact kunnen opnemen.",
      },
      {
        title: "3. Werk aan lokale SEO",
        text:
          "Door lokaal beter vindbaar te zijn, vergroot je de kans op nieuwe opdrachten in jouw regio.",
      },
    ],
    ctaLink: "/website-fotograaf",
    ctaLabel: "Bekijk onze fotograaf website-oplossing →",
  }),

  createBlogPost({
    slug: "meer-klanten-schoonmaakbedrijf",
    title: "Meer klanten krijgen als schoonmaakbedrijf",
    niche: "schoonmaakbedrijf",
    intro:
      "Voor schoonmaakbedrijven is vertrouwen een doorslaggevende factor. Een professionele website helpt je om betrouwbaarder over te komen en meer aanvragen te krijgen.",
    sections: [
      {
        title: "1. Laat duidelijk zien welke diensten je aanbiedt",
        text:
          "Bezoekers moeten direct begrijpen wat je doet, voor wie je werkt en in welke regio je actief bent.",
      },
      {
        title: "2. Bouw vertrouwen op",
        text:
          "Gebruik reviews, heldere informatie en een professionele presentatie om twijfel weg te nemen.",
      },
      {
        title: "3. Groei via lokale SEO",
        text:
          "Met pagina’s per stad of regio vergroot je jouw zichtbaarheid in Google en trek je meer relevante bezoekers aan.",
      },
    ],
    ctaLink: "/website-schoonmaakbedrijf",
    ctaLabel: "Bekijk onze schoonmaak website-oplossing →",
  }),
];

export const basePages = [
  { path: "/", priority: "1.0" },
  { path: "/prijzen", priority: "0.8" },
  { path: "/proces", priority: "0.8" },
  { path: "/faq", priority: "0.7" },
  { path: "/privacy", priority: "0.4" },
  { path: "/voorwaarden", priority: "0.4" },
  { path: "/planning", priority: "0.6" },
  { path: "/starters", priority: "0.6" },
  { path: "/templates", priority: "0.6" },
  { path: "/voorwie", priority: "0.6" },
];

export const nichePages = [
  { path: "/website-kapper", priority: "0.9", niche: "kapper" },
  { path: "/website-salon", priority: "0.9", niche: "salon" },
  { path: "/website-klusbedrijf", priority: "0.9", niche: "klusbedrijf" },
  { path: "/website-restaurant", priority: "0.9", niche: "restaurant" },
  { path: "/website-fotograaf", priority: "0.9", niche: "fotograaf" },
  { path: "/website-schoonmaakbedrijf", priority: "0.9", niche: "schoonmaakbedrijf" },
];

export const locationPages = Object.keys(niches).flatMap((nicheKey) =>
  cities.map((city) => ({
    path: `/website/${nicheKey}/${city.slug}`,
    priority: "0.8",
    niche: nicheKey,
    city: city.slug,
  }))
);