import { jsPDF } from 'jspdf';

function euro(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function addRow(doc, y, label, value, bold = false) {
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.text(label, 20, y);
  doc.text(String(value), 190, y, { align: 'right' });
}

export function generateOfferPdf(customer) {
  const doc = new jsPDF();

  const packagePrices = {
    STARTER: { monthly: 99, setup: 999 },
    GROWTH: { monthly: 149, setup: 1499 },
    PRO: { monthly: 249, setup: 1999 },
  };

  const packageCode = String(customer?.packageCode || 'STARTER').toUpperCase();
  const pricing = packagePrices[packageCode] || packagePrices.STARTER;

  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 30);

  const offerNumber = `OFF-${today.getFullYear()}-${String(Date.now()).slice(-6)}`;

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 20, 'F');

  doc.setTextColor(6, 182, 212);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.text('Offerte', 20, 40);

  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.6);
  doc.line(20, 45, 190, 45);

  // Vedantix info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Vedantix', 20, 58);
  doc.setFont('helvetica', 'normal');
  doc.text('Professionele websites in 48 uur live', 20, 64);
  doc.text('https://vedantix.nl', 20, 70);
  doc.text('info@vedantix.nl', 20, 76);

  // Customer info
  doc.setFont('helvetica', 'bold');
  doc.text('Offerte voor', 20, 92);
  doc.setFont('helvetica', 'normal');
  doc.text(customer?.companyName || '-', 20, 98);
  doc.text(customer?.contactName || customer?.contactPerson || '-', 20, 104);
  doc.text(customer?.email || '-', 20, 110);
  if (customer?.phone) doc.text(customer.phone, 20, 116);

  // Meta box
  doc.setFillColor(248, 250, 252);
  doc.rect(125, 88, 65, 34, 'F');
  doc.setFontSize(10);
  doc.text(`Datum: ${today.toLocaleDateString('nl-NL')}`, 130, 98);
  doc.text(`Offertenr: ${offerNumber}`, 130, 106);
  doc.text(`Geldig t/m: ${validUntil.toLocaleDateString('nl-NL')}`, 130, 114);

  // Description
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Omschrijving', 20, 135);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${packageCode} pakket voor ${customer?.companyName || 'uw bedrijf'} inclusief ontwerp, hosting, onderhoud en support.`, 
    20,
    142,
    { maxWidth: 170 }
  );

  // Pricing table
  let y = 165;
  doc.setDrawColor(220, 226, 232);
  doc.line(20, y, 190, y);
  y += 10;

  addRow(doc, y, `${packageCode} setupkosten`, euro(pricing.setup));
  y += 8;
  addRow(doc, y, `${packageCode} maandabonnement`, `${euro(pricing.monthly)} / maand`);
  y += 12;

  doc.line(110, y, 190, y);
  y += 8;
  addRow(doc, y, 'Eenmalig te betalen', euro(pricing.setup), true);
  y += 8;
  addRow(doc, y, 'Terugkerend per maand', euro(pricing.monthly), true);

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('KvK: 42056482', 20, 280);
  doc.text('BTW: NL005461438B38', 70, 280);
  doc.text('IBAN: NL59 INGB 0000 0000 00', 130, 280);

  const fileName = `Offerte-${(customer?.companyName || 'Vedantix').replace(/[^a-z0-9]/gi, '-')}.pdf`;
  doc.save(fileName);
}

export default generateOfferPdf;
