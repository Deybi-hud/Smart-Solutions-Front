import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import { useGetMyPlansQuery, useUpdatePlanMutation } from "../../store/api/plansApi";
import { validatePlanForm } from "../../utils/validations";
import { extractApiErrorMessage } from "../../utils/apiError";
import { COLORS } from "../../theme/theme";

const STATUS_CHIP = {
  PENDING: { label: "Pendiente de aprobación", color: "warning" },
  APPROVED: { label: "Aprobado", color: "success" },
  REJECTED: { label: "Rechazado", color: "error" },
};

const SERVICE_TYPE_LABELS = {
  VIRTUAL: "Virtual",
  PRESENCIAL: "Presencial",
  AMBAS: "Virtual y presencial",
};

const cardSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  p: 3,
  mt: 3,
};

const PlanRow = ({ plan, onEdit }) => {
  const status = STATUS_CHIP[plan.approvalStatus] || { label: plan.approvalStatus, color: "default" };
  return (
    <Box sx={{ py: 1.5 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{plan.name}</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "flex-end", flexWrap: "wrap", mt: 0.5 }}>
        <Chip label={status.label} size="small" color={status.color} variant="outlined" />
        <Chip
          label={plan.isActive ? "Activo" : "Inactivo"}
          size="small"
          color={plan.isActive ? "success" : "default"}
          variant="outlined"
        />
        <MuiButton size="small" onClick={() => onEdit(plan)} sx={{ color: COLORS.navy, minWidth: 0 }}>
          Editar
        </MuiButton>
      </Stack>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
        ${Number(plan.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })} · {plan.durationMonths} mes{plan.durationMonths !== 1 ? "es" : ""} · {SERVICE_TYPE_LABELS[plan.serviceType] || plan.serviceType}
      </Typography>
      {plan.details && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>{plan.details}</Typography>
      )}
    </Box>
  );
};

const EditPlanForm = ({ plan, onCancel, onSaved }) => {
  const [updatePlan, { isLoading }] = useUpdatePlanMutation();
  const [form, setForm] = useState({
    name: plan.name,
    details: plan.details || "",
    price: String(plan.price),
    durationMonths: String(plan.durationMonths),
    isActive: plan.isActive,
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const set = (key, value) => { setForm((f) => ({ ...f, [key]: value })); setErrors((er) => ({ ...er, [key]: null })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationErrors = validatePlanForm(form);
    if (validationErrors) { setErrors(validationErrors); return; }

    try {
      await updatePlan({
        id: plan.id,
        name: form.name,
        details: form.details,
        price: parseFloat(form.price),
        durationMonths: parseInt(form.durationMonths, 10),
        isActive: form.isActive,
        serviceType: plan.serviceType,
        addressId: plan.addressId,
      }).unwrap();
      onSaved();
    } catch (err) {
      setError(extractApiErrorMessage(err, "Error al actualizar el servicio."));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ py: 1.5 }}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)}
          error={!!errors.name} helperText={errors.name || ""} size="small" fullWidth disabled={isLoading} />
        <TextField label="Descripción" value={form.details} onChange={(e) => set("details", e.target.value)}
          error={!!errors.details} helperText={errors.details || ""} multiline rows={2} size="small" fullWidth disabled={isLoading} />
        <Stack direction="row" spacing={1.5}>
          <TextField label="Precio (CLP)" type="number" value={form.price} onChange={(e) => set("price", e.target.value)}
            error={!!errors.price} helperText={errors.price || ""} size="small" fullWidth disabled={isLoading} />
          <TextField label="Duración (meses)" type="number" value={form.durationMonths} onChange={(e) => set("durationMonths", e.target.value)}
            error={!!errors.durationMonths} helperText={errors.durationMonths || ""} size="small" fullWidth disabled={isLoading} />
        </Stack>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>Estado:</Typography>
          <MuiButton size="small" variant={form.isActive ? "contained" : "outlined"} onClick={() => set("isActive", !form.isActive)} disabled={isLoading}>
            {form.isActive ? "Activo" : "Inactivo"}
          </MuiButton>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <MuiButton type="submit" variant="contained" disabled={isLoading} fullWidth>
            {isLoading ? "Guardando..." : "Guardar"}
          </MuiButton>
          <MuiButton variant="outlined" onClick={onCancel} disabled={isLoading} fullWidth>Cancelar</MuiButton>
        </Stack>
      </Stack>
    </Box>
  );
};

const MyPlanCard = () => {
  const { data: myPlans = [] } = useGetMyPlansQuery();
  const [editingPlan, setEditingPlan] = useState(null);

  if (myPlans.length === 0) return null;

  return (
    <Box sx={cardSx}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>Mi servicio</Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Servicios que propusiste para el catálogo.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack divider={<Divider />}>
        {myPlans.map((plan) => (
          <Box key={plan.id}>
            {editingPlan?.id === plan.id ? (
              <EditPlanForm plan={plan} onCancel={() => setEditingPlan(null)} onSaved={() => setEditingPlan(null)} />
            ) : (
              <PlanRow plan={plan} onEdit={setEditingPlan} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MyPlanCard;
