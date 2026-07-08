import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import { useLoginMutation } from "../../store/api/authApi";
import { validateLoginForm } from "../../utils/validations";
import { resetAllApiCaches } from "../../store/resetAllApis";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    const validationErrors = validateLoginForm(form.email, form.password);
    if (validationErrors) { setErrors(validationErrors); return; }
    try {
      await login({ email: form.email, password: form.password }).unwrap();
      resetAllApiCaches(dispatch);
      navigate("/home");
    } catch (err) {
      setGeneralError(err?.data?.message || "Error al iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2}>
      {generalError && <ErrorMessage message={generalError} />}
      <FormField
        label="Correo"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Ingresa tu correo"
        error={errors.email}
        disabled={isLoading}
      />
      <FormField
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Ingresa tu contraseña"
        error={errors.password}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </Stack>
  );
};

export default LoginForm;
