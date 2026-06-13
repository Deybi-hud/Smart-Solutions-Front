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
import Chip from "@mui/material/Chip";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import {
  useGetProfileQuery,
  useUpdateContactMutation,
  useLogoutMutation,
} from "../store/api/userApi";
import { useGetUserSubscriptionQuery } from "../store/api/subscriptionsApi";
import { logout } from "../store/slices/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateContact, { isLoading: updating }] = useUpdateContactMutation();
  const [logoutApi] = useLogoutMutation();
  const { data: subscription } = useGetUserSubscriptionQuery(profile?.id, { skip: !profile?.id });

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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <NavBar />

      <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
        <Box sx={{ maxWidth: "448px", mx: "auto" }}>

          {/* Estado de carga */}
          {isLoading && (
            <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
              Cargando perfil...
            </Typography>
          )}
          {isError && (
            <Typography sx={{ color: "error.main", textAlign: "center" }}>
              Error al cargar el perfil.
            </Typography>
          )}

          {profile && !editing && (
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "14px",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}
              >
                Mi Perfil
              </Typography>

              {success && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }}>
                  {success}
                </Alert>
              )}

              <Stack sx={{ mb: 4 }}>
                {profileFields.map(({ label, value }, i) => (
                  <Box key={label}>
                    <Box sx={{ py: 2 }}>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {label}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {value}
                      </Typography>
                    </Box>
                    {i < profileFields.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>

              <Stack spacing={1.5}>
                <MuiButton
                  onClick={handleEdit}
                  variant="contained"
                  fullWidth
                >
                  Editar datos
                </MuiButton>

                <MuiButton
                  onClick={handleLogout}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "error.main",
                    "&:hover": { backgroundColor: "#9B2A1E" },
                  }}
                >
                  Cerrar sesión
                </MuiButton>
              </Stack>
            </Box>
          )}

          {subscription && !editing && (
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "14px",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                mt: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>
                Mi Suscripción
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>Plan</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                    {subscription.planName}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>Estado</Typography>
                  <Chip
                    label={subscription.status}
                    size="small"
                    color={subscription.status === "ACTIVE" ? "success" : "default"}
                    variant="outlined"
                  />
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>Vence</Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {subscription.currentPeriodEnd
                      ? new Date(subscription.currentPeriodEnd).toLocaleDateString("es-CL")
                      : "—"}
                  </Typography>
                </Box>
                {subscription.cancelAtPeriodEnd && (
                  <>
                    <Divider />
                    <Typography variant="caption" sx={{ color: "error.main" }}>
                      La renovación automática está cancelada.
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>
          )}

          {!subscription && profile && !editing && (
            <Box
              sx={{
                backgroundColor: "primary.light",
                borderRadius: "14px",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                mt: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                No tienes un plan activo. Contacta al administrador para activar uno.
              </Typography>
            </Box>
          )}

          {editing && (
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "14px",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}
              >
                Editar datos
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
                  {error}
                </Alert>
              )}

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
