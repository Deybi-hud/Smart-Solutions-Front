import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "./store/api/userApi";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/organisms/PrivateRoute";
import AdminRoute from "./components/organisms/AdminRoute";

const App = () => {
  useGetProfileQuery();

  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FDF6F4",
        }}
      >
        <p style={{ color: "#9C7878", fontSize: "1.1rem", fontWeight: 500 }}>
          Cargando sesión...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />}
      />
      <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;