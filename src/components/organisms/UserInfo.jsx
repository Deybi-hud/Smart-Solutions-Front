import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { COLORS } from "../../theme/theme";
import { useUpdateUserByEmailMutation } from "../../store/api/userApi";
import {
  useGetUserSubscriptionQuery,
  useActivateSubscriptionMutation,
  useCancelSubscriptionMutation,
} from "../../store/api/subscriptionsApi";
import { useGetActivePlansQuery } from "../../store/api/plansApi";

const roleColor = (role) => (role === "ADMINISTRADOR" ? "error" : "default");

export const UserCard = ({ user, onEdit, onViewSub }) => (
  <Box sx={{ backgroundColor: "#F8F7F5", borderRadius: "10px", p: 2, border: "1px solid rgba(0,0,0,0.06)" }}>
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
          {user.name} {user.lastName}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>{user.email}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
          {user.phone} · {user.sucursalName}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Chip label={user.role} size="small" color={roleColor(user.role)} variant="outlined" />
        {onViewSub && (
          <MuiButton
            size="small"
            variant="outlined"
            onClick={() => onViewSub(user)}
            sx={{ borderColor: COLORS.navy, color: COLORS.navy, fontSize: "0.75rem", py: "3px", "&:hover": { backgroundColor: "rgba(44,59,77,0.05)" } }}
          >
            Suscripción
          </MuiButton>
        )}
        <MuiButton
          size="small"
          variant="text"
          onClick={() => onEdit(user)}
          sx={{ color: COLORS.textSecondary, fontSize: "0.75rem", "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}
        >
          Editar
        </MuiButton>
      </Stack>
    </Stack>
  </Box>
);

export const EditUserDialog = ({ user, open, onClose }) => {
  const [updateUser, { isLoading }] = useUpdateUserByEmailMutation();
  const [form, setForm] = useState({ name: "", lastName: "", phone: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpen = () => {
    setForm({ name: user?.name || "", lastName: user?.lastName || "", phone: user?.phone || "", email: user?.email || "" });
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError(""); setSuccess("");
    try {
      await updateUser({ email: user.email, data: form }).unwrap();
      setSuccess("Usuario actualizado.");
    } catch (e) {
      setError(e?.data?.message || "Error al actualizar.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionProps={{ onEnter: handleOpen }} maxWidth="xs" fullWidth>
      <DialogTitle>Editar usuario</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ borderRadius: "8px" }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ borderRadius: "8px" }}>{success}</Alert>}
          {[
            { label: "Nombre", key: "name" },
            { label: "Apellido", key: "lastName" },
            { label: "Teléfono", key: "phone" },
            { label: "Correo", key: "email" },
          ].map(({ label, key }) => (
            <TextField
              key={key}
              label={label}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              size="small"
              fullWidth
              disabled={isLoading}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={onClose} variant="outlined" disabled={isLoading}>Cerrar</MuiButton>
        <MuiButton onClick={handleSave} variant="contained" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export const SubscriptionDialog = ({ user, open, onClose }) => {
  const { data: sub, isLoading, isError } = useGetUserSubscriptionQuery(user?.id, { skip: !user?.id || !open });
  const { data: plans = [] } = useGetActivePlansQuery();
  const [activateSub, { isLoading: activating }] = useActivateSubscriptionMutation();
  const [cancelSub, { isLoading: cancelling }] = useCancelSubscriptionMutation();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleActivate = async () => {
    setError(""); setSuccess("");
    if (!selectedPlan) { setError("Selecciona un plan."); return; }
    try {
      await activateSub({ userId: user.id, planId: Number(selectedPlan) }).unwrap();
      setSuccess("Suscripción activada.");
    } catch (e) { setError(e?.data?.message || "Error al activar."); }
  };

  const handleCancel = async () => {
    setError(""); setSuccess("");
    try {
      await cancelSub(user.id).unwrap();
      setSuccess("Renovación cancelada.");
    } catch (e) { setError(e?.data?.message || "Error al cancelar."); }
  };

  const statusColor = { ACTIVE: "#2e7d32", CANCELLED: "#C0392B", EXPIRED: "#9C7878" };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Suscripción — {user?.name} {user?.lastName}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ borderRadius: "8px" }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ borderRadius: "8px" }}>{success}</Alert>}
          {isLoading && <Typography variant="body2" sx={{ color: "text.secondary" }}>Cargando...</Typography>}
          {isError && <Typography variant="body2" sx={{ color: "text.secondary" }}>Sin suscripción activa.</Typography>}
          {sub && (
            <Box sx={{ backgroundColor: "#FAF0EE", borderRadius: "8px", p: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}>
                Plan: {sub.planName}
              </Typography>
              <Typography variant="caption" sx={{ color: statusColor[sub.status] || "#9C7878", display: "block" }}>
                Estado: {sub.status}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                Vence: {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString("es-CL") : "—"}
              </Typography>
              {sub.cancelAtPeriodEnd && (
                <Typography variant="caption" sx={{ color: "error.main", display: "block" }}>
                  Cancelación programada al vencer.
                </Typography>
              )}
              {!sub.cancelAtPeriodEnd && sub.status === "ACTIVE" && (
                <MuiButton size="small" onClick={handleCancel} disabled={cancelling} sx={{ mt: 1, color: "error.main" }}>
                  {cancelling ? "..." : "Cancelar renovación"}
                </MuiButton>
              )}
            </Box>
          )}
          <Divider />
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>Activar / Renovar plan</Typography>
          <FormControl size="small" fullWidth>
            <InputLabel>Plan</InputLabel>
            <Select label="Plan" value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
              <MenuItem value="">Seleccionar...</MenuItem>
              {plans.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name} — ${Number(p.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiButton variant="contained" onClick={handleActivate} disabled={activating}>
            {activating ? "Activando..." : "Activar suscripción"}
          </MuiButton>
        </Stack>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={onClose} variant="outlined">Cerrar</MuiButton>
      </DialogActions>
    </Dialog>
  );
};
