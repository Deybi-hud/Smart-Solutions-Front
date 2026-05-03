import { Link } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";

const LoginPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <section className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Iniciar sesión
                </h1>
                <LoginForm />

                <div className="mt-6 text-center text-gray-400">
                    <p className="text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link
                            to="/register"
                            className="text-white font-semibold hover:text-gray-200 transition"
                        >
                            Registrarse aquí
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;