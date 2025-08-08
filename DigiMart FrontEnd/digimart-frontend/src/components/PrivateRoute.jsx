// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn("No token found — redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000;
    const now = Date.now();

    // Expired
    if (exp < now) {
      console.warn("Token expired — redirecting to login");
      localStorage.clear();
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const rawRoles = decoded.roles;
    const userRoles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];

    console.log("Decoded roles:", userRoles);
    console.log("Required role:", requiredRole);

    if (requiredRole && !userRoles.includes(requiredRole)) {
      console.warn("Unauthorized — role mismatch");
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error("JWT decoding failed:", error);
    localStorage.clear();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
