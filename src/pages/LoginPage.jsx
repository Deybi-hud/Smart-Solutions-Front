import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";
import Footer from "../components/organisms/Footer";

const LoginPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#030712" }}>
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
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "448px",
            borderRadius: "12px",
            p: 3,
          }}
        >
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#4f8ef7",
              fontWeight: 700,
              textDecoration: "none",
              mb: 3,
            }}
          >
            Smart Solutions
          </Typography>
          <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 700, mb: 3, textAlign: "center" }}>
            Iniciar sesión
          </Typography>
          <LoginForm />
          <Typography variant="body2" sx={{ color: "#9ca3af", textAlign: "center", mt: 3 }}>
            ¿No tienes cuenta?{" "}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{ color: "#ffffff", fontWeight: 600, textDecoration: "none", "&:hover": { color: "#4f8ef7" } }}
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
