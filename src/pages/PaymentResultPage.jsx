import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
  success: {
    icon: '✅',
    title: '¡Pago exitoso!',
    message: 'Tu pago fue procesado correctamente.',
    color: 'text-green-400',
  },
  failure: {
    icon: '❌',
    title: 'Pago rechazado',
    message: 'Tu pago no pudo ser procesado. Intenta de nuevo.',
    color: 'text-red-400',
  },
  pending: {
    icon: '⏳',
    title: 'Pago pendiente',
    message: 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.',
    color: 'text-yellow-400',
  },
};

const PaymentResultPage = ({ status }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});

  useEffect(() => {
    setDetails({
      paymentId: searchParams.get('payment_id'),
      status: searchParams.get('status'),
      merchantOrderId: searchParams.get('merchant_order_id'),
    });
  }, [searchParams]);

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="text-6xl">{config.icon}</div>
        <h1 className={`text-2xl font-bold ${config.color}`}>{config.title}</h1>
        <p className="text-gray-300">{config.message}</p>

        {details.paymentId && (
          <div className="bg-gray-800 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm text-gray-400">
              ID de pago: <span className="text-white font-mono">{details.paymentId}</span>
            </p>
            {details.merchantOrderId && (
              <p className="text-sm text-gray-400">
                Orden: <span className="text-white font-mono">{details.merchantOrderId}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500 transition"
          >
            Volver al inicio
          </button>
          {status === 'failure' && (
            <button
              onClick={() => navigate(-1)}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-md font-semibold hover:border-gray-400 transition"
            >
              Intentar de nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResultPage;
