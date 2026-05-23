import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCw, Search, UserPlus } from "lucide-react";

import { Button, Card, Input, SectionTitle } from "../components/AdminUI";
import { STATUS_COLORS, STATUS_LABELS, currency } from "../utils/adminStorage";
import {
  deploymentTone,
  formatStageLabel,
  getWorkflowState,
  isCustomerLive,
  workflowTone,
} from "./customerWorkflow";
import StatusPill from "./StatusPill";

const TABLE_HEADERS = [
  "Klant",
  "Flow",
  "Base44/export",
  "AWS",
  "Billing",
  "Omzet",
  "",
];

function CustomersTableToolbar({ store }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ minWidth: 300, position: "relative" }}>
        <Input
          value={store.customerSearch}
          onChange={(e) => store.setCustomerSearch(e.target.value)}
          placeholder="Zoek op bedrijf, contact, domein..."
          style={{ paddingLeft: 34, minHeight: 36 }}
        />
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
          }}
        />
      </div>

      <Button
        tone="primary"
        onClick={() => store.setIsCreateCustomerOpen(true)}
        style={{ display: "inline-flex", gap: 7, alignItems: "center" }}
      >
        <UserPlus size={15} />
        Klant aanmaken
      </Button>

      <Button
        tone="soft"
        onClick={() => store.runAutoRefreshCycle()}
        disabled={store.isAutoRefreshing}
        style={{ display: "inline-flex", gap: 7, alignItems: "center" }}
      >
        <RefreshCw size={15} />
        {store.isAutoRefreshing ? "Verversen..." : "Verversen"}
      </Button>
    </div>
  );
}

function MiniState({ label, done }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: 22,
        padding: "0 8px",
        borderRadius: 999,
        border: `1px solid ${done ? "#bbf7d0" : "#e2e8f0"}`,
        background: done ? "#f0fdf4" : "#f8fafc",
        color: done ? "#047857" : "#64748b",
        fontSize: 11,
        fontWeight: 900,
      }}
    >
      {label}
    </span>
  );
}

function CustomerRow({ customer, store, onOpen }) {
  const workflowState = getWorkflowState(customer);
  const statusTone = STATUS_COLORS[customer.status] || "#94a3b8";
  const stripeCustomerId =
    customer?.stripeCustomerId || customer?.billing?.stripeCustomerId || "";
  const live = isCustomerLive(customer);

  return (
    <tr
      style={{
        borderBottom: "1px solid #edf2f7",
        cursor: "pointer",
      }}
      onClick={() => onOpen(customer)}
    >
      <td style={{ padding: "10px 12px", minWidth: 260 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#eff6ff",
              color: "#1d4ed8",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              flex: "0 0 auto",
            }}
          >
            {String(customer.companyName || "?").slice(0, 1).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 900, color: "#0f172a" }}>
              {customer.companyName}
            </div>
            <div
              style={{
                color: "#64748b",
                fontSize: 12,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {customer.contactName || "Geen contact"} · {customer.email}
            </div>
          </div>
        </div>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <StatusPill tone={workflowTone(workflowState)}>{workflowState}</StatusPill>
          <StatusPill tone={statusTone}>
            {STATUS_LABELS[customer.status] || customer.status}
          </StatusPill>
        </div>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <MiniState label="Base44" done={Boolean(customer?.base44?.appId)} />
          <MiniState label="Export" done={customer?.contentSync?.status === "SYNCED"} />
        </div>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <StatusPill tone={deploymentTone(customer?.deployment?.status)}>
            {live ? "LIVE" : customer?.deployment?.status || "NO_DEPLOYMENT"}
          </StatusPill>
          <span style={{ color: "#64748b", fontSize: 12 }}>
            {formatStageLabel(customer?.deployment?.currentStage)}
          </span>
        </div>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <MiniState label="Stripe" done={Boolean(stripeCustomerId)} />
          <MiniState label="Finance" done={live} />
        </div>
      </td>
      <td style={{ padding: "10px 12px", fontWeight: 900 }}>
        <div>{live ? currency(store.calcMonthlyRevenue(customer)) : "—"}</div>
        <div style={{ color: "#64748b", fontSize: 12 }}>
          {live ? customer.domain : "Nog niet live"}
        </div>
      </td>
      <td style={{ padding: "10px 12px" }} onClick={(e) => e.stopPropagation()}>
        <Button
          tone="soft"
          onClick={() => onOpen(customer)}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          Beheren
          <ArrowRight size={14} />
        </Button>
      </td>
    </tr>
  );
}

export default function CustomersTable({ store }) {
  const navigate = useNavigate();

  function openCustomer(customer) {
    store.setSelectedCustomerId(customer.id);
    navigate(`/admin/customers/${encodeURIComponent(customer.id)}`);
  }

  return (
    <Card style={{ padding: 16 }}>
      <SectionTitle
        title="Klanten"
        subtitle="Klik op een klant om de volledige workflow en acties te beheren."
        action={<CustomersTableToolbar store={store} />}
      />

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #dbe4ef",
          borderRadius: 10,
          background: "#ffffff",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 1040,
            background: "#ffffff",
          }}
        >
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    color: "#475569",
                    fontSize: 11,
                    fontWeight: 900,
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
              <CustomerRow
                key={customer.id}
                customer={customer}
                store={store}
                onOpen={openCustomer}
              />
            ))}

            {store.filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={TABLE_HEADERS.length}
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
