import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import PaymentModal from "../components/organisms/PaymentModal";
import { useGetActivePlansQuery } from "../store/api/plansApi";
import { useGetProfileQuery } from "../store/api/userApi";
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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMINISTRADOR";
  const { data: profile } = useGetProfileQuery();
  const { data: plans = [], isLoading: plansLoading } = useGetActivePlansQuery();

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
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
            {!isAdmin && (
              <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 700, mb: 1 }}>
                  Nuestros Planes
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                  Elige el plan que mejor se adapte a ti.
                </Typography>

                {plansLoading && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>Cargando planes...</Typography>
                )}

                <Grid container spacing={3}>
                  {[...plans].sort((a, b) => b.price - a.price).map((plan) => (
                    <Grid item xs={12} sm={4} key={plan.id}>
                      <Box
                        sx={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "12px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          p: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600 }}>
                            {plan.name}
                          </Typography>
                          <Chip
                            label={`${plan.durationMonths} mes${plan.durationMonths !== 1 ? "es" : ""}`}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        </Box>
                        {plan.details && (
                          <Typography variant="body2" sx={{ color: "text.secondary", flex: 1 }}>
                            {plan.details}
                          </Typography>
                        )}
                        <Typography variant="h5" sx={{ color: "primary.dark", fontWeight: 700 }}>
                          ${Number(plan.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })}
                        </Typography>
                        <MuiButton
                          variant="contained"
                          fullWidth
                          onClick={() => setSelectedPlan(plan)}
                        >
                          Comprar
                        </MuiButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
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
                      backgroundColor: "#FFFFFF",
                      borderLeft: "3px solid",
                      borderLeftColor: "primary.main",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "text.primary", mb: 1.5 }}>
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

        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            open={Boolean(selectedPlan)}
            onClose={() => setSelectedPlan(null)}
            userId={profile?.id}
            userEmail={profile?.email}
          />
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
