import { useState } from "react";
import jsPDF from "jspdf";

export function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => {
    const val = row[h];
    if (val === null || val === undefined) return "";
    const str = String(val).replace(/"/g, '""');
    return str.includes(",") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
  }));
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename + ".csv"; a.click();
  URL.revokeObjectURL(url);
}

export function exportToPDF(title, columns, rows, filename) {
  const doc = new jsPDF({ orientation: "landscape" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const colWidth = (pageWidth - margin * 2) / columns.length;

  // Header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(title, margin, 18);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Geëxporteerd op ${new Date().toLocaleDateString("nl-NL")}`, margin, 25);

  // Table header background
  let y = 32;
  doc.setFillColor(30, 58, 95);
  doc.rect(margin, y, pageWidth - margin * 2, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  columns.forEach((col, i) => {
    doc.text(String(col.header), margin + i * colWidth + 2, y + 5.5, { maxWidth: colWidth - 4 });
  });

  // Table rows
  y += 8;
  doc.setFont("helvetica", "normal");
  rows.forEach((row, rowIdx) => {
    if (y > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 20;
    }
    if (rowIdx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, pageWidth - margin * 2, 7, "F");
    }
    doc.setTextColor(55, 65, 81);
    columns.forEach((col, i) => {
      const val = String(col.accessor(row) ?? "");
      doc.text(val, margin + i * colWidth + 2, y + 4.8, { maxWidth: colWidth - 4 });
    });
    y += 7;
  });

  doc.save(filename + ".pdf");
}

export default function ExportButton({ onExportCSV, onExportPDF, label = "Exporteren" }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 9, padding: "9px 16px", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", color: "#374151", display: "flex", alignItems: "center", gap: 6 }}
      >
        ⬇ {label}
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 998 }} />
          <div style={{ position: "absolute", right: 0, top: "110%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 999, minWidth: 160, overflow: "hidden" }}>
            <button onClick={() => { onExportCSV(); setOpen(false); }} style={{ display: "block", width: "100%", padding: "11px 18px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>
              📄 Exporteer CSV
            </button>
            <button onClick={() => { onExportPDF(); setOpen(false); }} style={{ display: "block", width: "100%", padding: "11px 18px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>
              📕 Exporteer PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}