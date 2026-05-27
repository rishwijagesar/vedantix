import { jsPDF } from "jspdf";

function safeText(value, fallback = "-") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function formatBoolean(value) {
  if (value === true) return "Ja";
  if (value === false) return "Nee";
  return "-";
}

function fileSafe(value) {
  return safeText(value, "analytics")
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function addSectionTitle(doc, title, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(title, 20, y);
  doc.setDrawColor(219, 228, 239);
  doc.line(20, y + 4, 190, y + 4);
  return y + 12;
}

function addRow(doc, y, label, value) {
  const text = safeText(value);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 65, 85);
  doc.text(label, 20, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(doc.splitTextToSize(text, 105), 85, y);
  return y + Math.max(8, doc.splitTextToSize(text, 105).length * 5);
}

function addPageIfNeeded(doc, y) {
  if (y < 270) return y;
  doc.addPage();
  return 24;
}

export function generateAnalyticsReportPdf(customer, analyticsStatus) {
  const doc = new jsPDF();
  const generatedAt = new Date();
  const googleAnalytics = analyticsStatus?.googleAnalytics || {};
  const searchConsole = analyticsStatus?.searchConsole || {};
  const googleAds = analyticsStatus?.googleAds || {};
  const clarity = analyticsStatus?.clarity || {};
  const envVars = analyticsStatus?.trackingEnvironment || {};

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Vedantix Analytics Rapport", 20, 14);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(22);
  doc.text(safeText(customer?.companyName, customer?.domain || "Klant"), 20, 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Gegenereerd op ${generatedAt.toLocaleString("nl-NL")}`, 20, 48);

  let y = 64;

  y = addSectionTitle(doc, "Klant", y);
  y = addRow(doc, y, "Bedrijf", customer?.companyName);
  y = addRow(doc, y, "Domein", analyticsStatus?.domain || customer?.domain);
  y = addRow(doc, y, "Contact", customer?.contactName);
  y = addRow(doc, y, "E-mail", customer?.email);
  y = addRow(doc, y, "Deployment", analyticsStatus?.deploymentId || customer?.deployment?.deploymentId);

  y = addPageIfNeeded(doc, y + 4);
  y = addSectionTitle(doc, "Google Analytics", y);
  y = addRow(doc, y, "Status", googleAnalytics.status);
  y = addRow(doc, y, "Property ID", googleAnalytics.propertyId);
  y = addRow(doc, y, "Data stream ID", googleAnalytics.dataStreamId);
  y = addRow(doc, y, "Measurement ID", googleAnalytics.measurementId);
  y = addRow(doc, y, "Foutmelding", googleAnalytics.errorMessage);

  y = addPageIfNeeded(doc, y + 4);
  y = addSectionTitle(doc, "Google Search Console", y);
  y = addRow(doc, y, "Status", searchConsole.status);
  y = addRow(doc, y, "Property", searchConsole.propertyId);
  y = addRow(doc, y, "Geverifieerd", formatBoolean(searchConsole.verified));
  y = addRow(doc, y, "DNS record", searchConsole.verificationRecordName);
  y = addRow(doc, y, "Foutmelding", searchConsole.errorMessage);

  y = addPageIfNeeded(doc, y + 4);
  y = addSectionTitle(doc, "Google Ads", y);
  y = addRow(doc, y, "Status", googleAds.status);
  y = addRow(doc, y, "Customer ID", googleAds.customerId);
  y = addRow(doc, y, "Conversion ID", googleAds.conversionId);
  y = addRow(
    doc,
    y,
    "Conversies",
    (googleAds.conversions || [])
      .map((item) => `${item.event}: ${item.conversionLabel || item.conversionActionId || item.status}`)
      .join("\n")
  );
  y = addRow(doc, y, "Foutmelding", googleAds.errorMessage);

  y = addPageIfNeeded(doc, y + 4);
  y = addSectionTitle(doc, "Microsoft Clarity", y);
  y = addRow(doc, y, "Status", clarity.status);
  y = addRow(doc, y, "Project ID", clarity.projectId);
  y = addRow(doc, y, "Foutmelding", clarity.errorMessage);

  y = addPageIfNeeded(doc, y + 4);
  y = addSectionTitle(doc, "Tracking environment", y);
  const entries = Object.entries(envVars);
  if (entries.length === 0) {
    y = addRow(doc, y, "Variabelen", "Nog geen tracking environment beschikbaar.");
  } else {
    for (const [key, value] of entries) {
      y = addPageIfNeeded(doc, y);
      y = addRow(doc, y, key, value);
    }
  }

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Vedantix provisioning platform", 20, 286);

  const fileName = `Analytics-${fileSafe(customer?.companyName || customer?.domain)}-${generatedAt
    .toISOString()
    .slice(0, 10)}.pdf`;
  doc.save(fileName);
}

export default generateAnalyticsReportPdf;
