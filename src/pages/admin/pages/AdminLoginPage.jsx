import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import VedantixLogo from "../../../components/VedantixLogo";
import { useAdminAuth } from "../auth/adminAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAdminAuth();

  const [email, setEmail] = useState("admin@vedantix.nl");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from || "/admin";

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inloggen mislukt");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 28,
          boxShadow: "0 24px 80px rgba(15,23,42,0.10)",
          padding: 32,
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 18 }}>
            <VedantixLogo variant="full" size="md" theme="dark" />
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 28,
              lineHeight: 1.1,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            Admin login
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "#64748b",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            Log in om het admin dashboard te openen.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <label
              htmlFor="admin-email"
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#334155",
              }}
            >
              E-mail
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@vedantix.nl"
              autoComplete="username"
              style={{
                width: "100%",
                minHeight: 52,
                borderRadius: 16,
                border: "1px solid #cbd5e1",
                padding: "0 16px",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label
              htmlFor="admin-password"
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#334155",
              }}
            >
              Wachtwoord
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Voer je wachtwoord in"
              autoComplete="current-password"
              style={{
                width: "100%",
                minHeight: 52,
                borderRadius: 16,
                border: "1px solid #cbd5e1",
                padding: "0 16px",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error ? (
            <div
              style={{
                borderRadius: 16,
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#b91c1c",
                padding: "12px 14px",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              minHeight: 54,
              borderRadius: 18,
              border: "none",
              background: "#0f172a",
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 900,
              cursor: isSubmitting ? "default" : "pointer",
            }}
          >
            {isSubmitting ? "Bezig..." : "Inloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}