import React from "react";

import { Button, Card, Field, Input, SectionTitle, Textarea } from "../components/AdminUI";
import {
  canApproveCustomer,
  canDeployCustomer,
  canManageDeployment,
  canMarkPreviewReady,
  canStartBuildFlow,
} from "./customerWorkflow";

export default function Base44WorkflowSection({ store }) {
  const customer = store.selectedCustomer;

  return (
    <Card
      style={{
        background:
          "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(255,255,255,0.9) 100%)",
      }}
    >
      <SectionTitle
        title="Base44 + GitHub workflow"
        subtitle="Production flow: buildverzoek opslaan, app handmatig koppelen, daarna sync en preview."
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Button
              tone="primary"
              onClick={() => store.startBuildFlow(customer)}
              disabled={store.isStartingBuildFlow || !canStartBuildFlow(customer)}
            >
              {store.isStartingBuildFlow ? "Bezig..." : "Start sync + previewflow"}
            </Button>
            {customer.base44?.editorUrl ? (
              <Button tone="soft" onClick={() => store.openBase44Editor(customer)}>
                Open editor
              </Button>
            ) : null}
            {customer.preview?.fullUrl ? (
              <Button
                onClick={() =>
                  window.open(customer.preview.fullUrl, "_blank", "noopener,noreferrer")
                }
              >
                Open preview
              </Button>
            ) : null}
          </div>
        }
      />

      <div
        style={{
          marginBottom: 14,
          padding: 14,
          borderRadius: 16,
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e3a8a",
          lineHeight: 1.6,
          fontSize: 14,
        }}
      >
        <strong>Flow:</strong> eerst bouwverzoek opslaan, daarna app in Base44 maken of klonen, vervolgens hieronder de app koppelen. Zodra de app gekoppeld is kun je content syncen, preview klaarzetten en daarna live deployen.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
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

        <Field label="Preview URL">
          <Input
            value={store.base44LinkForm.previewUrl}
            onChange={(e) => store.updateBase44LinkForm("previewUrl", e.target.value)}
            placeholder="https://preview...."
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
          <Field label="Build prompt">
            <Textarea
              value={store.base44LinkForm.requestedPrompt}
              onChange={(e) => store.updateBase44LinkForm("requestedPrompt", e.target.value)}
              placeholder="Prompt voor deze klantwebsite..."
            />
          </Field>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Project ID voor GitHub sync">
            <Input
              value={store.contentSyncForm.projectId}
              onChange={(e) => store.updateContentSyncForm("projectId", e.target.value)}
              placeholder="Base44 app ID of project ID"
            />
          </Field>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="index.html export">
            <Textarea
              value={store.contentSyncForm.indexHtml}
              onChange={(e) => store.updateContentSyncForm("indexHtml", e.target.value)}
              placeholder="<html>...</html>"
              rows={10}
            />
          </Field>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Extra files JSON">
            <Textarea
              value={store.contentSyncForm.additionalFilesJson}
              onChange={(e) =>
                store.updateContentSyncForm("additionalFilesJson", e.target.value)
              }
              placeholder='[{"path":"assets/app.js","content":"console.log(\"hi\")","encoding":"utf-8"}]'
              rows={6}
            />
          </Field>
        </div>

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button
              tone="soft"
              onClick={() => store.autoCreateBase44App(customer)}
              disabled={store.isAutoCreatingBase44}
            >
              {store.isAutoCreatingBase44 ? "Bezig..." : "Bouwverzoek opslaan"}
            </Button>

            <Button
              tone="primary"
              onClick={() => store.linkBase44App(customer)}
              disabled={store.isLinkingBase44 || !store.base44LinkForm.appId.trim()}
            >
              {store.isLinkingBase44 ? "Bezig..." : "Base44 app koppelen"}
            </Button>

            <Button
              tone="soft"
              onClick={() => store.startBuildFlow(customer)}
              disabled={store.isStartingBuildFlow || !canStartBuildFlow(customer)}
            >
              {store.isStartingBuildFlow ? "Bezig..." : "Start sync + previewflow"}
            </Button>

            <Button
              tone="soft"
              onClick={() => store.syncCustomerContent(customer)}
              disabled={store.isSyncingContent || !store.contentSyncForm.indexHtml.trim()}
            >
              {store.isSyncingContent ? "Bezig..." : "Sync naar GitHub"}
            </Button>

            <Button
              onClick={() => store.markPreviewReady(customer)}
              disabled={store.isUpdatingWorkflow || !canMarkPreviewReady(customer)}
            >
              {store.isUpdatingWorkflow ? "Bezig..." : "Preview klaarzetten"}
            </Button>

            <Button
              onClick={() => store.approveCustomerForProduction(customer)}
              disabled={store.isUpdatingWorkflow || !canApproveCustomer(customer)}
            >
              {store.isUpdatingWorkflow ? "Bezig..." : "Klant akkoord"}
            </Button>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button
              tone="soft"
              onClick={() => store.runAutoRefreshCycle()}
              disabled={store.isAutoRefreshing}
            >
              {store.isAutoRefreshing ? "Verversen..." : "Status verversen"}
            </Button>

            {canManageDeployment(customer) ? (
              <Button
                tone="soft"
                onClick={() => store.redeployCustomer(customer)}
                disabled={store.isUpdatingWorkflow}
              >
                {store.isUpdatingWorkflow ? "Bezig..." : "Redeploy"}
              </Button>
            ) : null}

            {canManageDeployment(customer) ? (
              <Button
                tone="danger"
                onClick={() => store.rollbackCustomer(customer)}
                disabled={store.isUpdatingWorkflow}
              >
                {store.isUpdatingWorkflow ? "Bezig..." : "Rollback"}
              </Button>
            ) : null}

            <Button
              tone="success"
              onClick={() => store.deployCustomer(customer)}
              disabled={store.isUpdatingWorkflow || !canDeployCustomer(customer)}
            >
              {store.isUpdatingWorkflow ? "Bezig..." : "Site live zetten"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
