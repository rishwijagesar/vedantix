import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bot,
  FileJson,
  FileSpreadsheet,
  FileText,
  Play,
  RefreshCw,
  Search,
  UploadCloud,
} from "lucide-react";

import { fetchCustomers } from "../../../api/customers.api";
import {
  downloadMigrationReport,
  migrationsApi,
} from "../../../api/migrations.api";
import {
  Button,
  Card,
  Field,
  Input,
  SectionTitle,
  Select,
  StatCard,
} from "../components/AdminUI";
import {
  notifyError,
  notifySuccess,
} from "../utils/adminNotifications";

const emptyDraft = {
  customerId: "",
  sourceUrl: "",
  targetUrl: "",
  industry: "",
};

function statusTone(status) {
  if (["ANALYZED", "READY_FOR_IMPORT", "IMPORTED"].includes(status)) return "green";
  if (status === "FAILED") return "red";
  if (["RUNNING", "IMPROVING", "QUEUED"].includes(status)) return "blue";
  return "amber";
}

function StatusPill({ status }) {
  const tone = statusTone(status);
  const styles = {
    green: { bg: "#ecfdf5", color: "#047857", border: "#a7f3d0" },
    red: { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
    blue: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    amber: { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  };
  const style = styles[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${style.border}`,
        background: style.bg,
        color: style.color,
        borderRadius: 999,
        padding: "4px 8px",
        fontSize: 11,
        fontWeight: 900,
      }}
    >
      {status || "—"}
    </span>
  );
}

function IconButton({ icon: Icon, children, ...props }) {
  return (
    <Button
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        whiteSpace: "nowrap",
        ...(props.style || {}),
      }}
    >
      <Icon size={15} />
      {children}
    </Button>
  );
}

function fmtDate(value) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

function scoreColor(value) {
  const score = Number(value || 0);
  if (score >= 80) return "#059669";
  if (score >= 55) return "#d97706";
  return "#dc2626";
}

function ProgressBar({ value }) {
  const progress = Math.max(0, Math.min(Number(value || 0), 100));
  return (
    <div
      style={{
        width: "100%",
        height: 8,
        borderRadius: 999,
        background: "#e2e8f0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          borderRadius: 999,
          background: progress >= 90 ? "#10b981" : "#2563eb",
        }}
      />
    </div>
  );
}

function MigrationDashboard({ migrations, onRefresh, isLoading }) {
  const navigate = useNavigate();
  const stats = useMemo(() => {
    const running = migrations.filter((item) =>
      ["QUEUED", "RUNNING", "IMPROVING"].includes(item.status)
    ).length;
    const completed = migrations.filter((item) =>
      ["ANALYZED", "READY_FOR_IMPORT", "IMPORTED"].includes(item.status)
    ).length;
    const failed = migrations.filter((item) => item.status === "FAILED").length;
    return { total: migrations.length, running, completed, failed };
  }, [migrations]);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <SectionTitle
          title="Website Migrator"
          subtitle="Analyseer oude websites, verbeter content met AI en maak import-payloads voor nieuwe Vedantix websites."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <IconButton icon={RefreshCw} onClick={onRefresh} disabled={isLoading}>
                Verversen
              </IconButton>
              <IconButton icon={Play} tone="primary" onClick={() => navigate("/admin/migrations/new")}>
                Nieuwe migratie
              </IconButton>
            </div>
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12 }}>
          <StatCard title="Total Migrations" value={stats.total} subtitle="Alle scans" />
          <StatCard title="Running" value={stats.running} subtitle="Actief" tone="#2563eb" />
          <StatCard title="Completed" value={stats.completed} subtitle="Analyse klaar" tone="#059669" />
          <StatCard title="Failed" value={stats.failed} subtitle="Aandacht nodig" tone="#dc2626" />
        </div>
      </Card>

      <Card>
        <SectionTitle title="Migraties" subtitle="Klik op een migratie om analyse, AI review en rapportage te bekijken." />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 980, borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Customer", "Website", "Status", "Progress", "Scores", "Gestart", "Actions"].map((header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      color: "#64748b",
                      fontSize: 11,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #dbe4ef",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {migrations.map((migration) => (
                <tr
                  key={migration.migrationId}
                  onClick={() => navigate(`/admin/migrations/${migration.migrationId}`)}
                  style={{ cursor: "pointer", borderBottom: "1px solid #edf2f7" }}
                >
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: 900, color: "#0f172a" }}>
                      {migration.customerName || migration.customerId}
                    </div>
                    <div style={{ color: "#64748b", fontWeight: 700 }}>{migration.customerId}</div>
                  </td>
                  <td style={{ padding: "12px", maxWidth: 260 }}>
                    <div style={{ color: "#0f172a", fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {migration.sourceUrl}
                    </div>
                    <div style={{ color: "#64748b" }}>{migration.targetUrl || "Geen doelwebsite"}</div>
                  </td>
                  <td style={{ padding: "12px" }}><StatusPill status={migration.status} /></td>
                  <td style={{ padding: "12px", width: 170 }}>
                    <ProgressBar value={migration.progress} />
                    <div style={{ marginTop: 5, color: "#64748b", fontWeight: 800 }}>{migration.progress || 0}%</div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: 900, color: scoreColor(migration.coverageScore) }}>
                      Coverage {migration.coverageScore || 0}
                    </div>
                    <div style={{ color: scoreColor(migration.seoScore), fontWeight: 900 }}>
                      SEO {migration.seoScore || 0}
                    </div>
                  </td>
                  <td style={{ padding: "12px", color: "#64748b" }}>{fmtDate(migration.startedAt || migration.createdAt)}</td>
                  <td style={{ padding: "12px" }}>
                    <Button tone="soft" onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/admin/migrations/${migration.migrationId}`);
                    }}>
                      Bekijken
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {migrations.length === 0 ? (
            <div style={{ padding: 22, textAlign: "center", color: "#64748b" }}>
              Nog geen migraties.
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function MigrationWizard({ customers, onCreated }) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState(emptyDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCustomer = customers.find((customer) => customer.id === draft.customerId);

  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (!draft.customerId) return notifyError("Selecteer eerst een klant.");
    if (!draft.sourceUrl) return notifyError("Old Website URL is verplicht.");
    setIsSubmitting(true);
    try {
      const result = await migrationsApi.start({
        ...draft,
        customerName: selectedCustomer?.companyName,
        targetUrl: draft.targetUrl || (selectedCustomer?.domain ? `https://${selectedCustomer.domain}` : ""),
      });
      notifySuccess("Website analyse is gestart en opgeslagen.");
      onCreated?.(result);
      navigate(`/admin/migrations/${result.migration.migrationId}`);
    } catch (error) {
      notifyError(error.message || "Migratie starten is mislukt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <SectionTitle
        title="Nieuwe migratie"
        subtitle="Vul de oude website en doelwebsite in. De crawler ontdekt pagina’s, content, CTA’s, FAQ’s en SEO metadata."
        action={<Button onClick={() => navigate("/admin/migrations")}>Terug</Button>}
      />
      <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 12 }}>
          <Field label="Customer">
            <Select value={draft.customerId} onChange={(event) => {
              const customerId = event.target.value;
              const customer = customers.find((item) => item.id === customerId);
              setDraft((current) => ({
                ...current,
                customerId,
                targetUrl: customer?.domain ? `https://${customer.domain}` : current.targetUrl,
                industry: customer?.base44?.niche || current.industry,
              }));
            }}>
              <option value="">Selecteer klant</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName || customer.id}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Industry">
            <Input value={draft.industry} onChange={(event) => update("industry", event.target.value)} placeholder="Personal Training" />
          </Field>
          <Field label="Old Website URL">
            <Input value={draft.sourceUrl} onChange={(event) => update("sourceUrl", event.target.value)} placeholder="https://www.jitansports.com" />
          </Field>
          <Field label="Target Website">
            <Input value={draft.targetUrl} onChange={(event) => update("targetUrl", event.target.value)} placeholder="https://jitan-sports.nl" />
          </Field>
        </div>
        <div>
          <IconButton icon={Search} type="submit" tone="primary" disabled={isSubmitting}>
            {isSubmitting ? "Analyseren..." : "Start Analyse"}
          </IconButton>
        </div>
      </form>
    </Card>
  );
}

function PageExplorer({ pages, selectedPageId, onSelect }) {
  return (
    <Card>
      <SectionTitle title="Page Explorer" subtitle={`${pages.length} gevonden pagina’s`} />
      <div style={{ display: "grid", gap: 8 }}>
        {pages.map((page) => (
          <button
            key={page.pageId}
            type="button"
            onClick={() => onSelect(page.pageId)}
            style={{
              textAlign: "left",
              border: "1px solid #dbe4ef",
              background: selectedPageId === page.pageId ? "#eff6ff" : "#ffffff",
              borderRadius: 10,
              padding: 10,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <strong style={{ color: "#0f172a" }}>{page.h1 || page.title || page.pathname}</strong>
              <span style={{ color: scoreColor(page.contentCoverage), fontWeight: 900 }}>
                {page.contentCoverage}%
              </span>
            </div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{page.pageUrl}</div>
          </button>
        ))}
      </div>
    </Card>
  );
}

function ContentComparison({ page }) {
  if (!page) return null;
  const improvement = page.aiImprovement;
  return (
    <Card>
      <SectionTitle
        title={page.h1 || page.title || page.pathname}
        subtitle="OLD WEBSITE vs AI Improved Content"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14 }}>
        <div>
          <h3 style={{ margin: "0 0 10px", fontSize: 13, color: "#64748b", textTransform: "uppercase" }}>Old website</h3>
          <div style={{ display: "grid", gap: 10 }}>
            <StatCard title="Sections" value={page.sections?.length || 0} subtitle="Oude site" />
            <StatCard title="FAQ" value={page.faqs?.length || 0} subtitle="Gevonden vragen" tone="#7c3aed" />
            <StatCard title="CTA" value={page.ctas?.length || 0} subtitle="Conversie acties" tone="#f97316" />
          </div>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {(page.sections || []).slice(0, 5).map((section, index) => (
              <div key={`${section.heading || "section"}-${index}`} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 10 }}>
                <strong>{section.heading || `Sectie ${index + 1}`}</strong>
                <p style={{ margin: "6px 0 0", color: "#475569", lineHeight: 1.45 }}>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ margin: "0 0 10px", fontSize: 13, color: "#64748b", textTransform: "uppercase" }}>AI improved</h3>
          {improvement ? (
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ border: "1px solid #dbeafe", background: "#eff6ff", borderRadius: 10, padding: 10 }}>
                <strong>{improvement.heroTitle || "Geen hero titel"}</strong>
                <p style={{ margin: "6px 0 0", color: "#475569" }}>{improvement.heroSubtitle}</p>
              </div>
              {(improvement.improvedSections || []).slice(0, 6).map((section, index) => (
                <div key={`${section.heading || "improved"}-${index}`} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 10 }}>
                  <strong>{section.heading || `Verbeterde sectie ${index + 1}`}</strong>
                  <p style={{ margin: "6px 0 0", color: "#475569", lineHeight: 1.45 }}>{section.body}</p>
                </div>
              ))}
              {improvement.notes?.length ? (
                <div style={{ color: "#64748b", fontSize: 12 }}>{improvement.notes.join(" ")}</div>
              ) : null}
            </div>
          ) : (
            <div style={{ border: "1px dashed #cbd5e1", borderRadius: 10, padding: 18, color: "#64748b" }}>
              Start AI verbetering om geoptimaliseerde content te bekijken.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function MigrationDetail({ detail, onReload }) {
  const [selectedPageId, setSelectedPageId] = useState("");
  const [isActioning, setIsActioning] = useState("");
  const navigate = useNavigate();
  const migration = detail?.migration;
  const pages = detail?.pages || [];
  const report = detail?.report;
  const selectedPage = pages.find((page) => page.pageId === selectedPageId) || pages[0];

  useEffect(() => {
    if (!selectedPageId && pages[0]?.pageId) setSelectedPageId(pages[0].pageId);
  }, [pages, selectedPageId]);

  async function runAction(name, fn, success) {
    setIsActioning(name);
    try {
      await fn();
      notifySuccess(success);
      await onReload();
    } catch (error) {
      notifyError(error.message || "Actie mislukt.");
    } finally {
      setIsActioning("");
    }
  }

  if (!migration) return null;

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <SectionTitle
          title={`Migratie - ${migration.customerName || migration.customerId}`}
          subtitle={`${migration.sourceUrl} → ${migration.targetUrl || "doelwebsite onbekend"}`}
          action={<Button onClick={() => navigate("/admin/migrations")}>Terug naar migraties</Button>}
        />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
          <StatusPill status={migration.status} />
          <strong style={{ color: "#64748b" }}>Progress {migration.progress || 0}%</strong>
          <div style={{ width: 220 }}><ProgressBar value={migration.progress} /></div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <IconButton icon={RefreshCw} onClick={() => runAction("analyze", () => migrationsApi.analyze(migration.migrationId), "Analyse opnieuw gestart.")} disabled={isActioning}>
            Heranalyse
          </IconButton>
          <IconButton icon={Bot} tone="primary" onClick={() => runAction("ai", () => migrationsApi.improve(migration.migrationId), "AI verbetering is verwerkt.")} disabled={isActioning || pages.length === 0}>
            AI verbeteren
          </IconButton>
          <IconButton icon={UploadCloud} tone="success" onClick={() => runAction("import", () => migrationsApi.importPayload(migration.migrationId), "Import-payload is gegenereerd.")} disabled={isActioning || pages.length === 0}>
            Importeer Naar Website
          </IconButton>
          <IconButton icon={FileText} onClick={() => downloadMigrationReport(migration.migrationId, "pdf")} disabled={!report}>
            PDF
          </IconButton>
          <IconButton icon={FileSpreadsheet} onClick={() => downloadMigrationReport(migration.migrationId, "xlsx")} disabled={!report}>
            Excel
          </IconButton>
          <IconButton icon={FileJson} onClick={() => downloadMigrationReport(migration.migrationId, "json")} disabled={!report}>
            JSON
          </IconButton>
        </div>
        {migration.lastError ? (
          <div style={{ marginTop: 12, border: "1px solid #fecaca", color: "#b91c1c", background: "#fef2f2", borderRadius: 10, padding: 10, fontWeight: 800 }}>
            {migration.lastError}
          </div>
        ) : null}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 12 }}>
        <StatCard title="Pages Found" value={migration.counts?.pages || 0} subtitle="Pagina’s" />
        <StatCard title="Images Found" value={migration.counts?.images || 0} subtitle="Afbeeldingen" tone="#7c3aed" />
        <StatCard title="FAQ Found" value={migration.counts?.faqs || 0} subtitle="Vragen" tone="#2563eb" />
        <StatCard title="CTA Found" value={migration.counts?.ctas || 0} subtitle="Acties" tone="#f97316" />
        <StatCard title="SEO Score" value={`${migration.seoScore || 0}/100`} subtitle="Gemiddeld" tone={scoreColor(migration.seoScore)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px minmax(0,1fr)", gap: 14, alignItems: "start" }}>
        <PageExplorer pages={pages} selectedPageId={selectedPage?.pageId} onSelect={setSelectedPageId} />
        <ContentComparison page={selectedPage} />
      </div>

      <Card>
        <SectionTitle title="Migration Report" subtitle="Coverage, SEO bevindingen en aanbevolen verbeteringen." />
        {report ? (
          <div style={{ display: "grid", gap: 12 }}>
            <p style={{ margin: 0, color: "#334155", lineHeight: 1.5 }}>{report.executiveSummary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}>
              <div>
                <strong>Missing Content</strong>
                <ul style={{ margin: "8px 0 0", color: "#475569" }}>
                  {(report.missingContent || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <strong>Recommendations</strong>
                <ul style={{ margin: "8px 0 0", color: "#475569" }}>
                  {(report.recommendations || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: "#64748b" }}>Nog geen rapport beschikbaar.</div>
        )}
      </Card>
    </div>
  );
}

export default function MigrationsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [migrations, setMigrations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mode = params.migrationId ? "detail" : window.location.pathname.endsWith("/new") ? "new" : "dashboard";

  async function loadBase() {
    setIsLoading(true);
    try {
      const [nextMigrations, nextCustomers] = await Promise.all([
        migrationsApi.list(),
        fetchCustomers({ apiKey: undefined }),
      ]);
      setMigrations(nextMigrations || []);
      setCustomers(nextCustomers || []);
    } catch (error) {
      notifyError(error.message || "Migraties laden is mislukt.");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadDetail() {
    if (!params.migrationId) return;
    setIsLoading(true);
    try {
      const nextDetail = await migrationsApi.detail(params.migrationId);
      setDetail(nextDetail);
    } catch (error) {
      notifyError(error.message || "Migratie laden is mislukt.");
      navigate("/admin/migrations");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadBase();
  }, []);

  useEffect(() => {
    if (params.migrationId) void loadDetail();
  }, [params.migrationId]);

  if (mode === "new") {
    return (
      <MigrationWizard
        customers={customers}
        onCreated={() => {
          void loadBase();
        }}
      />
    );
  }

  if (mode === "detail") {
    return <MigrationDetail detail={detail} onReload={loadDetail} />;
  }

  return (
    <MigrationDashboard
      migrations={migrations}
      onRefresh={loadBase}
      isLoading={isLoading}
    />
  );
}
