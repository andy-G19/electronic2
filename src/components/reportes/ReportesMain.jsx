import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Package, ShoppingCart } from 'lucide-react';
import VentasChart from './VentasChart';
import GananciasChart from './GananciasChart';
import ProductosChart from './ProductosChart';
import VentasTabla from './VentasTabla';
import FiltroFechas from './FiltroFechas';

function ReportesMain() {
  // Datos simulados de ventas (en producción vendrían de una base de datos)
  const [ventas] = useState([
    { 
      id: 'VTA-001', 
      fecha: new Date('2024-12-20'),
      cliente: 'Juan Pérez',
      items: 3,
      subtotal: 180.00,
      igv: 32.40,
      total: 212.40,
      metodoPago: 'efectivo',
      productos: [
        { nombre: 'Audífonos Bluetooth X1', cantidad: 2, precio: 35.00 },
        { nombre: 'Mouse Inalámbrico Pro', cantidad: 1, precio: 28.00 }
      ]
    },
    { 
      id: 'VTA-002', 
      fecha: new Date('2024-12-20'),
      cliente: 'María García',
      items: 1,
      subtotal: 120.00,
      igv: 21.60,
      total: 141.60,
      metodoPago: 'tarjeta',
      productos: [
        { nombre: 'Smartwatch Series 5', cantidad: 1, precio: 120.00 }
      ]
    },
    { 
      id: 'VTA-003', 
      fecha: new Date('2024-12-21'),
      cliente: 'Carlos López',
      items: 2,
      subtotal: 90.00,
      igv: 16.20,
      total: 106.20,
      metodoPago: 'transferencia',
      productos: [
        { nombre: 'Teclado Mecánico RGB', cantidad: 1, precio: 65.00 },
        { nombre: 'Cargador USB-C 65W', cantidad: 1, precio: 25.00 }
      ]
    },
    { 
      id: 'VTA-004', 
      fecha: new Date('2024-12-21'),
      cliente: 'Ana Martínez',
      items: 4,
      subtotal: 146.00,
      igv: 26.28,
      total: 172.28,
      metodoPago: 'efectivo',
      productos: [
        { nombre: 'Audífonos Bluetooth X1', cantidad: 1, precio: 35.00 },
        { nombre: 'Mouse Inalámbrico Pro', cantidad: 2, precio: 28.00 },
        { nombre: 'Cargador USB-C 65W', cantidad: 1, precio: 25.00 }
      ]
    },
    { 
      id: 'VTA-005', 
      fecha: new Date('2024-12-22'),
      cliente: 'Pedro Sánchez',
      items: 1,
      subtotal: 65.00,
      igv: 11.70,
      total: 76.70,
      metodoPago: 'tarjeta',
      productos: [
        { nombre: 'Teclado Mecánico RGB', cantidad: 1, precio: 65.00 }
      ]
    },
    { 
      id: 'VTA-006', 
      fecha: new Date('2024-12-22'),
      cliente: 'Laura Torres',
      items: 3,
      subtotal: 168.00,
      igv: 30.24,
      total: 198.24,
      metodoPago: 'efectivo',
      productos: [
        { nombre: 'Smartwatch Series 5', cantidad: 1, precio: 120.00 },
        { nombre: 'Mouse Inalámbrico Pro', cantidad: 1, precio: 28.00 },
        { nombre: 'Funda Tablet 10"', cantidad: 1, precio: 20.00 }
      ]
    },
    { 
      id: 'VTA-007', 
      fecha: new Date('2024-12-23'),
      cliente: 'Roberto Díaz',
      items: 2,
      subtotal: 90.00,
      igv: 16.20,
      total: 106.20,
      metodoPago: 'transferencia',
      productos: [
        { nombre: 'Teclado Mecánico RGB', cantidad: 1, precio: 65.00 },
        { nombre: 'Cargador USB-C 65W', cantidad: 1, precio: 25.00 }
      ]
    },
    { 
      id: 'VTA-008', 
      fecha: new Date('2024-12-23'),
      cliente: 'Sofia Ramírez',
      items: 5,
      subtotal: 241.00,
      igv: 43.38,
      total: 284.38,
      metodoPago: 'efectivo',
      productos: [
        { nombre: 'Smartwatch Series 5', cantidad: 1, precio: 120.00 },
        { nombre: 'Audífonos Bluetooth X1', cantidad: 2, precio: 35.00 },
        { nombre: 'Mouse Inalámbrico Pro', cantidad: 1, precio: 28.00 },
        { nombre: 'Cargador USB-C 65W', cantidad: 1, precio: 25.00 }
      ]
    },
  ]);

  const [periodo, setPeriodo] = useState('semana'); // semana, mes, año, personalizado
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  // Filtrar ventas por período
  const ventasFiltradas = React.useMemo(() => {
    const ahora = new Date();
    let desde = new Date();

    if (periodo === 'semana') {
      desde.setDate(ahora.getDate() - 7);
    } else if (periodo === 'mes') {
      desde.setMonth(ahora.getMonth() - 1);
    } else if (periodo === 'año') {
      desde.setFullYear(ahora.getFullYear() - 1);
    } else if (periodo === 'personalizado' && fechaInicio && fechaFin) {
      desde = new Date(fechaInicio);
      const hasta = new Date(fechaFin);
      return ventas.filter(v => v.fecha >= desde && v.fecha <= hasta);
    }

    return ventas.filter(v => v.fecha >= desde);
  }, [ventas, periodo, fechaInicio, fechaFin]);

  // Calcular estadísticas generales
  const stats = React.useMemo(() => {
    const totalVentas = ventasFiltradas.reduce((sum, v) => sum + v.total, 0);
    const totalTransacciones = ventasFiltradas.length;
    const promedioVenta = totalVentas / (totalTransacciones || 1);
    const totalProductosVendidos = ventasFiltradas.reduce((sum, v) => sum + v.items, 0);

    // Productos más vendidos
    const productosCount = {};
    ventasFiltradas.forEach(venta => {
      venta.productos.forEach(prod => {
        if (!productosCount[prod.nombre]) {
          productosCount[prod.nombre] = { nombre: prod.nombre, cantidad: 0, total: 0 };
        }
        productosCount[prod.nombre].cantidad += prod.cantidad;
        productosCount[prod.nombre].total += prod.cantidad * prod.precio;
      });
    });

    const topProductos = Object.values(productosCount)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    // Ventas por método de pago
    const metodosPago = ventasFiltradas.reduce((acc, v) => {
      acc[v.metodoPago] = (acc[v.metodoPago] || 0) + v.total;
      return acc;
    }, {});

    return {
      totalVentas,
      totalTransacciones,
      promedioVenta,
      totalProductosVendidos,
      topProductos,
      metodosPago
    };
  }, [ventasFiltradas]);

  // Exportar reporte
  const handleExportarReporte = () => {
    const csv = [
      ['ID', 'Fecha', 'Cliente', 'Items', 'Subtotal', 'IGV', 'Total', 'Método Pago'],
      ...ventasFiltradas.map(v => [
        v.id,
        v.fecha.toLocaleDateString('es-PE'),
        v.cliente,
        v.items,
        v.subtotal.toFixed(2),
        v.igv.toFixed(2),
        v.total.toFixed(2),
        v.metodoPago
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_ventas_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reportes y Analytics</h2>
          <p className="text-gray-500 mt-1">Análisis detallado de ventas y rendimiento</p>
        </div>
        <button
          onClick={handleExportarReporte}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar Reporte
        </button>
      </div>

      {/* Filtro de fechas */}
      <FiltroFechas
        periodo={periodo}
        setPeriodo={setPeriodo}
        fechaInicio={fechaInicio}
        setFechaInicio={setFechaInicio}
        fechaFin={fechaFin}
        setFechaFin={setFechaFin}
      />

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Ventas Totales</p>
          <p className="text-2xl font-bold text-gray-900">S/ {stats.totalVentas.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Transacciones</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalTransacciones}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Ticket Promedio</p>
          <p className="text-2xl font-bold text-gray-900">S/ {stats.promedioVenta.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Productos Vendidos</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProductosVendidos}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VentasChart ventas={ventasFiltradas} />
        <GananciasChart ventas={ventasFiltradas} />
      </div>

      {/* Productos más vendidos */}
      <ProductosChart productos={stats.topProductos} />

      {/* Tabla de ventas */}
      <VentasTabla ventas={ventasFiltradas} />
    </div>
  );
}

export default ReportesMain;