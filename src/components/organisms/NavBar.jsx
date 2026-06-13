import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({ onAboutClick, showAuthLinks = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMINISTRADOR";

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: "900px", width: "100%", mx: "auto", px: 2 }}>
        <Typography
          component={Link}
          to="/home"
          variant="h6"
          sx={{ color: "primary.main", textDecoration: "none", flexGrow: 1 }}
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
              <MuiButton onClick={() => navigate("/profile")} variant="text">
                Perfil
              </MuiButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
