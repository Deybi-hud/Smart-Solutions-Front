import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import {
  useGetRegionsQuery,
  useGetCommunesQuery,
  useUpdateCommuneMutation,
  useSetCommuneActiveMutation,
} from "../../store/api/locationApi";
import { panelSx, rowSx } from "./RegionsPanel";
import { validateCommuneForm } from "../../utils/validations";
import { extractApiErrorMessage } from "../../utils/apiError";

const selectMenuSx = { PaperProps: { sx: { backgroundColor: "#FAF0EE" } } };

const RegionSelect = ({ regions, value, onChange }) => (
  <FormControl size="small" sx={{ minWidth: "140px" }}>
    <InputLabel>Región</InputLabel>
    <Select value={value} onChange={onChange} label="Región" MenuProps={selectMenuSx}>
      <MenuItem value=""><em style={{ color: "#9C7878" }}>Región</em></MenuItem>
      {regions.map((r) => <MenuItem key={r.id} value={r.id}>{r.regionName}</MenuItem>)}
    </Select>
  </FormControl>
);

const CommunesPanel = () => {
  const { data: regions = [] } = useGetRegionsQuery();
  const { data: communes = [] } = useGetCommunesQuery();
  const [updateCommune, { isLoading: updating }] = useUpdateCommuneMutation();
  const [setCommuneActive, { isLoading: togglingActive }] = useSetCommuneActiveMutation();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRegionId, setEditRegionId] = useState("");
  const [error, setError] = useState("");
  const [editErrors, setEditErrors] = useState({});

  const handleUpdate = async (id) => {
    setError("");
    const errors = validateCommuneForm({ communeName: editName, regionId: editRegionId });
    if (errors) { setEditErrors(errors); return; }
    setEditErrors({});
    try {
      await updateCommune({ id, data: { communeName: editName, regionId: Number(editRegionId) } }).unwrap();
      setEditingId(null);
    } catch (e) { setError(extractApiErrorMessage(e, "Error al actualizar.")); }
  };

  const handleToggleActive = async (c) => {
    setError("");
    try { await setCommuneActive({ id: c.id, active: !c.active }).unwrap(); }
    catch (e) { setError(extractApiErrorMessage(e, "Error al cambiar el estado.")); }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditName(c.communeName);
    setEditRegionId(String(c.region?.id ?? ""));
    setEditErrors({});
  };

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, flex: 1 }}>Comunas</Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {error && <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>{error}</Typography>}
      <Stack divider={<Divider />}>
        {communes.map((c) => (
          <Box key={c.id} sx={rowSx}>
            {editingId === c.id ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="flex-start" sx={{ flex: 1 }}>
                <TextField
                  value={editName}
                  onChange={(e) => { setEditName(e.target.value); setEditErrors((er) => ({ ...er, communeName: null })); }}
                  disabled={updating}
                  error={!!editErrors.communeName}
                  helperText={editErrors.communeName || ""}
                  size="small"
                  sx={{ flex: 1, minWidth: "160px" }}
                />
                <RegionSelect regions={regions} value={editRegionId} onChange={(e) => { setEditRegionId(e.target.value); setEditErrors((er) => ({ ...er, regionId: null })); }} />
                <MuiButton onClick={() => handleUpdate(c.id)} disabled={updating} variant="contained" size="small">
                  {updating ? "..." : "Guardar"}
                </MuiButton>
                <MuiButton onClick={() => { setEditingId(null); setEditErrors({}); }} variant="outlined" size="small">Cancelar</MuiButton>
              </Stack>
            ) : (
              <>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {c.communeName}{" "}
                    <Typography component="span" variant="caption" sx={{ color: "text.secondary" }}>
                      — {c.region?.nameRegion}
                    </Typography>
                  </Typography>
                  <Chip
                    label={c.active ? "Activa" : "Inactiva"}
                    size="small"
                    color={c.active ? "success" : "default"}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => startEdit(c)} sx={{ color: "#7B8FC8", minWidth: 0 }}>Editar</MuiButton>
                  <MuiButton
                    size="small"
                    disabled={togglingActive}
                    onClick={() => handleToggleActive(c)}
                    sx={{ color: c.active ? "#C0392B" : "#2f7d4f", minWidth: 0 }}
                  >
                    {c.active ? "Desactivar" : "Activar"}
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

export default CommunesPanel;
