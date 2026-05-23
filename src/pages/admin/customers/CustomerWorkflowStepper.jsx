import React from "react";
import { Check, Circle, Loader2 } from "lucide-react";

import { Card, SectionTitle } from "../components/AdminUI";
import { buildCustomerStepperSteps } from "./customerWorkflow";

function stepTone(step) {
  if (step.done) {
    return {
      border: "#bbf7d0",
      background: "#f0fdf4",
      color: "#047857",
      iconBackground: "#10b981",
      iconColor: "#ffffff",
      label: "Klaar",
    };
  }

  if (step.active) {
    return {
      border: "#bfdbfe",
      background: "#eff6ff",
      color: "#1d4ed8",
      iconBackground: "#2563eb",
      iconColor: "#ffffff",
      label: "Actief",
    };
  }

  return {
    border: "#e2e8f0",
    background: "#f8fafc",
    color: "#64748b",
    iconBackground: "#e2e8f0",
    iconColor: "#64748b",
    label: "Wacht",
  };
}

function StepIcon({ step, tone }) {
  const iconStyle = {
    width: 24,
    height: 24,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: tone.iconBackground,
    color: tone.iconColor,
    flex: "0 0 auto",
  };

  if (step.done) {
    return (
      <span style={iconStyle}>
        <Check size={14} strokeWidth={3} />
      </span>
    );
  }

  if (step.active) {
    return (
      <span style={iconStyle}>
        <Loader2 size={14} strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span style={iconStyle}>
      <Circle size={10} fill="currentColor" />
    </span>
  );
}

export default function CustomerWorkflowStepper({ customer }) {
  const steps = buildCustomerStepperSteps(customer);
  const activeIndex = steps.findIndex((step) => step.active);

  return (
    <Card style={{ marginBottom: 12, padding: 14 }}>
      <SectionTitle
        title="Klantflow"
        subtitle="Van aanmaken tot livegang, mail, Stripe en finance."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 8,
        }}
      >
        {steps.map((step, index) => {
          const tone = stepTone(step);
          const isPast = activeIndex === -1 ? step.done : index < activeIndex;

          return (
            <div
              key={step.key}
              style={{
                position: "relative",
                minWidth: 0,
                border: `1px solid ${tone.border}`,
                background: tone.background,
                borderRadius: 10,
                padding: "10px 10px 9px",
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StepIcon step={step} tone={tone} />
                <span
                  style={{
                    color: tone.color,
                    fontSize: 10,
                    fontWeight: 900,
                    textTransform: "uppercase",
                  }}
                >
                  {isPast && !step.done ? "Verder" : tone.label}
                </span>
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: "#0f172a",
                    fontSize: 13,
                    fontWeight: 900,
                    lineHeight: 1.2,
                    marginBottom: 3,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={step.subtitle}
                >
                  {step.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
