import { useState } from "react";
import {
  useGetRegionsQuery, useCreateRegionMutation, useUpdateRegionMutation, useDeleteRegionMutation,
  useGetCommunesQuery, useCreateCommuneMutation, useUpdateCommuneMutation, useDeleteCommuneMutation,
  useGetAddressesQuery, useCreateAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation,
} from "../../store/api/locationApi";

const EditableRow = ({ label, onSave, onCancel, initialValue = "", isLoading }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div className="flex gap-2 items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        disabled={isLoading}
        className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-50"
      />
      <button onClick={() => onSave(value)} disabled={isLoading || !value.trim()}
        className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 disabled:opacity-40 transition">
        {isLoading ? "..." : "Guardar"}
      </button>
      <button onClick={onCancel} disabled={isLoading}
        className="border border-gray-600 text-gray-400 px-3 py-1.5 rounded-md text-sm hover:border-gray-400 transition">
        Cancelar
      </button>
    </div>
  );
};

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
    try {
      await createRegion({ regionName: value }).unwrap();
      setAdding(false);
    } catch (e) {
      setError(e?.data?.message || "Error al crear región.");
    }
  };

  const handleUpdate = async (id, value) => {
    setError("");
    try {
      await updateRegion({ id, data: { regionName: value } }).unwrap();
      setEditingId(null);
    } catch (e) {
      setError(e?.data?.message || "Error al actualizar.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta región? También se eliminarán sus comunas y sucursales.")) return;
    try { await deleteRegion(id).unwrap(); } catch (e) { setError(e?.data?.message || "Error al eliminar."); }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Regiones</h3>
        <button onClick={() => setAdding(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 transition">
          + Agregar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {adding && (
        <EditableRow label="Nombre de región" onSave={handleCreate} onCancel={() => setAdding(false)} isLoading={creating} />
      )}
      <ul className="space-y-2">
        {regions.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-2 border-b border-gray-700 pb-2">
            {editingId === r.id ? (
              <EditableRow label="Nombre de región" initialValue={r.regionName}
                onSave={(v) => handleUpdate(r.id, v)} onCancel={() => setEditingId(null)} isLoading={updating} />
            ) : (
              <>
                <span className="text-gray-200 text-sm">{r.regionName}</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(r.id)} className="text-blue-400 text-xs hover:text-blue-300">Editar</button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-400 text-xs hover:text-red-300">Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
    try { await deleteCommune(id).unwrap(); } catch (e) { setError(e?.data?.message || "Error al eliminar."); }
  };

  const startEdit = (c) => { setEditingId(c.id); setEditName(c.communeName); setEditRegionId(String(c.regionId)); };

  const SelectRegion = ({ value, onChange }) => (
    <select value={value} onChange={onChange}
      className="rounded-md border border-gray-600 bg-gray-800 px-2 py-1.5 text-sm text-white outline-none focus:border-blue-500">
      <option value="">Región</option>
      {regions.map((r) => <option key={r.id} value={r.id}>{r.regionName}</option>)}
    </select>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Comunas</h3>
        <button onClick={() => setAdding(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 transition">
          + Agregar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {adding && (
        <div className="flex gap-2 flex-wrap">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre de comuna" disabled={creating}
            className="flex-1 min-w-32 rounded-md border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-50" />
          <SelectRegion value={newRegionId} onChange={(e) => setNewRegionId(e.target.value)} />
          <button onClick={handleCreate} disabled={creating} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 disabled:opacity-40 transition">
            {creating ? "..." : "Guardar"}
          </button>
          <button onClick={() => setAdding(false)} className="border border-gray-600 text-gray-400 px-3 py-1.5 rounded-md text-sm hover:border-gray-400 transition">Cancelar</button>
        </div>
      )}
      <ul className="space-y-2">
        {communes.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-2 border-b border-gray-700 pb-2">
            {editingId === c.id ? (
              <div className="flex gap-2 flex-wrap flex-1">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} disabled={updating}
                  className="flex-1 min-w-32 rounded-md border border-gray-600 bg-gray-800 px-2 py-1.5 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-50" />
                <SelectRegion value={editRegionId} onChange={(e) => setEditRegionId(e.target.value)} />
                <button onClick={() => handleUpdate(c.id)} disabled={updating} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 disabled:opacity-40 transition">
                  {updating ? "..." : "Guardar"}
                </button>
                <button onClick={() => setEditingId(null)} className="border border-gray-600 text-gray-400 px-3 py-1.5 rounded-md text-sm hover:border-gray-400 transition">Cancelar</button>
              </div>
            ) : (
              <>
                <span className="text-gray-200 text-sm">{c.communeName} <span className="text-gray-500 text-xs">— {c.regionName}</span></span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(c)} className="text-blue-400 text-xs hover:text-blue-300">Editar</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-400 text-xs hover:text-red-300">Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

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

  const SelectCommune = ({ value, onChange }) => (
    <select value={value} onChange={onChange}
      className="rounded-md border border-gray-600 bg-gray-800 px-2 py-1.5 text-sm text-white outline-none focus:border-blue-500">
      <option value="">Comuna</option>
      {communes.map((c) => <option key={c.id} value={c.id}>{c.communeName}</option>)}
    </select>
  );

  const fields = [
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
    try { await deleteAddress(id).unwrap(); } catch (e) { setError(e?.data?.message || "Error al eliminar."); }
  };

  const startEdit = (a) => {
    setEditingId(a.id);
    setEditForm({ sucursalName: a.sucursalName, street: a.street, number: a.number, communeId: String(a.communeId) });
  };

  const AddressForm = ({ values, onChange, onCommune, onSave, onCancel, loading }) => (
    <div className="flex gap-2 flex-wrap">
      {fields.map(({ key, placeholder }) => (
        <input key={key} value={values[key]} onChange={(e) => onChange(key, e.target.value)} placeholder={placeholder} disabled={loading}
          className="flex-1 min-w-28 rounded-md border border-gray-600 bg-gray-800 px-2 py-1.5 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-50" />
      ))}
      <SelectCommune value={values.communeId} onChange={onCommune} />
      <button onClick={onSave} disabled={loading} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 disabled:opacity-40 transition">
        {loading ? "..." : "Guardar"}
      </button>
      <button onClick={onCancel} className="border border-gray-600 text-gray-400 px-3 py-1.5 rounded-md text-sm hover:border-gray-400 transition">Cancelar</button>
    </div>
  );

  const communeName = (id) => communes.find((c) => String(c.id) === String(id))?.communeName || "";

  return (
    <div className="bg-gray-900 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Sucursales</h3>
        <button onClick={() => setAdding(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-500 transition">
          + Agregar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {adding && (
        <AddressForm values={form} onChange={(k, v) => setForm({ ...form, [k]: v })}
          onCommune={(e) => setForm({ ...form, communeId: e.target.value })}
          onSave={handleCreate} onCancel={() => setAdding(false)} loading={creating} />
      )}
      <ul className="space-y-2">
        {addresses.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-2 border-b border-gray-700 pb-2">
            {editingId === a.id ? (
              <AddressForm values={editForm} onChange={(k, v) => setEditForm({ ...editForm, [k]: v })}
                onCommune={(e) => setEditForm({ ...editForm, communeId: e.target.value })}
                onSave={() => handleUpdate(a.id)} onCancel={() => setEditingId(null)} loading={updating} />
            ) : (
              <>
                <span className="text-gray-200 text-sm">
                  {a.sucursalName} — {a.street} {a.number}
                  <span className="text-gray-500 text-xs ml-1">({communeName(a.communeId)})</span>
                </span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(a)} className="text-blue-400 text-xs hover:text-blue-300">Editar</button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-400 text-xs hover:text-red-300">Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LocationPanel = () => {
  return (
    <div className="space-y-6">
      <RegionsPanel />
      <CommunesPanel />
      <AddressesPanel />
    </div>
  );
};

export default LocationPanel;
