import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign } from 'lucide-react';

function GananciasChart({ ventas }) {
  // Agrupar por método de pago
  const ventasPorMetodo = React.useMemo(() => {
    const metodos = {
      efectivo: { nombre: 'Efectivo', total: 0, cantidad: 0 },
      tarjeta: { nombre: 'Tarjeta', total: 0, cantidad: 0 },
      transferencia: { nombre: 'Transferencia', total: 0, cantidad: 0 },
    };

    ventas.forEach(venta => {
      if (metodos[venta.metodoPago]) {
        metodos[venta.metodoPago].total += venta.total;
        metodos[venta.metodoPago].cantidad += 1;
      }
    });

    return Object.values(metodos).filter(m => m.total > 0);
  }, [ventas]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.nombre}</p>
          <p className="text-sm text-indigo-600">
            Total: <span className="font-bold">S/ {payload[0].value.toFixed(2)}</span>
          </p>
          <p className="text-sm text-green-600">
            Transacciones: <span className="font-bold">{payload[0].payload.cantidad}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Ventas por Método de Pago
          </h3>
          <p className="text-sm text-gray-500 mt-1">Distribución de pagos recibidos</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ventasPorMetodo}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="nombre" 
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#666"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `S/ ${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="total" 
              fill="#10b981" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GananciasChart;