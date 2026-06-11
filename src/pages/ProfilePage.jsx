import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import {
  useGetProfileQuery,
  useUpdateContactMutation,
  useLogoutMutation,
} from "../store/api/userApi";
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
    setForm({
      name: profile.name || "",
      lastName: profile.lastName || "",
      phone: profile.phone || "",
    });
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

  // Campos a mostrar en la vista de perfil
  const profileFields = profile
    ? [
        { label: "Nombre", value: `${profile.name} ${profile.lastName}` },
        { label: "Correo", value: profile.email },
        { label: "Teléfono", value: profile.phone },
        { label: "Sucursal", value: profile.sucursalName },
      ].filter((f) => f.value)
    : [];

  // Campos editables
  const editFields = [
    { label: "Nombre", name: "name", placeholder: "Tu nombre" },
    { label: "Apellido", name: "lastName", placeholder: "Tu apellido" },
    { label: "Teléfono (9 dígitos)", name: "phone", placeholder: "912345678" },
  ];

  return (
    // Fondo de página: blanco rosado muy suave
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FDF6F4",
      }}
    >
      <NavBar />

      <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
        <Box sx={{ maxWidth: "448px", mx: "auto" }}>

          {/* Estado de carga */}
          {isLoading && (
            <Typography sx={{ color: "#9C7878", textAlign: "center" }}>
              Cargando perfil...
            </Typography>
          )}
          {isError && (
            <Typography sx={{ color: "#C0392B", textAlign: "center" }}>
              Error al cargar el perfil.
            </Typography>
          )}

          {/* ── Vista de datos del perfil ─────────────────────────────────── */}
          {profile && !editing && (
            // Tarjeta del perfil: fondo blanco con borde rosa suave
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                p: 3,
                border: "1px solid #EDD9D5",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#3D2B2B", mb: 3 }}
              >
                Mi Perfil
              </Typography>

              {/* Alerta de éxito al guardar cambios */}
              {success && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }}>
                  {success}
                </Alert>
              )}

              {/* Lista de campos del perfil con divisores */}
              <Stack sx={{ mb: 4 }}>
                {profileFields.map(({ label, value }, i) => (
                  <Box key={label}>
                    <Box sx={{ py: 2 }}>
                      {/* Etiqueta del campo */}
                      <Typography variant="caption" sx={{ color: "#9C7878" }}>
                        {label}
                      </Typography>
                      {/* Valor del campo */}
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "#3D2B2B" }}
                      >
                        {value}
                      </Typography>
                    </Box>
                    {/* Divisor entre campos excepto el último */}
                    {i < profileFields.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>

              {/* Botones de acción del perfil */}
              <Stack spacing={1.5}>
                {/* Botón editar: fondo rosa primario */}
                <MuiButton
                  onClick={handleEdit}
                  variant="contained"
                  fullWidth
                >
                  Editar datos
                </MuiButton>

                {/* Botón cerrar sesión: fondo rojo suave */}
                <MuiButton
                  onClick={handleLogout}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#C0392B",
                    "&:hover": { backgroundColor: "#9B2A1E" },
                  }}
                >
                  Cerrar sesión
                </MuiButton>
              </Stack>
            </Box>
          )}

          {/* ── Vista de edición de datos ─────────────────────────────────── */}
          {editing && (
            // Tarjeta de edición: misma estructura visual que la de perfil
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                p: 3,
                border: "1px solid #EDD9D5",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#3D2B2B", mb: 3 }}
              >
                Editar datos
              </Typography>

              {/* Alerta de error al guardar */}
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
                  {error}
                </Alert>
              )}

              {/* Formulario de edición */}
              <Stack component="form" onSubmit={handleSave} spacing={2}>
                {editFields.map(({ label, name, placeholder }) => (
                  <TextField
                    key={name}
                    label={label}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={updating}
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                ))}

                {/* Botones de guardar / cancelar */}
                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <MuiButton
                    type="submit"
                    disabled={updating}
                    variant="contained"
                    fullWidth
                  >
                    {updating ? "Guardando..." : "Guardar"}
                  </MuiButton>
                  <MuiButton
                    type="button"
                    onClick={() => setEditing(false)}
                    disabled={updating}
                    variant="outlined"
                    fullWidth
                  >
                    Cancelar
                  </MuiButton>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProfilePage;
