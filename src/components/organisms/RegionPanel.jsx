import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
  useGetRegionsQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} from "../../store/api/locationApi";

const panelSx = { backgroundColor: "#FFFFFF", border: "1px solid #EDD9D5", borderRadius: "10px", p: 3, mb: 3 };
const rowSx = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, py: 1.5 };

export const RegionPanel = () => {
  const { data: regions = [] } = useGetRegionsQuery();
  const [createRegion, { isLoading: creating }] = useCreateRegionMutation();
  const [updateRegion, { isLoading: updating }] = useUpdateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();

  const [newRegion, setNewRegion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newRegion.trim()) return;
    try {
      await createRegion({ regionName: newRegion.trim() }).unwrap();
      setNewRegion("");
    } catch {}
  };

  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;
    try {
      await updateRegion({ id, data: { regionName: editValue.trim() } }).unwrap();
      setEditingId(null);
    } catch {}
  };

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Regiones
      </Typography>
      <Stack component="form" onSubmit={handleCreate} direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField value={newRegion} onChange={(e) => setNewRegion(e.target.value)} placeholder="Nueva Región" size="small" fullWidth />
        <MuiButton type="submit" variant="contained" disabled={creating}>Añadir</MuiButton>
      </Stack>
      <Stack divider={<Divider />}>
        {regions.map((r) => (
          <Box key={r.id} sx={rowSx}>
            {editingId === r.id ? (
              <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                <TextField value={editValue} onChange={(e) => setEditValue(e.target.value)} size="small" fullWidth />
                <MuiButton size="small" onClick={() => handleUpdate(r.id)} disabled={updating}>Guardar</MuiButton>
                <MuiButton size="small" onClick={() => setEditingId(null)}>Cancelar</MuiButton>
              </Stack>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "#3D2B2B" }}>{r.regionName}</Typography>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => { setEditingId(r.id); setEditValue(r.regionName); }} sx={{ color: "#7B8FC8" }}>Editar</MuiButton>
                  <MuiButton size="small" onClick={() => deleteRegion(r.id)} sx={{ color: "#C0392B" }}>Eliminar</MuiButton>
                </Stack>
              </>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};