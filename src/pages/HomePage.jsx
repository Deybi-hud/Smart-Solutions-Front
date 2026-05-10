import { useState } from "react";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const HomePage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar onAboutClick={() => setShowAbout(!showAbout)} />

      <main className="flex-1 py-8 sm:py-12 px-4">
        {!showAbout ? (
          <div className="max-w-5xl mx-auto">
            <section className="text-center py-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Bienvenido a Smart Solutions
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Soluciones inteligentes para tu físico.
              </p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              {[
                {title: "Planes activos", desc: "Revisa tus planes y progreso desde tu perfil." },
                {title: "Sucursales", desc: "Encuentra la sucursal más cercana a ti." },
                {title: "Soporte", desc: "Contáctanos cuando lo necesites." },
              ].map((card) => (
                <div key={card.title} className="bg-gray-900 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-1">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold text-white">¿Quiénes somos?</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Smart Solutions es una empresa orientada al cuidado físico de nuestros clientes
              a través de planes completos con guía, tutoría y atención 24/7.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Misión", desc: "Proporcionar un camino para poder alcanzar sus objetivos." },
                { title: "Visión", desc: "Ser la empresa número uno en innovación, sustentabilidad y cuidado personal." },
                { title: "Valores", desc: "Integridad, compromiso y excelencia en todo lo que hacemos." },
              ].map((item) => (
                <div key={item.title} className="bg-gray-900 border border-blue-700 p-6 rounded-lg">
                  <h3 className="text-blue-400 font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
