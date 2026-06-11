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
  useGetRegionsQuery, useCreateRegionMutation, useUpdateRegionMutation, useDeleteRegionMutation,
  useGetCommunesQuery, useCreateCommuneMutation, useUpdateCommuneMutation, useDeleteCommuneMutation,
  useGetAddressesQuery, useCreateAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation,
} from "../../store/api/locationApi";

// ── Estilos reutilizables ──────────────────────────────────────────────────

// Fondo del panel de cada sección (Regiones / Comunas / Sucursales)
const panelSx = {
  backgroundColor: "#FFFFFF",          // Panel blanco
  border: "1px solid #EDD9D5",         // Borde divisor rosa suave
  borderRadius: "10px",
  p: 3,
};

// Fila de un ítem dentro del panel
const rowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  py: 1.5,
};

// Estilos del menú desplegable de selects
const selectMenuSx = {
  PaperProps: {
    sx: { backgroundColor: "#FAF0EE" }, // Fondo salmón muy suave en el dropdown
  },
};

// ── Componente de fila editable ────────────────────────────────────────────
const EditableRow = ({ label, onSave, onCancel, initialValue = "", isLoading }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        disabled={isLoading}
        size="small"
        fullWidth
      />
      <MuiButton
        onClick={() => onSave(value)}
        disabled={isLoading || !value.trim()}
        variant="contained"
        size="small"
        sx={{ whiteSpace: "nowrap" }}
      >
        {isLoading ? "..." : "Guardar"}
      </MuiButton>
      <MuiButton
        onClick={onCancel}
        disabled={isLoading}
        variant="outlined"
        size="small"
        sx={{ whiteSpace: "nowrap" }}
      >
        Cancelar
      </MuiButton>
    </Stack>
  );
};

