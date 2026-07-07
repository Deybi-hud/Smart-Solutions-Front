import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { COLORS } from "../../theme/theme";
import {
  useGetRegionsQuery,
  useUpdateRegionMutation,
  useSetRegionActiveMutation,
} from "../../store/api/locationApi";
import { validateRegionForm } from "../../utils/validations";

export const panelSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  p: 3,
};

export const rowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  py: 1.5,
};

export const addBtnSx = {
  borderColor: COLORS.navy,
  color: COLORS.navy,
  "&:hover": { borderColor: COLORS.navyDark, backgroundColor: "rgba(44,59,77,0.04)" },
};

export const EditableRow = ({ label, onSave, onCancel, initialValue = "", isLoading, error, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.();
  };
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <TextField
        value={value}
        onChange={handleChange}
        placeholder={label}
        disabled={isLoading}
        error={!!error}
        helperText={error || ""}
        size="small"
        fullWidth
      />
      <MuiButton onClick={() => onSave(value)} disabled={isLoading} variant="contained" size="small" sx={{ whiteSpace: "nowrap" }}>
        {isLoading ? "..." : "Guardar"}
      </MuiButton>
      <MuiButton onClick={onCancel} disabled={isLoading} variant="outlined" size="small" sx={{ whiteSpace: "nowrap" }}>
        Cancelar
      </MuiButton>
    </Stack>
  );
};

const RegionsPanel = () => {
  const { data: regions = [] } = useGetRegionsQuery();
  const [updateRegion, { isLoading: updating }] = useUpdateRegionMutation();
  const [setRegionActive, { isLoading: togglingActive }] = useSetRegionActiveMutation();
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");

  const handleUpdate = async (id, value) => {
    setError("");
    const errors = validateRegionForm({ regionName: value });
    if (errors) { setFieldError(errors.regionName); return; }
    try { await updateRegion({ id, data: { regionName: value } }).unwrap(); setEditingId(null); setFieldError(""); }
    catch (e) { setError(e?.data?.message || "Error al actualizar."); }
  };

  const handleToggleActive = async (r) => {
    setError("");
    try { await setRegionActive({ id: r.id, active: !r.active }).unwrap(); }
    catch (e) { setError(e?.data?.message || "Error al cambiar el estado."); }
  };

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, flex: 1 }}>Regiones</Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {error && <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>{error}</Typography>}
      <Stack divider={<Divider />}>
        {regions.map((r) => (
          <Box key={r.id} sx={rowSx}>
            {editingId === r.id ? (
              <EditableRow
                label="Nombre de región"
                initialValue={r.regionName}
                onSave={(v) => handleUpdate(r.id, v)}
                onCancel={() => { setEditingId(null); setFieldError(""); }}
                isLoading={updating}
                error={fieldError}
                onChange={() => setFieldError("")}
              />
            ) : (
              <>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ color: "text.primary" }}>{r.regionName}</Typography>
                  <Chip
                    label={r.active ? "Activa" : "Inactiva"}
                    size="small"
                    color={r.active ? "success" : "default"}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => { setEditingId(r.id); setFieldError(""); }} sx={{ color: "#7B8FC8", minWidth: 0 }}>Editar</MuiButton>
                  <MuiButton
                    size="small"
                    disabled={togglingActive}
                    onClick={() => handleToggleActive(r)}
                    sx={{ color: r.active ? "#C0392B" : "#2f7d4f", minWidth: 0 }}
                  >
                    {r.active ? "Desactivar" : "Activar"}
                  </MuiButton>
                </Stack>
              </>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RegionsPanel;
