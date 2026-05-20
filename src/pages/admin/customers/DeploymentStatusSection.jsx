import React from "react";

import { Button, Card, SectionTitle, StatCard } from "../components/AdminUI";
import {
  canManageDeployment,
  deploymentTone,
  formatStageLabel,
} from "./customerWorkflow";

export default function DeploymentStatusSection({ store }) {
  const customer = store.selectedCustomer;

  return (
    <>
      <Card style={{ marginBottom: 18 }}>
        <SectionTitle
          title="Deployment status"
          subtitle="Actuele status van provisioning, stage en recovery-acties."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button
                tone="soft"
                onClick={() => store.runAutoRefreshCycle()}
                disabled={store.isAutoRefreshing}
              >
                {store.isAutoRefreshing ? "Verversen..." : "Status verversen"}
              </Button>

              {canManageDeployment(customer) ? (
                <Button
                  tone="soft"
                  onClick={() => store.redeployCustomer(customer)}
                  disabled={store.isUpdatingWorkflow}
                >
                  {store.isUpdatingWorkflow ? "Bezig..." : "Redeploy"}
                </Button>
              ) : null}

              {canManageDeployment(customer) ? (
                <Button
                  tone="danger"
                  onClick={() => store.rollbackCustomer(customer)}
                  disabled={store.isUpdatingWorkflow}
                >
                  {store.isUpdatingWorkflow ? "Bezig..." : "Rollback"}
                </Button>
              ) : null}
            </div>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
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

      <Card style={{ marginBottom: 18 }}>
        <SectionTitle
          title="Deployment recovery"
          subtitle="Voer herstelacties uit op deploymentniveau."
          action={
            canManageDeployment(customer) ? (
              <Button
                tone="soft"
                onClick={() => store.loadDeploymentHistory(customer)}
                disabled={store.isUpdatingWorkflow}
              >
                Vernieuw historie
              </Button>
            ) : null
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 16,
            alignItems: "end",
          }}
        >
          <div
            style={{
              border: "1px solid #dbe4ef",
              borderRadius: 18,
              padding: 16,
              background: "#ffffff",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#64748b",
                marginBottom: 8,
              }}
            >
              Retry huidige stage
            </div>
            <div style={{ color: "#334155", lineHeight: 1.6 }}>
              Gebruik dit alleen als de deployment op een specifieke stage is vastgelopen.
              Huidige stage:{" "}
              <strong>{formatStageLabel(customer?.deployment?.currentStage)}</strong>
            </div>
          </div>

          <Button
            tone="soft"
            disabled={store.isUpdatingWorkflow || !customer?.deployment?.currentStage}
            onClick={() =>
              store.retryDeploymentStage(customer, customer?.deployment?.currentStage)
            }
            style={{ minHeight: 54 }}
          >
            {store.isUpdatingWorkflow ? "Bezig..." : "Retry stage"}
          </Button>
        </div>
      </Card>
    </>
  );
}
