import React, { useEffect, useMemo, useState } from "react";
import "../styles/home-pricing.css";

const PRICING_STORAGE_KEYS = {
  packageOptions: "vedantix_package_options_v2",
  extraOptions: "vedantix_extra_options_v2",
};

const DEFAULT_PACKAGE_OPTIONS = [
  {
    code: "STARTER",
    label: "Starter",
    monthlyPrice: 99,
    setupPrice: 500,
    monthlyInfraCost: 8,
    isActive: true,
    sortOrder: 1,
  },
  {
    code: "GROWTH",
    label: "Growth",
    monthlyPrice: 149,
    setupPrice: 850,
    monthlyInfraCost: 12,
    isActive: true,
    sortOrder: 2,
  },
  {
    code: "PRO",
    label: "Pro",
    monthlyPrice: 249,
    setupPrice: 1250,
    monthlyInfraCost: 18,
    isActive: true,
    sortOrder: 3,
  },
  {
    code: "CUSTOM",
    label: "Custom",
    monthlyPrice: 399,
    setupPrice: 2000,
    monthlyInfraCost: 25,
    isActive: true,
    sortOrder: 4,
  },
];

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function currency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function activePackageOptions(options) {
  return [...options]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
}

const PACKAGE_COPY = {
  STARTER: {
    tier: "Starter",
    name: "Voor een sterke eerste indruk",
    fit: "Voor starters, zzp’ers en kleine lokale bedrijven",
    featured: false,
    cancelNote: "Betaling pas na oplevering · opzegbaar vanaf 6 maanden",
    bullets: [
      "Professionele website tot 5 pagina’s",
      "Mobielvriendelijk ontwerp",
      "WhatsApp, bellen en contactformulier",
      "Onderhoud en kleine updates inbegrepen",
    ],
    cta: "Bespreek Starter →",
  },
  GROWTH: {
    tier: "Growth",
    name: "Voor meer aanvragen en groeiruimte",
    fit: "Meest gekozen door kappers, salons, fotografen en klusbedrijven",
    featured: true,
    cancelNote: "Betaling pas na oplevering · opzegbaar vanaf 6 maanden",
    bullets: [
      "Alles uit Starter",
      "Meer pagina’s en sterkere SEO-structuur",
      "Blog, FAQ of extra landingspagina’s mogelijk",
      "Meer ruimte om diensten duidelijker te verkopen",
    ],
    cta: "Bespreek Growth →",
  },
  PRO: {
    tier: "Pro",
    name: "Voor websites die meer werk uit handen nemen",
    fit: "Voor reserveringen, intake, dashboards en workflows",
    featured: false,
    cancelNote: "Betaling pas na oplevering · opzegbaar vanaf maand 3",
    bullets: [
      "Alles uit Growth",
      "Dashboard of klantomgeving mogelijk",
      "Reserveringen, intake of formulieren met logica",
      "Meer maatwerk en doorontwikkeling",
    ],
    cta: "Bespreek Pro →",
  },
  CUSTOM: {
    tier: "Custom",
    name: "Voor bedrijven met een specifieke maatwerkvraag",
    fit: "Voor bedrijven die buiten standaard pakketten vallen",
    featured: false,
    cancelNote: "Prijs en scope op maat · alleen op offertebasis uitgewerkt",
    bullets: [
      "Maatwerk traject op basis van jouw wensen",
      "Complexere logica, flows of koppelingen mogelijk",
      "Geschikt voor afwijkende processen",
      "Ideaal als standaard pakketten net niet passen",
    ],
    cta: "Bespreek Custom →",
  },
};

export default function HomePricing() {
  const [packageOptions, setPackageOptions] = useState(() =>
    loadJson(PRICING_STORAGE_KEYS.packageOptions, DEFAULT_PACKAGE_OPTIONS)
  );

  useEffect(() => {
    const syncPricing = () => {
      setPackageOptions(loadJson(PRICING_STORAGE_KEYS.packageOptions, DEFAULT_PACKAGE_OPTIONS));
    };

    window.addEventListener("storage", syncPricing);
    window.addEventListener("focus", syncPricing);

    return () => {
      window.removeEventListener("storage", syncPricing);
      window.removeEventListener("focus", syncPricing);
    };
  }, []);

  const packages = useMemo(() => {
    return activePackageOptions(packageOptions).map((pkg) => {
      const copy = PACKAGE_COPY[pkg.code] || {
        tier: pkg.label,
        name: pkg.label,
        fit: "Pakketinformatie",
        featured: false,
        cancelNote: "Neem contact op voor details",
        bullets: [],
        cta: `Bespreek ${pkg.label} →`,
      };

      return {
        ...copy,
        code: pkg.code,
        tier: pkg.label,
        price: pkg.monthlyPrice,
        setup: `${currency(pkg.setupPrice)} setup`,
      };
    });
  }, [packageOptions]);

  return (
    <section id="pricing" className="pricing-section anchor-section">
      <div className="section-wrap">
        <div className="pricing-intro">
          <div className="pricing-kicker">
            Kies niet alleen een website — kies hoeveel hij voor je moet doen
          </div>
        </div>

        <div className="section-header center">
          <div className="section-label">Pakketten</div>
          <h2 className="section-h2">
            Van professioneel zichtbaar naar een website die actief meewerkt
          </h2>
          <p className="section-p">
            Starter is voor een sterke basis. Growth is voor ondernemers die meer aanvragen willen
            halen uit hun website. Pro is voor bedrijven die ook processen willen ondersteunen of
            automatiseren. Custom is voor afwijkende of meer specifieke maatwerkvragen.
          </p>
        </div>

        <div className="pricing-grid">
          {packages.map((pkg) => (
            <div key={pkg.code} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
              {pkg.featured && <div className="pricing-badge">Meest gekozen</div>}

              <div className="p-tier">{pkg.tier}</div>
              <div className="p-name">{pkg.name}</div>
              <div className="p-fit">{pkg.fit}</div>

              <div className="p-price-row">
                <div className="p-price">
                  <sup>€</sup>
                  {pkg.price}
                  <span>/m</span>
                </div>
              </div>

              <div className="p-setup">+ {pkg.setup}</div>
              <div className="p-terms">{pkg.cancelNote}</div>
              <div className="p-divider" />

              <ul className="p-features">
                {pkg.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a
                href={`https://wa.me/310626219989?text=${encodeURIComponent(
                  `Hallo Vedantix, ik wil graag meer weten over het ${pkg.tier} pakket en of dit bij mijn bedrijf past.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className={`p-cta ${pkg.featured ? "featured" : "default"}`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="pricing-decision">
          <h3>Twijfel je tussen de pakketten?</h3>
          <p>
            In de meeste gevallen is <strong>Growth</strong> de beste keuze. Dat pakket geeft
            meestal de beste balans tussen professionele uitstraling, groeiruimte en meer
            aanvragen.
          </p>
        </div>

        <div className="pricing-help">
          <a href="/pakketvergelijking">Bekijk de uitgebreide pakketvergelijking →</a>
        </div>
      </div>
    </section>
  );
}