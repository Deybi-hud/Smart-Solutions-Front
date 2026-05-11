import { Link } from "react-router-dom";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar showAuthLinks />
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Soluciones inteligentes <br />
            <span className="text-blue-400">para tu bienestar</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mb-10">
            Planes personalizados, guía experta y acompañamiento 24/7 para que alcances tus metas físicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-base font-semibold hover:bg-blue-500 transition"
            >
              Comenzar ahora
            </Link>
            <Link
              to="/login"
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-md text-base font-semibold hover:border-blue-500 hover:text-white transition"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
