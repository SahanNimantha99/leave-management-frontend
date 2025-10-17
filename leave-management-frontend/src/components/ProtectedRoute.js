import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// A component to protect routes based on authentication and roles
export default function ProtectedRoute({ children, roles }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
}
