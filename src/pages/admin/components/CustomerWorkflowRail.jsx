import React from "react";

function toneForStep(done, active) {
  if (done) {
    return {
      background: "#10b98112",
      border: "#10b98133",
      text: "#059669",
      dot: "#10b981",
    };
  }

  if (active) {
    return {
      background: "#0ea5e912",
      border: "#0ea5e933",
      text: "#0284c7",
      dot: "#0ea5e9",
    };
  }

  return {
    background: "#f8fafc",
    border: "#cbd5e1",
    text: "#64748b",
    dot: "#cbd5e1",
  };
}

export default function CustomerWorkflowRail({ customer }) {
  const steps = [
    {
      key: "base44",
      title: "Base44 gekoppeld",
      subtitle: customer?.base44?.appName || "Nog geen app",
      done: Boolean(customer?.base44?.appId),
      active: !customer?.base44?.appId,
    },
    {
      key: "content",
      title: "GitHub sync",
      subtitle: customer?.contentSync?.repositoryName || "Nog niet gesynchroniseerd",
      done: customer?.contentSync?.status === "SYNCED",
      active:
        Boolean(customer?.base44?.appId) &&
        customer?.contentSync?.status !== "SYNCED",
    },
    {
      key: "preview",
      title: "Preview klaar",
      subtitle: customer?.preview?.path || "Nog geen preview",
      done:
        customer?.websiteBuildStatus === "PREVIEW_READY" ||
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active",
      active:
        customer?.contentSync?.status === "SYNCED" &&
        customer?.websiteBuildStatus !== "PREVIEW_READY" &&
        customer?.websiteBuildStatus !== "APPROVED_FOR_PRODUCTION" &&
        customer?.status !== "active",
    },
    {
      key: "approval",
      title: "Klant akkoord",
      subtitle:
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active"
          ? "Akkoord ontvangen"
          : "Wacht op akkoord",
      done:
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active",
      active:
        customer?.websiteBuildStatus === "PREVIEW_READY" &&
        customer?.status !== "active",
    },
    {
      key: "live",
      title: "Live",
      subtitle: customer?.domain || "Nog niet live",
      done: customer?.status === "active",
      active:
        customer?.status === "provisioning" ||
        customer?.deployment?.status === "PENDING" ||
        customer?.deployment?.status === "IN_PROGRESS",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      {steps.map((step, index) => {
        const tone = toneForStep(step.done, step.active);

        return (
          <div
            key={step.key}
            style={{
              position: "relative",
              border: `1px solid ${tone.border}`,
              background: tone.background,
              borderRadius: 20,
              padding: 16,
              minHeight: 116,
              overflow: "hidden",
            }}
          >
            {index < steps.length - 1 ? (
              <div
                style={{
                  position: "absolute",
                  top: 22,
                  right: -8,
                  width: 16,
                  height: 2,
                  background: step.done ? "#10b98155" : "#cbd5e1",
                }}
              />
            ) : null}

            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: tone.dot,
                marginBottom: 12,
              }}
            />

            <div
              style={{
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 0.4,
                color: tone.text,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {step.done ? "DONE" : step.active ? "ACTIVE" : "WAITING"}
            </div>

            <div
              style={{
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </div>

            <div
              style={{
                color: "#475569",
                fontSize: 13,
                lineHeight: 1.35,
                wordBreak: "break-word",
              }}
            >
              {step.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}