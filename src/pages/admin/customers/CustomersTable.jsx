import React from "react";

import { Button, Card, Input, SectionTitle } from "../components/AdminUI";
import { STATUS_COLORS, STATUS_LABELS, currency } from "../utils/adminStorage";
import {
  canManageDeployment,
  deploymentTone,
  formatStageLabel,
  getWorkflowState,
  workflowTone,
} from "./customerWorkflow";
import StatusPill from "./StatusPill";

const TABLE_HEADERS = [
  "Bedrijf",
  "Contact",
  "Domeinnaam",
  "Pakket",
  "Bouwfase",
  "Workflow",
  "Deployment stage",
  "Preview",
  "Omzet p/m",
  "Acties",
];

function CustomersTableToolbar({ store }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ minWidth: 360, position: "relative" }}>
        <Input
          value={store.customerSearch}
          onChange={(e) => store.setCustomerSearch(e.target.value)}
          placeholder="Zoek op bedrijf, contact, domein..."
          style={{
            paddingLeft: 44,
            borderRadius: 18,
            minHeight: 54,
            boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
            fontSize: 16,
          }}
        >
          ⌕
        </span>
      </div>

      <Button
        tone="primary"
        onClick={() => store.setIsCreateCustomerOpen(true)}
        style={{
          minHeight: 54,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 18,
        }}
      >
        + Klant aanmaken
      </Button>

      <Button
        tone="soft"
        onClick={() => store.runAutoRefreshCycle()}
        disabled={store.isAutoRefreshing}
        style={{
          minHeight: 54,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 18,
        }}
      >
        {store.isAutoRefreshing ? "Verversen..." : "Nu verversen"}
      </Button>
    </div>
  );
}

function CustomerRow({ customer, store }) {
  const workflowState = getWorkflowState(customer);
  const statusTone = STATUS_COLORS[customer.status] || "#94a3b8";

  return (
    <tr
      style={{
        borderBottom: "1px solid #edf2f7",
        cursor: "pointer",
      }}
      onClick={() => store.setSelectedCustomerId(customer.id)}
    >
      <td style={{ padding: "18px" }}>
        <div style={{ fontWeight: 900 }}>{customer.companyName}</div>
        <div style={{ color: "#64748b", fontSize: 13 }}>{customer.id}</div>
      </td>
      <td style={{ padding: "18px" }}>
        <div>{customer.contactName}</div>
        <div style={{ color: "#64748b", fontSize: 13 }}>{customer.email}</div>
      </td>
      <td style={{ padding: "18px", fontWeight: 700 }}>{customer.domain}</td>
      <td style={{ padding: "18px" }}>
        {store.packageOptions.find((item) => item.code === customer.packageCode)?.label ||
          customer.packageCode}
      </td>
      <td style={{ padding: "18px" }}>
        <StatusPill tone={statusTone}>
          {STATUS_LABELS[customer.status] || customer.status}
        </StatusPill>
      </td>
      <td style={{ padding: "18px" }}>
        <StatusPill tone={workflowTone(workflowState)}>{workflowState}</StatusPill>
      </td>
      <td style={{ padding: "18px" }}>
        <StatusPill tone={deploymentTone(customer?.deployment?.status)}>
          {formatStageLabel(customer?.deployment?.currentStage)}
        </StatusPill>
      </td>
      <td style={{ padding: "18px" }}>
        {customer.preview?.fullUrl ? (
          <a
            href={customer.preview.fullUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              color: "#1d4ed8",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            {customer.preview.path || "Open preview"}
          </a>
        ) : (
          <span style={{ color: "#94a3b8" }}>Nog niet klaar</span>
        )}
      </td>
      <td style={{ padding: "18px", fontWeight: 900 }}>
        {currency(store.calcMonthlyRevenue(customer))}
      </td>
      <td style={{ padding: "18px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button tone="soft" onClick={() => store.setSelectedCustomerId(customer.id)}>
            Beheren
          </Button>
          {customer.base44?.editorUrl ? (
            <Button onClick={() => store.openBase44Editor(customer)}>Open Base44</Button>
          ) : null}
          {canManageDeployment(customer) ? (
            <Button
              tone="soft"
              onClick={() => store.redeployCustomer(customer)}
              disabled={store.isUpdatingWorkflow}
            >
              Redeploy
            </Button>
          ) : null}
          <Button tone="danger" onClick={() => store.requestDeleteCustomer(customer)}>
            Verwijderen
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function CustomersTable({ store }) {
  return (
    <Card>
      <SectionTitle
        title="Klanten"
        subtitle="Overzicht van alle klanten met snelle acties."
        action={<CustomersTableToolbar store={store} />}
      />

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #dbe4ef",
          borderRadius: 22,
          background: "#ffffff",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 1440,
            background: "#ffffff",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "linear-gradient(180deg, #f8fbff 0%, #f1f5f9 100%)",
              }}
            >
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "16px 18px",
                    color: "#475569",
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    borderBottom: "1px solid #dbe4ef",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {store.filteredCustomers.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} store={store} />
            ))}

            {store.filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    padding: "34px 16px",
                    color: "#64748b",
                    textAlign: "center",
                    fontSize: 15,
                  }}
                >
                  Geen klanten gevonden.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
