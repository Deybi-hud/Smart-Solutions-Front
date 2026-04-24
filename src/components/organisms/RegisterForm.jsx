import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

const RegisterForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        }

        if (!form.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        }

        if (!form.password.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (form.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Registro válido", form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white placeholder-grey-300">
            <FormField
                label="Nombre"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                error={errors.name}
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
                labelClassName="text-white"
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
            />

            <Button type="submit" className="w-full">
                Registrarse
            </Button>
        </form>
    );
};

export default RegisterForm;