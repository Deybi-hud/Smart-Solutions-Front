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
import { panelSx, rowSx, addBtnSx } from "./RegionsPanel";

const selectMenuSx = { PaperProps: { sx: { backgroundColor: "#FAF0EE" } } };

const emptyForm = { sucursalName: "", street: "", number: "", communeId: "" };

const addressFields = [
  { key: "sucursalName", placeholder: "Nombre sucursal" },
  { key: "street", placeholder: "Calle" },
  { key: "number", placeholder: "Número" },
];

const CommuneSelect = ({ communes, value, onChange }) => (
  <FormControl size="small" sx={{ minWidth: "140px" }}>
    <InputLabel>Comuna</InputLabel>
    <Select value={value} onChange={onChange} label="Comuna" MenuProps={selectMenuSx}>
      <MenuItem value=""><em style={{ color: "#9C7878" }}>Comuna</em></MenuItem>
      {communes.map((c) => <MenuItem key={c.id} value={c.id}>{c.communeName}</MenuItem>)}
    </Select>
  </FormControl>
);

const AddressForm = ({ communes, values, onChange, onCommune, onSave, onCancel, loading }) => (
  <Stack direction="row" spacing={1} flexWrap="wrap">
    {addressFields.map(({ key, placeholder }) => (
      <TextField
        key={key}
        value={values[key]}
        onChange={(e) => onChange(key, e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        size="small"
        sx={{ flex: 1, minWidth: "120px" }}
      />
    ))}
    <CommuneSelect communes={communes} value={values.communeId} onChange={onCommune} />
    <MuiButton onClick={onSave} disabled={loading} variant="contained" size="small">
      {loading ? "..." : "Guardar"}
    </MuiButton>
    <MuiButton onClick={onCancel} variant="outlined" size="small">Cancelar</MuiButton>
  </Stack>
);

const AddressesPanel = () => {
  const { data: communes = [] } = useGetCommunesQuery();
  const { data: addresses = [] } = useGetAddressesQuery();
  const [createAddress, { isLoading: creating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setError("");
    if (!form.sucursalName.trim() || !form.street.trim() || !form.number.trim() || !form.communeId) {
      setError("Todos los campos son obligatorios."); return;
    }
    try {
      await createAddress({ ...form, communeId: Number(form.communeId) }).unwrap();
      setAdding(false); setForm(emptyForm);
    } catch (e) { setError(e?.data?.message || "Error al crear."); }
  };

  const handleUpdate = async (id) => {
    setError("");
    if (!editForm.sucursalName.trim() || !editForm.street.trim() || !editForm.number.trim() || !editForm.communeId) {
      setError("Todos los campos son obligatorios."); return;
    }
    try {
      await updateAddress({ id, data: { ...editForm, communeId: Number(editForm.communeId) } }).unwrap();
      setEditingId(null);
    } catch (e) { setError(e?.data?.message || "Error al actualizar."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta sucursal?")) return;
    try { await deleteAddress(id).unwrap(); }
    catch (e) { setError(e?.data?.message || "Error al eliminar."); }
  };

  const startEdit = (a) => {
    setEditingId(a.id);
    setEditForm({ sucursalName: a.sucursalName, street: a.street, number: a.number, communeId: String(a.communeId) });
  };

  const communeName = (id) => communes.find((c) => String(c.id) === String(id))?.communeName || "";

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" mb={1.5}>
        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, flex: 1 }}>Sucursales</Typography>
        <MuiButton onClick={() => setAdding(true)} variant="outlined" size="small" sx={addBtnSx}>+ Agregar</MuiButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {error && <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>{error}</Typography>}
      {adding && (
        <Box mb={2}>
          <AddressForm
            communes={communes}
            values={form}
            onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))}
            onCommune={(e) => setForm((f) => ({ ...f, communeId: e.target.value }))}
            onSave={handleCreate}
            onCancel={() => setAdding(false)}
            loading={creating}
          />
        </Box>
      )}
      <Stack divider={<Divider />}>
        {addresses.map((a) => (
          <Box key={a.id} sx={rowSx}>
            {editingId === a.id ? (
              <AddressForm
                communes={communes}
                values={editForm}
                onChange={(k, v) => setEditForm((f) => ({ ...f, [k]: v }))}
                onCommune={(e) => setEditForm((f) => ({ ...f, communeId: e.target.value }))}
                onSave={() => handleUpdate(a.id)}
                onCancel={() => setEditingId(null)}
                loading={updating}
              />
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {a.sucursalName} — {a.street} {a.number}{" "}
                  <Typography component="span" variant="caption" sx={{ color: "text.secondary" }}>
                    ({communeName(a.communeId)})
                  </Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <MuiButton size="small" onClick={() => startEdit(a)} sx={{ color: "#7B8FC8", minWidth: 0 }}>Editar</MuiButton>
                  <MuiButton size="small" onClick={() => handleDelete(a.id)} sx={{ color: "#C0392B", minWidth: 0 }}>Eliminar</MuiButton>
                </Stack>
              </>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default AddressesPanel;
