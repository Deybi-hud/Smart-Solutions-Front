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
  useDeletePlanMutation,
} from "../../store/api/plansApi";
import { COLORS } from "../../theme/theme";

const panelSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
      sx={{ backgroundColor: "#F8F7F5", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", p: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", mb: 3, fontSize: "1rem" }}>
        {title}
      </Typography>
      <Stack spacing={2.5}>
        <TextField label="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)}
          required size="small" fullWidth disabled={loading} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField label="Precio (CLP)" value={form.price} onChange={(e) => set("price", e.target.value)}
            required type="number" size="small" fullWidth disabled={loading} />
          <TextField label="Duración (meses)" value={form.durationMonths}
            onChange={(e) => set("durationMonths", e.target.value)}
            required type="number" size="small" fullWidth disabled={loading} />
        </Stack>
        <TextField label="Descripción" value={form.details} onChange={(e) => set("details", e.target.value)}
          multiline rows={3} size="small" fullWidth disabled={loading} />
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%", pt: 0.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>Estado:</Typography>
            <MuiButton
              size="small"
              variant={form.isActive ? "contained" : "outlined"}
              onClick={() => set("isActive", !form.isActive)}
              disabled={loading}
              sx={{ minWidth: "90px" }}
            >
              {form.isActive ? "Activo" : "Inactivo"}
            </MuiButton>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <MuiButton onClick={onCancel} variant="outlined" size="small" disabled={loading}>
              Cancelar
            </MuiButton>
            <MuiButton type="submit" variant="contained" size="small" disabled={loading} sx={{ minWidth: "90px" }}>
              {loading ? "Guardando..." : "Guardar"}
            </MuiButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

const PlanRow = ({ plan, onEdit, onDelete }) => (
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
        ${Number(plan.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })} · {plan.durationMonths} mes{plan.durationMonths !== 1 ? "es" : ""}
      </Typography>
      {plan.details && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
          {plan.details}
        </Typography>
      )}
    </Box>
    <Stack direction="row" spacing={0.5}>
      <MuiButton size="small" onClick={() => onEdit(plan)} sx={{ color: COLORS.navy, minWidth: 0 }}>
        Editar
      </MuiButton>
      <MuiButton size="small" onClick={() => onDelete(plan.id)} sx={{ color: "error.main", minWidth: 0 }}>
        Eliminar
      </MuiButton>
    </Stack>
  </Box>
);

const PlansPanel = () => {
  const { data: plans = [], isLoading, isError } = useGetAllPlansAdminQuery();
  const [createPlan, { isLoading: creating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: updating }] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();

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

  const handleDelete = async (id) => {
    setError(""); setSuccess("");
    try {
      await deletePlan(id).unwrap();
      setSuccess("Plan eliminado.");
    } catch (e) { setError(e?.data?.message || "Error al eliminar el plan."); }
  };

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, flex: 1 }}>
          Planes ({plans.length})
        </Typography>
        {!adding && !editingPlan && (
          <MuiButton
            onClick={() => setAdding(true)}
            variant="outlined"
            size="small"
            sx={{ borderColor: COLORS.navy, color: COLORS.navy, "&:hover": { borderColor: COLORS.navyDark, backgroundColor: "rgba(44,59,77,0.04)" } }}
          >
            + Nuevo plan
          </MuiButton>
        )}
      </Stack>
      <Divider sx={{ mb: 2 }} />

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
              <PlanRow plan={p} onEdit={setEditingPlan} onDelete={handleDelete} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PlansPanel;
