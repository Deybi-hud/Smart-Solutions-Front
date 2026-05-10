import { Link } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";
import Footer from "../components/organisms/Footer";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg">
          <Link to="/" className="block text-center text-blue-400 font-bold text-xl mb-6">
            Smart Solutions
          </Link>
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Iniciar sesión
          </h1>
          <LoginForm />
          <div className="mt-6 text-center text-gray-400">
            <p className="text-sm">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-white font-semibold hover:text-blue-400 transition">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
