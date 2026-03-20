import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Subscription = base44.entities.Subscription;

export default function PortalAbonnement({ klant, onReload }) {
  const [abonnement, setAbonnement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opzegConfirm, setOpzegConfirm] = useState(false);
  const [opzeggedaan, setOpzeggedaan] = useState(false);

  useEffect(() => {
    Subscription.filter({ customer_id: klant.id }).then(abos => {
      setAbonnement(abos.find(a => a.status === "actief") || abos[0] || null);
      setLoading(false);
    });
  }, [klant]);

  const handleOpzeggen = async () => {
    if (!abonnement) return;
    const opzegDatum = new Date();
    opzegDatum.setMonth(opzegDatum.getMonth() + 1);
    await Subscription.update(abonnement.id, {
      status: "opgezegd",
      opzeg_datum: opzegDatum.toISOString().split("T")[0]
    });
    setOpzeggedaan(true);
    setOpzegConfirm(false);
    onReload();
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Laden...</div>;

  if (!abonnement) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
      <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Geen abonnement gevonden</h3>
      <p style={{ color: "#64748b" }}>Neem contact op met Vedantix voor meer informatie.</p>
    </div>
  );

  const statusColors = { actief: "#10b981", gepauzeerd: "#f59e0b", opgezegd: "#ef4444", verlopen: "#94a3b8" };
  const statusLabels = { actief: "Actief", gepauzeerd: "Gepauzeerd", opgezegd: "Opgezegd", verlopen: "Verlopen" };

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Mijn abonnement</h1>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px 32px", maxWidth: 560 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a" }}>{abonnement.naam}</h2>
          </div>
          <span style={{ background: (statusColors[abonnement.status] || "#94a3b8") + "18", color: statusColors[abonnement.status] || "#94a3b8", padding: "6px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 700 }}>
            {statusLabels[abonnement.status] || abonnement.status}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          {[
            ["Maandbedrag", `€${abonnement.maandbedrag}/maand`],
            ["Setup kosten", `€${abonnement.setup_kosten || 0} (eenmalig)`],
            ["Startdatum", abonnement.startdatum ? new Date(abonnement.startdatum).toLocaleDateString("nl-NL") : "–"],
            ["Volgende factuur", abonnement.volgende_factuurdatum ? new Date(abonnement.volgende_factuurdatum).toLocaleDateString("nl-NL") : "–"],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>{val}</div>
            </div>
          ))}
        </div>

        {abonnement.opzeg_datum && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: "#dc2626", marginBottom: 4 }}>⚠️ Opzegging aangevraagd</div>
            <div style={{ fontSize: "0.85rem", color: "#b91c1c" }}>Opgezegd per: {new Date(abonnement.opzeg_datum).toLocaleDateString("nl-NL")}</div>
          </div>
        )}

        {abonnement.status === "actief" && !opzeggedaan && (
          <div>
            {!opzegConfirm ? (
              <button onClick={() => setOpzegConfirm(true)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
                Abonnement opzeggen
              </button>
            ) : (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>⚠️ Weet je het zeker?</div>
                <p style={{ fontSize: "0.85rem", color: "#b91c1c", marginBottom: 14 }}>
                  Je staat op het punt je abonnement op te zeggen. Je website blijft actief tot de einde van de lopende maand. Na opzegging wordt je website offline gehaald.
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setOpzegConfirm(false)} style={{ flex: 1, background: "#f1f5f9", border: "none", borderRadius: 8, padding: "10px", fontWeight: 600, cursor: "pointer" }}>Annuleren</button>
                  <button onClick={handleOpzeggen} style={{ flex: 1, background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontWeight: 700, cursor: "pointer" }}>Ja, opzeggen</button>
                </div>
              </div>
            )}
          </div>
        )}

        {opzeggedaan && (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontWeight: 700, color: "#166534" }}>✓ Opzegging doorgegeven</div>
            <div style={{ fontSize: "0.83rem", color: "#15803d", marginTop: 4 }}>We nemen contact met je op om de opzegging te bevestigen.</div>
          </div>
        )}
      </div>
    </div>
  );
}