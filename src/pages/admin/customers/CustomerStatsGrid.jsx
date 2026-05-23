import React from "react";

import { StatCard } from "../components/AdminUI";
import { currency } from "../utils/adminStorage";
import { isCustomerLive } from "./customerWorkflow";

export default function CustomerStatsGrid({ store }) {
  const isLive = isCustomerLive(store.selectedCustomer);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <StatCard
        title="Maandprijs"
        value={currency(store.calcMonthlyRevenue(store.selectedCustomer))}
        subtitle={isLive ? "Actieve finance omzet" : "Gepland na livegang"}
        tone="#0ea5e9"
      />
      <StatCard
        title="Setup"
        value={currency(store.calcSetupRevenue(store.selectedCustomer))}
        subtitle="Eenmalige opbrengst"
        tone="#8b5cf6"
      />
      <StatCard
        title="Kosten"
        value={currency(isLive && store.selectedCustomerStats ? store.selectedCustomerStats.cost : 0)}
        subtitle={isLive ? "Per gekozen periode" : "Nog niet actief"}
        tone="#f97316"
      />
      <StatCard
        title="Winst"
        value={currency(isLive && store.selectedCustomerStats ? store.selectedCustomerStats.profit : 0)}
        subtitle={isLive ? "Geschat resultaat" : "Nog niet actief"}
        tone="#10b981"
      />
    </div>
  );
}
