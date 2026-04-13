import React from "react";
import { Card, SectionTitle, Button, Field, Input, Select, StatCard } from "../components/AdminUI";
import { currency, dateLabel } from "../utils/adminStorage";
import { useOutletContext } from "react-router-dom";

export default function FinancePage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();

  const store = storeProp || outletContext.store;
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Card>
        <SectionTitle
          title="Uitgave toevoegen"
          subtitle="Voeg algemene of klantgebonden kosten toe."
          action={
            <Button tone="primary" onClick={store.addExpense}>
              Opslaan
            </Button>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <Field label="Titel">
            <Input
              value={store.expenseForm.title}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Hosting, tool, advertentie..."
            />
          </Field>

          <Field label="Bedrag">
            <Input
              type="number"
              min="0"
              value={store.expenseForm.amount}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, amount: e.target.value }))
              }
            />
          </Field>

          <Field label="Datum">
            <Input
              type="date"
              value={store.expenseForm.date}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </Field>

          <Field label="Categorie">
            <Select
              value={store.expenseForm.category}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option>Overig</option>
              <option>Hosting</option>
              <option>Software</option>
              <option>Marketing</option>
              <option>Freelance</option>
              <option>Hardware</option>
            </Select>
          </Field>

          <Field label="Klant koppelen">
            <Select
              value={store.expenseForm.customerId}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, customerId: e.target.value }))
              }
            >
              <option value="">Geen specifieke klant</option>
              {store.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Btw-overzicht"
          subtitle="Indicatie van af te dragen btw op basis van actieve omzet en geregistreerde kosten."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["month", "quarter", "year"].map((key) => (
                <Button
                  key={key}
                  tone={store.vatFilter === key ? "primary" : "default"}
                  onClick={() => store.setVatFilter(key)}
                >
                  {key === "month" ? "Maand" : key === "quarter" ? "Kwartaal" : "Jaar"}
                </Button>
              ))}
            </div>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          <StatCard
            title="Output btw"
            value={currency(store.pricingVatSummary.outputVat)}
            subtitle="Btw op omzet"
            tone="#0ea5e9"
          />
          <StatCard
            title="Input btw"
            value={currency(store.pricingVatSummary.inputVat)}
            subtitle="Aftrekbare btw op kosten"
            tone="#8b5cf6"
          />
          <StatCard
            title="Af te dragen btw"
            value={currency(store.pricingVatSummary.payableVat)}
            subtitle="Output minus input"
            tone={store.pricingVatSummary.payableVat >= 0 ? "#ef4444" : "#10b981"}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Uitgaven"
          subtitle="Alle geregistreerde kosten."
        />
        <div style={{ display: "grid", gap: 10 }}>
          {store.expenses.map((expense) => {
            const customer = store.customers.find((item) => item.id === expense.customerId);

            return (
              <div
                key={expense.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: 14,
                  borderRadius: 16,
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                }}
              >
                <div>
                  <div style={{ fontWeight: 800 }}>{expense.title}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>
                    {expense.category} · {dateLabel(expense.date)}
                    {customer ? ` · ${customer.companyName}` : ""}
                  </div>
                </div>
                <div style={{ fontWeight: 900 }}>{currency(expense.amount)}</div>
              </div>
            );
          })}

          {store.expenses.length === 0 ? (
            <div style={{ color: "#64748b" }}>Nog geen uitgaven toegevoegd.</div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}