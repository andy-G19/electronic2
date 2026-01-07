import React from 'react';
import { Plus, Package } from 'lucide-react'; // Mantenemos tus importaciones

function ProductoSelector({ productos, onSelectProducto, busqueda }) {
  // Validación de seguridad por si productos es null/undefined
  if (!productos || productos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {busqueda ? 'No se encontraron productos' : 'No hay productos disponibles'}
          </h3>
          <p className="text-gray-600">
            {busqueda 
              ? 'Intenta con otro término de búsqueda'
              : 'Agrega productos al inventario para comenzar a vender'}
          </p>
        </div>
      </div>
    );
  }

  return (
    // GRID RESPONSIVO CORREGIDO:
    // Se adapta: 2 columnas en celular -> 3 en tablet -> 4/5 en PC
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 overflow-y-auto h-full content-start">
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
  // 1. Manejo seguro de Stock
  const stock = producto.stock || 0;
  
  // 2. LÓGICA BLINDADA PARA EL PRECIO
  const obtenerPrecioFormateado = () => {
    // Busca el precio en cualquiera de las dos propiedades comunes
    let valor = producto.precioVenta !== undefined ? producto.precioVenta : producto.precio;

    // Si no hay nada, devuelve 0.00
    if (valor === undefined || valor === null || valor === '') return '0.00';

    // Si ya es un número puro, solo ponle decimales
    if (typeof valor === 'number') return valor.toFixed(2);

    // Si es texto (ej: "S/ 25.50"), límpialo dejando solo números y puntos
    const valorLimpio = valor.toString().replace(/[^0-9.]/g, ''); 
    const numero = parseFloat(valorLimpio);

    // Si falló la conversión (es NaN), devuelve 0.00, si no, devuelve el número formateado
    return isNaN(numero) ? '0.00' : numero.toFixed(2);
  };

  const precioFinal = obtenerPrecioFormateado();

  return (
    <button
      onClick={() => onSelect(producto)}
      className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:border-sky-400 hover:ring-1 hover:ring-sky-400 transition-all text-left group relative flex flex-col h-full"
    >
      {/* Badge de Stock */}
      <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold z-10 shadow-sm ${
        stock === 0 ? 'bg-red-100 text-red-700' :
        stock < 5 ? 'bg-orange-100 text-orange-700' :
        'bg-green-100 text-green-700'
      }`}>
        {stock} u.
      </div>

      {/* Imagen */}
      <div className="aspect-square rounded-lg bg-gray-50 mb-3 overflow-hidden flex items-center justify-center relative border border-gray-100">
        {producto.imagen ? (
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            // Si la imagen falla al cargar, muestra el icono
            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.classList.add('flex', 'items-center', 'justify-center'); }} 
          />
        ) : (
          <Package className="w-8 h-8 text-gray-300" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-h-[3rem]">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight mb-1" title={producto.nombre}>
          {producto.nombre || 'Sin nombre'}
        </h4>
        <p className="text-xs text-gray-500 mb-2 truncate">
            {producto.categoria || 'General'}
        </p>
      </div>
      
      {/* Precio Seguro */}
      <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
        <span className="font-bold text-sky-600 text-base">
          S/ {precioFinal}
        </span>
      </div>
    </button>
  );
}

export default ProductoSelector;