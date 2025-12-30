import React from 'react';
import { AlertCircle } from 'lucide-react';

function StockAlert({ productosStockCritico }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-1">Stock Crítico Detectado</h3>
          <p className="text-sm text-red-700">
            {productosStockCritico} {productosStockCritico === 1 ? 'producto tiene' : 'productos tienen'} menos de 5 unidades. 
            Revisa el inventario para reabastecer.
          </p>
        </div>
        <button className="px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors whitespace-nowrap">
          Ver Productos Agotados
        </button>
      </div>
    </div>
  );
}

export default StockAlert;