import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // has logout() in your app

// Decode a JWT payload safely (no external libs)
function decodeJwtPayload(token) {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(
      Array.prototype.map
        .call(json, (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    ));
  } catch (e) {
    return null;
  }
}

function extractRole(payload, fallbackRole) {
  if (fallbackRole) return fallbackRole;
  if (!payload) return null;

  // Common places roles appear in JWTs
  const claims = payload.roles || payload.role || payload.authorities || payload.scope;
  if (!claims) return null;

  if (Array.isArray(claims)) return claims[0];
  if (typeof claims === "string") {
    // e.g. "ROLE_ADMIN" or space-separated scopes
    if (claims.includes(" ")) return claims.split(" ").pop();
    return claims.replace(/^ROLE_/, "");
  }
  return null;
}

function hasRequiredRole(userRole, requiredRole) {
  if (!requiredRole) return true; // no role required
  if (!userRole) return false;
  if (Array.isArray(requiredRole)) return requiredRole.includes(userRole);
  return userRole === requiredRole;
}

/**
 * ProtectedRoute
 * Usage:
 * <ProtectedRoute requiredRole="USER"><UserHome /></ProtectedRoute>
 * <ProtectedRoute requiredRole="ADMIN"><AdminPage /></ProtectedRoute>
 * <ProtectedRoute><MockPayment /></ProtectedRoute>
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const { logout } = useAuth(); // your context exposes logout()

  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  // Not logged in → go to login, keep where we came from
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check expiry if present
  const payload = decodeJwtPayload(token);
  const expMs = payload?.exp ? payload.exp * 1000 : null;
  if (expMs && Date.now() >= expMs) {
    try { logout?.(); } catch (_) {}
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" state={{ from: location, reason: "expired" }} replace />;
  }

  // Role checks (optional)
  const role = extractRole(payload, storedRole);
  if (!hasRequiredRole(role, requiredRole)) {
    // If wrong role, send to a dedicated page (create a simple component for this route)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
}
