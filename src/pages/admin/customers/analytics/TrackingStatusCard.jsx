import React from "react";

const TONES = {
  SUCCEEDED: ["#ecfdf5", "#86efac", "#047857"],
  VERIFIED: ["#ecfdf5", "#86efac", "#047857"],
  RUNNING: ["#eff6ff", "#bfdbfe", "#1d4ed8"],
  RETRYING: ["#fff7ed", "#fed7aa", "#c2410c"],
  PENDING: ["#f8fafc", "#cbd5e1", "#475569"],
  NOT_STARTED: ["#f8fafc", "#cbd5e1", "#475569"],
  FAILED: ["#fff1f2", "#fecaca", "#b91c1c"],
  SKIPPED: ["#f8fafc", "#cbd5e1", "#64748b"],
  DISCONNECTED: ["#f8fafc", "#cbd5e1", "#64748b"],
};

export default function TrackingStatusCard({ title, status, children }) {
  const [background, border, color] = TONES[String(status || "NOT_STARTED").toUpperCase()] || TONES.NOT_STARTED;

  return (
    <div
      style={{
        border: `1px solid ${border}`,
        background,
        borderRadius: 10,
        padding: 12,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
        <strong style={{ color: "#0f172a" }}>{title}</strong>
        <span style={{ color, fontSize: 12, fontWeight: 900 }}>
          {status || "NOT_STARTED"}
        </span>
      </div>
      <div style={{ color: "#475569", fontSize: 13, lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}
