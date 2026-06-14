import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiButton from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const Row = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>{value}</Typography>
    </Box>
);

const ReceiptPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state?.plan) return <Navigate to="/home" replace />;

    const { plan, paymentId, userEmail, date } = state;
    const folio = paymentId ? String(paymentId).slice(-10).toUpperCase() : "—";
    const dateStr = date ? new Date(date).toLocaleDateString("es-CL", {
        year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    }) : new Date().toLocaleDateString("es-CL");

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
            <NavBar />

            <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
                <Box sx={{ maxWidth: "480px", mx: "auto" }}>
                    <Box
                        sx={{
                            backgroundColor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "14px",
                            p: { xs: 3, sm: 4 },
                        }}
                    >
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Chip label="Pago aprobado" color="success" size="small" sx={{ mb: 1.5 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                                Boleta Electrónica
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Smart Solutions
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={1.5} sx={{ mb: 3 }}>
                            <Row label="N° Folio" value={folio} />
                            <Row label="Fecha" value={dateStr} />
                            <Row label="Correo" value={userEmail || "—"} />
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={1.5} sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                Detalle del plan
                            </Typography>
                            <Row label="Plan" value={plan.name} />
                            <Row label="Duración" value={`${plan.durationMonths} mes${plan.durationMonths !== 1 ? "es" : ""}`} />
                            {plan.details && (
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    {plan.details}
                                </Typography>
                            )}
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                                Total pagado
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.dark" }}>
                                ${Number(plan.price).toLocaleString("es-CL")}
                            </Typography>
                        </Box>

                        <MuiButton
                            variant="contained"
                            fullWidth
                            onClick={() => navigate("/home")}
                        >
                            Volver al inicio
                        </MuiButton>
                    </Box>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export default ReceiptPage;
