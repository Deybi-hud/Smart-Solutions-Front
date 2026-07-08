import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import FormField from "../molecules/FormField";
import LocationSelector from "../molecules/LocationSelector";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import { useRegisterMutation } from "../../store/api/authApi";
import { validateRegisterForm } from "../../utils/validations";
import { resetAllApiCaches } from "../../store/resetAllApis";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [addressId, setAddressId] = useState(null);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    const validationErrors = validateRegisterForm(form);
    if (validationErrors) { setErrors(validationErrors); return; }
    if (!addressId) {
      setErrors((prev) => ({ ...prev, address: "Debes seleccionar una sucursal." }));
      return;
    }
    try {
      await register({
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        phone: form.phone,
        addressId,
      }).unwrap();
      resetAllApiCaches(dispatch);
      navigate("/home");
    } catch (err) {
      const data = err?.data;
      if (data?.details) {
        const backendErrors = {};
        Object.entries(data.details).forEach(([key, msg]) => { backendErrors[key] = msg; });
        setErrors(backendErrors);
      } else {
        setGeneralError(data?.message || "Error al registrarse. Intenta de nuevo.");
      }
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2}>
      {generalError && <ErrorMessage message={generalError} />}
      <FormField
        label="Nombre"
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tu nombre"
        error={errors.name}
        disabled={isLoading}
      />
      <FormField
        label="Apellido"
        id="lastName"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Tu apellido"
        error={errors.lastName}
        disabled={isLoading}
      />
      <FormField
        label="Correo"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="tu@correo.com"
        error={errors.email}
        disabled={isLoading}
      />
      <FormField
        label="Teléfono"
        id="phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="912345678 (9 dígitos, comenzando con 9 o 2)"
        error={errors.phone}
        disabled={isLoading}
      />
      <FormField
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Mínimo 8 caracteres, una mayúscula y un número"
        error={errors.password}
        disabled={isLoading}
      />
      <FormField
        label="Confirmar contraseña"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Repite tu contraseña"
        error={errors.confirmPassword}
        disabled={isLoading}
      />
      <LocationSelector
        onAddressSelect={(id) => {
          setAddressId(id);
          if (errors.address) setErrors((prev) => ({ ...prev, address: null }));
        }}
        error={errors.address}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Registrarse"}
      </Button>
    </Stack>
  );
};

export default RegisterForm;
