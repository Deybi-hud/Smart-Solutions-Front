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
import {
  useGetRegionsQuery,
  useGetCommunesQuery,
  useCreateCommuneMutation,
  useUpdateCommuneMutation,
  useDeleteCommuneMutation,
} from "../../store/api/locationApi";
import { panelSx, rowSx, addBtnSx } from "./RegionsPanel";

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
  const [createCommune, { isLoading: creating }] = useCreateCommuneMutation();
  const [updateCommune, { isLoading: updating }] = useUpdateCommuneMutation();
  const [deleteCommune] = useDeleteCommuneMutation();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRegionId, setNewRegionId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRegionId, setEditRegionId] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setError("");
    if (!newName.trim() || !newRegionId) { setError("Nombre y región son obligatorios."); return; }
    try {
      await createCommune({ communeName: newName, regionId: Number(newRegionId) }).unwrap();
      setAdding(false); setNewName(""); setNewRegionId("");
    } catch (e) { setError(e?.data?.message || "Error al crear."); }
  };

  const handleUpdate = async (id) => {
    setError("");
    if (!editName.trim() || !editRegionId) { setError("Nombre y región son obligatorios."); return; }
    try {
      await updateCommune({ id, data: { communeName: editName, regionId: Number(editRegionId) } }).unwrap();
      setEditingId(null);
    } catch (e) { setError(e?.data?.message || "Error al actualizar."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta comuna?")) return;
    try { await deleteCommune(id).unwrap(); }
    catch (e) { setError(e?.data?.message || "Error al eliminar."); }
  };

  const startEdit = (c) => { setEditingId(c.id); setEditName(c.communeName); setEditRegionId(String(c.regionId)); };

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, flex: 1 }}>Comunas</Typography>
        <MuiButton onClick={() => setAdding(true)} variant="outlined" size="small" sx={addBtnSx}>+ Agregar</MuiButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {error && <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>{error}</Typography>}
      {adding && (
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de comuna"
            disabled={creating}
            size="small"
            sx={{ flex: 1, minWidth: "160px" }}
          />
          <RegionSelect regions={regions} value={newRegionId} onChange={(e) => setNewRegionId(e.target.value)} />
          <MuiButton onClick={handleCreate} disabled={creating} variant="contained" size="small">
            {creating ? "..." : "Guardar"}
          </MuiButton>
          <MuiButton onClick={() => setAdding(false)} variant="outlined" size="small">Cancelar</MuiButton>
        </Stack>
      )}
      <Stack divider={<Divider />}>
        {communes.map((c) => (
          <Box key={c.id} sx={rowSx}>
            {editingId === c.id ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ flex: 1 }}>
                <TextField
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={updating}
                  size="small"
                  sx={{ flex: 1, minWidth: "160px" }}
                />
                <RegionSelect regions={regions} value={editRegionId} onChange={(e) => setEditRegionId(e.target.value)} />
                <MuiButton onClick={() => handleUpdate(c.id)} disabled={updating} variant="contained" size="small">
                  {updating ? "..." : "Guardar"}
                </MuiButton>
                <MuiButton onClick={() => setEditingId(null)} variant="outlined" size="small">Cancelar</MuiButton>
              </Stack>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {c.communeName}{" "}
                  <Typography component="span" variant="caption" sx={{ color: "text.secondary" }}>
                    — {c.regionName}
                  </Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => startEdit(c)} sx={{ color: "#7B8FC8", minWidth: 0 }}>Editar</MuiButton>
                  <MuiButton size="small" onClick={() => handleDelete(c.id)} sx={{ color: "#C0392B", minWidth: 0 }}>Eliminar</MuiButton>
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
