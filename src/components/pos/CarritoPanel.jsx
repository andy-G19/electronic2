import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

function CarritoPanel({ carrito, onActualizarCantidad, onEliminar, subtotal, igv, total, onProcederPago }) {
  if (carrito.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrito vacío</h3>
          <p className="text-gray-600 text-sm">
            Selecciona productos para comenzar una venta
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrito
          </h3>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            {carrito.length} {carrito.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Items del carrito */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
      <div className="border-t border-gray-200 p-6 space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">S/ {subtotal.toFixed(2)}</span>
        </div>

        {/* IGV */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">IGV (18%)</span>
          <span className="font-medium text-gray-900">S/ {igv.toFixed(2)}</span>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-indigo-600">S/ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón de pago */}
        <button
          onClick={onProcederPago}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-semibold text-lg"
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
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      {/* Producto info */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm">{item.nombre}</h4>
          <p className="text-xs text-gray-500 mt-1">{item.id}</p>
        </div>
        <button
          onClick={() => onEliminar(item.id)}
          className="text-red-600 hover:text-red-700 p-1"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Precio y cantidad */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onActualizarCantidad(item.id, item.cantidad - 1)}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
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
            className="w-16 text-center py-1 border border-gray-300 rounded-lg font-medium"
            min="1"
            max={item.stock}
          />
          
          <button
            onClick={() => onActualizarCantidad(item.id, item.cantidad + 1)}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">S/ {item.precio.toFixed(2)} c/u</p>
          <p className="text-lg font-bold text-indigo-600">
            S/ {(item.precio * item.cantidad).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Stock disponible */}
      <div className="text-xs text-gray-500">
        Disponible: <span className="font-medium">{item.stock} unidades</span>
      </div>
    </div>
  );
}

export default CarritoPanel;