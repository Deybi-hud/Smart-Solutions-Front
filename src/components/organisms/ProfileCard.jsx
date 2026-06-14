import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import {
  useGetProfileQuery,
  useUpdateContactMutation,
  useLogoutMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} from "../../store/api/userApi";
import { logout } from "../../store/slices/authSlice";
import {
  validateContactForm,
  validateEmailChangeForm,
  validatePasswordChangeForm,
} from "../../utils/validations";

const cardSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  p: 3,
};

const ProfileCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateContact, { isLoading: updatingContact }] = useUpdateContactMutation();
  const [updateEmail, { isLoading: updatingEmail }] = useUpdateEmailMutation();
  const [updatePassword, { isLoading: updatingPassword }] = useUpdatePasswordMutation();
  const [logoutApi] = useLogoutMutation();

  const [editMode, setEditMode] = useState(null);
  const [form, setForm] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const resetState = () => { setFieldErrors({}); setApiError(""); setSuccess(""); };
  const closeEdit = () => { setEditMode(null); resetState(); };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) setFieldErrors((fe) => ({ ...fe, [e.target.name]: null }));
  };

  const openEdit = (mode) => {
    setForm(mode === "contact"
      ? { name: profile.name || "", lastName: profile.lastName || "", phone: profile.phone || "" }
      : {}
    );
    setEditMode(mode);
    resetState();
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    resetState();
    const errors = validateContactForm(form);
    if (errors) { setFieldErrors(errors); return; }
    try {
      await updateContact(form).unwrap();
      setSuccess("Datos actualizados correctamente.");
      setEditMode(null);
    } catch (err) { setApiError(err?.data?.message || "Error al actualizar."); }
  };

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    resetState();
    const errors = validateEmailChangeForm(form);
    if (errors) { setFieldErrors(errors); return; }
    try {
      await updateEmail({ newEmail: form.newEmail, confirmNewEmail: form.confirmNewEmail, password: form.password }).unwrap();
      setSuccess("Correo actualizado correctamente.");
      setEditMode(null);
    } catch (err) { setApiError(err?.data?.message || "Error al actualizar el correo."); }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    resetState();
    const errors = validatePasswordChangeForm(form);
    if (errors) { setFieldErrors(errors); return; }
    try {
      await updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword, confirmNewPassword: form.confirmNewPassword }).unwrap();
      setSuccess("Contraseña actualizada correctamente.");
      setEditMode(null);
    } catch (err) { setApiError(err?.data?.message || "Error al actualizar la contraseña."); }
  };

  const handleLogout = async () => {
    try { await logoutApi().unwrap(); } catch {}
    dispatch(logout());
    navigate("/login");
  };

  if (isLoading) return <Typography sx={{ color: "text.secondary", textAlign: "center" }}>Cargando perfil...</Typography>;
  if (isError) return <Typography sx={{ color: "error.main", textAlign: "center" }}>Error al cargar el perfil.</Typography>;

  const profileFields = profile
    ? [
        { label: "Nombre", value: `${profile.name} ${profile.lastName}` },
        { label: "Correo", value: profile.email },
        { label: "Teléfono", value: profile.phone },
        { label: "Sucursal", value: profile.sucursalName },
      ].filter((f) => f.value)
    : [];

  return (
    <>
      {success && editMode === null && <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }}>{success}</Alert>}

      {profile && editMode === null && (
        <Box sx={cardSx}>
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
            <MuiButton onClick={() => openEdit("contact")} variant="contained" fullWidth>Editar datos de contacto</MuiButton>
            <MuiButton onClick={() => openEdit("email")} variant="outlined" fullWidth>Cambiar correo</MuiButton>
            <MuiButton onClick={() => openEdit("password")} variant="outlined" fullWidth>Cambiar contraseña</MuiButton>
            <MuiButton onClick={handleLogout} variant="contained" fullWidth sx={{ backgroundColor: "error.main", "&:hover": { backgroundColor: "#9B2A1E" } }}>
              Cerrar sesión
            </MuiButton>
          </Stack>
        </Box>
      )}

      {editMode === "contact" && (
        <Box sx={cardSx}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Editar datos de contacto</Typography>
          {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{apiError}</Alert>}
          <Stack component="form" onSubmit={handleSaveContact} spacing={2}>
            {[
              { label: "Nombre", name: "name" },
              { label: "Apellido", name: "lastName" },
              { label: "Teléfono (ej: 912345678)", name: "phone" },
            ].map(({ label, name }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                disabled={updatingContact}
                size="small"
                fullWidth
                error={!!fieldErrors[name]}
                helperText={fieldErrors[name] || ""}
              />
            ))}
            <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
              <MuiButton type="submit" disabled={updatingContact} variant="contained" fullWidth>{updatingContact ? "Guardando..." : "Guardar"}</MuiButton>
              <MuiButton onClick={closeEdit} disabled={updatingContact} variant="outlined" fullWidth>Cancelar</MuiButton>
            </Stack>
          </Stack>
        </Box>
      )}

      {editMode === "email" && (
        <Box sx={cardSx}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Cambiar correo</Typography>
          {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{apiError}</Alert>}
          <Stack component="form" onSubmit={handleSaveEmail} spacing={2}>
            {[
              { label: "Nuevo correo", name: "newEmail", type: "email" },
              { label: "Confirmar correo", name: "confirmNewEmail", type: "email" },
              { label: "Contraseña actual", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                type={type}
                value={form[name] || ""}
                onChange={handleChange}
                disabled={updatingEmail}
                size="small"
                fullWidth
                error={!!fieldErrors[name]}
                helperText={fieldErrors[name] || ""}
              />
            ))}
            <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
              <MuiButton type="submit" disabled={updatingEmail} variant="contained" fullWidth>{updatingEmail ? "Guardando..." : "Guardar"}</MuiButton>
              <MuiButton onClick={closeEdit} disabled={updatingEmail} variant="outlined" fullWidth>Cancelar</MuiButton>
            </Stack>
          </Stack>
        </Box>
      )}

      {editMode === "password" && (
        <Box sx={cardSx}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>Cambiar contraseña</Typography>
          {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>{apiError}</Alert>}
          <Stack component="form" onSubmit={handleSavePassword} spacing={2}>
            {[
              { label: "Contraseña actual", name: "currentPassword" },
              { label: "Nueva contraseña", name: "newPassword" },
              { label: "Confirmar contraseña", name: "confirmNewPassword" },
            ].map(({ label, name }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                type="password"
                value={form[name] || ""}
                onChange={handleChange}
                disabled={updatingPassword}
                size="small"
                fullWidth
                error={!!fieldErrors[name]}
                helperText={fieldErrors[name] || ""}
              />
            ))}
            <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
              <MuiButton type="submit" disabled={updatingPassword} variant="contained" fullWidth>{updatingPassword ? "Guardando..." : "Guardar"}</MuiButton>
              <MuiButton onClick={closeEdit} disabled={updatingPassword} variant="outlined" fullWidth>Cancelar</MuiButton>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ProfileCard;
