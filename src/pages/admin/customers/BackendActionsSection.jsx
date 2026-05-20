import React from "react";

import { Card, SectionTitle } from "../components/AdminUI";
import { pretty } from "../utils/adminStorage";
import { getCustomerRequestEntries } from "./customerWorkflow";

export default function BackendActionsSection({ store }) {
  const entries = getCustomerRequestEntries(store.requestLog, store.selectedCustomer);

  return (
    <Card
      style={{
        background: "#ffffff",
      }}
    >
      <SectionTitle title="Backend acties" subtitle="Laatste calls voor deze klant." />
      <div style={{ display: "grid", gap: 10 }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <strong>{entry.type}</strong>
              <span
                style={{
                  color: entry.result && entry.result.ok ? "#10b981" : "#ef4444",
                  fontWeight: 900,
                }}
              >
                {(entry.result && entry.result.status) || "ERR"}
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#334155",
                fontSize: 12,
              }}
            >
              {pretty(entry.result && entry.result.data)}
            </pre>
          </div>
        ))}

        {entries.length === 0 ? (
          <div style={{ color: "#64748b" }}>Nog geen backend acties.</div>
        ) : null}
      </div>
    </Card>
  );
}
