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
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        sx={{
          maxWidth: "900px",
          width: "100%",
          mx: "auto",
          px: 2,
        }}
      >
        <Typography
          component={Link}
          to="/home"
          variant="h6"
          sx={{
            color: "#D4627A",
            fontWeight: 700,
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          Smart Solutions
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showAuthLinks ? (
            <>
              <MuiButton
                component={Link}
                to="/login"
                sx={{ color: "#9C7878" }}
              >
                Iniciar sesión
              </MuiButton>
              <MuiButton
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
              >
                Registrarse
              </MuiButton>
            </>
          ) : (
            <>
              {onAboutClick && (
                <MuiButton
                  onClick={onAboutClick}
                  sx={{ color: "#9C7878" }}
                >
                  ¿Quiénes somos?
                </MuiButton>
              )}
              {isAdmin && (
                <MuiButton
                  onClick={() => navigate("/admin")}
                  sx={{ color: "#9C7878" }}
                >
                  Admin
                </MuiButton>
              )}
              <MuiButton
                onClick={() => navigate("/profile")}
                sx={{ color: "#9C7878" }}
              >
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
