import React from "react";

export function BrandLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 18,
          background:
            "linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #38bdf8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 16px 40px rgba(29,78,216,0.24)",
          color: "#ffffff",
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: "-0.03em",
        }}
      >
        V
      </div>

      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#0f172a",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          Vedantix
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Admin dashboard
        </div>
      </div>
    </div>
  );
}

export function StatCard({ title, value, subtitle, tone = "#0ea5e9" }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
        border: "1px solid #dbe4ef",
        borderRadius: 22,
        padding: 20,
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ color: "#0f172a", fontSize: 30, fontWeight: 900, marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ color: tone, fontSize: 13, fontWeight: 800 }}>{subtitle}</div>
    </div>
  );
}

export function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,252,255,0.98) 100%)",
        border: "1px solid #dbe4ef",
        borderRadius: 28,
        padding: 22,
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ title, subtitle, action = null }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#0f172a",
            marginBottom: 8,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Button(props) {
  const {
    children,
    onClick,
    tone = "default",
    disabled = false,
    type,
    style = {},
  } = props;

  const buttonType = type === "submit" || type === "reset" ? type : "button";

  const styles = {
    default: {
      background: "#ffffff",
      color: "#0f172a",
      border: "1px solid #cbd5e1",
      boxShadow: "0 8px 20px rgba(15,23,42,0.05)",
    },
    primary: {
      background: "linear-gradient(135deg, #0f172a 0%, #172554 100%)",
      color: "#ffffff",
      border: "1px solid #0f172a",
      boxShadow: "0 14px 30px rgba(15,23,42,0.18)",
    },
    success: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
      border: "1px solid #059669",
      boxShadow: "0 14px 30px rgba(16,185,129,0.2)",
    },
    danger: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      color: "#ffffff",
      border: "1px solid #dc2626",
      boxShadow: "0 14px 30px rgba(239,68,68,0.16)",
    },
    soft: {
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      color: "#1d4ed8",
      border: "1px solid #bfdbfe",
      boxShadow: "0 10px 22px rgba(59,130,246,0.08)",
    },
  };

  const selected = styles[tone] || styles.default;

  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "11px 16px",
        borderRadius: 14,
        fontWeight: 800,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.18s ease",
        ...selected,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "14px 16px",
        color: "#0f172a",
        outline: "none",
        fontSize: 15,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
        ...(props.style || {}),
      }}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        minHeight: 100,
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "14px 16px",
        color: "#0f172a",
        outline: "none",
        fontSize: 15,
        resize: "vertical",
        ...(props.style || {}),
      }}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "14px 16px",
        color: "#0f172a",
        outline: "none",
        fontSize: 15,
        ...(props.style || {}),
      }}
    />
  );
}

export function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "#334155", fontSize: 13, fontWeight: 800 }}>{label}</span>
      {children}
    </label>
  );
}

export function Modal({ open, title, children, onClose, maxWidth = 900 }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflow: "auto",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
          borderRadius: 30,
          padding: 26,
          border: "1px solid rgba(219,228,239,0.95)",
          boxShadow: "0 40px 100px rgba(15,23,42,0.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <h3
            style={{
              fontSize: 28,
              fontWeight: 900,
              margin: 0,
              color: "#0f172a",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #dbe4ef",
              background: "#ffffff",
              width: 44,
              height: 44,
              borderRadius: 14,
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 900,
              boxShadow: "0 10px 20px rgba(15,23,42,0.06)",
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}