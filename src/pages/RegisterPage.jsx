import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import RegisterForm from "../components/organisms/RegisterForm";
import Footer from "../components/organisms/Footer";

const RegisterPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
      <Box
        component="main"
        sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: 6 }}
      >
        <Paper
          variant="outlined"
          sx={{ width: "100%", maxWidth: "512px", borderRadius: "14px", p: 4 }}
        >
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              display: "block",
              textAlign: "center",
              color: "primary.main",
              textDecoration: "none",
              mb: 3,
            }}
          >
            Smart Solutions
          </Typography>

          <Typography variant="h5" sx={{ color: "text.primary", mb: 3, textAlign: "center" }}>
            Crear cuenta
          </Typography>

          <RegisterForm />

          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>
            ¿Ya tienes cuenta?{" "}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { color: "primary.dark" },
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
