import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";
import Footer from "../components/organisms/Footer";

const LoginPage = () => {
  return (
    // Fondo de página: blanco rosado muy suave
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FDF6F4",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 6,
        }}
      >
        {/* Tarjeta central del formulario: fondo blanco con sombra suave */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "448px",
            borderRadius: "14px",
            p: 4,
            border: "1px solid #EDD9D5",  // Borde rosa suave alrededor de la tarjeta
          }}
        >
          {/* Logo / Nombre de la app como enlace a la landing */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#D4627A",             // Rosa primario
              fontWeight: 700,
              textDecoration: "none",
              mb: 3,
            }}
          >
            Smart Solutions
          </Typography>

          {/* Título del formulario */}
          <Typography
            variant="h5"
            sx={{ color: "#3D2B2B", fontWeight: 700, mb: 3, textAlign: "center" }}
          >
            Iniciar sesión
          </Typography>

          <LoginForm />

          {/* Enlace a registro */}
          <Typography
            variant="body2"
            sx={{ color: "#9C7878", textAlign: "center", mt: 3 }}
          >
            ¿No tienes cuenta?{" "}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{
                color: "#D4627A",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { color: "#B8455E" },
              }}
            >
              Regístrate aquí
            </Typography>
          </Typography>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
};

export default LoginPage;
