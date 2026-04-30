import { useState } from "react";
import NavBar from "../components/organisms/NavBar";
import Container from "../components/atoms/Container";

const HomePage = () => {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <>
            <NavBar onAboutClick={() => setShowAbout(!showAbout)} />
            <main className="min-h-screen bg-gray-950 py-8 sm:py-12 px-4">
                {!showAbout ? (
                    <Container size="xl">
                        <section className="text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Bienvenido a Smart Solutions
                            </h1>
                            <p className="text-gray-300 text-base sm:text-lg mb-8">
                                Soluciones inteligentes para tu físico.
                            </p>
                        </section>
                    </Container>
                ) : (
                    <Container size="xl">
                        <section className="space-y-8">
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                                    ¿Quiénes somos?
                                </h1>
                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                                    Smart Solutions es una empresa orientada al cuidado físico de nuestros clientes
                                    a través de planes completos con guía, tutoría y atención 24/7.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gray-900 border border-blue-700 p-6 rounded-lg">
                                    <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-3">
                                        Misión
                                    </h3>
                                    <p className="text-gray-300 text-sm sm:text-base">
                                        Proporcionar un camino para poder alcanzar sus objetivos. 
                                    </p>
                                </div>

                                <div className="bg-gray-900 border border-blue-700 p-6 rounded-lg">
                                    <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-3">
                                        Visión
                                    </h3>
                                    <p className="text-gray-300 text-sm sm:text-base">
                                        Ser la empresa número uno en innovación, sustentabilidad y cuidado personal.
                                    </p>
                                </div>

                                <div className="bg-gray-900 border border-blue-700 p-6 rounded-lg">
                                    <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-3">
                                        Valores
                                    </h3>
                                    <p className="text-gray-300 text-sm sm:text-base">
                                        Integridad, compromiso y excelencia en todo lo que hacemos.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-900 border border-blue-700 p-6 sm:p-8 rounded-lg">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    ¿Por qué elegirnos?
                                </h2>
                                <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                                    <li className="flex items-start gap-3">
                                        <span>- Más de 8 años de experiencia en el mercado</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span>- Equipo altamente capacitado y dedicado</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span>- Soluciones personalizadas para cada cliente</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span>- Soporte al cliente 24/7</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </Container>
                )}
            </main>
        </>
    );
};

export default HomePage;
