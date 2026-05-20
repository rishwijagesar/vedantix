import React from "react";

import { Card, Field, Input, SectionTitle } from "../components/AdminUI";

export default function StripeBillingSection({ store }) {
  const customer = store.selectedCustomer;
  const stripeCustomerId = customer.stripeCustomerId || customer.billing?.stripeCustomerId;

  return (
    <Card
      style={{
        background: "#ffffff",
      }}
    >
      <SectionTitle
        title="Stripe Billing"
        subtitle="Beheer abonnementen, betalingen en facturen."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 12,
        }}
      >
        <Field label="Stripe Customer ID">
          <Input value={stripeCustomerId || ""} readOnly />
        </Field>

        <Field label="Subscription status">
          <Input
            value={customer.subscriptionStatus || customer.billing?.subscriptionStatus || ""}
            readOnly
          />
        </Field>

        <Field label="Payment status">
          <Input
            value={customer.paymentStatus || customer.billing?.paymentStatus || ""}
            readOnly
          />
        </Field>

        <Field label="Stripe Subscription ID">
          <Input
            value={customer.stripeSubscriptionId || customer.billing?.stripeSubscriptionId || ""}
            readOnly
          />
        </Field>
      </div>
    </Card>
  );
}
