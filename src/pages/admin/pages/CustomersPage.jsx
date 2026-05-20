import React from "react";
import { useOutletContext } from "react-router-dom";

import CustomerDetail from "../customers/CustomerDetail";
import CustomersTable from "../customers/CustomersTable";

export default function CustomersPage({ store: storeProp }) {
  const outletContext =
    /** @type {{ store?: any }} */ (useOutletContext() || {});

  const hasStripeActions =
    typeof storeProp?.createStripeCustomer === "function";

  const store = hasStripeActions
    ? storeProp
    : outletContext.store;

  if (!store) {
    return (
      <div style={{ padding: 24 }}>
        Store kon niet worden geladen.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <CustomersTable store={store} />
      <CustomerDetail store={store} />
    </div>
  );
}
