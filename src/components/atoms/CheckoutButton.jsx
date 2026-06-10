import { useCreatePreferenceMutation } from '../../store/api/paymentApi';
import { useAuth } from '../../hooks/useAuth';

const CheckoutButton = ({ title, unitPrice, quantity = 1, className = '' }) => {
  const { user } = useAuth();
  const [createPreference, { isLoading }] = useCreatePreferenceMutation();

  const handlePay = async () => {
    try {
      const result = await createPreference({
        title,
        unit_price: unitPrice,
        quantity,
        payer_email: user?.email,
      }).unwrap();

      // Redirigir al checkout de sandbox
      window.location.href = result.sandbox_init_point;
    } catch (err) {
      console.error('Error al crear preferencia:', err);
      alert('Error al iniciar el pago. Intenta de nuevo.');
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={isLoading}
      className={`bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? 'Procesando...' : 'Pagar con MercadoPago'}
    </button>
  );
};

export default CheckoutButton;
