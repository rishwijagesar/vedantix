import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { Card, SectionTitle } from "../components/AdminUI";
import CustomerDetail from "../customers/CustomerDetail";

export default function CustomerDetailPage({
  store: storeProp,
  customerId: customerIdProp = null,
}) {
  const outletContext = /** @type {{ store: any }} */ (useOutletContext());
  const { id } = useParams();
  const store = storeProp || outletContext.store;
  const customerId = customerIdProp || id;

  useEffect(() => {
    if (customerId) {
      store.setSelectedCustomerId(customerId);
    }
  }, [customerId, store]);

  if (!store.selectedCustomer || store.selectedCustomer.id !== customerId) {
    return (
      <Card>
        <SectionTitle title="Klantdetail" subtitle="Er is geen klant geselecteerd." />
        <div style={{ color: "#64748b" }}>
          Selecteer eerst een klant om de detailpagina te bekijken.
        </div>
      </Card>
    );
  }

  return <CustomerDetail store={store} />;
}
