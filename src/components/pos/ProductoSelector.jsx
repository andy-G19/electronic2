import React from 'react';
import { Plus, Package } from 'lucide-react';

function ProductoSelector({ productos, onSelectProducto, busqueda }) {
  if (productos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            {busqueda ? 'No se encontraron productos' : 'No hay productos disponibles'}
          </h3>
          <p className="text-sm text-gray-600">
            {busqueda 
              ? 'Intenta con otro término de búsqueda'
              : 'Agrega productos al inventario para comenzar a vender'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          onSelect={onSelectProducto}
        />
      ))}
    </div>
  );
}

function ProductoCard({ producto, onSelect }) {
  const stockBajo = producto.stock < 5;

  return (
    <button
      onClick={() => onSelect(producto)}
      className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg hover:border-sky-200 transition-all text-left group relative"
    >
      {stockBajo && (
        <div className="absolute top-2 right-2 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full z-10">
          Stock bajo
        </div>
      )}

      <div className="w-full h-28 sm:h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-sky-400 transition-colors">
          {producto.nombre}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-gray-500 truncate">{producto.id}</p>
            <p className="text-base sm:text-lg font-bold text-sky-400 mt-1">S/ {producto.precio.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Stock</p>
            <p className={`text-sm font-semibold ${
              producto.stock === 0 ? 'text-red-600' :
              producto.stock < 5 ? 'text-orange-600' :
              'text-green-600'
            }`}>
              {producto.stock}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 mt-2">
          <div className="flex items-center justify-center gap-2 text-sky-400 font-medium text-xs sm:text-sm group-hover:text-sky-500">
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ProductoSelector;