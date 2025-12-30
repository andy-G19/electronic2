import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';

function VentasTabla({ ventas }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'fecha', direction: 'desc' });

  const sortedVentas = React.useMemo(() => {
    return [...ventas].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'fecha') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [ventas, sortConfig]);

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

  const getMetodoPagoBadge = (metodo) => {
    const styles = {
      efectivo: 'bg-green-100 text-green-800',
      tarjeta: 'bg-blue-100 text-blue-800',
      transferencia: 'bg-purple-100 text-purple-800',
    };
    return styles[metodo] || 'bg-gray-100 text-gray-800';
  };

  if (ventas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay ventas registradas</h3>
        <p className="text-gray-600">No se encontraron ventas en el período seleccionado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Detalle de Ventas</h3>
        <p className="text-sm text-gray-500 mt-1">
          Mostrando {ventas.length} {ventas.length === 1 ? 'venta' : 'ventas'}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-2 hover:text-gray-900"
                >
                  ID
                  {renderSortIcon('id')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('fecha')}
                  className="flex items-center gap-2 hover:text-gray-900"
                >
                  Fecha
                  {renderSortIcon('fecha')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('items')}
                  className="flex items-center gap-2 hover:text-gray-900"
                >
                  Items
                  {renderSortIcon('items')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('total')}
                  className="flex items-center gap-2 hover:text-gray-900"
                >
                  Total
                  {renderSortIcon('total')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Método Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedVentas.map((venta) => (
              <React.Fragment key={venta.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{venta.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{venta.fecha.toLocaleDateString('es-PE')}</p>
                      <p className="text-gray-500">{venta.fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{venta.cliente}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{venta.items}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-bold text-gray-900">S/ {venta.total.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs">IGV: S/ {venta.igv.toFixed(2)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getMetodoPagoBadge(venta.metodoPago)}`}>
                      {venta.metodoPago}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setExpandedRow(expandedRow === venta.id ? null : venta.id)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                
                {/* Detalle expandible */}
                {expandedRow === venta.id && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 bg-gray-50">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 mb-3">Productos vendidos:</h4>
                        <div className="space-y-2">
                          {venta.productos.map((prod, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                              <div>
                                <p className="font-medium text-gray-900">{prod.nombre}</p>
                                <p className="text-sm text-gray-500">
                                  {prod.cantidad} x S/ {prod.precio.toFixed(2)}
                                </p>
                              </div>
                              <p className="font-bold text-indigo-600">
                                S/ {(prod.cantidad * prod.precio).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VentasTabla;