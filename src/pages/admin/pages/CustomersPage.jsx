import React from "react";
import { useOutletContext } from "react-router-dom";

import CustomerDetail from "../customers/CustomerDetail";
import CustomersTable from "../customers/CustomersTable";

export default function CustomersPage({ store: storeProp }) {
  const outletContext = /** @type {{ store: any }} */ (useOutletContext());
  const store = storeProp || outletContext.store;

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <CustomersTable store={store} />
      <CustomerDetail store={store} />
    </div>
  );
}
