import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import { useGetActivePlansQuery } from "../store/api/plansApi";

const LandingPage = () => {
  const { data: plans } = useGetActivePlansQuery();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
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
            color: "text.primary",
            mb: 3,
            fontSize: { xs: "2.25rem", sm: "3rem", lg: "3.75rem" },
          }}
        >
          Soluciones inteligentes{" "}
          <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
          <Box component="span" sx={{ color: "primary.main" }}>
            para tu bienestar
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "text.secondary", fontWeight: 400, maxWidth: "600px", mb: 5 }}
        >
          Planes personalizados, guía experta y acompañamiento 24/7 para que
          alcances tus metas físicas.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <MuiButton component={Link} to="/register" variant="contained" size="large" sx={{ px: 4 }}>
            Comenzar ahora
          </MuiButton>
          <MuiButton component={Link} to="/login" variant="outlined" size="large" sx={{ px: 4 }}>
            Ya tengo cuenta
          </MuiButton>
        </Stack>
      </Box>

      {plans && plans.length > 0 && (
        <Box component="section" sx={{ py: 8, px: 2, backgroundColor: "background.paper" }}>
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 700, color: "text.primary", mb: 6 }}>
            Nuestros planes
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              maxWidth: "900px",
              mx: "auto",
            }}
          >
            {plans.map((plan) => (
              <Box
                key={plan.id}
                sx={{
                  backgroundColor: "background.default",
                  borderRadius: 0,
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  width: { xs: "100%", sm: "260px" },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                    {plan.name}
                  </Typography>
                  {plan.durationDays && (
                    <Chip label={`${plan.durationDays} días`} size="small" variant="outlined" />
                  )}
                </Box>
                {plan.description && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {plan.description}
                  </Typography>
                )}
                {plan.details && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {plan.details}
                  </Typography>
                )}
                <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mt: "auto", pt: 1 }}>
                  ${Number(plan.price).toLocaleString("es-CL")}
                </Typography>
                <MuiButton component={Link} to="/register" variant="contained" size="small" fullWidth>
                  Comenzar ahora
                </MuiButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default LandingPage;
