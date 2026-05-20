import React from "react";

import { Card, SectionTitle } from "../components/AdminUI";
import { dateLabel, pretty } from "../utils/adminStorage";
import { formatEventLabel, formatStageLabel, operationTone } from "./customerWorkflow";

function OperationsList({ operations }) {
  return (
    <div
      style={{
        border: "1px solid #dbe4ef",
        borderRadius: 20,
        background: "#ffffff",
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 900,
          color: "#64748b",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Operations
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {operations.length > 0 ? (
          operations.map((operation) => (
            <div
              key={operation.operationId || operation.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 14,
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                <strong>{operation.type || "OPERATION"}</strong>
                <span
                  style={{
                    color: operationTone(operation.status),
                    fontWeight: 900,
                    fontSize: 12,
                  }}
                >
                  {operation.status || "UNKNOWN"}
                </span>
              </div>

              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
                Stage: <strong>{formatStageLabel(operation.requestedStage)}</strong>
              </div>
              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
                Actor: <strong>{operation.actorId || "—"}</strong>
              </div>
              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
                Tijd: <strong>{dateLabel(operation.createdAt || operation.updatedAt)}</strong>
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#64748b" }}>Nog geen operations gevonden.</div>
        )}
      </div>
    </div>
  );
}

function AuditEventsList({ events }) {
  return (
    <div
      style={{
        border: "1px solid #dbe4ef",
        borderRadius: 20,
        background: "#ffffff",
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 900,
          color: "#64748b",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Audit events
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={event.id || `${event.eventType}-${index}`}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 14,
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                {formatEventLabel(event.eventType)}
              </div>

              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
                Tijd: <strong>{dateLabel(event.createdAt || event.at || event.timestamp)}</strong>
              </div>

              <pre
                style={{
                  margin: "10px 0 0",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: "#334155",
                  fontSize: 12,
                }}
              >
                {pretty(event.metadata || event.details || {})}
              </pre>
            </div>
          ))
        ) : (
          <div style={{ color: "#64748b" }}>Nog geen audit-events gevonden.</div>
        )}
      </div>
    </div>
  );
}

export default function DeploymentHistorySection({ store }) {
  return (
    <Card style={{ marginBottom: 18 }}>
      <SectionTitle
        title="Deployment historie"
        subtitle="Operations en audit-events voor deze deployment."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
        }}
      >
        <OperationsList operations={store.deploymentOperations} />
        <AuditEventsList events={store.deploymentAuditEvents} />
      </div>
    </Card>
  );
}
