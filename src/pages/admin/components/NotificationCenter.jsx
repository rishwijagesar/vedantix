import React, { useEffect, useState } from "react";
import { subscribeToAdminNotifications } from "../utils/adminNotifications";

function toneStyles(type) {
  if (type === "success") {
    return {
      border: "1px solid #86efac",
      background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)",
      color: "#166534",
      accent: "#16a34a",
    };
  }

  if (type === "error") {
    return {
      border: "1px solid #fecaca",
      background: "linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)",
      color: "#991b1b",
      accent: "#dc2626",
    };
  }

  return {
    border: "1px solid #bfdbfe",
    background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
    color: "#1e3a8a",
    accent: "#2563eb",
  };
}

export default function NotificationCenter() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToAdminNotifications((notification) => {
      setItems((prev) => [notification, ...prev].slice(0, 5));

      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== notification.id));
      }, 4200);
    });

    return unsubscribe;
  }, []);

  function dismiss(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 22,
        right: 22,
        zIndex: 2000,
        display: "grid",
        gap: 12,
        width: "min(380px, calc(100vw - 28px))",
      }}
    >
      {items.map((item) => {
        const tone = toneStyles(item.type);

        return (
          <div
            key={item.id}
            style={{
              borderRadius: 20,
              padding: 16,
              border: tone.border,
              background: tone.background,
              color: tone.color,
              boxShadow: "0 22px 44px rgba(15,23,42,0.14)",
              display: "grid",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "grid", gap: 6 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: tone.accent,
                  }}
                >
                  {item.type}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    lineHeight: 1.5,
                    color: tone.color,
                    wordBreak: "break-word",
                  }}
                >
                  {item.message}
                </div>
              </div>

              <button
                type="button"
                onClick={() => dismiss(item.id)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  border: "1px solid rgba(15,23,42,0.08)",
                  background: "#ffffff",
                  color: "#334155",
                  fontWeight: 900,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}