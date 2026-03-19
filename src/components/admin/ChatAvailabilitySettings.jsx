import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const ChatAvailability = base44.entities.ChatAvailability;

const DAYS = [
  { dow: 1, label: "Maandag" },
  { dow: 2, label: "Dinsdag" },
  { dow: 3, label: "Woensdag" },
  { dow: 4, label: "Donderdag" },
  { dow: 5, label: "Vrijdag" },
  { dow: 6, label: "Zaterdag" },
  { dow: 0, label: "Zondag" },
];

const DEFAULT_SCHEDULE = [
  { day_of_week: 1, start_time: "09:00", end_time: "17:00", is_active: true },
  { day_of_week: 2, start_time: "09:00", end_time: "17:00", is_active: true },
  { day_of_week: 3, start_time: "09:00", end_time: "17:00", is_active: true },
  { day_of_week: 4, start_time: "09:00", end_time: "17:00", is_active: true },
  { day_of_week: 5, start_time: "09:00", end_time: "17:00", is_active: true },
  { day_of_week: 6, start_time: "09:00", end_time: "17:00", is_active: false },
  { day_of_week: 0, start_time: "09:00", end_time: "17:00", is_active: false },
];

export default function ChatAvailabilitySettings() {
  const [schedule, setSchedule] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await ChatAvailability.list();
    setRecords(data);
    // Merge with defaults
    const merged = DAYS.map(d => {
      const found = data.find(r => r.day_of_week === d.dow);
      if (found) return { ...found };
      const def = DEFAULT_SCHEDULE.find(r => r.day_of_week === d.dow);
      return { ...def, _new: true };
    });
    setSchedule(merged);
    setLoading(false);
  };

  const update = (dow, field, value) => {
    setSchedule(prev => prev.map(s => s.day_of_week === dow ? { ...s, [field]: value } : s));
  };

  const save = async () => {
    setSaving(true);
    await Promise.all(schedule.map(s => {
      const { _new, ...data } = s;
      if (s.id) {
        return ChatAvailability.update(s.id, { start_time: data.start_time, end_time: data.end_time, is_active: data.is_active });
      } else {
        return ChatAvailability.create(data);
      }
    }));
    await load();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <div style={{ padding: 20, color: "#94a3b8", fontSize: "0.85rem" }}>Laden...</div>;

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>🕐 Chat beschikbaarheid</h3>
          <p style={{ color: "#64748b", fontSize: "0.82rem" }}>Stel in wanneer je bereikbaar bent voor live chat. Bezoekers kunnen altijd berichten sturen maar zien wanneer je terug bent.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {saved && <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.85rem" }}>✅ Opgeslagen!</span>}
          <button
            onClick={save}
            disabled={saving}
            style={{ background: "#1a73e8", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: "0.88rem" }}
          >
            {saving ? "Opslaan..." : "💾 Opslaan"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DAYS.map(d => {
          const s = schedule.find(x => x.day_of_week === d.dow);
          if (!s) return null;
          return (
            <div key={d.dow} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              background: s.is_active ? "#f0fdf4" : "#f8fafc",
              border: `1px solid ${s.is_active ? "#86efac" : "#e5e7eb"}`,
              borderRadius: 12, flexWrap: "wrap"
            }}>
              {/* Toggle */}
              <button
                onClick={() => update(d.dow, "is_active", !s.is_active)}
                style={{
                  width: 44, height: 24, borderRadius: 12,
                  background: s.is_active ? "#10b981" : "#d1d5db",
                  border: "none", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background 0.2s"
                }}
              >
                <span style={{
                  position: "absolute", top: 2, left: s.is_active ? 22 : 2,
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  transition: "left 0.2s", display: "block"
                }} />
              </button>

              {/* Day label */}
              <span style={{ fontWeight: 600, fontSize: "0.9rem", width: 90, color: s.is_active ? "#166534" : "#64748b" }}>
                {d.label}
              </span>

              {/* Time inputs */}
              {s.is_active ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="time"
                    value={s.start_time}
                    onChange={e => update(d.dow, "start_time", e.target.value)}
                    style={{ padding: "6px 10px", border: "2px solid #e5e7eb", borderRadius: 8, fontSize: "0.88rem", fontFamily: "inherit", outline: "none" }}
                  />
                  <span style={{ color: "#64748b", fontSize: "0.82rem" }}>tot</span>
                  <input
                    type="time"
                    value={s.end_time}
                    onChange={e => update(d.dow, "end_time", e.target.value)}
                    style={{ padding: "6px 10px", border: "2px solid #e5e7eb", borderRadius: 8, fontSize: "0.88rem", fontFamily: "inherit", outline: "none" }}
                  />
                </div>
              ) : (
                <span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>Niet beschikbaar</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "12px 16px", fontSize: "0.82rem", color: "#0369a1" }}>
        💡 Buiten deze tijden zien bezoekers een melding wanneer je terug beschikbaar bent. Ze kunnen altijd een bericht achterlaten.
      </div>
    </div>
  );
}