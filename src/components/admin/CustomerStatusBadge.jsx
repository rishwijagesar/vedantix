export default function CustomerStatusBadge({ customer }) {
    const status = customer?.websiteBuildStatus;
  
    const map = {
      BUILDING: { label: "Building", color: "#f59e0b" },
      PREVIEW_READY: { label: "Preview Ready", color: "#3b82f6" },
      APPROVED_FOR_PRODUCTION: { label: "Approved", color: "#10b981" },
      LIVE: { label: "Live", color: "#22c55e" },
    };
  
    const config = map[status] || {
      label: status || "Unknown",
      color: "#6b7280",
    };
  
    return (
      <span
        style={{
          background: config.color,
          color: "#fff",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        {config.label}
      </span>
    );
  }