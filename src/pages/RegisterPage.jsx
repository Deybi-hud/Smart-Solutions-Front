import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import RegisterForm from "../components/organisms/RegisterForm";
import Footer from "../components/organisms/Footer";

const RegisterPage = () => {
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
        {/* Tarjeta del formulario de registro */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "512px",
            borderRadius: "14px",
            p: 4,
            border: "1px solid #EDD9D5",  // Borde divisor rosa suave
          }}
        >
          {/* Logo como enlace a la landing */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#D4627A",
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
            Crear cuenta
          </Typography>

          <RegisterForm />

          {/* Enlace de vuelta al login */}
          <Typography
            variant="body2"
            sx={{ color: "#9C7878", textAlign: "center", mt: 3 }}
          >
            ¿Ya tienes cuenta?{" "}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: "#D4627A",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { color: "#B8455E" },
              }}
            >
              Inicia sesión aquí
            </Typography>
          </Typography>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
};

export default RegisterPage;
