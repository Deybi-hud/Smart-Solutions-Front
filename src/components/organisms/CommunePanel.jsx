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

const panelSx = { backgroundColor: "#FFFFFF", border: "1px solid #EDD9D5", borderRadius: "10px", p: 3, mb: 3 };
const rowSx = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, py: 1.5 };
const selectMenuSx = { PaperProps: { sx: { backgroundColor: "#FAF0EE" } } };

export const CommunePanel = () => {
  const { data: regions = [] } = useGetRegionsQuery();
  const { data: communes = [] } = useGetCommunesQuery();
  const [createCommune, { isLoading: creating }] = useCreateCommuneMutation();
  const [updateCommune, { isLoading: updating }] = useUpdateCommuneMutation();
  const [deleteCommune] = useDeleteCommuneMutation();

  const [newCommune, setNewCommune] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editRegion, setEditRegion] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCommune.trim() || !selectedRegion) return;
    try {
      await createCommune({ communeName: newCommune.trim(), regionId: Number(selectedRegion) }).unwrap();
      setNewCommune("");
    } catch {}
  };

  const handleUpdate = async (id) => {
    if (!editValue.trim() || !editRegion) return;
    try {
      await updateCommune({ id, data: { communeName: editValue.trim(), regionId: Number(editRegion) } }).unwrap();
      setEditingId(null);
    } catch {}
  };

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Comunas
      </Typography>
      <Stack component="form" onSubmit={handleCreate} direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField value={newCommune} onChange={(e) => setNewCommune(e.target.value)} placeholder="Nueva Comuna" size="small" fullWidth />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Región</InputLabel>
          <Select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} label="Región" MenuProps={selectMenuSx}>
            {regions.map((r) => <MenuItem key={r.id} value={r.id}>{r.regionName}</MenuItem>)}
          </Select>
        </FormControl>
        <MuiButton type="submit" variant="contained" disabled={creating}>Añadir</MuiButton>
      </Stack>
      <Stack divider={<Divider />}>
        {communes.map((c) => (
          <Box key={c.id} sx={rowSx}>
            {editingId === c.id ? (
              <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                <TextField value={editValue} onChange={(e) => setEditValue(e.target.value)} size="small" fullWidth />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value={editRegion} onChange={(e) => setEditRegion(e.target.value)} MenuProps={selectMenuSx}>
                    {regions.map((r) => <MenuItem key={r.id} value={r.id}>{r.regionName}</MenuItem>)}
                  </Select>
                </FormControl>
                <MuiButton size="small" onClick={() => handleUpdate(c.id)} disabled={updating}>Guardar</MuiButton>
                <MuiButton size="small" onClick={() => setEditingId(null)}>Cancelar</MuiButton>
              </Stack>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "#3D2B2B" }}>
                  {c.communeName}
                  <Typography component="span" variant="caption" sx={{ color: "#9C7878", ml: 0.5 }}>
                    ({regions.find((r) => r.id === c.regionId)?.regionName || "Sin región"})
                  </Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => { setEditingId(c.id); setEditValue(c.communeName); setEditRegion(c.regionId); }} sx={{ color: "#7B8FC8" }}>Editar</MuiButton>
                  <MuiButton size="small" onClick={() => deleteCommune(c.id)} sx={{ color: "#C0392B" }}>Eliminar</MuiButton>
                </Stack>
              </>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};