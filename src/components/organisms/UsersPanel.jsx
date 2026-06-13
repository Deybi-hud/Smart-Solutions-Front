import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import {
  useSearchByEmailQuery,
  useSearchByPhoneQuery,
  useListUsersQuery,
  useUpdateUserByEmailMutation,
} from "../../store/api/userApi";
import { useGetAddressesQuery } from "../../store/api/locationApi";
import {
  useGetUserSubscriptionQuery,
  useActivateSubscriptionMutation,
  useCancelSubscriptionMutation,
} from "../../store/api/subscriptionsApi";
import { useGetActivePlansQuery } from "../../store/api/plansApi";

const panelSx = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #EDD9D5",
  borderRadius: "10px",
  p: 3,
};

const roleColor = (role) => {
  if (role === "ADMINISTRADOR") return "error";
  return "default";
};

const UserCard = ({ user, onEdit, onViewSub }) => (
  <Box
    sx={{
      backgroundColor: "#FAF0EE",
      border: "1px solid #EDD9D5",
      borderRadius: "8px",
      p: 2,
    }}
  >
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={1}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#3D2B2B" }}>
          {user.name} {user.lastName}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
          {user.email}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
          {user.phone} · {user.sucursalName}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Chip label={user.role} size="small" color={roleColor(user.role)} variant="outlined" />
        {onViewSub && (
          <MuiButton size="small" onClick={() => onViewSub(user)} sx={{ color: "#7B8FC8", minWidth: 0 }}>
            Suscripción
          </MuiButton>
        )}
        <MuiButton size="small" onClick={() => onEdit(user)} sx={{ color: "#D4627A", minWidth: 0 }}>
          Editar
        </MuiButton>
      </Stack>
    </Stack>
  </Box>
);

const EditUserDialog = ({ user, open, onClose, addresses }) => {
  const [updateUser, { isLoading }] = useUpdateUserByEmailMutation();
  const [form, setForm] = useState({ name: "", lastName: "", phone: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpen = () => {
    setForm({ name: user?.name || "", lastName: user?.lastName || "", phone: user?.phone || "", email: user?.email || "" });
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      await updateUser({ email: user.email, data: form }).unwrap();
      setSuccess("Usuario actualizado.");
    } catch (e) {
      setError(e?.data?.message || "Error al actualizar.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionProps={{ onEnter: handleOpen }} maxWidth="xs" fullWidth
      PaperProps={{ sx: { borderRadius: "14px", border: "1px solid #EDD9D5" } }}>
      <DialogTitle sx={{ color: "#3D2B2B", fontWeight: 700 }}>Editar usuario</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ borderRadius: "8px" }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ borderRadius: "8px" }}>{success}</Alert>}
          {[
            { label: "Nombre", key: "name" },
            { label: "Apellido", key: "lastName" },
            { label: "Teléfono", key: "phone" },
            { label: "Correo", key: "email" },
          ].map(({ label, key }) => (
            <TextField
              key={key}
              label={label}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              size="small"
              fullWidth
              disabled={isLoading}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <MuiButton onClick={onClose} variant="outlined" disabled={isLoading}>Cerrar</MuiButton>
        <MuiButton onClick={handleSave} variant="contained" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

const SubscriptionDialog = ({ user, open, onClose }) => {
  const { data: sub, isLoading, isError } = useGetUserSubscriptionQuery(user?.id, { skip: !user?.id || !open });
  const { data: plans = [] } = useGetActivePlansQuery();
  const [activateSub, { isLoading: activating }] = useActivateSubscriptionMutation();
  const [cancelSub, { isLoading: cancelling }] = useCancelSubscriptionMutation();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleActivate = async () => {
    setError(""); setSuccess("");
    if (!selectedPlan) { setError("Selecciona un plan."); return; }
    try {
      await activateSub({ userId: user.id, planId: Number(selectedPlan) }).unwrap();
      setSuccess("Suscripción activada.");
    } catch (e) { setError(e?.data?.message || "Error al activar."); }
  };

  const handleCancel = async () => {
    setError(""); setSuccess("");
    try {
      await cancelSub(user.id).unwrap();
      setSuccess("Renovación cancelada.");
    } catch (e) { setError(e?.data?.message || "Error al cancelar."); }
  };

  const statusColor = { ACTIVE: "#2e7d32", CANCELLED: "#C0392B", EXPIRED: "#9C7878" };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: "14px", border: "1px solid #EDD9D5" } }}>
      <DialogTitle sx={{ color: "#3D2B2B", fontWeight: 700 }}>
        Suscripción — {user?.name} {user?.lastName}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ borderRadius: "8px" }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ borderRadius: "8px" }}>{success}</Alert>}
          {isLoading && <Typography variant="body2" sx={{ color: "#9C7878" }}>Cargando...</Typography>}
          {isError && <Typography variant="body2" sx={{ color: "#9C7878" }}>Sin suscripción activa.</Typography>}
          {sub && (
            <Box sx={{ backgroundColor: "#FAF0EE", borderRadius: "8px", p: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#3D2B2B", mb: 1 }}>
                Plan: {sub.planName}
              </Typography>
              <Typography variant="caption" sx={{ color: statusColor[sub.status] || "#9C7878", display: "block" }}>
                Estado: {sub.status}
              </Typography>
              <Typography variant="caption" sx={{ color: "#9C7878", display: "block" }}>
                Vence: {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString("es-CL") : "—"}
              </Typography>
              {sub.cancelAtPeriodEnd && (
                <Typography variant="caption" sx={{ color: "#C0392B", display: "block" }}>
                  Cancelación programada al vencer.
                </Typography>
              )}
              {!sub.cancelAtPeriodEnd && sub.status === "ACTIVE" && (
                <MuiButton size="small" onClick={handleCancel} disabled={cancelling}
                  sx={{ mt: 1, color: "#C0392B" }}>
                  {cancelling ? "..." : "Cancelar renovación"}
                </MuiButton>
              )}
            </Box>
          )}
          <Divider />
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#3D2B2B" }}>Activar / Renovar plan</Typography>
          <TextField
            select
            label="Plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            size="small"
            fullWidth
            SelectProps={{ native: true }}
          >
            <option value="">Seleccionar...</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — ${p.price}</option>
            ))}
          </TextField>
          <MuiButton variant="contained" onClick={handleActivate} disabled={activating}>
            {activating ? "Activando..." : "Activar suscripción"}
          </MuiButton>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <MuiButton onClick={onClose} variant="outlined">Cerrar</MuiButton>
      </DialogActions>
    </Dialog>
  );
};

