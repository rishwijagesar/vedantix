import React from "react";
import { useOutletContext } from "react-router-dom";

import CustomerDetail from "../customers/CustomerDetail";
import CustomersTable from "../customers/CustomersTable";

async function postJson(apiBaseUrl, apiKey, path, body) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-Api-Key": apiKey } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }

  return data;
}

export default function CustomersPage({ store: storeProp }) {
  const outletContext = /** @type {{ store?: any }} */ (useOutletContext() || {});

  const baseStore =
    storeProp && typeof storeProp === "object"
      ? storeProp
      : outletContext.store;

  if (!baseStore) {
    return <div style={{ padding: 24 }}>Store kon niet worden geladen.</div>;
  }

  const apiBaseUrl =
    baseStore.apiBaseUrl ||
    storeProp?.apiBaseUrl ||
    "https://api.vedantix.nl";

  const apiKey = baseStore.apiKey || storeProp?.apiKey;

  const store = {
    ...baseStore,

    async createStripeCheckout(customer) {
      if (typeof baseStore.createStripeCheckout === "function") {
        return baseStore.createStripeCheckout(customer);
      }

      const result = await postJson(
        apiBaseUrl,
        apiKey,
        "/api/billing/checkout-session",
        {
          customerId: customer.stripeCustomerId || customer.customerId,
          packageCode: customer.packageCode,
        }
      );

      if (result?.url) {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }

      return result;
    },

    async createStripeCustomer(customer) {
      if (typeof baseStore.createStripeCustomer === "function") {
        return baseStore.createStripeCustomer(customer);
      }

      return postJson(apiBaseUrl, apiKey, "/api/billing/customers", {
        customerId: customer.id,
        email: customer.email,
        name: customer.companyName,
        metadata: {
          customerId: customer.id,
          packageCode: customer.packageCode,
        },
      });
    },

    async openBillingPortal(customer) {
      if (typeof baseStore.openBillingPortal === "function") {
        return baseStore.openBillingPortal(customer);
      }

      const result = await postJson(apiBaseUrl, apiKey, "/api/billing/portal", {
        customerId: customer.stripeCustomerId || customer.customerId,
      });

      if (result?.url) {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }

      return result;
    },
  };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <CustomersTable store={store} />
      <CustomerDetail store={store} />
    </div>
  );
}
