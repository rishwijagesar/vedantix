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
  
  export const niches = {
    kapper: {
      label: "kappers",
      singular: "kapper",
      businessPlaceholder: (stad) => `Naam kapsalon in ${stad}`,
      heroTitle: (stad) => `Website laten maken voor kappers in ${stad}`,
      intro: (stad) =>
        `Ben jij kapper in ${stad} en wil je meer klanten via Google? Dan is een professionele website essentieel. Steeds meer mensen zoeken naar een kapper in ${stad}, en zonder goede website mis je dagelijks nieuwe klanten.`,
      section1Title: (stad) => `Meer klanten als kapper in ${stad}`,
      section1Text: (stad) =>
        `Wanneer iemand zoekt op “kapper ${stad}”, wil je dat jouw bedrijf zichtbaar is. Een goede website zorgt ervoor dat klanten jou vinden, vertrouwen en direct contact opnemen.`,
      bullets1: (stad) => [
        `Meer afspraken via Google in ${stad}`,
        "Professionele uitstraling",
        "Direct contact via WhatsApp",
        "24/7 zichtbaar voor klanten",
      ],
      section2Title: (stad) => `Wat wij doen voor kappers in ${stad}`,
      section2Text: (stad) =>
        `Wij bouwen websites voor kappers en barbershops in ${stad} die gericht zijn op groei. Geen standaard website, maar een systeem dat klanten oplevert.`,
      bullets2: () => [
        "Mobielvriendelijk design",
        "Online afspraak knop",
        "WhatsApp integratie",
        "Google Maps integratie",
        "Snelle laadtijd",
        "Binnen 48 uur online",
      ],
      section3Title: (stad) => `Waarom een website belangrijk is in ${stad}`,
      section3Text: (stad) =>
        `Zonder website kiezen klanten vaak voor een concurrent in ${stad} die wel online zichtbaar is. Je verliest hierdoor direct omzet en afspraken.`,
      ctaTitle: (stad) => `Meer klanten krijgen in ${stad}?`,
      ctaText: () =>
        `Wil jij weten hoe je meer afspraken krijgt via jouw website? Vraag een gratis analyse aan en ontdek jouw kansen.`,
    },
  
    salon: {
      label: "salons",
      singular: "salon",
      businessPlaceholder: (stad) => `Naam salon in ${stad}`,
      heroTitle: (stad) => `Website laten maken voor salons in ${stad}`,
      intro: (stad) =>
        `Heb jij een schoonheidssalon in ${stad}? Dan wil je online zichtbaar zijn. Steeds meer klanten zoeken naar salons via Google.`,
      section1Title: (stad) => `Meer boekingen in ${stad}`,
      section1Text: () =>
        `Met een professionele website kunnen klanten direct een afspraak maken. Dat zorgt voor meer boekingen en meer vertrouwen.`,
      bullets1: (stad) => [
        `Meer afspraken via Google in ${stad}`,
        "Professionele uitstraling",
        "Meer vertrouwen bij klanten",
        "Direct contact via WhatsApp",
      ],
      section2Title: () => `Wat wij bouwen`,
      section2Text: () =>
        `Wij bouwen websites voor salons die gericht zijn op afspraken, vertrouwen en een luxe uitstraling.`,
      bullets2: () => [
        "Boekingssysteem",
        "Mobielvriendelijk design",
        "WhatsApp integratie",
        "Google Maps integratie",
        "Snelle website",
        "Binnen 48 uur online",
      ],
      section3Title: (stad) => `Waarom dit belangrijk is in ${stad}`,
      section3Text: (stad) =>
        `Potentiële klanten vergelijken meerdere salons in ${stad}. Zonder website verlies je boekingen aan concurrenten.`,
      ctaTitle: (stad) => `Meer salonboekingen in ${stad}?`,
      ctaText: () =>
        `Laat ons gratis kijken naar jouw online zichtbaarheid en ontdek hoe je meer afspraken krijgt.`,
    },
  
    klusbedrijf: {
      label: "klusbedrijven",
      singular: "klusbedrijf",
      businessPlaceholder: (stad) => `Naam klusbedrijf in ${stad}`,
      heroTitle: (stad) => `Website laten maken voor klusbedrijven in ${stad}`,
      intro: (stad) =>
        `Klanten zoeken dagelijks naar vakmannen in ${stad}. Zonder website mis je opdrachten en offerteaanvragen.`,
      section1Title: (stad) => `Meer offertes in ${stad}`,
      section1Text: () =>
        `Een goede website zorgt voor constante aanvragen zonder dat je direct hoeft te adverteren.`,
      bullets1: () => [
        "Meer offerte aanvragen",
        "Professioneel overkomen",
        "Altijd bereikbaar",
        "Meer vertrouwen bij klanten",
      ],
      section2Title: () => `Wat wij bouwen`,
      section2Text: () =>
        `Wij maken websites voor klusbedrijven die gericht zijn op aanvragen, vertrouwen en duidelijke communicatie.`,
      bullets2: () => [
        "SEO website",
        "Offerte formulier",
        "Project showcase",
        "WhatsApp integratie",
        "Google Maps integratie",
        "Binnen 48 uur online",
      ],
      section3Title: (stad) => `Waarom dit werkt in ${stad}`,
      section3Text: (stad) =>
        `Mensen vergelijken meerdere vakmannen in ${stad}. Met een sterke website word jij sneller gekozen.`,
      ctaTitle: (stad) => `Meer klusaanvragen in ${stad}?`,
      ctaText: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website meer werk kan opleveren.`,
    },
  
    restaurant: {
      label: "restaurants",
      singular: "restaurant",
      businessPlaceholder: (stad) => `Naam restaurant in ${stad}`,
      heroTitle: (stad) => `Website laten maken voor restaurants in ${stad}`,
      intro: (stad) =>
        `Meer reserveringen krijgen in ${stad}? Dan heb je een sterke website nodig. Steeds meer gasten zoeken online naar restaurants in de buurt.`,
      section1Title: (stad) => `Meer gasten via Google in ${stad}`,
      section1Text: () =>
        `Een goede website zorgt dat mensen jouw restaurant vinden, vertrouwen en direct reserveren.`,
      bullets1: () => [
        "Online reserveringen",
        "Menu tonen",
        "Locatie zichtbaar",
        "Professionele uitstraling",
      ],
      section2Title: () => `Wat wij bouwen`,
      section2Text: () =>
        `Wij bouwen websites voor restaurants die gericht zijn op reserveringen, zichtbaarheid en een betere gastervaring.`,
      bullets2: () => [
        "Snelle website",
        "Mobielvriendelijk",
        "Reserveringsknop",
        "Google Maps integratie",
        "WhatsApp integratie",
        "Binnen 48 uur online",
      ],
      section3Title: (stad) => `Waarom dit belangrijk is in ${stad}`,
      section3Text: (stad) =>
        `Gasten kiezen vaak het restaurant dat er online het best uitziet. Zonder goede website verlies je reserveringen in ${stad}.`,
      ctaTitle: (stad) => `Meer reserveringen in ${stad}?`,
      ctaText: () =>
        `Vraag een gratis analyse aan en ontdek hoe je meer gasten via jouw website krijgt.`,
    },
  
    fotograaf: {
      label: "fotografen",
      singular: "fotograaf",
      businessPlaceholder: (stad) => `Fotografiebedrijf in ${stad}`,
      heroTitle: (stad) => `Website laten maken voor fotografen in ${stad}`,
      intro: (stad) =>
        `Meer shoots boeken in ${stad}? Dan moet je online zichtbaar zijn. Je portfolio moet niet alleen mooi zijn, maar ook klanten overtuigen.`,
      section1Title: (stad) => `Meer boekingen in ${stad}`,
      section1Text: () =>
        `Een professionele website laat jouw werk zien en maakt het makkelijk voor klanten om contact op te nemen.`,
      bullets1: () => [
        "Portfolio website",
        "Snelle laadtijd",
        "Contactformulier",
        "Professionele uitstraling",
      ],
      section2Title: () => `Wat wij bouwen`,
      section2Text: () =>
        `Wij maken websites voor fotografen die gericht zijn op vertrouwen, zichtbaarheid en meer boekingen.`,
      bullets2: () => [
        "Portfolio pagina",
        "Mobielvriendelijk design",
        "WhatsApp integratie",
        "Lead formulier",
        "SEO basisoptimalisatie",
        "Binnen 48 uur online",
      ],
      section3Title: (stad) => `Waarom dit werkt in ${stad}`,
      section3Text: (stad) =>
        `Mensen vergelijken meerdere fotografen in ${stad}. Met een sterke website vergroot je de kans dat ze voor jou kiezen.`,
      ctaTitle: (stad) => `Meer shoots boeken in ${stad}?`,
      ctaText: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website meer aanvragen kan opleveren.`,
    },
  
    schoonmaakbedrijf: {
      label: "schoonmaakbedrijven",
      singular: "schoonmaakbedrijf",
      businessPlaceholder: (stad) => `Naam schoonmaakbedrijf in ${stad}`,
      heroTitle: (stad) => `Website laten maken voor schoonmaakbedrijven in ${stad}`,
      intro: (stad) =>
        `Meer klanten in ${stad}? Dan moet je online gevonden worden. Bedrijven en particulieren zoeken dagelijks naar schoonmaakdiensten.`,
      section1Title: (stad) => `Meer aanvragen via Google in ${stad}`,
      section1Text: () =>
        `Een professionele website zorgt dat klanten jouw diensten zien, vertrouwen en direct contact opnemen.`,
      bullets1: () => [
        "Meer offerte aanvragen",
        "Betrouwbare uitstraling",
        "Altijd zichtbaar",
        "Direct contact via WhatsApp",
      ],
      section2Title: () => `Wat wij bouwen`,
      section2Text: () =>
        `Wij bouwen websites voor schoonmaakbedrijven die gericht zijn op zichtbaarheid, vertrouwen en aanvragen.`,
      bullets2: () => [
        "SEO geoptimaliseerde website",
        "Contactformulieren",
        "Snelle performance",
        "Google Maps integratie",
        "Mobielvriendelijk design",
        "Binnen 48 uur online",
      ],
      section3Title: (stad) => `Waarom dit belangrijk is in ${stad}`,
      section3Text: (stad) =>
        `Zonder goede website kiezen klanten in ${stad} sneller voor een concurrent die betrouwbaarder oogt.`,
      ctaTitle: (stad) => `Meer klanten krijgen in ${stad}?`,
      ctaText: () =>
        `Vraag een gratis analyse aan en ontdek hoe jouw website meer aanvragen kan opleveren.`,
    },
  };
  
  export const blogPosts = [
    {
      slug: "meer-klanten-kapper",
      title: "Meer klanten krijgen als kapper",
      niche: "kapper",
      intro:
        "Als kapper wil je een volle agenda. De snelste manier om dat te bereiken is door lokaal goed zichtbaar te zijn in Google en bezoekers via je website om te zetten in afspraken.",
      sections: [
        {
          title: "1. Zorg dat je lokaal vindbaar bent",
          text:
            "Pagina’s zoals “kapper amsterdam” of “kapper rotterdam” helpen je om bezoekers aan te trekken die al actief zoeken naar jouw dienst.",
        },
        {
          title: "2. Maak boeken makkelijk",
          text:
            "Voeg een afspraakknop, WhatsApp en contactformulier toe zodat klanten direct actie kunnen nemen.",
        },
        {
          title: "3. Gebruik interne links",
          text:
            "Link blogs en SEO-pagina’s met elkaar. Dit helpt Google én verhoogt je conversie.",
        },
      ],
      ctaLink: "/website-kapper",
      ctaLabel: "Bekijk kapper website →",
    },
  
    {
      slug: "meer-klanten-salon",
      title: "Meer klanten krijgen als salon",
      niche: "salon",
      intro:
        "Als salon wil je een volle agenda en terugkerende klanten. Een goede website helpt je om lokaal gevonden te worden en meer boekingen te krijgen.",
      sections: [
        {
          title: "1. Online afspraken",
          text:
            "Zorg dat klanten direct kunnen boeken via je website. Minder stappen = meer klanten.",
        },
        {
          title: "2. Vertrouwen opbouwen",
          text:
            "Toon reviews, foto’s en behandelingen zodat klanten sneller voor jou kiezen.",
        },
        {
          title: "3. Lokale SEO",
          text:
            "Gebruik pagina’s per stad om beter te ranken in Google.",
        },
      ],
      ctaLink: "/website-salon",
      ctaLabel: "Bekijk salon website →",
    },
  
    {
      slug: "meer-offertes-klusbedrijf",
      title: "Meer offertes krijgen als klusbedrijf",
      niche: "klusbedrijf",
      intro:
        "Als klusbedrijf wil je continu nieuwe aanvragen. Een sterke website zorgt voor vertrouwen en meer offerte-aanvragen.",
      sections: [
        {
          title: "1. Laat je werk zien",
          text:
            "Projectfoto’s en voorbeelden helpen klanten om sneller contact op te nemen.",
        },
        {
          title: "2. Maak contact makkelijk",
          text:
            "Gebruik formulieren, WhatsApp en duidelijke CTA’s.",
        },
        {
          title: "3. Lokale pagina’s",
          text:
            "Pagina’s per stad helpen je om beter gevonden te worden.",
        },
      ],
      ctaLink: "/website-klusbedrijf",
      ctaLabel: "Bekijk klusbedrijf website →",
    },
  
    {
      slug: "meer-reserveringen-restaurant",
      title: "Meer reserveringen krijgen als restaurant",
      niche: "restaurant",
      intro:
        "Een restaurantwebsite moet reserveringen opleveren. Door de juiste informatie direct zichtbaar te maken, krijg je meer gasten.",
      sections: [
        {
          title: "1. Toon je menu en sfeer",
          text:
            "Bezoekers willen direct zien wat je aanbiedt en hoe je restaurant eruitziet.",
        },
        {
          title: "2. Mobiel optimaliseren",
          text:
            "Veel reserveringen komen via mobiel. Zorg dat alles snel werkt.",
        },
        {
          title: "3. Lokale SEO",
          text:
            "Gebruik stadspagina’s om beter zichtbaar te worden.",
        },
      ],
      ctaLink: "/website-restaurant",
      ctaLabel: "Bekijk restaurant website →",
    },
  
    {
      slug: "meer-boekingen-fotograaf",
      title: "Meer boekingen krijgen als fotograaf",
      niche: "fotograaf",
      intro:
        "Als fotograaf verkoop je vertrouwen. Je website moet je portfolio tonen én klanten overtuigen om te boeken.",
      sections: [
        {
          title: "1. Toon je beste werk",
          text:
            "Je portfolio moet direct indruk maken.",
        },
        {
          title: "2. Maak contact eenvoudig",
          text:
            "Gebruik formulieren en WhatsApp voor snelle aanvragen.",
        },
        {
          title: "3. Lokale SEO",
          text:
            "Rank lokaal om meer opdrachten te krijgen.",
        },
      ],
      ctaLink: "/website-fotograaf",
      ctaLabel: "Bekijk fotograaf website →",
    },
  
    {
      slug: "meer-klanten-schoonmaakbedrijf",
      title: "Meer klanten krijgen als schoonmaakbedrijf",
      niche: "schoonmaakbedrijf",
      intro:
        "Voor schoonmaakbedrijven is vertrouwen essentieel. Een website helpt je om meer aanvragen te krijgen.",
      sections: [
        {
          title: "1. Duidelijke diensten",
          text:
            "Laat zien wat je aanbiedt en voor wie.",
        },
        {
          title: "2. Vertrouwen",
          text:
            "Gebruik reviews en duidelijke info.",
        },
        {
          title: "3. Lokale SEO",
          text:
            "Gebruik stadspagina’s om te groeien.",
        },
      ],
      ctaLink: "/website-schoonmaakbedrijf",
      ctaLabel: "Bekijk schoonmaak website →",
    },
  ];