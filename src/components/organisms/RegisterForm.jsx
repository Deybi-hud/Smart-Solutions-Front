import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import { useRegisterMutation } from "../../api/authApi";
import { validateRegisterForm } from "../../utils/validations";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const [form, setForm] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError("");

        const validationErrors = validateRegisterForm(form);
        if (validationErrors) {
            setErrors(validationErrors);
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
            }).unwrap();
            navigate("/login");
        } catch (err) {
            setGeneralError(
                err?.data?.message || "Error al registrarse. Intenta de nuevo."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            {generalError && <ErrorMessage message={generalError} />}

            <FormField
                label="Nombre"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                error={errors.name}
                disabled={isLoading}
            />

            <FormField
                label="Apellido"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
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
                placeholder="Ingresa tu correo"
                error={errors.email}
                disabled={isLoading}
            />

            <FormField
                label="Teléfono"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Ingresa tu teléfono"
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
                placeholder="Ingresa tu contraseña"
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
                placeholder="Confirma tu contraseña"
                error={errors.confirmPassword}
                disabled={isLoading}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
        </form>
    );
};

export default RegisterForm;