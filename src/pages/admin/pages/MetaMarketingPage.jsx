import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Copy,
  Facebook,
  Lightbulb,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { metaMarketingApi } from "../../../api/metaMarketing.api";
import { Button, Card, Field, Input, SectionTitle, Select, StatCard, Textarea } from "../components/AdminUI";
import { notifyError, notifySuccess } from "../utils/adminNotifications";

const money = (value) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(Number(value || 0));

const number = (value) => new Intl.NumberFormat("nl-NL").format(Number(value || 0));

const defaultCampaign = {
  name: "",
  objective: "OUTCOME_LEADS",
  status: "PAUSED",
  dailyBudget: 25,
  monthlyBudget: 750,
  notes: "",
};

const defaultAdSet = {
  campaignId: "",
  name: "",
  dailyBudget: 25,
  ageMin: 24,
  ageMax: 60,
  countries: "NL",
  interests: "webdesign, seo, automatisering",
};

const defaultCreative = {
  type: "IMAGE",
  name: "",
  imageUrl: "",
  videoUrl: "",
  landingPageUrl: "https://www.vedantix.nl",
  headline: "",
  description: "",
  primaryText: "",
  callToAction: "LEARN_MORE",
};

const defaultAd = {
  adSetId: "",
  creativeId: "",
  name: "",
  status: "PAUSED",
};

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

