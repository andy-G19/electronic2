import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Package, X } from 'lucide-react';

function CarritoPanel({ carrito, onActualizarCantidad, onEliminar, subtotal, igv, total, onProcederPago, onClose, isMobile }) {
  if (carrito.length === 0) {
    return (
      <>
        {isMobile && (
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Carrito</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrito vacío</h3>
            <p className="text-gray-600 text-sm">
              Selecciona productos para comenzar
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Carrito</span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="bg-sky-100 text-sky-500 px-3 py-1 rounded-full text-sm font-medium">
              {carrito.length} {carrito.length === 1 ? 'item' : 'items'}
            </span>
            {isMobile && (
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Items del carrito */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {carrito.map((item) => (
          <CarritoItem
            key={item.id}
            item={item}
            onActualizarCantidad={onActualizarCantidad}
            onEliminar={onEliminar}
          />
        ))}
      </div>

      {/* Resumen y totales */}
      <div className="border-t border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50 flex-shrink-0">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">S/ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">IGV (18%)</span>
          <span className="font-medium text-gray-900">S/ {igv.toFixed(2)}</span>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
            <span className="text-xl sm:text-2xl font-bold text-sky-400">S/ {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onProcederPago}
          className="w-full bg-sky-300 text-white py-3 sm:py-4 rounded-lg hover:bg-sky-400 transition-colors flex items-center justify-center gap-2 font-semibold text-base sm:text-lg shadow-lg"
        >
          <CreditCard className="w-5 h-5" />
          Proceder al Pago
        </button>
      </div>
    </>
  );
}

function CarritoItem({ item, onActualizarCantidad, onEliminar }) {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 space-y-3 border border-gray-200 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {item.imagen ? (
            <img
              src={item.imagen}
              alt={item.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">{item.nombre}</h4>
          <p className="text-xs text-gray-500 mt-1">{item.id}</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">S/ {item.precio.toFixed(2)} c/u</p>
        </div>

        <button
          onClick={() => onEliminar(item.id)}
          className="text-red-600 hover:text-red-700 p-1 flex-shrink-0"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onActualizarCantidad(item.id, item.cantidad - 1)}
            disabled={item.cantidad <= 1}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            value={item.cantidad}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onActualizarCantidad(item.id, value);
            }}
            className="w-12 sm:w-16 text-center py-1 border border-gray-300 rounded-lg font-medium text-sm"
            min="1"
            max={item.stock}
          />
          
          <button
            onClick={() => onActualizarCantidad(item.id, item.cantidad + 1)}
            disabled={item.cantidad >= item.stock}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="text-base sm:text-lg font-bold text-sky-400">
            S/ {(item.precio * item.cantidad).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">
          Stock: <span className="font-medium text-gray-700">{item.stock}</span>
        </span>
        {item.cantidad >= item.stock && (
          <span className="text-orange-600 font-medium">Stock máximo</span>
        )}
      </div>
    </div>
  );
}

export default CarritoPanel;