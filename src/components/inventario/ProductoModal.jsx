import React from 'react';
import { X, Edit, Trash2, Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

function ProductoModal({ producto, onClose, onEdit, onDelete }) {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'En Stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Stock Bajo':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Agotado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calcularGanancia = () => {
    return ((producto.precio - producto.precioCompra) / producto.precioCompra * 100).toFixed(1);
  };

  const calcularGananciaTotal = () => {
    return ((producto.precio - producto.precioCompra) * producto.stock).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{producto.nombre}</h3>
              <p className="text-sm text-gray-500">{producto.id}</p>
            </div>
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

          {/* Estado */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getEstadoColor(producto.estado)}`}>
              {producto.estado}
            </span>
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
          

          {/* Información General */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Información General
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categoría</p>
                <p className="font-medium text-gray-900">{producto.categoria}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Proveedor</p>
                <p className="font-medium text-gray-900">{producto.proveedor}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600 mb-1">Descripción</p>
                <p className="text-gray-900">{producto.descripcion || 'Sin descripción'}</p>
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Control de Stock
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Stock Actual</p>
                <p className={`text-3xl font-bold ${
                  producto.stock === 0 ? 'text-red-600' :
                  producto.stock < producto.stockMinimo ? 'text-orange-600' :
                  'text-green-600'
                }`}>
                  {producto.stock}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Stock Mínimo</p>
                <p className="text-3xl font-bold text-gray-900">{producto.stockMinimo}</p>
              </div>
            </div>
            {producto.stock < producto.stockMinimo && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Stock por debajo del mínimo</p>
                  <p className="text-sm text-orange-700">
                    Se recomienda reabastecer. Faltan {producto.stockMinimo - producto.stock} unidades para alcanzar el stock mínimo.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Precios y Ganancias */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Precios y Ganancias
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Precio Compra</p>
                <p className="text-2xl font-bold text-gray-900">S/ {producto.precioCompra.toFixed(2)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Precio Venta</p>
                <p className="text-2xl font-bold text-indigo-600">S/ {producto.precio.toFixed(2)}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700 mb-1">Margen</p>
                <p className="text-2xl font-bold text-green-600">+{calcularGanancia()}%</p>
              </div>
            </div>
          </div>

          {/* Análisis Financiero */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Análisis Financiero
            </h4>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Ganancia por unidad:</span>
                <span className="font-semibold text-gray-900">
                  S/ {(producto.precio - producto.precioCompra).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Inversión total en stock:</span>
                <span className="font-semibold text-gray-900">
                  S/ {(producto.precioCompra * producto.stock).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Valor total en venta:</span>
                <span className="font-semibold text-gray-900">
                  S/ {(producto.precio * producto.stock).toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-indigo-200 flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Ganancia potencial total:</span>
                <span className="text-2xl font-bold text-green-600">
                  S/ {calcularGananciaTotal()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
  );
}

export default ProductoModal;