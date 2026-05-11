import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import { useGetProfileQuery, useUpdateContactMutation, useLogoutMutation } from "../store/api/userApi";
import { logout } from "../store/slices/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateContact, { isLoading: updating }] = useUpdateContactMutation();
  const [logoutApi] = useLogoutMutation();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", lastName: "", phone: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleEdit = () => {
    setForm({ name: profile.name || "", lastName: profile.lastName || "", phone: profile.phone || "" });
    setEditing(true);
    setSuccess("");
    setError("");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name.trim() || !form.lastName.trim() || !form.phone.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      await updateContact(form).unwrap();
      setSuccess("Datos actualizados correctamente.");
      setEditing(false);
    } catch (err) {
      setError(err?.data?.message || "Error al actualizar. Intenta de nuevo.");
    }
  };

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch {}
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar />
      <main className="flex-1 py-8 sm:py-12 px-4">
        <div className="max-w-md mx-auto">
          {isLoading && <p className="text-gray-400 text-center">Cargando perfil...</p>}
          {isError && <p className="text-red-500 text-center">Error al cargar el perfil.</p>}

          {profile && !editing && (
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>
              {success && <p className="mb-4 text-sm text-green-400">{success}</p>}
              <div className="space-y-4 mb-8">
                {[
                  { label: "Nombre", value: `${profile.name} ${profile.lastName}` },
                  { label: "Correo", value: profile.email },
                  { label: "Teléfono", value: profile.phone },
                  { label: "Sucursal", value: profile.sucursalName },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} className="border-b border-gray-700 pb-4">
                      <p className="text-sm text-gray-400">{label}</p>
                      <p className="text-base font-medium">{value}</p>
                    </div>
                  ) : null
                )}
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={handleEdit} className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition">
                  Editar datos
                </button>
                <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-500 transition">
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}

          {editing && (
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Editar datos</h2>
              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
              <form onSubmit={handleSave} className="space-y-4">
                {[
                  { label: "Nombre", name: "name", placeholder: "Tu nombre" },
                  { label: "Apellido", name: "lastName", placeholder: "Tu apellido" },
                  { label: "Teléfono (9 dígitos)", name: "phone", placeholder: "912345678" },
                ].map(({ label, name, placeholder }) => (
                  <div key={name} className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400">{label}</label>
                    <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} disabled={updating}
                      className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500 disabled:opacity-50" />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={updating} className="flex-1 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition disabled:opacity-50">
                    {updating ? "Guardando..." : "Guardar"}
                  </button>
                  <button type="button" onClick={() => setEditing(false)} disabled={updating} className="flex-1 border border-gray-600 text-gray-300 py-2 rounded-md font-semibold hover:border-gray-400 transition">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
