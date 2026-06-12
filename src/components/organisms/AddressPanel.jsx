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
  useGetCommunesQuery,
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "../../store/api/locationApi";

const panelSx = { backgroundColor: "#FFFFFF", border: "1px solid #EDD9D5", borderRadius: "10px", p: 3 };
const rowSx = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, py: 1.5 };
const selectMenuSx = { PaperProps: { sx: { backgroundColor: "#FAF0EE" } } };

export const AddressPanel = () => {
  const { data: communes = [] } = useGetCommunesQuery();
  const { data: addresses = [] } = useGetAddressesQuery();
  const [createAddress, { isLoading: creating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const [form, setForm] = useState({ sucursalName: "", street: "", number: "", communeId: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ sucursalName: "", street: "", number: "", communeId: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.sucursalName || !form.street || !form.number || !form.communeId) return;
    try {
      await createAddress({ ...form, communeId: Number(form.communeId) }).unwrap();
      setForm({ sucursalName: "", street: "", number: "", communeId: "" });
    } catch {}
  };

  const handleUpdate = async (id) => {
    if (!editForm.sucursalName || !editForm.street || !editForm.number || !editForm.communeId) return;
    try {
      await updateAddress({ id, data: { ...editForm, communeId: Number(editForm.communeId) } }).unwrap();
      setEditingId(null);
    } catch {}
  };

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Sucursales
      </Typography>
      <Stack component="form" onSubmit={handleCreate} spacing={1.5} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1}>
          <TextField size="small" placeholder="Nombre Sucursal" fullWidth value={form.sucursalName} onChange={(e) => setForm({ ...form, sucursalName: e.target.value })} />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Comuna</InputLabel>
            <Select value={form.communeId} onChange={(e) => setForm({ ...form, communeId: e.target.value })} label="Comuna" MenuProps={selectMenuSx}>
              {communes.map((c) => <MenuItem key={c.id} value={c.id}>{c.communeName}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={1}>
          <TextField size="small" placeholder="Calle" fullWidth value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
          <TextField size="small" placeholder="Número" sx={{ width: 120 }} value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
          <MuiButton type="submit" variant="contained" disabled={creating}>Añadir</MuiButton>
        </Stack>
      </Stack>
      <Stack divider={<Divider />}>
        {addresses.map((a) => (
          <Box key={a.id} sx={rowSx}>
            {editingId === a.id ? (
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Stack direction="row" spacing={1}>
                  <TextField size="small" value={editForm.sucursalName} onChange={(e) => setEditForm({ ...editForm, sucursalName: e.target.value })} fullWidth />
                  <Select size="small" value={editForm.communeId} onChange={(e) => setEditForm({ ...editForm, communeId: e.target.value })} MenuProps={selectMenuSx}>
                    {communes.map((c) => <MenuItem key={c.id} value={c.id}>{c.communeName}</MenuItem>)}
                  </Select>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField size="small" value={editForm.street} onChange={(e) => setEditForm({ ...editForm, street: e.target.value })} fullWidth />
                  <TextField size="small" value={editForm.number} onChange={(e) => setEditForm({ ...editForm, number: e.target.value })} sx={{ width: 100 }} />
                  <MuiButton size="small" onClick={() => handleUpdate(a.id)} disabled={updating}>Guardar</MuiButton>
                  <MuiButton size="small" onClick={() => setEditingId(null)}>Cancelar</MuiButton>
                </Stack>
              </Stack>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "#3D2B2B" }}>
                  {a.sucursalName} — {a.street} {a.number}
                  <Typography component="span" variant="caption" sx={{ color: "#9C7878", ml: 0.5 }}>
                    ({communes.find((c) => c.id === a.communeId)?.communeName || "Sin comuna"})
                  </Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => { setEditingId(a.id); setEditForm(a); }} sx={{ color: "#7B8FC8" }}>Editar</MuiButton>
                  <MuiButton size="small" onClick={() => deleteAddress(a.id)} sx={{ color: "#C0392B" }}>Eliminar</MuiButton>
                </Stack>
              </>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};