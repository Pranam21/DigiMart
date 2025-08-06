import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * requiredRoles: array of roles (e.g., ['ADMIN'], ['BUYER'], ['SELLER'], or ['BUYER','SELLER'])
 */
const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (requiredRoles && requiredRoles.length > 0) {
    const ok = requiredRoles.some((r) => hasRole(r));
    if (!ok) {
      return <div style={{ color: 'red' }}>Access denied: missing required role.</div>;
    }
  }

  return children;
};

export default ProtectedRoute;
