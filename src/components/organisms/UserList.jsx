import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  useSearchByEmailQuery,
  useSearchByPhoneQuery,
  useListUsersQuery,
} from "../../store/api/userApi";
import { useGetAllSubscriptionsAdminQuery } from "../../store/api/subscriptionsApi";
import { UserCard } from "./UserInfo";

const panelSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  p: 3,
};

export const SearchByEmail = ({ onEdit, onViewSub }) => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByEmailQuery(query, { skip: !query });

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
        Buscar por correo
      </Typography>
      <Stack component="form" onSubmit={(e) => { e.preventDefault(); if (input.trim()) setQuery(input.trim()); }} direction="row" spacing={1}>
        <TextField value={input} onChange={(e) => setInput(e.target.value)} placeholder="usuario@correo.com" type="email" size="small" fullWidth />
        <MuiButton type="submit" variant="contained" disabled={isLoading} sx={{ whiteSpace: "nowrap" }}>
          {isLoading ? "..." : "Buscar"}
        </MuiButton>
      </Stack>
      {isError && (
        <Typography variant="body2" sx={{ color: "error.main", mt: 1 }}>
          {error?.data?.message || "Usuario no encontrado."}
        </Typography>
      )}
      {data && <Box sx={{ mt: 2 }}><UserCard user={data} onEdit={onEdit} onViewSub={onViewSub} /></Box>}
    </Box>
  );
};

export const SearchByPhone = ({ onEdit, onViewSub }) => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByPhoneQuery(query, { skip: !query });

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
        Buscar por teléfono
      </Typography>
      <Stack component="form" onSubmit={(e) => { e.preventDefault(); if (input.trim()) setQuery(input.trim()); }} direction="row" spacing={1}>
        <TextField value={input} onChange={(e) => setInput(e.target.value)} placeholder="912345678" inputProps={{ maxLength: 9 }} size="small" fullWidth />
        <MuiButton type="submit" variant="contained" disabled={isLoading} sx={{ whiteSpace: "nowrap" }}>
          {isLoading ? "..." : "Buscar"}
        </MuiButton>
      </Stack>
      {isError && (
        <Typography variant="body2" sx={{ color: "error.main", mt: 1 }}>
          {error?.data?.message || "Usuario no encontrado."}
        </Typography>
      )}
      {data && <Box sx={{ mt: 2 }}><UserCard user={data} onEdit={onEdit} onViewSub={onViewSub} /></Box>}
    </Box>
  );
};

export const AllUsers = ({ onEdit, onViewSub }) => {
  const { data: users = [], isLoading, isError } = useListUsersQuery();
  const { data: allSubs = [] } = useGetAllSubscriptionsAdminQuery();
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const subMap = allSubs.reduce((acc, s) => { acc[s.userId] = s; return acc; }, {});

  const filtered = users.filter((u) => {
    const fullName = `${u.name} ${u.lastName}`.toLowerCase();
    if (nameFilter && !fullName.includes(nameFilter.toLowerCase())) return false;
    if (statusFilter === "ALL") return true;
    if (statusFilter === "NONE") return !subMap[u.id];
    return subMap[u.id]?.status === statusFilter;
  });

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
        Todos los usuarios ({filtered.length})
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2 }}>
        <TextField label="Buscar por nombre" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} size="small" fullWidth />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Estado suscripción</InputLabel>
          <Select value={statusFilter} label="Estado suscripción" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="ALL">Todos</MenuItem>
            <MenuItem value="ACTIVE">Activo</MenuItem>
            <MenuItem value="CANCELED">Cancelado</MenuItem>
            <MenuItem value="EXPIRED">Expirado</MenuItem>
            <MenuItem value="NONE">Sin plan</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {isLoading && <Typography variant="body2" sx={{ color: "text.secondary" }}>Cargando...</Typography>}
      {isError && <Typography variant="body2" sx={{ color: "error.main" }}>Error al cargar usuarios.</Typography>}
      <Stack spacing={1.5} divider={<Divider />}>
        {filtered.map((u) => (
          <UserCard key={u.email} user={u} onEdit={onEdit} onViewSub={onViewSub} />
        ))}
      </Stack>
    </Box>
  );
};
