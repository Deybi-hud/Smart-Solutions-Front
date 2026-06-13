import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiButton from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../theme/theme";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <Box sx={{ maxWidth: "448px", mx: "auto", textAlign: "center", py: 4 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Cargando información del usuario...
        </Typography>
      </Box>
    );
  }

  const fields = [
    { label: "Correo", value: user.email },
    { label: "Nombre", value: user.name },
    { label: "Apellido", value: user.lastName },
    { label: "Teléfono", value: user.phone || user.phoneNumber },
    {
      label: "Rol",
      value: user.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
        : null,
    },
  ].filter((f) => f.value);

  return (
    <Box sx={{ maxWidth: "448px", mx: "auto" }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "14px",
          border: `1px solid ${COLORS.divider}`,
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: "text.primary", mb: 3 }}>
          Mi Perfil
        </Typography>

        <Stack sx={{ mb: 3 }}>
          {fields.map(({ label, value }, i) => (
            <Box key={label}>
              <Box sx={{ py: 2 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>
                  {value}
                </Typography>
              </Box>
              {i < fields.length - 1 && <Divider />}
            </Box>
          ))}
        </Stack>

        <MuiButton
          onClick={handleLogout}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: COLORS.error, "&:hover": { backgroundColor: "#9B2A1E" } }}
        >
          Cerrar sesión
        </MuiButton>
      </Box>
    </Box>
  );
};

export default UserProfile;
