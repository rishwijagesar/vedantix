import React from "react";

import { Button, Card, Field, Input, SectionTitle } from "../components/AdminUI";

export default function StripeBillingSection({ store }) {
  const customer = store.selectedCustomer;
  const stripeCustomerId = customer.stripeCustomerId || customer.billing?.stripeCustomerId;
  const isBusy = Boolean(store.isUpdatingBilling);

  return (
    <Card
      style={{
        background:
          "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(255,255,255,0.9) 100%)",
      }}
    >
      <SectionTitle
        title="Stripe Billing"
        subtitle="Beheer abonnementen, betalingen en facturen."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
          marginBottom: 20,
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

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {!stripeCustomerId ? (
          <Button
            tone="primary"
            onClick={() => store.createStripeCustomer(customer)}
            disabled={isBusy}
          >
            {isBusy ? "Bezig..." : "Stripe klant aanmaken"}
          </Button>
        ) : null}

        <Button
          tone="success"
          onClick={() => store.createStripeCheckout(customer)}
          disabled={isBusy}
        >
          {isBusy ? "Bezig..." : "Open Checkout"}
        </Button>

        {stripeCustomerId ? (
          <Button
            tone="soft"
            onClick={() => store.openBillingPortal(customer)}
            disabled={isBusy}
          >
            {isBusy ? "Bezig..." : "Open Billing Portal"}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
