import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "ADMINISTRADOR") return <Navigate to="/home" />;

  return children;
};

export default AdminRoute;
