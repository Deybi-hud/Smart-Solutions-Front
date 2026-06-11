import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import { useSearchByEmailQuery, useSearchByPhoneQuery } from "../../store/api/userApi";

// ── Tarjeta de resultado de usuario ───────────────────────────────────────
const UserResult = ({ user }) => {
  if (!user) return null;

  const rows = [
    { label: "Nombre", value: `${user.name} ${user.lastName}` },
    { label: "Correo", value: user.email },
    { label: "Teléfono", value: user.phone },
    { label: "Sucursal", value: user.sucursalName },
  ];

  return (
    // Tarjeta de resultado: fondo salmón muy suave
    <Box
      sx={{
        backgroundColor: "#FAF0EE",       // Fondo panel interno salmón suave
        border: "1px solid #EDD9D5",      // Borde divisor rosado
        borderRadius: "8px",
        p: 2,
        mt: 2,
      }}
    >
      <Stack spacing={1}>
        {rows.filter((r) => r.value).map(({ label, value }) => (
          <Box key={label} sx={{ display: "flex", gap: 1 }}>
            {/* Etiqueta del campo */}
            <Typography
              variant="body2"
              sx={{ color: "#9C7878", width: "80px", flexShrink: 0 }}
            >
              {label}:
            </Typography>
            {/* Valor del campo */}
            <Typography variant="body2" sx={{ color: "#3D2B2B" }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

// ── Búsqueda por email ─────────────────────────────────────────────────────
const SearchByEmail = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByEmailQuery(query, { skip: !query });

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setQuery(input.trim());
  };

  return (
    // Panel de búsqueda: fondo blanco con borde rosa
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #EDD9D5",
        borderRadius: "10px",
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Buscar por correo
      </Typography>

      {/* Formulario de búsqueda inline */}
      <Stack component="form" onSubmit={handleSearch} direction="row" spacing={1}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="usuario@correo.com"
          type="email"
          size="small"
          fullWidth
          variant="outlined"
        />
        <MuiButton
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ whiteSpace: "nowrap" }}
        >
          {isLoading ? "..." : "Buscar"}
        </MuiButton>
      </Stack>

      {/* Mensaje de error si no se encuentra el usuario */}
      {isError && (
        <Typography variant="body2" sx={{ color: "#C0392B", mt: 1 }}>
          {error?.data?.message || "Usuario no encontrado."}
        </Typography>
      )}

      <UserResult user={data} />
    </Box>
  );
};

// ── Búsqueda por teléfono ──────────────────────────────────────────────────
const SearchByPhone = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByPhoneQuery(query, { skip: !query });

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setQuery(input.trim());
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #EDD9D5",
        borderRadius: "10px",
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Buscar por teléfono
      </Typography>

      <Stack component="form" onSubmit={handleSearch} direction="row" spacing={1}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="912345678"
          inputProps={{ maxLength: 9 }}
          size="small"
          fullWidth
          variant="outlined"
        />
        <MuiButton
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ whiteSpace: "nowrap" }}
        >
          {isLoading ? "..." : "Buscar"}
        </MuiButton>
      </Stack>

      {isError && (
        <Typography variant="body2" sx={{ color: "#C0392B", mt: 1 }}>
          {error?.data?.message || "Usuario no encontrado."}
        </Typography>
      )}

      <UserResult user={data} />
    </Box>
  );
};

// ── Panel principal de usuarios ────────────────────────────────────────────
const UsersPanel = () => (
  <Stack spacing={3}>
    <SearchByEmail />
    <SearchByPhone />
  </Stack>
);

export default UsersPanel;
