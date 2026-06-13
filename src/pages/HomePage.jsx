import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import { COLORS } from "../theme/theme";

const cards = [
  { title: "Planes activos", desc: "Revisa tus planes y progreso desde tu perfil." },
  { title: "Sucursales", desc: "Encuentra la sucursal más cercana a ti." },
  { title: "Soporte", desc: "Contáctanos cuando lo necesites." },
];

const aboutItems = [
  { title: "Misión", desc: "Proporcionar un camino para poder alcanzar sus objetivos." },
  { title: "Visión", desc: "Ser la empresa número uno en innovación, sustentabilidad y cuidado personal." },
  { title: "Valores", desc: "Integridad, compromiso y excelencia en todo lo que hacemos." },
];

const HomePage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
      <NavBar onAboutClick={() => setShowAbout(!showAbout)} />

      <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
        {!showAbout ? (
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h3" sx={{ color: "text.primary", mb: 2 }}>
                Bienvenido a Smart Solutions
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400 }}>
                Soluciones inteligentes para tu físico.
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              {cards.map((card) => (
                <Grid item xs={12} sm={4} key={card.title}>
                  <Box
                    sx={{
                      backgroundColor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "12px",
                      p: 3,
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {card.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Typography variant="h4" sx={{ color: "text.primary", mb: 3 }}>
              ¿Quiénes somos?
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
              Smart Solutions es una empresa orientada al cuidado físico de
              nuestros clientes a través de planes completos con guía, tutoría y
              atención 24/7.
            </Typography>

            <Grid container spacing={3}>
              {aboutItems.map((item) => (
                <Grid item xs={12} sm={4} key={item.title}>
                  <Box
                    sx={{
                      backgroundColor: COLORS.bgPanel,
                      borderLeft: "3px solid",
                      borderLeftColor: "primary.light",
                      borderRadius: "12px",
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "primary.main", mb: 1.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
