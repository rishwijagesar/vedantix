import React from "react";

import { Card, SectionTitle } from "../components/AdminUI";

export default function WorkflowChecklist({ checklist }) {
  return (
    <Card style={{ marginBottom: 18 }}>
      <SectionTitle
        title="Workflow checklist"
        subtitle="Dit laat direct zien waar de klant zich in het proces bevindt."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {checklist.map((item) => (
          <div
            key={item.key}
            style={{
              border: `1px solid ${item.done ? "#10b98125" : "#cbd5e1"}`,
              borderRadius: 18,
              padding: 14,
              background: item.done ? "#10b98110" : "#f8fafc",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: item.done ? "#10b981" : "#64748b",
                marginBottom: 6,
              }}
            >
              {item.done ? "DONE" : "OPEN"}
            </div>
            <div style={{ fontWeight: 800 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
