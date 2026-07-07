import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import Dropdown from "../atoms/Dropdown";
import {
  useGetRegionsQuery,
  useGetCommunesQuery,
  useCreateAddressMutation,
} from "../../store/api/locationApi";
import { useProposePlanMutation } from "../../store/api/plansApi";
import { validateServiceProposalForm } from "../../utils/validations";

const emptyForm = {
  serviceType: "",
  name: "",
  details: "",
  price: "",
  durationMonths: "",
  regionId: "",
  communeId: "",
  sucursalName: "",
  street: "",
  number: "",
};

const AcquireServiceModal = ({ open, onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const { data: regions = [] } = useGetRegionsQuery(undefined, { skip: !open });
  const { data: communes = [] } = useGetCommunesQuery(undefined, { skip: !open });
  const [createAddress, { isLoading: creatingAddress }] = useCreateAddressMutation();
  const [proposePlan, { isLoading: proposing }] = useProposePlanMutation();

  const needsLocation = form.serviceType === "PRESENCIAL" || form.serviceType === "AMBAS";
  const submitting = creatingAddress || proposing;

  const activeRegions = regions.filter((r) => r.active);
  const filteredCommunes = communes.filter(
    (c) => c.active && String(c.region?.id) === String(form.regionId)
  );
  const regionOptions = activeRegions.map((r) => ({ value: String(r.id), label: r.regionName }));
  const communeOptions = filteredCommunes.map((c) => ({ value: String(c.id), label: c.communeName }));

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: null }));
  };

  const handleClose = () => {
    if (submitting) return;
    setForm(emptyForm);
    setErrors({});
    setSubmitError("");
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validateServiceProposalForm(form);
    if (validationErrors) { setErrors(validationErrors); return; }

    try {
      let addressId = null;
      if (needsLocation) {
        const address = await createAddress({
          sucursalName: form.sucursalName,
          street: form.street,
          number: form.number,
          communeId: Number(form.communeId),
        }).unwrap();
        addressId = address.id;
      }

      await proposePlan({
        name: form.name,
        details: form.details,
        price: parseFloat(form.price),
        durationMonths: parseInt(form.durationMonths, 10),
        isActive: false,
        serviceType: form.serviceType,
        addressId,
      }).unwrap();

      setSuccess(true);
    } catch (err) {
      setSubmitError(err?.data?.message || err?.data?.error || "Error al enviar la propuesta. Intenta nuevamente.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Adquirir servicios</DialogTitle>
      <DialogContent>
        {success ? (
          <Alert severity="success" sx={{ mt: 1 }}>
            Tu propuesta fue enviada. Quedará pendiente de aprobación del administrador antes de aparecer en el catálogo.
          </Alert>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Propón tu propio servicio de suscripción para que quede disponible en el catálogo una vez aprobado.
            </Typography>

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <FormControl error={!!errors.serviceType}>
              <FormLabel sx={{ fontSize: "0.9rem" }}>¿Tu suscripción es virtual, presencial o ambas?</FormLabel>
              <RadioGroup
                value={form.serviceType}
                onChange={(e) => set("serviceType", e.target.value)}
              >
                <FormControlLabel value="VIRTUAL" control={<Radio size="small" />} label="Solo virtual (ej: Netflix, streaming)" />
                <FormControlLabel value="PRESENCIAL" control={<Radio size="small" />} label="Solo presencial" />
                <FormControlLabel value="AMBAS" control={<Radio size="small" />} label="Ambas" />
              </RadioGroup>
              {errors.serviceType && (
                <Typography variant="caption" sx={{ color: "error.main" }}>{errors.serviceType}</Typography>
              )}
            </FormControl>

            <Divider />

            <Stack component="form" id="acquire-service-form" onSubmit={handleSubmit} spacing={2}>
              <TextField
                label="Nombre del servicio"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name || ""}
                disabled={submitting}
                size="small"
                fullWidth
              />
              <TextField
                label="Descripción"
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
                error={!!errors.details}
                helperText={errors.details || ""}
                disabled={submitting}
                multiline
                rows={2}
                size="small"
                fullWidth
              />
              <Stack direction="row" spacing={1.5}>
                <TextField
                  label="Precio (CLP)"
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  error={!!errors.price}
                  helperText={errors.price || ""}
                  disabled={submitting}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Duración (meses)"
                  type="number"
                  value={form.durationMonths}
                  onChange={(e) => set("durationMonths", e.target.value)}
                  error={!!errors.durationMonths}
                  helperText={errors.durationMonths || ""}
                  disabled={submitting}
                  size="small"
                  fullWidth
                />
              </Stack>

              {needsLocation && (
                <>
                  <Divider />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                    Ubicación de la sucursal
                  </Typography>
                  <Dropdown
                    label="Región"
                    id="acquire-region"
                    value={form.regionId}
                    onChange={(e) => { set("regionId", e.target.value); set("communeId", ""); }}
                    options={regionOptions}
                    placeholder="Selecciona una región"
                    disabled={submitting}
                    error={errors.regionId}
                  />
                  <Dropdown
                    label="Comuna"
                    id="acquire-commune"
                    value={form.communeId}
                    onChange={(e) => set("communeId", e.target.value)}
                    options={communeOptions}
                    placeholder={!form.regionId ? "Primero selecciona una región" : "Selecciona una comuna"}
                    disabled={submitting || !form.regionId}
                    error={errors.communeId}
                  />
                  <TextField
                    label="Nombre de la sucursal"
                    value={form.sucursalName}
                    onChange={(e) => set("sucursalName", e.target.value)}
                    error={!!errors.sucursalName}
                    helperText={errors.sucursalName || ""}
                    disabled={submitting}
                    size="small"
                    fullWidth
                  />
                  <Stack direction="row" spacing={1.5}>
                    <TextField
                      label="Calle"
                      value={form.street}
                      onChange={(e) => set("street", e.target.value)}
                      error={!!errors.street}
                      helperText={errors.street || ""}
                      disabled={submitting}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Número"
                      value={form.number}
                      onChange={(e) => set("number", e.target.value)}
                      error={!!errors.number}
                      helperText={errors.number || ""}
                      disabled={submitting}
                      size="small"
                      fullWidth
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={handleClose} variant="outlined" disabled={submitting}>
          {success ? "Cerrar" : "Cancelar"}
        </MuiButton>
        {!success && (
          <MuiButton
            type="submit"
            form="acquire-service-form"
            variant="contained"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {submitting ? "Enviando..." : "Enviar propuesta"}
          </MuiButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AcquireServiceModal;
