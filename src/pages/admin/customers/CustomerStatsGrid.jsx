import React from "react";

import { StatCard } from "../components/AdminUI";
import { currency } from "../utils/adminStorage";

export default function CustomerStatsGrid({ store }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <StatCard
        title="Maandprijs"
        value={currency(store.calcMonthlyRevenue(store.selectedCustomer))}
        subtitle="Pakket + extra's"
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
        value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.cost : 0)}
        subtitle="Per gekozen periode"
        tone="#f97316"
      />
      <StatCard
        title="Winst"
        value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.profit : 0)}
        subtitle="Geschat resultaat"
        tone="#10b981"
      />
    </div>
  );
}
