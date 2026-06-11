import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#030712" }}>
      <NavBar showAuthLinks />
      <Box
        component="section"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          py: 10,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: "2.25rem", sm: "3rem", lg: "3.75rem" },
            lineHeight: 1.15,
          }}
        >
          Soluciones inteligentes{" "}
          <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
          <Box component="span" sx={{ color: "#a4e77e" }}>para tu bienestar</Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#d1d5db",
            fontWeight: 400,
            maxWidth: "600px",
            mb: 5,
            lineHeight: 1.6,
          }}
        >
          Planes personalizados, guía experta y acompañamiento 24/7 para que alcances tus metas físicas.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <MuiButton
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Comenzar ahora
          </MuiButton>
          <MuiButton
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              borderColor: "#ffffff",
              color: "#d1d5db",
              "&:hover": { borderColor: "#ffffff", color: "#ffffff" },
            }}
          >
            Ya tengo cuenta
          </MuiButton>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
