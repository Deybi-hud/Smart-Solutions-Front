import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import {
  useGetAllPlansAdminQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "../../store/api/plansApi";
import { COLORS } from "../../theme/theme";

const panelSx = {
  backgroundColor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "10px",
  p: 3,
};

const emptyForm = { name: "", details: "", price: "", durationMonths: "", isActive: true };

const PlanForm = ({ initial = emptyForm, onSave, onCancel, loading, title }) => {
  const [form, setForm] = useState(initial);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: form.name,
      details: form.details,
      price: parseFloat(form.price),
      durationMonths: parseInt(form.durationMonths, 10),
      isActive: form.isActive,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ backgroundColor: COLORS.bgPanel, borderRadius: "8px", p: 2 }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 1.5 }}>
        {title}
      </Typography>
      <Stack spacing={1.5}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField label="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)}
            required size="small" fullWidth disabled={loading} />
          <TextField label="Precio ($)" value={form.price} onChange={(e) => set("price", e.target.value)}
            required type="number" size="small" sx={{ maxWidth: "140px" }} disabled={loading} />
          <TextField label="Duración (meses)" value={form.durationMonths}
            onChange={(e) => set("durationMonths", e.target.value)}
            required type="number" size="small" sx={{ maxWidth: "140px" }} disabled={loading} />
        </Stack>
        <TextField label="Descripción" value={form.details} onChange={(e) => set("details", e.target.value)}
          multiline rows={2} size="small" fullWidth disabled={loading} />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>Estado:</Typography>
          <MuiButton
            size="small"
            variant={form.isActive ? "contained" : "outlined"}
            onClick={() => set("isActive", !form.isActive)}
            disabled={loading}
          >
            {form.isActive ? "Activo" : "Inactivo"}
          </MuiButton>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <MuiButton onClick={onCancel} variant="outlined" size="small" disabled={loading}>
            Cancelar
          </MuiButton>
          <MuiButton type="submit" variant="contained" size="small" disabled={loading}>
            {loading ? "..." : "Guardar"}
          </MuiButton>
        </Stack>
      </Stack>
    </Box>
  );
};

const PlanRow = ({ plan, onEdit }) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, py: 1.5 }}>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
          {plan.name}
        </Typography>
        <Chip
          label={plan.isActive ? "Activo" : "Inactivo"}
          size="small"
          color={plan.isActive ? "success" : "default"}
          variant="outlined"
        />
      </Stack>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
        ${plan.price} · {plan.durationMonths} mes{plan.durationMonths !== 1 ? "es" : ""}
      </Typography>
      {plan.details && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
          {plan.details}
        </Typography>
      )}
    </Box>
    <MuiButton size="small" onClick={() => onEdit(plan)} sx={{ color: "primary.main", minWidth: 0 }}>
      Editar
    </MuiButton>
  </Box>
);

const PlansPanel = () => {
  const { data: plans = [], isLoading, isError } = useGetAllPlansAdminQuery();
  const [createPlan, { isLoading: creating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: updating }] = useUpdatePlanMutation();

  const [adding, setAdding] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async (data) => {
    setError(""); setSuccess("");
    try {
      await createPlan(data).unwrap();
      setAdding(false);
      setSuccess("Plan creado exitosamente.");
    } catch (e) { setError(e?.data?.message || "Error al crear el plan."); }
  };

  const handleUpdate = async (data) => {
    setError(""); setSuccess("");
    try {
      await updatePlan({ id: editingPlan.id, ...data }).unwrap();
      setEditingPlan(null);
      setSuccess("Plan actualizado.");
    } catch (e) { setError(e?.data?.message || "Error al actualizar el plan."); }
  };

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600 }}>
          Planes ({plans.length})
        </Typography>
        {!adding && !editingPlan && (
          <MuiButton onClick={() => setAdding(true)} variant="contained" size="small">
            + Nuevo plan
          </MuiButton>
        )}
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }}>{success}</Alert>}

      {adding && (
        <Box mb={2}>
          <PlanForm
            title="Nuevo plan"
            onSave={handleCreate}
            onCancel={() => setAdding(false)}
            loading={creating}
          />
        </Box>
      )}

      {isLoading && <Typography variant="body2" sx={{ color: "text.secondary" }}>Cargando planes...</Typography>}
      {isError && <Typography variant="body2" sx={{ color: "error.main" }}>Error al cargar planes.</Typography>}

      <Stack divider={<Divider />}>
        {plans.map((p) => (
          <Box key={p.id}>
            {editingPlan?.id === p.id ? (
              <Box sx={{ py: 1.5 }}>
                <PlanForm
                  title="Editar plan"
                  initial={{
                    name: p.name,
                    details: p.details || "",
                    price: String(p.price),
                    durationMonths: String(p.durationMonths),
                    isActive: p.isActive,
                  }}
                  onSave={handleUpdate}
                  onCancel={() => setEditingPlan(null)}
                  loading={updating}
                />
              </Box>
            ) : (
              <PlanRow plan={p} onEdit={setEditingPlan} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PlansPanel;
