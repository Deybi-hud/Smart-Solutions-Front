import { Link } from "react-router-dom";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar showAuthLinks />

      {/* Hero */}
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

      {/* Features */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🏋️", title: "Planes a tu medida", desc: "Diseñados según tus objetivos, rutina y nivel físico." },
              { icon: "👨‍🏫", title: "Guía experta", desc: "Profesionales certificados te acompañan en cada paso." },
              { icon: "🕐", title: "Soporte 24/7", desc: "Estamos disponibles cuando nos necesites, siempre." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Quiénes somos?</h2>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Smart Solutions es una empresa dedicada al cuidado físico y bienestar de sus clientes. Con más de 8 años de experiencia, ofrecemos planes integrales con atención personalizada en nuestras sucursales a lo largo del país.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { num: "8+", label: "Años de experiencia" },
              { num: "500+", label: "Clientes satisfechos" },
              { num: "24/7", label: "Disponibilidad" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-900 border border-blue-700 rounded-xl p-4">
                <p className="text-blue-400 text-2xl font-bold">{stat.num}</p>
                <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
