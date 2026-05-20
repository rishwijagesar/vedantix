import React from "react";

export default function StatusPill({ children, tone = "#94a3b8" }) {
  return (
    <span
      style={{
        padding: "7px 12px",
        borderRadius: 999,
        background: `${tone}18`,
        color: tone,
        fontWeight: 900,
        fontSize: 12,
        border: `1px solid ${tone}25`,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
