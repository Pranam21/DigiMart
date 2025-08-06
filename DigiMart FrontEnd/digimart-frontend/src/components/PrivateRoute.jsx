import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.roles?.[0]; // Assuming roles is an array

    if (userRole === role) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } catch (e) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
