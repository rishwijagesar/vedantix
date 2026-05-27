import React from "react";

export default function ProvisioningErrorCard({ errors = [] }) {
  if (!errors.length) return null;

  return (
    <div
      style={{
        border: "1px solid #fecaca",
        background: "#fff1f2",
        borderRadius: 10,
        padding: 12,
        color: "#991b1b",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 8 }}>Provisioning fouten</div>
      <div style={{ display: "grid", gap: 8 }}>
        {errors.slice(-4).map((error, index) => (
          <div key={`${error.provider}-${error.occurredAt || index}`} style={{ fontSize: 13, lineHeight: 1.5 }}>
            <strong>{error.provider || "MARKETING"}</strong>: {error.message || "Onbekende fout"}
          </div>
        ))}
      </div>
    </div>
  );
}
