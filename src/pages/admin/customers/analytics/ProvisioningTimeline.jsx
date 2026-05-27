import React from "react";

import { dateLabel } from "../../utils/adminStorage";

export default function ProvisioningTimeline({ events = [] }) {
  const visibleEvents = events.slice(-6).reverse();

  return (
    <div
      style={{
        border: "1px solid #dbe4ef",
        borderRadius: 10,
        padding: 12,
        background: "#ffffff",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 900, color: "#64748b", marginBottom: 10 }}>
        Provisioning timeline
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {visibleEvents.length ? (
          visibleEvents.map((event, index) => (
            <div
              key={`${event.provider}-${event.at || index}`}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(90px, 130px) minmax(0, 1fr) auto",
                gap: 8,
                alignItems: "center",
                fontSize: 12,
                color: "#475569",
              }}
            >
              <strong style={{ color: "#0f172a", minWidth: 0, wordBreak: "break-word" }}>{event.provider}</strong>
              <span style={{ minWidth: 0, wordBreak: "break-word" }}>{event.message || event.status}</span>
              <span>{dateLabel(event.at)}</span>
            </div>
          ))
        ) : (
          <span style={{ color: "#64748b", fontSize: 13 }}>Nog geen tracking events.</span>
        )}
      </div>
    </div>
  );
}
