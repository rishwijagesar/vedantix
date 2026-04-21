import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ADMIN_AUTH_STORAGE_KEY = "vedantix_admin_auth_v1";

const AdminAuthContext = createContext(null);

const RAW_API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://api.vedantix.nl";

const API_BASE = String(RAW_API_BASE).replace(/\/$/, "");

function readStoredSession() {
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredSession(session) {
  if (!session) {
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function readAdminSessionToken() {
  const session = readStoredSession();
  return session?.token || "";
}

export function readAdminSession() {
  return readStoredSession();
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());

  useEffect(() => {
    writeStoredSession(session);
  }, [session]);

  async function login({ email, password }) {
    const response = await fetch(`${API_BASE}/api/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Tenant-Id": "default",
        "X-Actor-Id": "admin-login",
        "X-Source": "ADMIN_PANEL",
      },
      body: JSON.stringify({
        email: String(email || "").trim().toLowerCase(),
        password: String(password || ""),
      }),
    });

    const text = await response.text();
    let json = null;

    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!response.ok) {
      throw new Error(json?.error || json?.message || "Inloggen mislukt");
    }

    const token = json?.data?.token || "";
    const user = json?.data?.user || null;

    if (!token || !user?.id) {
      throw new Error("Ongeldige login response");
    }

    const nextSession = {
      isAuthenticated: true,
      token,
      user,
      loggedInAt: new Date().toISOString(),
    };

    setSession(nextSession);
    return nextSession;
  }

  function logout() {
    setSession(null);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session?.isAuthenticated && session?.token),
      session,
      user: session?.user || null,
      login,
      logout,
    }),
    [session]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return context;
}