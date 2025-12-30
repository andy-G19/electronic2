import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

function VentasChart({ ventas }) {
  // Agrupar ventas por fecha
  const ventasPorFecha = React.useMemo(() => {
    const agrupadas = {};
    
    ventas.forEach(venta => {
      const fecha = venta.fecha.toLocaleDateString('es-PE', { 
        month: 'short', 
        day: 'numeric' 
      });
      
      if (!agrupadas[fecha]) {
        agrupadas[fecha] = {
          fecha,
          ventas: 0,
          transacciones: 0
        };
      }
      
      agrupadas[fecha].ventas += venta.total;
      agrupadas[fecha].transacciones += 1;
    });
    
    return Object.values(agrupadas).sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return dateA - dateB;
    });
  }, [ventas]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.fecha}</p>
          <p className="text-sm text-indigo-600">
            Ventas: <span className="font-bold">S/ {payload[0].value.toFixed(2)}</span>
          </p>
          <p className="text-sm text-green-600">
            Transacciones: <span className="font-bold">{payload[0].payload.transacciones}</span>
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
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Ventas Diarias
          </h3>
          <p className="text-sm text-gray-500 mt-1">Evolución de ventas en el período</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ventasPorFecha}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="fecha" 
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#666"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `S/ ${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="ventas" 
              stroke="#4f46e5" 
              strokeWidth={3}
              dot={{ fill: '#4f46e5', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VentasChart;