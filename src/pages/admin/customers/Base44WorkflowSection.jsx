import React from "react";
import { Github, RefreshCw } from "lucide-react";

import { Button, Card, Field, Input, SectionTitle, Textarea } from "../components/AdminUI";
import {
  canApproveCustomer,
  canDeployCustomer,
  canMarkPreviewReady,
  resolveBase44PreviewUrl,
} from "./customerWorkflow";

export default function Base44WorkflowSection({ store }) {
  const customer = store.selectedCustomer;
  const githubRepo = customer?.contentSync?.repositoryName || "";
  const githubSynced = Boolean(
    customer?.contentSync?.status === "SYNCED" && githubRepo
  );
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
    store.isSyncingContent ||
    store.isStartingBuildFlow ||
    store.isUpdatingWorkflow;
  const canSyncGithub = Boolean(
    customer?.base44?.appId && store.contentSyncForm.indexHtml.trim()
  );

  return (
    <Card
      style={{
        background: "#ffffff",
      }}
    >
      <SectionTitle
        title="Base44 + GitHub workflow"
        subtitle="Build, content sync en previewvelden."
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

        <div
          style={{
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 12,
            alignItems: "center",
            border: "1px solid #dbeafe",
            background: githubSynced ? "#f0fdf4" : "#eff6ff",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: githubSynced ? "#047857" : "#1d4ed8",
                fontSize: 11,
                fontWeight: 900,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              <Github size={15} />
              {githubSynced ? "GitHub gekoppeld" : "GitHub koppeling"}
            </div>
            <div
              style={{
                color: "#0f172a",
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={githubRepo}
            >
              {githubRepo || "Nog geen GitHub repo gekoppeld"}
            </div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 3 }}>
              Plak de Base44 index.html export hieronder en koppel daarna met GitHub.
            </div>
          </div>

          <Button
            tone={githubSynced ? "soft" : "primary"}
            onClick={() => store.syncCustomerContent(customer)}
            disabled={isBusy || !canSyncGithub}
            style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
          >
            {githubSynced ? <RefreshCw size={15} /> : <Github size={15} />}
            {githubSynced ? "Opnieuw syncen" : "GitHub koppelen"}
          </Button>
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
            tone="soft"
            onClick={() => store.syncCustomerContent(customer)}
            disabled={
              isBusy ||
              !customer?.base44?.appId ||
              !store.contentSyncForm.indexHtml.trim()
            }
          >
            GitHub koppelen
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
            Publiceren
          </Button>
        </div>
      </div>
    </Card>
  );
}
