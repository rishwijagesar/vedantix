import React, { useEffect, useMemo, useState } from "react";
import "../styles/home-pricing.css";

const DEFAULT_PRICING = {
  packages: [],
  addons: [],
};

function currency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

async function fetchPricing() {
  const response = await fetch("/provisioning-api/api/pricing");

  if (!response.ok) {
    throw new Error("Failed to load pricing");
  }

  const json = await response.json();
  return json?.data || DEFAULT_PRICING;
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
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await fetchPricing();
        if (active) {
          setPricing(data);
        }
      } catch {
        if (active) {
          setPricing(DEFAULT_PRICING);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const packages = useMemo(() => {
    return activePackageOptions(pricing.packages || []).map((pkg) => {
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
        code: pkg.code,
        tier: pkg.label || copy.tier,
        name: pkg.description || copy.name,
        fit: pkg.fit || copy.fit,
        featured: Boolean(pkg.featured ?? copy.featured),
        cancelNote: pkg.cancelNote || copy.cancelNote,
        bullets:
          Array.isArray(pkg.bullets) && pkg.bullets.length > 0
            ? pkg.bullets
            : copy.bullets,
        cta: pkg.cta || copy.cta,
        priceInclVat: Number(pkg.monthlyPriceInclVat || 0),
        priceExclVat: Number(pkg.monthlyPriceExclVat || 0),
        priceVat: Number(pkg.monthlyVatAmount || 0),
        setupInclVat: Number(pkg.setupPriceInclVat || 0),
        setupExclVat: Number(pkg.setupPriceExclVat || 0),
        setupVat: Number(pkg.setupVatAmount || 0),
      };
    });
  }, [pricing]);

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
                  {Math.round(pkg.priceInclVat)}
                  <span>/m incl. btw</span>
                </div>
              </div>

              <div className="p-setup">+ {currency(pkg.setupInclVat)} setup incl. btw</div>

              <div className="p-tax-meta">
                <div>Excl. btw: {currency(pkg.priceExclVat)}/m</div>
                <div>Btw: {currency(pkg.priceVat)}/m</div>
              </div>

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

          {!loading && packages.length === 0 && (
            <div className="pricing-empty">
              Momenteel zijn er geen actieve pakketten zichtbaar.
            </div>
          )}
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