const SearchByEmail = ({ onEdit, onViewSub }) => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByEmailQuery(query, { skip: !query });

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Buscar por correo
      </Typography>
      <Stack component="form" onSubmit={(e) => { e.preventDefault(); if (input.trim()) setQuery(input.trim()); }}
        direction="row" spacing={1}>
        <TextField value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="usuario@correo.com" type="email" size="small" fullWidth />
        <MuiButton type="submit" variant="contained" disabled={isLoading} sx={{ whiteSpace: "nowrap" }}>
          {isLoading ? "..." : "Buscar"}
        </MuiButton>
      </Stack>
      {isError && (
        <Typography variant="body2" sx={{ color: "#C0392B", mt: 1 }}>
          {error?.data?.message || "Usuario no encontrado."}
        </Typography>
      )}
      {data && <Box sx={{ mt: 2 }}><UserCard user={data} onEdit={onEdit} onViewSub={onViewSub} /></Box>}
    </Box>
  );
};

const SearchByPhone = ({ onEdit, onViewSub }) => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const { data, isLoading, isError, error } = useSearchByPhoneQuery(query, { skip: !query });

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Buscar por teléfono
      </Typography>
      <Stack component="form" onSubmit={(e) => { e.preventDefault(); if (input.trim()) setQuery(input.trim()); }}
        direction="row" spacing={1}>
        <TextField value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="912345678" inputProps={{ maxLength: 9 }} size="small" fullWidth />
        <MuiButton type="submit" variant="contained" disabled={isLoading} sx={{ whiteSpace: "nowrap" }}>
          {isLoading ? "..." : "Buscar"}
        </MuiButton>
      </Stack>
      {isError && (
        <Typography variant="body2" sx={{ color: "#C0392B", mt: 1 }}>
          {error?.data?.message || "Usuario no encontrado."}
        </Typography>
      )}
      {data && <Box sx={{ mt: 2 }}><UserCard user={data} onEdit={onEdit} onViewSub={onViewSub} /></Box>}
    </Box>
  );
};

const AllUsers = ({ onEdit, onViewSub }) => {
  const { data: users = [], isLoading, isError } = useListUsersQuery();

  return (
    <Box sx={panelSx}>
      <Typography variant="h6" sx={{ color: "#3D2B2B", fontWeight: 600, mb: 2 }}>
        Todos los usuarios ({users.length})
      </Typography>
      {isLoading && <Typography variant="body2" sx={{ color: "#9C7878" }}>Cargando...</Typography>}
      {isError && <Typography variant="body2" sx={{ color: "#C0392B" }}>Error al cargar usuarios.</Typography>}
      <Stack spacing={1.5} divider={<Divider />}>
        {users.map((u) => (
          <UserCard key={u.email} user={u} onEdit={onEdit} onViewSub={onViewSub} />
        ))}
      </Stack>
    </Box>
  );
};

const UsersPanel = () => {
  const { data: addresses = [] } = useGetAddressesQuery();
  const [editUser, setEditUser] = useState(null);
  const [subUser, setSubUser] = useState(null);

  return (
    <>
      <Stack spacing={3}>
        <SearchByEmail onEdit={setEditUser} onViewSub={setSubUser} />
        <SearchByPhone onEdit={setEditUser} onViewSub={setSubUser} />
        <AllUsers onEdit={setEditUser} onViewSub={setSubUser} />
      </Stack>

      <EditUserDialog
        user={editUser}
        open={Boolean(editUser)}
        onClose={() => setEditUser(null)}
        addresses={addresses}
      />

      <SubscriptionDialog
        user={subUser}
        open={Boolean(subUser)}
        onClose={() => setSubUser(null)}
      />
    </>
  );
};

export default UsersPanel;
