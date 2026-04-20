import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ADMIN_AUTH_STORAGE_KEY = "vedantix_admin_auth_v1";

const AdminAuthContext = createContext(null);

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

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());

  useEffect(() => {
    writeStoredSession(session);
  }, [session]);

  function login({ password }) {
    const configuredPassword =
      import.meta.env.VITE_ADMIN_PASSWORD || "vedantix-admin";

    if (!password || password !== configuredPassword) {
      throw new Error("Ongeldig wachtwoord");
    }

    const nextSession = {
      isAuthenticated: true,
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
      isAuthenticated: Boolean(session?.isAuthenticated),
      session,
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