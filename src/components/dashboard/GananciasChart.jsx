import React from 'react';
import { BarChart3 } from 'lucide-react';

function GananciasChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Resumen de Ganancias</h3>
      <div className="h-64 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Gráfico de ganancias próximamente</p>
          <p className="text-xs text-gray-400 mt-1">(Se implementará en Fase 4)</p>
        </div>
      </div>
    </div>
  );
}

export default GananciasChart;