export async function fetchPricing(baseUrl = "/provisioning-api") {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/pricing`);
    if (!response.ok) {
      throw new Error("Failed to load pricing");
    }
  
    const json = await response.json();
    return json?.data || { packages: [], addons: [] };
  }
  
  export async function fetchVatSummary({
    period = "month",
    revenueInclVat = 0,
    deductibleCostsInclVat = 0,
    vatRate = 0.21,
    baseUrl = "/provisioning-api",
  }) {
    const qs = new URLSearchParams({
      period,
      revenueInclVat: String(revenueInclVat),
      deductibleCostsInclVat: String(deductibleCostsInclVat),
      vatRate: String(vatRate),
    });
  
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/pricing/vat-summary?${qs.toString()}`
    );
  
    if (!response.ok) {
      throw new Error("Failed to load vat summary");
    }
  
    const json = await response.json();
    return json?.data;
  }