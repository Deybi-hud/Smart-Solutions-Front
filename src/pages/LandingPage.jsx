import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const LandingPage = () => {
  return (
    // Contenedor raíz: fondo rosado muy suave, ocupa toda la pantalla
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FDF6F4",   // Fondo base (blanco con toque rosado)
      }}
    >
      <NavBar showAuthLinks />

      {/* Hero section: centrado vertical y horizontal */}
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
        {/* Título principal con acento en salmón */}
        <Typography
          variant="h2"
          sx={{
            color: "#3D2B2B",          // Texto oscuro cálido
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: "2.25rem", sm: "3rem", lg: "3.75rem" },
            lineHeight: 1.15,
          }}
        >
          Soluciones inteligentes{" "}
          <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
          {/* Frase destacada en color salmón-rosa */}
          <Box component="span" sx={{ color: "#D4627A" }}>
            para tu bienestar
          </Box>
        </Typography>

        {/* Subtítulo descriptivo */}
        <Typography
          variant="h6"
          sx={{
            color: "#9C7878",          // Texto secundario gris rosado
            fontWeight: 400,
            maxWidth: "600px",
            mb: 5,
            lineHeight: 1.6,
          }}
        >
          Planes personalizados, guía experta y acompañamiento 24/7 para que
          alcances tus metas físicas.
        </Typography>

        {/* Botones de acción */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* CTA principal: fondo rosa, texto blanco */}
          <MuiButton
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{ px: 4 }}
          >
            Comenzar ahora
          </MuiButton>

          {/* CTA secundario: borde salmón, sin relleno */}
          <MuiButton
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            sx={{ px: 4 }}
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
