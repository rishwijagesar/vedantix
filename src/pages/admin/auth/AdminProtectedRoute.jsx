import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "./adminAuth";

export default function AdminProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}