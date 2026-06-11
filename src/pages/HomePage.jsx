import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

// Tarjetas del dashboard principal
const cards = [
  { title: "Planes activos", desc: "Revisa tus planes y progreso desde tu perfil." },
  { title: "Sucursales", desc: "Encuentra la sucursal más cercana a ti." },
  { title: "Soporte", desc: "Contáctanos cuando lo necesites." },
];

// Ítems de la sección "¿Quiénes somos?"
const aboutItems = [
  { title: "Misión", desc: "Proporcionar un camino para poder alcanzar sus objetivos." },
  { title: "Visión", desc: "Ser la empresa número uno en innovación, sustentabilidad y cuidado personal." },
  { title: "Valores", desc: "Integridad, compromiso y excelencia en todo lo que hacemos." },
];

const HomePage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    // Fondo general de la página: blanco rosado muy suave
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FDF6F4",
      }}
    >
      <NavBar onAboutClick={() => setShowAbout(!showAbout)} />

      <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
        {!showAbout ? (
          // ── Vista principal: bienvenida + tarjetas ─────────────────────────
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>

            {/* Bloque de bienvenida centrado */}
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography
                variant="h3"
                sx={{ color: "#3D2B2B", fontWeight: 700, mb: 2 }}
              >
                Bienvenido a Smart Solutions
              </Typography>
              <Typography variant="h6" sx={{ color: "#9C7878", fontWeight: 400 }}>
                Soluciones inteligentes para tu físico.
              </Typography>
            </Box>

            {/* Grid de tarjetas del dashboard */}
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {cards.map((card) => (
                <Grid item xs={12} sm={4} key={card.title}>
                  {/* Tarjeta individual: fondo blanco, borde salmón suave */}
                  <Box
                    sx={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EDD9D5",  // Borde divisor rosado
                      borderRadius: "12px",
                      p: 3,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#3D2B2B", fontWeight: 600, mb: 1 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#9C7878" }}>
                      {card.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          // ── Vista "¿Quiénes somos?" ────────────────────────────────────────
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Typography
              variant="h4"
              sx={{ color: "#3D2B2B", fontWeight: 700, mb: 3 }}
            >
              ¿Quiénes somos?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#9C7878", lineHeight: 1.8, mb: 4 }}
            >
              Smart Solutions es una empresa orientada al cuidado físico de
              nuestros clientes a través de planes completos con guía, tutoría y
              atención 24/7.
            </Typography>

            {/* Tarjetas de misión / visión / valores */}
            <Grid container spacing={3}>
              {aboutItems.map((item) => (
                <Grid item xs={12} sm={4} key={item.title}>
                  {/* Tarjeta con borde izquierdo salmón como detalle */}
                  <Box
                    sx={{
                      backgroundColor: "#FAF0EE",    // Fondo panel interno
                      borderLeft: "3px solid #F4A896", // Acento salmón izquierdo
                      borderRadius: "8px",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#D4627A", fontWeight: 700, mb: 1.5 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#9C7878" }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
