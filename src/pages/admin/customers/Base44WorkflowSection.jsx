import React from "react";

import { Button, Card, Field, Input, SectionTitle } from "../components/AdminUI";
import {
  canApproveCustomer,
  canDeployCustomer,
  canMarkPreviewReady,
  isCustomerLive,
  resolveBase44PreviewUrl,
} from "./customerWorkflow";

export default function Base44WorkflowSection({ store }) {
  const customer = store.selectedCustomer;
  const customerWithBase44Form = {
    ...customer,
    base44: {
      ...customer?.base44,
      appName: store.base44LinkForm.appName || customer?.base44?.appName,
      editorUrl: store.base44LinkForm.editorUrl || customer?.base44?.editorUrl,
      previewUrl: store.base44LinkForm.previewUrl || customer?.base44?.previewUrl,
    },
  };
  const previewUrl = resolveBase44PreviewUrl(
    customerWithBase44Form,
    store.base44LinkForm.previewUrl
  );
  const isBusy =
    store.isLinkingBase44 ||
    store.isStartingBuildFlow ||
    store.isUpdatingWorkflow;
  const hasExistingDeployment = Boolean(customer?.deployment?.deploymentId);
  const publishLabel = hasExistingDeployment
    ? isCustomerLive(customer)
      ? "Herdeploy"
      : "Publiceren / herstellen"
    : "Publiceren";

  return (
    <Card
      style={{
        background: "#ffffff",
      }}
    >
      <SectionTitle
        title="Base44 export & publicatie"
        subtitle="Koppel Base44 en publiceer naar AWS."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        <Field label="Base44 app ID">
          <Input
            value={store.base44LinkForm.appId}
            onChange={(e) => store.updateBase44LinkForm("appId", e.target.value)}
            placeholder="69b9b443c57eefc3d3bfafbf"
          />
        </Field>

        <Field label="App naam">
          <Input
            value={store.base44LinkForm.appName}
            onChange={(e) => store.updateBase44LinkForm("appName", e.target.value)}
            placeholder="De Gouden Kapper"
          />
        </Field>

        <Field label="Editor URL">
          <Input
            value={store.base44LinkForm.editorUrl}
            onChange={(e) => store.updateBase44LinkForm("editorUrl", e.target.value)}
            placeholder="https://app.base44.com/apps/..."
          />
        </Field>

        <Field label="Publieke Base44 URL">
          <Input
            value={store.base44LinkForm.previewUrl}
            onChange={(e) => store.updateBase44LinkForm("previewUrl", e.target.value)}
            placeholder="https://nature-heals-denbosch.base44.app"
          />
        </Field>

        <Field label="Niche">
          <Input
            value={store.base44LinkForm.niche}
            onChange={(e) => store.updateBase44LinkForm("niche", e.target.value)}
            placeholder="Kapper"
          />
        </Field>

        <Field label="Template key">
          <Input
            value={store.base44LinkForm.templateKey}
            onChange={(e) => store.updateBase44LinkForm("templateKey", e.target.value)}
            placeholder="barbershop-v1"
          />
        </Field>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Base44 project ID">
            <Input
              value={store.contentSyncForm.projectId}
              onChange={(e) => store.updateContentSyncForm("projectId", e.target.value)}
              placeholder="Base44 app ID of project ID"
            />
          </Field>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="GitHub repo URL">
            <Input
              value={store.contentSyncForm.repositoryUrl}
              onChange={(e) => store.updateContentSyncForm("repositoryUrl", e.target.value)}
              placeholder="https://github.com/vedantix/nature-healing"
            />
          </Field>
        </div>

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button
            tone="soft"
            onClick={() => store.linkBase44App(customer)}
            disabled={isBusy || !customer?.id || !store.base44LinkForm.appId}
          >
            Base44 koppelen
          </Button>

          <Button
            tone="soft"
            onClick={() => store.startBuildFlow(customer)}
            disabled={isBusy || !customer?.base44?.appId}
          >
            Buildflow starten
          </Button>

          <Button
            tone="primary"
            onClick={() => store.markPreviewReady(customer)}
            disabled={
              isBusy ||
              !canMarkPreviewReady(customer) ||
              !previewUrl
            }
          >
            Preview klaarzetten
          </Button>

          <Button
            tone="success"
            onClick={() => store.approveCustomerForProduction(customer)}
            disabled={isBusy || !canApproveCustomer(customerWithBase44Form)}
          >
            Goedkeuren
          </Button>

          <Button
            tone="success"
            onClick={() => store.deployCustomer(customer)}
            disabled={isBusy || !canDeployCustomer(customer)}
          >
            {publishLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
