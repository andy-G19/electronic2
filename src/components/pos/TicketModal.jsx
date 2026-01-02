import React, { useRef } from 'react';
import { X, Printer, Download, Check } from 'lucide-react';

function TicketModal({ venta, onClose }) {
  const ticketRef = useRef();

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleImprimir = () => {
    window.print();
  };

  const handleDescargar = () => {
    // Crear contenido del ticket
    const ticketContent = `
Electronica Andy - GESTIÓN v1.0
${'='.repeat(40)}

TICKET DE VENTA
Nº ${venta.id}
${formatFecha(venta.fecha)}

Cliente: ${venta.clienteNombre}
Documento: ${venta.clienteDocumento}

${'='.repeat(40)}
PRODUCTOS
${'-'.repeat(40)}

${venta.items.map(item => `
${item.nombre}
${item.id}
${item.cantidad} x S/ ${item.precio.toFixed(2)} = S/ ${(item.cantidad * item.precio).toFixed(2)}
`).join('')}

${'-'.repeat(40)}

Subtotal:        S/ ${venta.subtotal.toFixed(2)}
IGV (18%):       S/ ${venta.igv.toFixed(2)}
${'-'.repeat(40)}
TOTAL:           S/ ${venta.total.toFixed(2)}

Método de pago: ${venta.metodoPago.toUpperCase()}
Monto pagado:   S/ ${venta.montoPagado.toFixed(2)}
${venta.cambio > 0 ? `Cambio:         S/ ${venta.cambio.toFixed(2)}` : ''}

${'='.repeat(40)}
¡Gracias por su compra!
www.Electronica Andy.com
    `.trim();

    // Descargar como archivo de texto
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${venta.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">¡Venta Completada!</h3>
              <p className="text-sm text-gray-500">Ticket generado exitosamente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Ticket Content */}
        <div ref={ticketRef} className="p-8 print:p-0">
          {/* Ticket simulado */}
          <div className="max-w-sm mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 font-mono text-sm">
            {/* Header del ticket */}
            <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
              <h2 className="text-xl font-bold mb-1">Electronica Andy</h2>
              <p className="text-xs text-gray-600">Gestión v1.0</p>
              <p className="text-xs text-gray-600 mt-2">Sistema de Punto de Venta</p>
            </div>

            {/* Info de la venta */}
            <div className="space-y-1 text-xs border-b border-dashed border-gray-300 pb-3 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600">TICKET:</span>
                <span className="font-semibold">{venta.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FECHA:</span>
                <span>{formatFecha(venta.fecha)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CLIENTE:</span>
                <span>{venta.clienteNombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DOC:</span>
                <span>{venta.clienteDocumento}</span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 border-b border-dashed border-gray-300 pb-3 mb-3">
              {venta.items.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-semibold text-xs">{item.nombre}</div>
                  <div className="text-xs text-gray-600">{item.id}</div>
                  <div className="flex justify-between text-xs">
                    <span>{item.cantidad} x S/ {item.precio.toFixed(2)}</span>
                    <span className="font-semibold">S/ {(item.cantidad * item.precio).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">SUBTOTAL:</span>
                <span>S/ {venta.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IGV (18%):</span>
                <span>S/ {venta.igv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t-2 border-dashed border-gray-300 pt-2">
                <span>TOTAL:</span>
                <span>S/ {venta.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Pago */}
            <div className="space-y-1 text-xs border-t border-dashed border-gray-300 pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">MÉTODO:</span>
                <span className="uppercase font-semibold">{venta.metodoPago}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PAGADO:</span>
                <span>S/ {venta.montoPagado.toFixed(2)}</span>
              </div>
              {venta.cambio > 0 && (
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-600">CAMBIO:</span>
                  <span>S/ {venta.cambio.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center border-t-2 border-dashed border-gray-300 pt-4 mt-4 space-y-1">
              <p className="text-xs font-semibold">¡Gracias por su compra!</p>
              <p className="text-xs text-gray-600">www.Electronica Andy.com</p>
              <p className="text-xs text-gray-600">Atención: Lun-Vie 9am-6pm</p>
            </div>
          </div>

          {/* Mensaje de éxito */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center print:hidden">
            <Check className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <p className="text-green-800 font-medium">
              La venta se ha procesado correctamente
            </p>
            <p className="text-sm text-green-700 mt-1">
              ID de transacción: {venta.id}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 print:hidden">
          <button
            onClick={handleDescargar}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
          <button
            onClick={handleImprimir}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-300 text-white rounded-lg hover:bg-sky-400 transition-colors font-semibold"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Nueva Venta
          </button>
        </div>
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:p-0, .print\\:p-0 * {
            visibility: visible;
          }
          .print\\:p-0 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default TicketModal;