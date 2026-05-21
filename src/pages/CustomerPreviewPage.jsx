import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, Loader2 } from "lucide-react";

import { resolveCustomerPreview } from "../api/preview.api";

const shellStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "#ffffff",
};

const topBarStyle = {
  height: 52,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "0 16px",
  background: "#0f172a",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  minHeight: 36,
  padding: "0 12px",
  borderRadius: 8,
  background: "#ffffff",
  color: "#0f172a",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
};

export default function CustomerPreviewPage() {
  const { previewSlug } = useParams();
  const [state, setState] = useState({
    loading: true,
    error: "",
    preview: null,
    customer: null,
  });

  useEffect(() => {
    let active = true;

    async function loadPreview() {
      try {
        const result = await resolveCustomerPreview(previewSlug || "");

        if (!active) return;

        setState({
          loading: false,
          error: "",
          preview: result.preview,
          customer: result.customer,
        });
      } catch (error) {
        if (!active) return;

        setState({
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Preview kon niet worden geladen.",
          preview: null,
          customer: null,
        });
      }
    }

    loadPreview();

    return () => {
      active = false;
    };
  }, [previewSlug]);

  if (state.loading) {
    return (
      <main style={shellStyle}>
        <Helmet>
          <meta name="robots" content="noindex,nofollow,noarchive" />
        </Helmet>
        <style>{`@keyframes preview-spin { to { transform: rotate(360deg); } }`}</style>
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            gap: 10,
            alignContent: "center",
          }}
        >
          <Loader2 size={24} style={{ animation: "preview-spin 1s linear infinite" }} />
          <div style={{ fontWeight: 800 }}>Preview laden</div>
        </div>
      </main>
    );
  }

  if (state.error || !state.preview?.targetUrl) {
    return (
      <main style={shellStyle}>
        <Helmet>
          <title>Preview niet beschikbaar | Vedantix</title>
          <meta name="robots" content="noindex,nofollow,noarchive" />
        </Helmet>
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: 20,
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: 28, marginBottom: 8 }}>Preview niet beschikbaar</h1>
            <p style={{ color: "#cbd5e1", marginBottom: 18 }}>
              {state.error || "Deze klantpreview is nog niet klaar."}
            </p>
            <Link to="/" style={buttonStyle}>
              Terug naar Vedantix
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={shellStyle}>
      <Helmet>
        <title>{state.customer?.companyName || "Klantpreview"} | Vedantix</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Helmet>

      <div style={topBarStyle}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 800 }}>
            Vedantix preview
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 900,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {state.customer?.companyName || state.preview.slug}
          </div>
        </div>

        <a
          href={state.preview.targetUrl}
          target="_blank"
          rel="noreferrer"
          style={buttonStyle}
        >
          <ExternalLink size={16} />
          Open extern
        </a>
      </div>

      <iframe
        title={`Preview ${state.customer?.companyName || state.preview.slug}`}
        src={state.preview.targetUrl}
        style={{
          width: "100%",
          height: "calc(100vh - 52px)",
          border: 0,
          background: "#ffffff",
          display: "block",
        }}
        referrerPolicy="no-referrer"
      />
    </main>
  );
}
