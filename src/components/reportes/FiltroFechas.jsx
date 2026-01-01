import React from 'react';
import { Calendar } from 'lucide-react';

function FiltroFechas({ periodo, setPeriodo, fechaInicio, setFechaInicio, fechaFin, setFechaFin }) {
  const periodos = [
    { id: 'semana', label: 'Última Semana' },
    { id: 'mes', label: 'Último Mes' },
    { id: 'año', label: 'Último Año' },
    { id: 'personalizado', label: 'Personalizado' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-5 h-5 text-sky-400" />
        <h3 className="font-semibold text-gray-900">Período de Análisis</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {periodos.map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriodo(p.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              periodo === p.id
                ? 'bg-sky-300 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {periodo === 'personalizado' && (
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={fechaInicio || ''}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              value={fechaFin || ''}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltroFechas;