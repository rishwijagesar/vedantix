import React from "react";

import { Card, Field, Input, SectionTitle, Select, Textarea } from "../components/AdminUI";
import { currency, dateLabel } from "../utils/adminStorage";
import { formatStageLabel } from "./customerWorkflow";

export default function CustomerProfileSection({ store }) {
  const customer = store.selectedCustomer;
  const saveCustomerField = (field, value) => {
    store.saveCustomerEdits({
      ...customer,
      [field]: value,
    });
  };

  return (
    <Card
      style={{
        background: "#ffffff",
      }}
    >
      <SectionTitle title="Algemene gegevens" subtitle="Wijzigbare klantinformatie." />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 12,
        }}
      >
        <Field label="Bedrijfsnaam">
          <Input
            value={customer.companyName}
            onChange={(e) => saveCustomerField("companyName", e.target.value)}
          />
        </Field>

        <Field label="Contactpersoon">
          <Input
            value={customer.contactName}
            onChange={(e) => saveCustomerField("contactName", e.target.value)}
          />
        </Field>

        <Field label="E-mail">
          <Input
            value={customer.email}
            onChange={(e) => saveCustomerField("email", e.target.value)}
          />
        </Field>

        <Field label="Telefoon">
          <Input
            value={customer.phone}
            onChange={(e) => saveCustomerField("phone", e.target.value)}
          />
        </Field>

        <Field label="Domeinnaam">
          <Input
            value={customer.domain}
            onChange={(e) => saveCustomerField("domain", e.target.value)}
          />
        </Field>

        <Field label="Pakket">
          <Select
            value={customer.packageCode}
            onChange={(e) => saveCustomerField("packageCode", e.target.value)}
          >
            {store.packageOptions
              .filter((item) => item.isActive !== false)
              .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
              .map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
          </Select>
        </Field>

        <Field label="Adres">
          <Input
            value={customer.address || ""}
            onChange={(e) => saveCustomerField("address", e.target.value)}
          />
        </Field>

        <Field label="Postcode">
          <Input
            value={customer.postalCode || ""}
            onChange={(e) => saveCustomerField("postalCode", e.target.value)}
          />
        </Field>

        <Field label="Plaats">
          <Input
            value={customer.city || ""}
            onChange={(e) => saveCustomerField("city", e.target.value)}
          />
        </Field>

        <Field label="Land">
          <Input
            value={customer.country || ""}
            onChange={(e) => saveCustomerField("country", e.target.value)}
          />
        </Field>

        <Field label="Website build status">
          <Input value={customer.websiteBuildStatus || ""} readOnly />
        </Field>

        <Field label="Base44 status">
          <Input value={customer.base44?.status || ""} readOnly />
        </Field>

        <Field label="Preview pad">
          <Input value={customer.preview?.path || ""} readOnly />
        </Field>

        <Field label="Publieke preview URL">
          <Input value={customer.preview?.fullUrl || ""} readOnly />
        </Field>

        <Field label="Preview status">
          <Input value={customer.preview?.status || ""} readOnly />
        </Field>

        <Field label="Export status">
          <Input value={customer.contentSync?.status || ""} readOnly />
        </Field>

        <Field label="Publicatie bron">
          <Input value={customer.contentSync?.source || ""} readOnly />
        </Field>

        <Field label="Deployment status">
          <Input value={customer.deployment?.status || ""} readOnly />
        </Field>

        <Field label="Deployment ID">
          <Input value={customer.deployment?.deploymentId || ""} readOnly />
        </Field>

        <Field label="Huidige stage">
          <Input value={formatStageLabel(customer.deployment?.currentStage)} readOnly />
        </Field>

        <Field label="Live domein">
          <Input value={customer.deployment?.liveDomain || ""} readOnly />
        </Field>

        <Field label="Aangemaakt op">
          <Input value={dateLabel(customer.createdAt)} readOnly />
        </Field>

        <Field label="Setup prijs">
          <Input value={currency(store.calcSetupRevenue(customer))} readOnly />
        </Field>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Notities">
            <Textarea
              value={customer.notes || ""}
              onChange={(e) => saveCustomerField("notes", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </Card>
  );
}
