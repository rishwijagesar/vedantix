import React from "react";
import { Card, SectionTitle, Field, Input, Select } from "../components/AdminUI";
import { dateLabel, pretty } from "../utils/adminStorage";
import { useOutletContext } from "react-router-dom";

export default function SettingsPage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();

  const store = storeProp || outletContext.store;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <Card>
        <SectionTitle
          title="Backend instellingen"
          subtitle="Koppeling met de provisioning backend."
        />

        <div style={{ display: "grid", gap: 12 }}>
          <Field label="Base URL">
            <Input
              value={store.settings.baseUrl}
              onChange={(e) => store.updateSettings("baseUrl", e.target.value)}
              placeholder="/provisioning-api"
            />
          </Field>

          <Field label="API key">
            <Input
              type="password"
              value={store.settings.apiKey}
              onChange={(e) => store.updateSettings("apiKey", e.target.value)}
              placeholder="PROVISIONING_API_KEY"
            />
          </Field>

          <Field label="Tenant ID">
            <Input
              value={store.settings.tenantId}
              onChange={(e) => store.updateSettings("tenantId", e.target.value)}
              placeholder="default"
            />
          </Field>

          <Field label="Actor ID">
            <Input
              value={store.settings.actorId}
              onChange={(e) => store.updateSettings("actorId", e.target.value)}
              placeholder="admin-dashboard"
            />
          </Field>

          <Field label="Source">
            <Select
              value={store.settings.source}
              onChange={(e) => store.updateSettings("source", e.target.value)}
            >
              <option value="ADMIN_PANEL">ADMIN_PANEL</option>
              <option value="API">API</option>
              <option value="SYSTEM">SYSTEM</option>
              <option value="WORKER">WORKER</option>
            </Select>
          </Field>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#334155",
              fontWeight: 800,
            }}
          >
            <input
              type="checkbox"
              checked={Boolean(store.settings.autoIdempotency)}
              onChange={(e) =>
                store.updateSettings("autoIdempotency", e.target.checked)
              }
            />
            Automatisch idempotency key toevoegen
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#334155",
              fontWeight: 800,
            }}
          >
            <input
              type="checkbox"
              checked={Boolean(store.settings.autoProvisionMail)}
              onChange={(e) =>
                store.updateSettings("autoProvisionMail", e.target.checked)
              }
            />
            Automatisch mail provisioning starten na deploy
          </label>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Laatste backend calls"
          subtitle="Globale log over alle uitgevoerde acties."
        />

        <div style={{ display: "grid", gap: 10, maxHeight: 560, overflow: "auto" }}>
          {store.requestLog.map((entry) => (
            <div
              key={entry.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 14,
                background: "#ffffff",
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
              <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>
                {dateLabel(entry.at)}
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

          {store.requestLog.length === 0 ? (
            <div style={{ color: "#64748b" }}>Nog geen backend calls.</div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}