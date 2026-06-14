import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useCreatePaymentPreferenceMutation } from "../../store/api/paymentApi";
import { useActivateSubscriptionMutation } from "../../store/api/subscriptionsApi";

const luhn = (num) => {
    const digits = num.replace(/\D/g, "").split("").reverse().map(Number);
    const sum = digits.reduce((acc, d, i) => {
        if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
        return acc + d;
    }, 0);
    return sum % 10 === 0 && digits.length === 16;
};

const validateExpiry = (expiry) => {
    const parts = expiry.split("/");
    if (parts.length !== 2 || parts[1].length !== 2) return false;
    const m = parseInt(parts[0], 10);
    const y = parseInt("20" + parts[1], 10);
    if (m < 1 || m > 12) return false;
    const now = new Date();
    return new Date(y, m - 1, 1) >= new Date(now.getFullYear(), now.getMonth(), 1);
};

const formatCardNumber = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
};

const emptyForm = { number: "", name: "", expiry: "", cvv: "" };

const PaymentModal = ({ plan, open, onClose, userId, userEmail }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [serverError, setServerError] = useState("");

    const [createPreference] = useCreatePaymentPreferenceMutation();
    const [activateSubscription] = useActivateSubscriptionMutation();

    const validate = () => {
        const e = {};
        if (!luhn(form.number)) e.number = "Número de tarjeta inválido";
        if (!form.name.trim().includes(" ")) e.name = "Ingresa nombre y apellido";
        if (!validateExpiry(form.expiry)) e.expiry = "Fecha de vencimiento inválida";
        if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = "CVV inválido";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleClose = () => {
        if (processing) return;
        setForm(emptyForm);
        setErrors({});
        setServerError("");
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setProcessing(true);
        setServerError("");
        try {
            const payment = await createPreference({
                title: plan.name,
                quantity: 1,
                unit_price: Number(plan.price),
                payer_email: userEmail,
            }).unwrap();

            await activateSubscription({ userId, planId: plan.id }).unwrap();

            navigate("/receipt", {
                state: {
                    plan,
                    paymentId: payment.id,
                    userEmail,
                    date: new Date().toISOString(),
                },
            });
        } catch {
            setServerError("Error al procesar el pago. Intenta nuevamente.");
            setProcessing(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Pagar plan</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Box
                        sx={{
                            backgroundColor: "background.default",
                            borderRadius: "8px",
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {plan?.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            ${Number(plan?.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })} · {plan?.durationMonths} mes{plan?.durationMonths !== 1 ? "es" : ""}
                        </Typography>
                    </Box>

                    <Divider />

                    {serverError && <Alert severity="error">{serverError}</Alert>}

                    <Stack component="form" id="payment-form" onSubmit={handleSubmit} spacing={2}>
                        <TextField
                            label="Número de tarjeta"
                            value={form.number}
                            onChange={(e) => setForm({ ...form, number: formatCardNumber(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            error={!!errors.number}
                            helperText={errors.number}
                            inputProps={{ maxLength: 19 }}
                            disabled={processing}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Nombre del titular"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Juan Pérez"
                            error={!!errors.name}
                            helperText={errors.name}
                            disabled={processing}
                            size="small"
                            fullWidth
                        />
                        <Stack direction="row" spacing={1.5}>
                            <TextField
                                label="Vencimiento"
                                value={form.expiry}
                                onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                                placeholder="MM/AA"
                                error={!!errors.expiry}
                                helperText={errors.expiry}
                                inputProps={{ maxLength: 5 }}
                                disabled={processing}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="CVV"
                                value={form.cvv}
                                onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                placeholder="123"
                                error={!!errors.cvv}
                                helperText={errors.cvv}
                                inputProps={{ maxLength: 4 }}
                                disabled={processing}
                                size="small"
                                fullWidth
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <MuiButton onClick={handleClose} variant="outlined" disabled={processing}>
                    Cancelar
                </MuiButton>
                <MuiButton
                    type="submit"
                    form="payment-form"
                    variant="contained"
                    disabled={processing}
                    startIcon={processing ? <CircularProgress size={16} color="inherit" /> : null}
                >
                    {processing ? "Procesando..." : "Pagar"}
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentModal;
