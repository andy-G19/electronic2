import React from 'react';
import { X, Edit, Trash2, Package, TrendingUp } from 'lucide-react';

function ProductoModal({ producto, onClose, onEdit, onDelete }) {
  
  // 1. NORMALIZACIÓN DE PRECIOS PARA EVITAR ERRORES
  const precioVenta = parseFloat(producto.precioVenta || producto.precio || 0);
  const precioCompra = parseFloat(producto.precioCompra || 0);
  const stock = parseInt(producto.stock || 0);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'En Stock': return 'bg-green-100 text-green-800 border-green-200';
      case 'Stock Bajo': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Agotado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header con Imagen */}
        <div className="relative h-48 bg-gray-100">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
               <Package className="w-16 h-16" />
            </div>
          )}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-gray-900 rounded-full shadow-lg">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{producto.nombre}</h2>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getEstadoColor(producto.estado)}`}>
                {producto.estado}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido Detallado */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className="flex-1 space-y-6">
              {/* Tarjetas de Precios */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Precio Venta</p>
                  <p className="text-xl font-bold text-gray-900">S/ {precioVenta.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Stock Actual</p>
                  <p className={`text-xl font-bold ${stock < producto.stockMinimo ? 'text-red-600' : 'text-gray-900'}`}>
                    {stock} u.
                  </p>
                </div>
              </div>

              {/* Sección de Rentabilidad Detallada */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" /> Análisis Financiero
                </h4>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Costo Unitario (Compra):</span>
                    <span className="font-medium">S/ {precioCompra.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ganancia por Unidad:</span>
                    <span className="font-bold text-green-700">
                      S/ {(precioVenta - precioCompra).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Porcentaje de Ganancia:</span>
                    <span className="font-medium text-green-700">
                      {precioCompra > 0 ? ((precioVenta - precioCompra) / precioCompra * 100).toFixed(1) : 0}%
                    </span>
                  </div>

                  <div className="pt-2 mt-2 border-t border-green-200 flex justify-between items-center">
                    <span className="font-semibold text-green-900">Ganancia Total Potencial:</span>
                    <span className="text-xl font-bold text-green-700">
                      S/ {((precioVenta - precioCompra) * stock).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="w-full md:w-40 flex flex-col gap-3">
              <button onClick={onEdit} className="w-full py-2.5 px-4 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl font-medium flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Editar
              </button>
              <button onClick={onDelete} className="w-full py-2.5 px-4 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-medium flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoModal;