import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

const LoginForm = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
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

        if (!form.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        }

        if (!form.password.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Login válido");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />

            <Button type="submit" className="w-full">
                Iniciar sesión
            </Button>
        </form>
    );
};

export default LoginForm;