import React from "react";

function copyValue(value) {
  if (!value) return;
  navigator.clipboard?.writeText(String(value)).catch(() => {});
}

export default function TrackingEnvironmentPanel({ environment = {} }) {
  const entries = Object.entries(environment).filter(([, value]) => Boolean(value));

  return (
    <div
      style={{
        border: "1px solid #dbe4ef",
        borderRadius: 10,
        padding: 12,
        background: "#f8fafc",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 900, color: "#64748b", marginBottom: 10 }}>
        Tracking environment
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {entries.length ? (
          entries.map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => copyValue(value)}
              title="Klik om waarde te kopiëren"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px, 220px) minmax(0, 1fr)",
                gap: 10,
                alignItems: "center",
                width: "100%",
                border: "1px solid #dbe4ef",
                borderRadius: 8,
                background: "#ffffff",
                padding: "8px 10px",
                textAlign: "left",
                cursor: "copy",
              }}
            >
              <strong style={{ color: "#0f172a", fontSize: 12, minWidth: 0, wordBreak: "break-word" }}>{key}</strong>
              <span style={{ color: "#64748b", fontSize: 12, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                {String(value)}
              </span>
            </button>
          ))
        ) : (
          <span style={{ color: "#64748b", fontSize: 13 }}>Nog geen tracking variabelen.</span>
        )}
      </div>
    </div>
  );
}
