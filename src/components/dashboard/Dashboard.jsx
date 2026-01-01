import React from 'react';
import { Package, ShoppingCart } from 'lucide-react';
import { useProductos } from '../../context/ProductosContext'; // IMPORTAR
import MetricCard from './MetricCard';
import StockAlert from './StockAlert';
import InventoryTable from './InventoryTable';
import GananciasChart from './GananciasChart';

function Dashboard() {
  // USAR PRODUCTOS DEL CONTEXT
  const { productos, obtenerEstadisticas } = useProductos();
  const stats = obtenerEstadisticas();

  const productosStockCritico = productos.filter(p => p.stock < 5).length;

  // Tomar solo los primeros 4 productos para mostrar en el dashboard
  const inventarioReciente = productos.slice(0, 4);

  const metrics = [
    {
      title: 'Ventas del Día',
      value: '1,240.00',
      currency: 'S/',
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingCart,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Ganancia Neta',
      value: '450.50',
      currency: 'S/',
      change: '+8%',
      changeType: 'positive',
      icon: ShoppingCart,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Stock Crítico',
      value: productosStockCritico.toString(),
      suffix: 'Productos',
      change: 'Requiere Atención',
      changeType: 'warning',
      icon: Package,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
          <p className="text-gray-500 mt-1">Resumen de operaciones del día.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Producto</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva Venta (POS)</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Stock Crítico Alert */}
      {productosStockCritico > 0 && (
        <StockAlert productosStockCritico={productosStockCritico} />
      )}

      {/* Inventario Reciente */}
      <InventoryTable inventario={inventarioReciente} />

      {/* Resumen de Ganancias */}
      <GananciasChart />
    </div>
  );
}

export default Dashboard;