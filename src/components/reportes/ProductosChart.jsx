import React from 'react';
import { Package, TrendingUp } from 'lucide-react';

function ProductosChart({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-orange-600" />
          Productos Más Vendidos
        </h3>
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600">No hay datos de productos en este período</p>
        </div>
      </div>
    );
  }

  const maxCantidad = Math.max(...productos.map(p => p.cantidad));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-600" />
            Top 5 Productos Más Vendidos
          </h3>
          <p className="text-sm text-gray-500 mt-1">Ranking de productos por cantidad vendida</p>
        </div>
      </div>

      <div className="space-y-4">
        {productos.map((producto, index) => {
          const porcentaje = (producto.cantidad / maxCantidad) * 100;
          const colores = [
            'bg-sky-500',
            'bg-purple-500',
            'bg-sky-200',
            'bg-orange-500',
            'bg-blue-500'
          ];

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${colores[index]} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {producto.cantidad} unidades • S/ {producto.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-gray-900">{producto.cantidad}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full ${colores[index]} transition-all duration-500 rounded-full`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductosChart;