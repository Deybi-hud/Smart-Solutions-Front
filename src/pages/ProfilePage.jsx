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
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} from "../store/api/userApi";
import {
  useGetUserSubscriptionQuery,
  useCancelSubscriptionMutation,
  useGetSubscriptionHistoryQuery,
} from "../store/api/subscriptionsApi";
import { logout } from "../store/slices/authSlice";

const ACTION_LABELS = {
  CREATION: "Alta",
  RENEWAL: "Renovación",
  PLAN_CHANGE: "Cambio de plan",
  CANCELLATION: "Cancelación",
  EXPIRATION: "Expiración",
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateContact, { isLoading: updatingContact }] = useUpdateContactMutation();
  const [updateEmail, { isLoading: updatingEmail }] = useUpdateEmailMutation();
  const [updatePassword, { isLoading: updatingPassword }] = useUpdatePasswordMutation();
  const [cancelSubscription, { isLoading: cancelling }] = useCancelSubscriptionMutation();
  const [logoutApi] = useLogoutMutation();

  const { data: subscription } = useGetUserSubscriptionQuery(profile?.id, { skip: !profile?.id });
  const { data: history } = useGetSubscriptionHistoryQuery(profile?.id, { skip: !profile?.id });

  const [editMode, setEditMode] = useState(null);
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const resetMessages = () => { setSuccess(""); setError(""); };

  const openEdit = (mode) => {
    if (mode === "contact") {
      setForm({ name: profile.name || "", lastName: profile.lastName || "", phone: profile.phone || "" });
    } else {
      setForm({});
    }
    setEditMode(mode);
    resetMessages();
  };

  const closeEdit = () => { setEditMode(null); resetMessages(); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSaveContact = async (e) => {
    e.preventDefault();
    resetMessages();
    if (!form.name?.trim() || !form.lastName?.trim() || !form.phone?.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      await updateContact(form).unwrap();
      setSuccess("Datos actualizados correctamente.");
      setEditMode(null);
    } catch (err) {
      setError(err?.data?.message || "Error al actualizar. Intenta de nuevo.");
    }
  };

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    resetMessages();
    if (!form.newEmail?.trim() || !form.confirmNewEmail?.trim() || !form.password?.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (form.newEmail !== form.confirmNewEmail) {
      setError("Los correos no coinciden.");
      return;
    }
    try {
      await updateEmail({ newEmail: form.newEmail, confirmNewEmail: form.confirmNewEmail, password: form.password }).unwrap();
      setSuccess("Correo actualizado correctamente.");
      setEditMode(null);
    } catch (err) {
      setError(err?.data?.message || "Error al actualizar el correo.");
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    resetMessages();
    if (!form.currentPassword?.trim() || !form.newPassword?.trim() || !form.confirmNewPassword?.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (form.newPassword !== form.confirmNewPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword, confirmNewPassword: form.confirmNewPassword }).unwrap();
      setSuccess("Contraseña actualizada correctamente.");
      setEditMode(null);
    } catch (err) {
      setError(err?.data?.message || "Error al actualizar la contraseña.");
    }
  };

  const handleCancelPlan = async () => {
    resetMessages();
    try {
      await cancelSubscription(profile.id).unwrap();
      setSuccess("Suscripción cancelada.");
    } catch (err) {
      setError(err?.data?.message || "Error al cancelar la suscripción.");
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

  const isActive = subscription?.status === "ACTIVE";
  const isInactive = subscription?.status === "CANCELED" || subscription?.status === "EXPIRED";

  const updating = updatingContact || updatingEmail || updatingPassword;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}>
      <NavBar />

      <Box component="main" sx={{ flex: 1, py: { xs: 4, sm: 6 }, px: 2 }}>
        <Box sx={{ maxWidth: "448px", mx: "auto" }}>

          {isLoading && (
            <Typography sx={{ color: "text.secondary", textAlign: "center" }}>Cargando perfil...</Typography>
          )}
          {isError && (
            <Typography sx={{ color: "error.main", textAlign: "center" }}>Error al cargar el perfil.</Typography>
          )}

          {success && editMode === null && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }}>{success}</Alert>
          )}
          {error && editMode === null && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{error}</Alert>
          )}

          {profile && editMode === null && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Mi Perfil</Typography>

              <Stack sx={{ mb: 4 }}>
                {profileFields.map(({ label, value }, i) => (
                  <Box key={label}>
                    <Box sx={{ py: 2 }}>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>{label}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>{value}</Typography>
                    </Box>
                    {i < profileFields.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>

              <Stack spacing={1.5}>
                <MuiButton onClick={() => openEdit("contact")} variant="contained" fullWidth>
                  Editar datos de contacto
                </MuiButton>
                <MuiButton onClick={() => openEdit("email")} variant="outlined" fullWidth>
                  Cambiar correo
                </MuiButton>
                <MuiButton onClick={() => openEdit("password")} variant="outlined" fullWidth>
                  Cambiar contraseña
                </MuiButton>
                <MuiButton
                  onClick={handleLogout}
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "error.main", "&:hover": { backgroundColor: "#9B2A1E" } }}
                >
                  Cerrar sesión
                </MuiButton>
              </Stack>
            </Box>
          )}

          {editMode === "contact" && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Editar datos de contacto</Typography>
              {error && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{error}</Alert>}
              <Stack component="form" onSubmit={handleSaveContact} spacing={2}>
                {[
                  { label: "Nombre", name: "name" },
                  { label: "Apellido", name: "lastName" },
                  { label: "Teléfono", name: "phone" },
                ].map(({ label, name }) => (
                  <TextField key={name} label={label} name={name} value={form[name] || ""} onChange={handleChange} disabled={updatingContact} size="small" fullWidth variant="outlined" />
                ))}
                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <MuiButton type="submit" disabled={updatingContact} variant="contained" fullWidth>
                    {updatingContact ? "Guardando..." : "Guardar"}
                  </MuiButton>
                  <MuiButton type="button" onClick={closeEdit} disabled={updatingContact} variant="outlined" fullWidth>Cancelar</MuiButton>
                </Stack>
              </Stack>
            </Box>
          )}

          {editMode === "email" && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Cambiar correo</Typography>
              {error && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{error}</Alert>}
              <Stack component="form" onSubmit={handleSaveEmail} spacing={2}>
                {[
                  { label: "Nuevo correo", name: "newEmail", type: "email" },
                  { label: "Confirmar correo", name: "confirmNewEmail", type: "email" },
                  { label: "Contraseña actual", name: "password", type: "password" },
                ].map(({ label, name, type }) => (
                  <TextField key={name} label={label} name={name} type={type || "text"} value={form[name] || ""} onChange={handleChange} disabled={updatingEmail} size="small" fullWidth variant="outlined" />
                ))}
                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <MuiButton type="submit" disabled={updatingEmail} variant="contained" fullWidth>
                    {updatingEmail ? "Guardando..." : "Guardar"}
                  </MuiButton>
                  <MuiButton type="button" onClick={closeEdit} disabled={updatingEmail} variant="outlined" fullWidth>Cancelar</MuiButton>
                </Stack>
              </Stack>
            </Box>
          )}

          {editMode === "password" && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Cambiar contraseña</Typography>
              {error && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{error}</Alert>}
              <Stack component="form" onSubmit={handleSavePassword} spacing={2}>
                {[
                  { label: "Contraseña actual", name: "currentPassword" },
                  { label: "Nueva contraseña", name: "newPassword" },
                  { label: "Confirmar contraseña", name: "confirmNewPassword" },
                ].map(({ label, name }) => (
                  <TextField key={name} label={label} name={name} type="password" value={form[name] || ""} onChange={handleChange} disabled={updatingPassword} size="small" fullWidth variant="outlined" />
                ))}
                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <MuiButton type="submit" disabled={updatingPassword} variant="contained" fullWidth>
                    {updatingPassword ? "Guardando..." : "Guardar"}
                  </MuiButton>
                  <MuiButton type="button" onClick={closeEdit} disabled={updatingPassword} variant="outlined" fullWidth>Cancelar</MuiButton>
                </Stack>
              </Stack>
            </Box>
          )}

          {subscription && editMode === null && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider", mt: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>Mi Suscripción</Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>Plan</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{subscription.planName}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>Estado</Typography>
                  <Chip
                    label={subscription.status}
                    size="small"
                    color={isActive ? "success" : "default"}
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
                    <Typography variant="caption" sx={{ color: "error.main" }}>La renovación automática está cancelada.</Typography>
                  </>
                )}
                {isActive && (
                  <>
                    <Divider />
                    <MuiButton
                      onClick={handleCancelPlan}
                      disabled={cancelling}
                      variant="outlined"
                      color="error"
                      size="small"
                      fullWidth
                    >
                      {cancelling ? "Cancelando..." : "Cancelar suscripción"}
                    </MuiButton>
                  </>
                )}
                {isInactive && (
                  <>
                    <Divider />
                    <MuiButton onClick={() => navigate("/home")} variant="outlined" size="small" fullWidth>
                      Ver planes disponibles
                    </MuiButton>
                  </>
                )}
              </Stack>
            </Box>
          )}

          {!subscription && profile && editMode === null && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider", mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                No tienes un plan activo. Contacta al administrador para activar uno.
              </Typography>
            </Box>
          )}

          {history && history.length > 0 && editMode === null && (
            <Box sx={{ backgroundColor: "background.paper", borderRadius: "14px", p: 3, border: "1px solid", borderColor: "divider", mt: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>Historial de suscripción</Typography>
              <Stack spacing={0}>
                {history.map((entry, i) => (
                  <Box key={entry.id}>
                    <Box sx={{ py: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                          {ACTION_LABELS[entry.action] || entry.action}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {entry.changedAt ? new Date(entry.changedAt).toLocaleDateString("es-CL") : "—"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>{entry.subscriptionName}</Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          ${Number(entry.subscriptionPrice).toLocaleString("es-CL")}
                        </Typography>
                      </Box>
                    </Box>
                    {i < history.length - 1 && <Divider />}
                  </Box>
                ))}
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
