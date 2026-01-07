import React, { useState } from 'react';
import { Eye, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

function ProductoTable({ productos, onView, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Lógica de ordenamiento
  const sortedProductos = React.useMemo(() => {
    if (!sortConfig.key) return productos;

    return [...productos].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [productos, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const getStockColor = (stock, stockMinimo) => {
    if (stock === 0) return 'text-red-600 font-bold';
    if (stock < stockMinimo) return 'text-orange-600 font-semibold';
    return 'text-gray-900';
  };

  const getEstadoBadge = (estado) => {
    const styles = {
      'En Stock': 'bg-green-100 text-green-800',
      'Stock Bajo': 'bg-orange-100 text-orange-800',
      'Agotado': 'bg-red-100 text-red-800'
    };
    return styles[estado] || 'bg-gray-100 text-gray-800';
  };

  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
        <p className="text-gray-500">Agrega productos a tu inventario para verlos aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
      {/* Contenedor con scroll horizontal suave */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Columna Producto: Padding reducido en móvil (px-4 vs px-6) */}
              <th onClick={() => handleSort('nombre')} className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[180px]">
                <div className="flex items-center gap-2">Producto {renderSortIcon('nombre')}</div>
              </th>
              
              {/* Categoría: Oculta en móvil (hidden md:table-cell) */}
              <th onClick={() => handleSort('categoria')} className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap">
                <div className="flex items-center gap-2">Categoría {renderSortIcon('categoria')}</div>
              </th>
              
              <th onClick={() => handleSort('stock')} className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap">
                <div className="flex items-center gap-2">Stock {renderSortIcon('stock')}</div>
              </th>
              
              <th onClick={() => handleSort('precioVenta')} className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap">
                <div className="flex items-center gap-2">Precio {renderSortIcon('precioVenta')}</div>
              </th>
              
              {/* Estado: Oculto en tablets pequeñas y móvil (hidden lg:table-cell) */}
              <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Estado
              </th>
              
              <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-50">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProductos.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                
                {/* Producto + Imagen */}
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {producto.imagen ? (
                        <img className="h-10 w-10 rounded-lg object-cover" src={producto.imagen} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-[10px]">N/A</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3 md:ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-[150px] md:max-w-none">
                        {producto.nombre}
                      </div>
                      {/* Mostrar categoría aquí solo en móvil */}
                      <div className="md:hidden text-xs text-gray-500 mt-0.5">
                        {producto.categoria}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Categoría (Desktop) */}
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {producto.categoria}
                </td>

                {/* Stock */}
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${getStockColor(producto.stock, producto.stockMinimo)}`}>
                    {producto.stock} u.
                  </span>
                </td>

                {/* Precio */}
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">S/ {parseFloat(producto.precioVenta).toFixed(2)}</div>
                </td>

                {/* Estado (Desktop Grande) */}
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadge(producto.estado)}`}>
                    {producto.estado}
                  </span>
                </td>

                {/* Acciones */}
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white/95 backdrop-blur-sm border-l border-gray-100 shadow-sm md:shadow-none md:border-none md:bg-transparent">
                  <div className="flex items-center justify-end gap-1 md:gap-2">
                    <button 
                      onClick={() => onView(producto)} 
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(producto)} 
                      className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(producto.id)} 
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 mt-auto">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium text-gray-900">{productos.length}</span> productos
        </p>
      </div>
    </div>
  );
}

export default ProductoTable;