function ChartCard({ title, data, dataKey, stroke = "#2563eb" }) {
  return (
    <Card>
      <div style={{ fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>{title}</div>
      <div style={{ width: "100%", height: 190 }}>
        <ResponsiveContainer>
          <LineChart data={data || []}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function StatusPill({ children, tone = "soft" }) {
  const styles = {
    soft: { background: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    green: { background: "#ecfdf5", color: "#047857", border: "#a7f3d0" },
    red: { background: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
    amber: { background: "#fffbeb", color: "#b45309", border: "#fde68a" },
  };
  const style = styles[tone] || styles.soft;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        borderRadius: 999,
        padding: "4px 8px",
        fontSize: 11,
        fontWeight: 900,
      }}
    >
      {children}
    </span>
  );
}

export default function MetaMarketingPage() {
  const [connection, setConnection] = useState(null);
  const [assets, setAssets] = useState({ businesses: [], adAccounts: [], pages: [], instagramAccounts: [] });
  const [dashboard, setDashboard] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [adSets, setAdSets] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [ads, setAds] = useState([]);
  const [leads, setLeads] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [campaignDraft, setCampaignDraft] = useState(defaultCampaign);
  const [adSetDraft, setAdSetDraft] = useState(defaultAdSet);
  const [creativeDraft, setCreativeDraft] = useState(defaultCreative);
  const [adDraft, setAdDraft] = useState(defaultAd);
  const [assistantDraft, setAssistantDraft] = useState({
    offer: "Websites, SEO, AI automatisering en marketing services voor lokale ondernemers",
    audience: "Nederlandse MKB ondernemers die meer leads willen",
    goal: "Plan een strategiegesprek",
  });
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isConnected = connection?.status === "CONNECTED";
  const selectedPageInstagram = useMemo(() => {
    const selectedPage = assets.pages?.find((page) => page.id === connection?.pageId);
    return selectedPage?.instagram_business_account;
  }, [assets.pages, connection?.pageId]);

  async function loadAll({ silent = false } = {}) {
    setIsLoading(true);
    try {
      const [nextConnection, nextDashboard, nextCampaigns, nextAdSets, nextCreatives, nextAds, nextLeads, nextRecommendations] =
        await Promise.all([
          metaMarketingApi.getConnection(),
          metaMarketingApi.dashboard(),
          metaMarketingApi.listCampaigns(),
          metaMarketingApi.listAdSets(),
          metaMarketingApi.listCreatives(),
          metaMarketingApi.listAds(),
          metaMarketingApi.listLeads(),
          metaMarketingApi.listRecommendations(),
        ]);
      setConnection(nextConnection);
      setDashboard(nextDashboard);
      setCampaigns(nextCampaigns || []);
      setAdSets(nextAdSets || []);
      setCreatives(nextCreatives || []);
      setAds(nextAds || []);
      setLeads(nextLeads || []);
      setRecommendations(nextRecommendations || []);
    } catch (error) {
      if (!silent) notifyError(error.message || "Meta marketing laden is mislukt.");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAssets() {
    try {
      const nextAssets = await metaMarketingApi.listAssets();
      setAssets(nextAssets || {});
      notifySuccess("Meta assets opgehaald.");
    } catch (error) {
      notifyError(error.message || "Meta assets ophalen is mislukt.");
    }
  }

  useEffect(() => {
    void loadAll({ silent: true });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;
    void (async () => {
      try {
        await metaMarketingApi.completeOAuth({
          code,
          redirectUri: `${window.location.origin}/admin/meta`,
        });
        window.history.replaceState({}, "", "/admin/meta");
        notifySuccess("Meta OAuth is gekoppeld.");
        await loadAll({ silent: true });
        await loadAssets();
      } catch (error) {
        notifyError(error.message || "Meta OAuth koppelen is mislukt.");
      }
    })();
  }, []);

  async function connectMeta() {
    try {
      const result = await metaMarketingApi.getOAuthUrl(`${window.location.origin}/admin/meta`);
      window.location.href = result.url;
    } catch (error) {
      notifyError(error.message || "Meta OAuth URL ophalen is mislukt.");
    }
  }

  async function saveAssets() {
    try {
      const page = assets.pages?.find((item) => item.id === connection?.pageId);
      await metaMarketingApi.selectAssets({
        businessId: connection?.businessId,
        adAccountId: connection?.adAccountId,
        pageId: connection?.pageId,
        pageName: page?.name,
        instagramId: selectedPageInstagram?.id || connection?.instagramId,
        instagramUsername: selectedPageInstagram?.username || connection?.instagramUsername,
        pixelId: connection?.pixelId,
      });
      notifySuccess("Meta assets opgeslagen.");
      await loadAll({ silent: true });
    } catch (error) {
      notifyError(error.message || "Meta assets opslaan is mislukt.");
    }
  }

  async function createCampaign() {
    try {
      await metaMarketingApi.createCampaign(campaignDraft);
      setCampaignDraft(defaultCampaign);
      notifySuccess("Campagne aangemaakt.");
      await loadAll({ silent: true });
    } catch (error) {
      notifyError(error.message || "Campagne aanmaken is mislukt.");
    }
  }

  async function createAdSet() {
    try {
      await metaMarketingApi.createAdSet({
        ...adSetDraft,
        targeting: {
          ageMin: Number(adSetDraft.ageMin || 18),
          ageMax: Number(adSetDraft.ageMax || 65),
          countries: String(adSetDraft.countries || "NL").split(",").map((item) => item.trim()).filter(Boolean),
          interests: String(adSetDraft.interests || "").split(",").map((name) => ({ name: name.trim() })).filter((item) => item.name),
          placements: ["facebook_feed", "instagram_feed", "facebook_stories", "instagram_stories", "facebook_reels", "instagram_reels"],
        },
      });
      setAdSetDraft(defaultAdSet);
      notifySuccess("Ad set aangemaakt.");
      await loadAll({ silent: true });
    } catch (error) {
      notifyError(error.message || "Ad set aanmaken is mislukt.");
    }
  }

  async function createCreative() {
    try {
      await metaMarketingApi.createCreative(creativeDraft);
      setCreativeDraft(defaultCreative);
      notifySuccess("Creative aangemaakt.");
      await loadAll({ silent: true });
    } catch (error) {
      notifyError(error.message || "Creative aanmaken is mislukt.");
    }
  }

  async function createAd() {
    try {
      await metaMarketingApi.createAd(adDraft);
      setAdDraft(defaultAd);
      notifySuccess("Ad aangemaakt.");
      await loadAll({ silent: true });
    } catch (error) {
      notifyError(error.message || "Ad aanmaken is mislukt.");
    }
  }

  async function syncInsights() {
    const until = new Date().toISOString().slice(0, 10);
    const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    try {
      await metaMarketingApi.syncInsights({ since, until, level: "campaign" });
      notifySuccess("Meta insights gesynchroniseerd.");
      await loadAll({ silent: true });
    } catch (error) {
      notifyError(error.message || "Meta insights synchroniseren is mislukt.");
    }
  }

  async function generateVariants() {
    try {
      const result = await metaMarketingApi.generateAdVariants(assistantDraft);
      setVariants(result || []);
      notifySuccess("AI advertentievarianten gegenereerd.");
    } catch (error) {
      notifyError(error.message || "AI varianten genereren is mislukt.");
    }
  }

  async function generateRecommendations() {
    try {
      const result = await metaMarketingApi.generateRecommendations();
      setRecommendations(result || []);
      notifySuccess("Aanbevelingen gegenereerd.");
    } catch (error) {
      notifyError(error.message || "Aanbevelingen genereren is mislukt.");
    }
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <SectionTitle
        title="Vedantix Meta Marketing"
        subtitle="Intern marketing operating system voor campagnes, leads, Pixel/CAPI en winstgevendheid."
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <IconButton icon={RefreshCw} tone="soft" onClick={() => loadAll()} disabled={isLoading}>
              Ververs
            </IconButton>
            <IconButton icon={BarChart3} tone="soft" onClick={syncInsights}>
              Insights sync
            </IconButton>
            <IconButton icon={Facebook} tone="primary" onClick={connectMeta}>
              Meta koppelen
            </IconButton>
          </div>
        }
      />

      <Card>
        <SectionTitle
          title="Meta connectie"
          subtitle="Koppel Business Manager, advertentieaccount, Facebook Page, Instagram en Pixel."
          action={<StatusPill tone={isConnected ? "green" : "amber"}>{connection?.status || "NOT_CONNECTED"}</StatusPill>}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(150px, 1fr))", gap: 10 }}>
          <Field label="Business">
            <Select value={connection?.businessId || ""} onChange={(e) => setConnection((prev) => ({ ...(prev || {}), businessId: e.target.value }))}>
              <option value="">Selecteer business</option>
              {(assets.businesses || []).map((item) => <option key={item.id} value={item.id}>{item.name || item.id}</option>)}
            </Select>
          </Field>
          <Field label="Ad account">
            <Select value={connection?.adAccountId || ""} onChange={(e) => setConnection((prev) => ({ ...(prev || {}), adAccountId: e.target.value }))}>
              <option value="">Selecteer account</option>
              {(assets.adAccounts || []).map((item) => <option key={item.id} value={item.id}>{item.name || item.id}</option>)}
            </Select>
          </Field>
          <Field label="Facebook Page">
            <Select value={connection?.pageId || ""} onChange={(e) => setConnection((prev) => ({ ...(prev || {}), pageId: e.target.value }))}>
              <option value="">Selecteer pagina</option>
              {(assets.pages || []).map((item) => <option key={item.id} value={item.id}>{item.name || item.id}</option>)}
            </Select>
          </Field>
          <Field label="Instagram">
            <Input value={selectedPageInstagram?.username || connection?.instagramUsername || ""} readOnly />
          </Field>
          <Field label="Pixel ID">
            <Input value={connection?.pixelId || ""} onChange={(e) => setConnection((prev) => ({ ...(prev || {}), pixelId: e.target.value }))} />
          </Field>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <Button tone="soft" onClick={loadAssets} disabled={!isConnected}>Assets ophalen</Button>
          <Button tone="primary" onClick={saveAssets} disabled={!isConnected}>Assets opslaan</Button>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, minmax(120px, 1fr))", gap: 10 }}>
        <StatCard title="Spend" value={money(dashboard?.spend)} subtitle="Meta spend" />
        <StatCard title="Leads" value={number(dashboard?.leads)} subtitle={`${number(dashboard?.qualifiedLeads)} qualified`} />
        <StatCard title="Customers" value={number(dashboard?.customers)} subtitle="Won" />
        <StatCard title="Revenue" value={money(dashboard?.revenue)} subtitle="Won revenue" />
        <StatCard title="Profit" value={money(dashboard?.profit)} subtitle="Revenue - spend" tone={dashboard?.profit >= 0 ? "#059669" : "#dc2626"} />
        <StatCard title="ROAS" value={number(dashboard?.roas)} subtitle="Revenue / spend" />
        <StatCard title="CPL" value={money(dashboard?.cpl)} subtitle="Spend / leads" />
        <StatCard title="CAC" value={money(dashboard?.cac)} subtitle="Spend / customers" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(180px, 1fr))", gap: 10 }}>
        <ChartCard title="Spend" data={dashboard?.charts?.spend} dataKey="value" stroke="#2563eb" />
        <ChartCard title="Leads" data={dashboard?.charts?.leads} dataKey="value" stroke="#059669" />
        <ChartCard title="Revenue" data={dashboard?.charts?.revenue} dataKey="value" stroke="#7c3aed" />
        <ChartCard title="Profit" data={dashboard?.charts?.profit} dataKey="value" stroke="#ea580c" />
        <ChartCard title="ROAS" data={dashboard?.charts?.roas} dataKey="value" stroke="#0f172a" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 12 }}>
        <Card>
          <SectionTitle title="Campagnes" subtitle="Maak, start, stop, archiveer en dupliceer Vedantix campagnes." />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 110px 110px 120px", gap: 8, marginBottom: 12 }}>
            <Input placeholder="Campagnenaam" value={campaignDraft.name} onChange={(e) => setCampaignDraft((prev) => ({ ...prev, name: e.target.value }))} />
            <Select value={campaignDraft.objective} onChange={(e) => setCampaignDraft((prev) => ({ ...prev, objective: e.target.value }))}>
              <option value="OUTCOME_LEADS">Leads</option>
              <option value="OUTCOME_TRAFFIC">Traffic</option>
              <option value="OUTCOME_SALES">Sales</option>
              <option value="OUTCOME_ENGAGEMENT">Engagement</option>
            </Select>
            <Input type="number" value={campaignDraft.dailyBudget} onChange={(e) => setCampaignDraft((prev) => ({ ...prev, dailyBudget: e.target.value }))} />
            <Input type="number" value={campaignDraft.monthlyBudget} onChange={(e) => setCampaignDraft((prev) => ({ ...prev, monthlyBudget: e.target.value }))} />
            <IconButton icon={Plus} tone="primary" onClick={createCampaign}>Campagne</IconButton>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ textAlign: "left", color: "#64748b" }}><th>Naam</th><th>Status</th><th>Budget</th><th>Meta ID</th><th>Acties</th></tr></thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.campaignId} style={{ borderTop: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px 6px", fontWeight: 900 }}>{campaign.name}</td>
                    <td><StatusPill tone={campaign.status === "ACTIVE" ? "green" : campaign.status === "ARCHIVED" ? "red" : "amber"}>{campaign.status}</StatusPill></td>
                    <td>{money(campaign.dailyBudget?.amount)}</td>
                    <td>{campaign.metaCampaignId || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <IconButton icon={Play} tone="soft" onClick={() => metaMarketingApi.startCampaign(campaign.campaignId).then(() => loadAll({ silent: true })).catch((e) => notifyError(e.message))}>Start</IconButton>
                        <IconButton icon={Pause} onClick={() => metaMarketingApi.stopCampaign(campaign.campaignId).then(() => loadAll({ silent: true })).catch((e) => notifyError(e.message))}>Stop</IconButton>
                        <IconButton icon={Copy} onClick={() => metaMarketingApi.duplicateCampaign(campaign.campaignId).then(() => loadAll({ silent: true })).catch((e) => notifyError(e.message))}>Dupliceer</IconButton>
                        <IconButton icon={Trash2} tone="danger" onClick={() => metaMarketingApi.archiveCampaign(campaign.campaignId).then(() => loadAll({ silent: true })).catch((e) => notifyError(e.message))}>Archiveer</IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SectionTitle title="AI marketing assistant" subtitle="Genereer advertentievarianten en campagne-aanbevelingen." />
          <div style={{ display: "grid", gap: 8 }}>
            <Textarea value={assistantDraft.offer} onChange={(e) => setAssistantDraft((prev) => ({ ...prev, offer: e.target.value }))} />
            <Input value={assistantDraft.audience} onChange={(e) => setAssistantDraft((prev) => ({ ...prev, audience: e.target.value }))} />
            <Input value={assistantDraft.goal} onChange={(e) => setAssistantDraft((prev) => ({ ...prev, goal: e.target.value }))} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <IconButton icon={Sparkles} tone="primary" onClick={generateVariants}>Varianten</IconButton>
              <IconButton icon={Lightbulb} tone="soft" onClick={generateRecommendations}>Aanbevelingen</IconButton>
            </div>
          </div>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {variants.map((variant, index) => (
              <div key={`${variant.headline}-${index}`} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 10 }}>
                <strong>{variant.headline}</strong>
                <p style={{ margin: "5px 0", color: "#475569" }}>{variant.primaryText}</p>
                <small>{variant.cta} · {variant.audienceAngle}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(240px, 1fr))", gap: 12 }}>
        <Card>
          <SectionTitle title="Ad sets" subtitle="Audience targeting, interesses, locaties en budget." />
          <div style={{ display: "grid", gap: 8 }}>
            <Select value={adSetDraft.campaignId} onChange={(e) => setAdSetDraft((prev) => ({ ...prev, campaignId: e.target.value }))}>
              <option value="">Campagne</option>
              {campaigns.map((campaign) => <option key={campaign.campaignId} value={campaign.campaignId}>{campaign.name}</option>)}
            </Select>
            <Input placeholder="Ad set naam" value={adSetDraft.name} onChange={(e) => setAdSetDraft((prev) => ({ ...prev, name: e.target.value }))} />
            <Input type="number" value={adSetDraft.dailyBudget} onChange={(e) => setAdSetDraft((prev) => ({ ...prev, dailyBudget: e.target.value }))} />
            <Input placeholder="Interesses" value={adSetDraft.interests} onChange={(e) => setAdSetDraft((prev) => ({ ...prev, interests: e.target.value }))} />
            <Button tone="primary" onClick={createAdSet}>Ad set aanmaken</Button>
          </div>
          <div style={{ marginTop: 12, display: "grid", gap: 7 }}>
            {adSets.map((item) => <div key={item.adSetId} style={{ fontSize: 13 }}><strong>{item.name}</strong> · {money(item.dailyBudget?.amount)}</div>)}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Creatives & ads" subtitle="Image/video creative, previewdata en Meta-advertentie." />
          <div style={{ display: "grid", gap: 8 }}>
            <Input placeholder="Creative naam" value={creativeDraft.name} onChange={(e) => setCreativeDraft((prev) => ({ ...prev, name: e.target.value }))} />
            <Input placeholder="Image URL" value={creativeDraft.imageUrl} onChange={(e) => setCreativeDraft((prev) => ({ ...prev, imageUrl: e.target.value }))} />
            <Input placeholder="Headline" value={creativeDraft.headline} onChange={(e) => setCreativeDraft((prev) => ({ ...prev, headline: e.target.value }))} />
            <Textarea placeholder="Primary text" value={creativeDraft.primaryText} onChange={(e) => setCreativeDraft((prev) => ({ ...prev, primaryText: e.target.value }))} />
            <Button tone="soft" onClick={createCreative}>Creative opslaan</Button>
            <Select value={adDraft.adSetId} onChange={(e) => setAdDraft((prev) => ({ ...prev, adSetId: e.target.value }))}>
              <option value="">Ad set</option>
              {adSets.map((item) => <option key={item.adSetId} value={item.adSetId}>{item.name}</option>)}
            </Select>
            <Select value={adDraft.creativeId} onChange={(e) => setAdDraft((prev) => ({ ...prev, creativeId: e.target.value }))}>
              <option value="">Creative</option>
              {creatives.map((item) => <option key={item.creativeId} value={item.creativeId}>{item.name}</option>)}
            </Select>
            <Input placeholder="Ad naam" value={adDraft.name} onChange={(e) => setAdDraft((prev) => ({ ...prev, name: e.target.value }))} />
            <Button tone="primary" onClick={createAd}>Ad aanmaken</Button>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Aanbevelingen" subtitle="AI acties met uitleg waarom." />
          <div style={{ display: "grid", gap: 8 }}>
            {recommendations.map((item) => (
              <div key={item.recommendationId} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 10 }}>
                <StatusPill tone={item.priority === "HIGH" ? "red" : item.priority === "MEDIUM" ? "amber" : "soft"}>{item.priority}</StatusPill>
                <div style={{ fontWeight: 900, marginTop: 7 }}>{item.title}</div>
                <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.45 }}>{item.explanation}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Lead management" subtitle="CRM pipeline voor Meta Lead Forms en handmatige opvolging." />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ textAlign: "left", color: "#64748b" }}><th>Lead</th><th>Status</th><th>Bron</th><th>Waarde</th><th>Acties</th></tr></thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.leadId} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "10px 6px" }}><strong>{lead.name || "Naam onbekend"}</strong><br /><span style={{ color: "#64748b" }}>{lead.email || lead.phone || "—"}</span></td>
                  <td><StatusPill tone={lead.status === "WON" ? "green" : lead.status === "LOST" ? "red" : "soft"}>{lead.status}</StatusPill></td>
                  <td>{lead.sourceCampaignName || lead.sourceCampaignId || lead.sourcePlatform || "Meta"}</td>
                  <td>{money(lead.revenue || lead.dealValue)}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST"].map((status) => (
                        <Button key={status} tone={status === "WON" ? "success" : status === "LOST" ? "danger" : "soft"} onClick={() => metaMarketingApi.updateLead(lead.leadId, { status }).then(() => loadAll({ silent: true })).catch((e) => notifyError(e.message))}>
                          {status}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
