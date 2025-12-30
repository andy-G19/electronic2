import React, { useState } from 'react';
import { Eye, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

function ProductoTable({ productos, onView, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Ordenar productos
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

  // Cambiar ordenamiento
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Renderizar icono de ordenamiento
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

  const calcularGanancia = (precioVenta, precioCompra) => {
    return ((precioVenta - precioCompra) / precioCompra * 100).toFixed(1);
  };

  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay productos</h3>
        <p className="text-gray-600">Comienza agregando tu primer producto al inventario</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                onClick={() => handleSort('id')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  ID / Producto
                  {renderSortIcon('id')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('categoria')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Categoría
                  {renderSortIcon('categoria')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('stock')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Stock
                  {renderSortIcon('stock')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('precio')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Precio
                  {renderSortIcon('precio')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ganancia
              </th>
              <th 
                onClick={() => handleSort('estado')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Estado
                  {renderSortIcon('estado')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedProductos.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {producto.id} • {producto.proveedor}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {producto.categoria}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <span className={getStockColor(producto.stock, producto.stockMinimo)}>
                      {producto.stock}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">/ {producto.stockMinimo} mín</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-gray-900 font-medium">S/ {producto.precio.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Costo: S/ {producto.precioCompra.toFixed(2)}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600 font-medium">
                    +{calcularGanancia(producto.precio, producto.precioCompra)}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getEstadoBadge(producto.estado)}`}>
                    {producto.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(producto)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(producto)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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
      
      {/* Footer con total de productos */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium text-gray-900">{productos.length}</span> productos
        </p>
      </div>
    </div>
  );
}

export default ProductoTable;