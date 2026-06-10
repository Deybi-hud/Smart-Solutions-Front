import NavBar from '../components/organisms/NavBar';
import Footer from '../components/organisms/Footer';
import CheckoutButton from '../components/atoms/CheckoutButton';

const PLANES = [
  { id: 1, title: 'Plan Básico', price: 9990, desc: 'Acceso a rutinas básicas y seguimiento mensual.' },
  { id: 2, title: 'Plan Pro', price: 19990, desc: 'Rutinas personalizadas + nutrición + soporte prioritario.' },
  { id: 3, title: 'Plan Elite', price: 34990, desc: 'Todo incluido + sesiones 1:1 con entrenador.' },
];

const CheckoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavBar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Nuestros Planes</h1>
          <p className="text-gray-400 mb-8">Elige el plan que mejor se adapte a tus objetivos.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PLANES.map((plan) => (
              <div key={plan.id} className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
                <div>
                  <h2 className="text-white font-bold text-xl">{plan.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{plan.desc}</p>
                </div>
                <p className="text-blue-400 text-2xl font-bold">
                  ${plan.price.toLocaleString('es-CL')} CLP
                </p>
                <CheckoutButton
                  title={plan.title}
                  unitPrice={plan.price}
                  quantity={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-900 border border-yellow-700 rounded-xl p-4 text-sm text-yellow-300">
            <strong>Modo sandbox activo.</strong> Usa las tarjetas de prueba de MercadoPago para simular pagos. No se cobra dinero real.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