// ── Panel de Regiones ──────────────────────────────────────────────────────
const RegionsPanel = () => {
  const { data: regions = [] } = useGetRegionsQuery();
  const [createRegion, { isLoading: creating }] = useCreateRegionMutation();
  const [updateRegion, { isLoading: updating }] = useUpdateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const handleCreate = async (value) => {
    setError("");
    try { await createRegion({ regionName: value }).unwrap(); setAdding(false); }
    catch (e) { setError(e?.data?.message || "Error al crear región."); }
  };

  const handleUpdate = async (id, value) => {
    setError("");
    try { await updateRegion({ id, data: { regionName: value } }).unwrap(); setEditingId(null); }
    catch (e) { setError(e?.data?.message || "Error al actualizar."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta región? También se eliminarán sus comunas y sucursales.")) return;
    try { await deleteRegion(id).unwrap(); }
    catch (e) { setError(e?.data?.message || "Error al eliminar."); }
  };

  return (
    // Tarjeta del panel de regiones
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        {/* Título de la sección */}
        <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600 }}>
          Regiones
        </Typography>
        <MuiButton onClick={() => setAdding(true)} variant="contained" size="small">
          + Agregar
        </MuiButton>
      </Stack>

      {/* Mensaje de error inline */}
      {error && (
        <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>
          {error}
        </Typography>
      )}

      {/* Formulario inline para agregar nueva región */}
      {adding && (
        <Box mb={2}>
          <EditableRow
            label="Nombre de región"
            onSave={handleCreate}
            onCancel={() => setAdding(false)}
            isLoading={creating}
          />
        </Box>
      )}

      {/* Lista de regiones existentes */}
      <Stack divider={<Divider />}>
        {regions.map((r) => (
          <Box key={r.id} sx={rowSx}>
            {editingId === r.id ? (
              // Fila en modo edición
              <EditableRow
                label="Nombre de región"
                initialValue={r.regionName}
                onSave={(v) => handleUpdate(r.id, v)}
                onCancel={() => setEditingId(null)}
                isLoading={updating}
              />
            ) : (
              // Fila en modo lectura
              <>
                <Typography variant="body2" sx={{ color: "#3D2B2B" }}>
                  {r.regionName}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {/* Botón editar: azul suave */}
                  <MuiButton
                    size="small"
                    onClick={() => setEditingId(r.id)}
                    sx={{ color: "#7B8FC8", minWidth: 0 }}
                  >
                    Editar
                  </MuiButton>
                  {/* Botón eliminar: rojo suave */}
                  <MuiButton
                    size="small"
                    onClick={() => handleDelete(r.id)}
                    sx={{ color: "#C0392B", minWidth: 0 }}
                  >
                    Eliminar
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

// ── Panel de Comunas ───────────────────────────────────────────────────────
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

  // Selector de región reutilizable dentro del panel
  const RegionSelect = ({ value, onChange }) => (
    <FormControl size="small" sx={{ minWidth: "140px" }}>
      <InputLabel>Región</InputLabel>
      <Select value={value} onChange={onChange} label="Región" MenuProps={selectMenuSx}>
        <MenuItem value=""><em style={{ color: "#9C7878" }}>Región</em></MenuItem>
        {regions.map((r) => (
          <MenuItem key={r.id} value={r.id}>{r.regionName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600 }}>Comunas</Typography>
        <MuiButton onClick={() => setAdding(true)} variant="contained" size="small">+ Agregar</MuiButton>
      </Stack>
      {error && <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>{error}</Typography>}
      {adding && (
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <TextField value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de comuna" disabled={creating} size="small" sx={{ flex: 1, minWidth: "160px" }} />
          <RegionSelect value={newRegionId} onChange={(e) => setNewRegionId(e.target.value)} />
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
                <TextField value={editName} onChange={(e) => setEditName(e.target.value)}
                  disabled={updating} size="small" sx={{ flex: 1, minWidth: "160px" }} />
                <RegionSelect value={editRegionId} onChange={(e) => setEditRegionId(e.target.value)} />
                <MuiButton onClick={() => handleUpdate(c.id)} disabled={updating} variant="contained" size="small">
                  {updating ? "..." : "Guardar"}
                </MuiButton>
                <MuiButton onClick={() => setEditingId(null)} variant="outlined" size="small">Cancelar</MuiButton>
              </Stack>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "#3D2B2B" }}>
                  {c.communeName}{" "}
                  {/* Nombre de la región en texto secundario */}
                  <Typography component="span" variant="caption" sx={{ color: "#9C7878" }}>
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

// ── Panel de Sucursales ────────────────────────────────────────────────────
const AddressesPanel = () => {
  const { data: communes = [] } = useGetCommunesQuery();
  const { data: addresses = [] } = useGetAddressesQuery();
  const [createAddress, { isLoading: creating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const emptyForm = { sucursalName: "", street: "", number: "", communeId: "" };
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const CommuneSelect = ({ value, onChange }) => (
    <FormControl size="small" sx={{ minWidth: "140px" }}>
      <InputLabel>Comuna</InputLabel>
      <Select value={value} onChange={onChange} label="Comuna" MenuProps={selectMenuSx}>
        <MenuItem value=""><em style={{ color: "#9C7878" }}>Comuna</em></MenuItem>
        {communes.map((c) => <MenuItem key={c.id} value={c.id}>{c.communeName}</MenuItem>)}
      </Select>
    </FormControl>
  );

  const addressFields = [
    { key: "sucursalName", placeholder: "Nombre sucursal" },
    { key: "street", placeholder: "Calle" },
    { key: "number", placeholder: "Número" },
  ];

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

  const AddressForm = ({ values, onChange, onCommune, onSave, onCancel, loading }) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {addressFields.map(({ key, placeholder }) => (
        <TextField key={key} value={values[key]} onChange={(e) => onChange(key, e.target.value)}
          placeholder={placeholder} disabled={loading} size="small" sx={{ flex: 1, minWidth: "120px" }} />
      ))}
      <CommuneSelect value={values.communeId} onChange={onCommune} />
      <MuiButton onClick={onSave} disabled={loading} variant="contained" size="small">
        {loading ? "..." : "Guardar"}
      </MuiButton>
      <MuiButton onClick={onCancel} variant="outlined" size="small">Cancelar</MuiButton>
    </Stack>
  );

  return (
    <Box sx={panelSx}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600 }}>Sucursales</Typography>
        <MuiButton onClick={() => setAdding(true)} variant="contained" size="small">+ Agregar</MuiButton>
      </Stack>
      {error && <Typography variant="body2" sx={{ color: "#C0392B", mb: 1 }}>{error}</Typography>}
      {adding && (
        <Box mb={2}>
          <AddressForm values={form} onChange={(k, v) => setForm({ ...form, [k]: v })}
            onCommune={(e) => setForm({ ...form, communeId: e.target.value })}
            onSave={handleCreate} onCancel={() => setAdding(false)} loading={creating} />
        </Box>
      )}
      <Stack divider={<Divider />}>
        {addresses.map((a) => (
          <Box key={a.id} sx={rowSx}>
            {editingId === a.id ? (
              <AddressForm values={editForm} onChange={(k, v) => setEditForm({ ...editForm, [k]: v })}
                onCommune={(e) => setEditForm({ ...editForm, communeId: e.target.value })}
                onSave={() => handleUpdate(a.id)} onCancel={() => setEditingId(null)} loading={updating} />
            ) : (
              <>
                <Typography variant="body2" sx={{ color: "#3D2B2B" }}>
                  {a.sucursalName} — {a.street} {a.number}
                  {/* Nombre de la comuna en texto secundario */}
                  <Typography component="span" variant="caption" sx={{ color: "#9C7878", ml: 0.5 }}>
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

// ── Componente principal que une los tres paneles ──────────────────────────
const LocationPanel = () => (
  <Stack spacing={3}>
    <RegionsPanel />
    <CommunesPanel />
    <AddressesPanel />
  </Stack>
);

export default LocationPanel;
