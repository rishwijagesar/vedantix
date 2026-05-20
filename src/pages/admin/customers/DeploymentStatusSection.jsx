import React from "react";

import { Card, SectionTitle, StatCard } from "../components/AdminUI";
import { deploymentTone, formatStageLabel } from "./customerWorkflow";

export default function DeploymentStatusSection({ store }) {
  const customer = store.selectedCustomer;

  return (
    <>
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle
          title="Deployment status"
          subtitle="Actuele provisioningstatus, stage en live domein."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 12,
          }}
        >
          <StatCard
            title="Deployment status"
            value={customer?.deployment?.status || "—"}
            subtitle="Laatste backend status"
            tone={deploymentTone(customer?.deployment?.status)}
          />
          <StatCard
            title="Current stage"
            value={formatStageLabel(customer?.deployment?.currentStage)}
            subtitle="Huidige deployment stage"
            tone="#0ea5e9"
          />
          <StatCard
            title="Deployment ID"
            value={customer?.deployment?.deploymentId || "—"}
            subtitle="Actieve deployment"
            tone="#8b5cf6"
          />
          <StatCard
            title="Live domein"
            value={customer?.deployment?.liveDomain || customer?.domain || "—"}
            subtitle="Doeldomein"
            tone="#10b981"
          />
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle
          title="Deployment recovery"
          subtitle="Huidige stage en herstelcontext."
        />

        <div
          style={{
            border: "1px solid #dbe4ef",
            borderRadius: 10,
            padding: 12,
            background: "#ffffff",
            color: "#334155",
            lineHeight: 1.5,
            fontSize: 13,
          }}
        >
          Huidige stage:{" "}
          <strong>{formatStageLabel(customer?.deployment?.currentStage)}</strong>
        </div>
      </Card>
    </>
  );
}
