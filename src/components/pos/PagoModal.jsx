import React, { useState, useEffect } from 'react';
import { X, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';

function PagoModal({ total, onClose, onConfirmar }) {
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [montoPagado, setMontoPagado] = useState('');
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteDocumento, setClienteDocumento] = useState('');
  const [cambio, setCambio] = useState(0);
  const [error, setError] = useState('');

  // Calcular cambio automáticamente
  useEffect(() => {
    const monto = parseFloat(montoPagado) || 0;
    if (monto >= total) {
      setCambio(monto - total);
      setError('');
    } else if (monto > 0) {
      setCambio(0);
      setError('El monto es insuficiente');
    } else {
      setCambio(0);
      setError('');
    }
  }, [montoPagado, total]);

  const handleConfirmar = () => {
    if (metodoPago === 'efectivo') {
      const monto = parseFloat(montoPagado) || 0;
      if (monto < total) {
        setError('El monto pagado es insuficiente');
        return;
      }
    }

    onConfirmar({
      metodoPago,
      montoPagado: metodoPago === 'efectivo' ? parseFloat(montoPagado) : total,
      cambio: metodoPago === 'efectivo' ? cambio : 0,
      clienteNombre: clienteNombre || 'Cliente General',
      clienteDocumento: clienteDocumento || 'N/A'
    });
  };

  const metodosPago = [
    { id: 'efectivo', nombre: 'Efectivo', icon: Banknote, color: 'green' },
    { id: 'tarjeta', nombre: 'Tarjeta', icon: CreditCard, color: 'blue' },
    { id: 'transferencia', nombre: 'Transferencia', icon: Smartphone, color: 'purple' },
  ];

  // Montos rápidos para efectivo
  const montosRapidos = [
    total,
    Math.ceil(total / 10) * 10,
    Math.ceil(total / 20) * 20,
    Math.ceil(total / 50) * 50,
    Math.ceil(total / 100) * 100,
  ].filter((v, i, a) => a.indexOf(v) === i); // Eliminar duplicados

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Procesar Pago</h3>
            <p className="text-sm text-gray-500 mt-1">Completa la información de la venta</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Total a pagar */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 text-center">
            <p className="text-sm text-sky-500 font-medium mb-2">Total a Pagar</p>
            <p className="text-4xl font-bold text-sky-400">S/ {total.toFixed(2)}</p>
          </div>

          {/* Método de pago */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-3">
              {metodosPago.map((metodo) => {
                const Icon = metodo.icon;
                const isSelected = metodoPago === metodo.id;
                const colorClasses = {
                  green: isSelected ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-300 text-gray-700',
                  blue: isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700',
                  purple: isSelected ? 'bg-sky-100 border-purple-500 text-purple-700' : 'border-gray-300 text-gray-700',
                };

                return (
                  <button
                    key={metodo.id}
                    onClick={() => setMetodoPago(metodo.id)}
                    className={`relative border-2 rounded-lg p-4 flex flex-col items-center gap-2 transition-all hover:shadow-md ${colorClasses[metodo.color]}`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                    <Icon className="w-8 h-8" />
                    <span className="font-medium text-sm">{metodo.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campos específicos para efectivo */}
          {metodoPago === 'efectivo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto Recibido
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    S/
                  </span>
                  <input
                    type="number"
                    value={montoPagado}
                    onChange={(e) => setMontoPagado(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    className={`w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    autoFocus
                  />
                </div>
                {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              </div>

              {/* Montos rápidos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montos Rápidos
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {montosRapidos.map((monto) => (
                    <button
                      key={monto}
                      onClick={() => setMontoPagado(monto.toFixed(2))}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      S/ {monto.toFixed(0)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cambio */}
              {cambio > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-medium">Cambio a devolver:</span>
                    <span className="text-2xl font-bold text-green-600">S/ {cambio.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Información del cliente */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900">Información del Cliente (Opcional)</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Cliente
              </label>
              <input
                type="text"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
                placeholder="Cliente General"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DNI / RUC
              </label>
              <input
                type="text"
                value={clienteDocumento}
                onChange={(e) => setClienteDocumento(e.target.value)}
                placeholder="00000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={metodoPago === 'efectivo' && parseFloat(montoPagado) < total}
            className="flex-1 px-4 py-3 bg-sky-300 text-white rounded-lg hover:bg-sky-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Venta
          </button>
        </div>
      </div>
    </div>
  );
}

export default PagoModal;