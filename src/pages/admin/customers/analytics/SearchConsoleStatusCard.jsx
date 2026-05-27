import React from "react";

import TrackingStatusCard from "./TrackingStatusCard";

export default function SearchConsoleStatusCard({ searchConsole = {} }) {
  return (
    <TrackingStatusCard title="Search Console" status={searchConsole.status}>
      <div>Property: <strong>{searchConsole.propertyId || "—"}</strong></div>
      <div>Verified: <strong>{searchConsole.verified ? "Ja" : "Nee"}</strong></div>
      <div>TXT record: <strong>{searchConsole.verificationRecordName || "—"}</strong></div>
    </TrackingStatusCard>
  );
}
