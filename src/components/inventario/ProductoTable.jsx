import React, { useState } from 'react';
import { Eye, Edit, Trash2, ChevronUp, ChevronDown, Package } from 'lucide-react';

function ProductoTable({ productos, onView, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Lógica de ordenamiento
  const sortedProductos = React.useMemo(() => {
    if (!sortConfig.key) return productos;

    return [...productos].sort((a, b) => {
      // Manejo especial para precios al ordenar
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'precioVenta') {
         aValue = parseFloat(a.precioVenta || a.precio || 0);
         bValue = parseFloat(b.precioVenta || b.precio || 0);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
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
          <Package className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
        <p className="text-gray-500">Agrega productos a tu inventario para verlos aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => handleSort('nombre')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[200px]">
                <div className="flex items-center gap-2">Producto {renderSortIcon('nombre')}</div>
              </th>
              <th onClick={() => handleSort('categoria')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell">
                <div className="flex items-center gap-2">Categoría {renderSortIcon('categoria')}</div>
              </th>
              <th onClick={() => handleSort('stock')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2">Stock {renderSortIcon('stock')}</div>
              </th>
              <th onClick={() => handleSort('precioVenta')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2">Precio {renderSortIcon('precioVenta')}</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProductos.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {producto.imagen ? (
                        <img className="h-10 w-10 rounded-lg object-cover" src={producto.imagen} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                      <div className="text-xs text-gray-500 md:hidden">{producto.categoria}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {producto.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${getStockColor(producto.stock, producto.stockMinimo)}`}>
                    {producto.stock} u.
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* AQUÍ ESTÁ LA CORRECCIÓN CLAVE PARA VER EL PRECIO */}
                  <div className="text-sm font-medium text-gray-900">
                    S/ {parseFloat(producto.precioVenta || producto.precio || 0).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadge(producto.estado)}`}>
                    {producto.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onView(producto)} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(producto)} className="p-1 text-sky-600 hover:bg-sky-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(producto.id)} className="p-1 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium text-gray-900">{productos.length}</span> productos
        </p>
      </div>
    </div>
  );
}

export default ProductoTable;