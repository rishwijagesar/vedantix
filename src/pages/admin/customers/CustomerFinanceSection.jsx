import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button, Card, SectionTitle, StatCard } from "../components/AdminUI";
import { TIME_FILTERS, currency } from "../utils/adminStorage";

export default function CustomerFinanceSection({ store }) {
  const stats = store.selectedCustomerStats;

  return (
    <Card style={{ marginBottom: 14 }}>
      <SectionTitle
        title="Financieel overzicht per klant"
        subtitle="Wat deze klant kost en oplevert per geselecteerde periode."
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TIME_FILTERS.map((item) => (
              <Button
                key={item.key}
                tone={store.detailFilter === item.key ? "primary" : "default"}
                onClick={() => store.setDetailFilter(item.key)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        }
      />

      <div style={{ width: "100%", height: 240, marginBottom: 14 }}>
        <ResponsiveContainer>
          <AreaChart data={store.selectedCustomerTrendData}>
            <defs>
              <linearGradient id="custRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="custProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="omzet"
              stroke="#0ea5e9"
              fill="url(#custRevenue)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="winst"
              stroke="#10b981"
              fill="url(#custProfit)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        <StatCard
          title="Opbrengst"
          value={currency(stats ? stats.revenue : 0)}
          subtitle="Pakket + extra's"
          tone="#0ea5e9"
        />
        <StatCard
          title="Infra"
          value={currency(stats ? stats.infraCost : 0)}
          subtitle="Automatisch vanuit pakket + extra's"
          tone="#8b5cf6"
        />
        <StatCard
          title="Extra kosten"
          value={currency(stats ? stats.directExpenses : 0)}
          subtitle="Handmatig gekoppelde uitgaven"
          tone="#f97316"
        />
        <StatCard
          title="Resultaat"
          value={currency(stats ? stats.profit : 0)}
          subtitle="Omzet minus kosten"
          tone="#10b981"
        />
      </div>
    </Card>
  );
}
