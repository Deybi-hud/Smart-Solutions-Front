import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import {
  useGetPendingPlansQuery,
  useApprovePlanMutation,
  useRejectPlanMutation,
} from "../../store/api/plansApi";
import { useGetAddressesQuery } from "../../store/api/locationApi";
import { panelSx, rowSx } from "./RegionsPanel";

const SERVICE_TYPE_LABELS = {
  VIRTUAL: "Virtual",
  PRESENCIAL: "Presencial",
  AMBAS: "Virtual y presencial",
};

const PendingPlansPanel = () => {
  const { data: pendingPlans = [], isLoading, isError } = useGetPendingPlansQuery();
  const { data: addresses = [] } = useGetAddressesQuery();
  const [approvePlan, { isLoading: approving }] = useApprovePlanMutation();
  const [rejectPlan, { isLoading: rejecting }] = useRejectPlanMutation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addressLabel = (addressId) => {
    const address = addresses.find((a) => a.id === addressId);
    if (!address) return null;
    return `${address.sucursalName} — ${address.street} ${address.number}`;
  };

  const handleApprove = async (id) => {
    setError(""); setSuccess("");
    try {
      await approvePlan(id).unwrap();
      setSuccess("Propuesta aprobada. Ya aparece en el catálogo.");
    } catch (e) { setError(e?.data?.message || "Error al aprobar la propuesta."); }
  };

  const handleReject = async (id) => {
    setError(""); setSuccess("");
    try {
      await rejectPlan(id).unwrap();
      setSuccess("Propuesta rechazada.");
    } catch (e) { setError(e?.data?.message || "Error al rechazar la propuesta."); }
  };

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, mb: 1.5 }}>
        Suscripciones propuestas por clientes ({pendingPlans.length})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }}>{success}</Alert>}

      {isLoading && <Typography variant="body2" sx={{ color: "text.secondary" }}>Cargando propuestas...</Typography>}
      {isError && <Typography variant="body2" sx={{ color: "error.main" }}>Error al cargar las propuestas.</Typography>}
      {!isLoading && pendingPlans.length === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>No hay propuestas pendientes.</Typography>
      )}

      <Stack divider={<Divider />}>
        {pendingPlans.map((plan) => (
          <Box key={plan.id} sx={{ ...rowSx, alignItems: "flex-start" }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {plan.name}
                </Typography>
                <Chip label={SERVICE_TYPE_LABELS[plan.serviceType] || plan.serviceType} size="small" variant="outlined" />
              </Stack>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                ${Number(plan.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })} · {plan.durationMonths} mes{plan.durationMonths !== 1 ? "es" : ""} · propuesto por el usuario #{plan.proposedByUserId}
              </Typography>
              {plan.details && (
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                  {plan.details}
                </Typography>
              )}
              {plan.addressId && addressLabel(plan.addressId) && (
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                  Sucursal: {addressLabel(plan.addressId)}
                </Typography>
              )}
            </Box>
            <Stack direction="row" spacing={1}>
              <MuiButton
                size="small"
                variant="contained"
                disabled={approving || rejecting}
                onClick={() => handleApprove(plan.id)}
              >
                Aprobar
              </MuiButton>
              <MuiButton
                size="small"
                variant="outlined"
                color="error"
                disabled={approving || rejecting}
                onClick={() => handleReject(plan.id)}
              >
                Rechazar
              </MuiButton>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PendingPlansPanel;
