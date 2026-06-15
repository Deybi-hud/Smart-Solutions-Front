import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import {
  useGetUserSubscriptionQuery,
  useCancelSubscriptionMutation,
  useGetSubscriptionHistoryQuery,
} from "../../store/api/subscriptionsApi";
import { useGetProfileQuery } from "../../store/api/userApi";

const ACTION_LABELS = {
  CREATION: "Alta",
  RENEWAL: "Renovación",
  PLAN_CHANGE: "Cambio de plan",
  CANCELLATION: "Cancelación",
  EXPIRATION: "Expiración",
};

const cardSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  p: 3,
  mt: 3,
};

const SubscriptionCard = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery();
  const { data: subscription } = useGetUserSubscriptionQuery(profile?.id, { skip: !profile?.id });
  const { data: history } = useGetSubscriptionHistoryQuery(profile?.id, { skip: !profile?.id });
  const [cancelSubscription, { isLoading: cancelling }] = useCancelSubscriptionMutation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCancelPlan = async () => {
    setSuccess(""); setError("");
    try {
      await cancelSubscription(profile.id).unwrap();
      setSuccess("Suscripción cancelada.");
    } catch (err) {
      setError(err?.data?.message || "Error al cancelar la suscripción.");
    }
  };

  if (!profile) return null;

  const isActive = subscription?.status === "ACTIVE";
  const isInactive = subscription?.status === "CANCELED" || subscription?.status === "EXPIRED";

  return (
    <>
      {success && <Alert severity="success" sx={{ mt: 2, borderRadius: "8px" }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2, borderRadius: "8px" }}>{error}</Alert>}

      {subscription && (
        <Box sx={cardSx}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>Mi Suscripción</Typography>
          <Stack spacing={1.5}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>Plan</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{subscription.planName}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>Estado</Typography>
              <Chip label={subscription.status} size="small" color={isActive ? "success" : "default"} variant="outlined" />
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>Vence</Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString("es-CL") : "—"}
              </Typography>
            </Box>
            {subscription.cancelAtPeriodEnd && (
              <>
                <Divider />
                <Typography variant="caption" sx={{ color: "error.main" }}>La renovación automática está cancelada.</Typography>
              </>
            )}
            {isActive && (
              <>
                <Divider />
                <MuiButton onClick={handleCancelPlan} disabled={cancelling} variant="outlined" color="error" size="small" fullWidth>
                  {cancelling ? "Cancelando..." : "Cancelar suscripción"}
                </MuiButton>
              </>
            )}
            {isInactive && (
              <>
                <Divider />
                <MuiButton onClick={() => navigate("/home")} variant="outlined" size="small" fullWidth>
                  Ver planes disponibles
                </MuiButton>
              </>
            )}
          </Stack>
        </Box>
      )}

      {!subscription && (
        <Box sx={{ ...cardSx, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            No tienes un plan activo. Contacta al administrador para activar uno.
          </Typography>
        </Box>
      )}

      {history && history.length > 0 && (
        <Box sx={cardSx}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>Historial de suscripción</Typography>
          <Stack spacing={0}>
            {history.map((entry, i) => (
              <Box key={entry.id}>
                <Box sx={{ py: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                      {ACTION_LABELS[entry.action] || entry.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {entry.changedAt ? new Date(entry.changedAt).toLocaleDateString("es-CL") : "—"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>{entry.subscriptionName}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      ${Number(entry.subscriptionPrice).toLocaleString("es-CL", { maximumFractionDigits: 0 })}
                    </Typography>
                  </Box>
                </Box>
                {i < history.length - 1 && <Divider />}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default SubscriptionCard;
