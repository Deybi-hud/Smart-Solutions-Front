import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AcquireServiceModal from "./AcquireServiceModal";

const NavBar = ({ onAboutClick, showAuthLinks = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMINISTRADOR";
  const isClient = user?.role === "CLIENTE";
  const showAcquireButton = isClient && location.pathname !== "/profile";
  const isOnProfile = location.pathname === "/profile";
  const [acquireOpen, setAcquireOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: "900px", width: "100%", mx: "auto", px: 2 }}>
        <Typography
          component={Link}
          to="/home"
          variant="h6"
          sx={{ color: "text.primary", textDecoration: "none", flexGrow: 1 }}
        >
          Smart Solutions
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showAuthLinks ? (
            <>
              <MuiButton component={Link} to="/login" variant="text">
                Iniciar sesión
              </MuiButton>
              <MuiButton component={Link} to="/register" variant="contained">
                Registrarse
              </MuiButton>
            </>
          ) : (
            <>
              {onAboutClick && (
                <MuiButton onClick={onAboutClick} variant="text">
                  ¿Quiénes somos?
                </MuiButton>
              )}
              {isAdmin && (
                <MuiButton onClick={() => navigate("/admin")} variant="text">
                  Admin
                </MuiButton>
              )}
              {showAcquireButton && (
                <MuiButton onClick={() => setAcquireOpen(true)} variant="text">
                  Adquirir servicios
                </MuiButton>
              )}
              <MuiButton onClick={() => navigate(isOnProfile ? "/home" : "/profile")} variant="text">
                Perfil
              </MuiButton>
            </>
          )}
        </Box>
      </Toolbar>
      {isClient && (
        <AcquireServiceModal open={acquireOpen} onClose={() => setAcquireOpen(false)} />
      )}
    </AppBar>
  );
};

export default NavBar;
