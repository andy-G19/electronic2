import React, { useState } from 'react';
import { Settings, Building, DollarSign, Printer, Database, Save, Check } from 'lucide-react';

function ConfiguracionMain() {
  const [config, setConfig] = useState({
    // Información de la Empresa
    nombreEmpresa: 'ElecSales',
    ruc: '20123456789',
    direccion: 'Av. Principal 123, Lima, Perú',
    telefono: '+51 987 654 321',
    email: 'contacto@elecsales.com',
    web: 'www.elecsales.com',
    
    // Configuración de Impuestos
    igv: 18,
    moneda: 'PEN',
    simboloMoneda: 'S/',
    
    // Configuración del Sistema
    nombreSistema: 'ElecSales - Gestión',
    version: '1.0.0',
    stockMinimoPorDefecto: 5,
    
    // Configuración de Impresión
    impresora: 'Térmica 80mm',
    tamañoTicket: '80mm',
    mostrarLogo: true,
    
    // Backup
    backupAutomatico: true,
    frecuenciaBackup: 'diario',
  });

  const [guardado, setGuardado] = useState(false);

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setGuardado(false);
  };

  const handleGuardar = () => {
    // Aquí guardarías en localStorage o backend
    console.log('Configuración guardada:', config);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h2>
          <p className="text-gray-500 mt-1">Personaliza y configura tu sistema</p>
        </div>
        <button
          onClick={handleGuardar}
          className="flex items-center gap-2 px-6 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400 transition-colors"
        >
          {guardado ? (
            <>
              <Check className="w-4 h-4" />
              Guardado
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar Cambios
            </>
          )}
        </button>
      </div>

      {guardado && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Configuración guardada exitosamente</p>
        </div>
      )}

      {/* Información de la Empresa */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <Building className="w-5 h-5 text-sky-400" />
          Información de la Empresa
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              value={config.nombreEmpresa}
              onChange={(e) => handleChange('nombreEmpresa', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RUC
            </label>
            <input
              type="text"
              value={config.ruc}
              onChange={(e) => handleChange('ruc', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={config.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={config.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sitio Web
            </label>
            <input
              type="text"
              value={config.web}
              onChange={(e) => handleChange('web', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        </div>
      </div>

      {/* Configuración de Impuestos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-green-600" />
          Configuración de Impuestos y Moneda
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IGV (%)
            </label>
            <input
              type="number"
              value={config.igv}
              onChange={(e) => handleChange('igv', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Moneda
            </label>
            <select
              value={config.moneda}
              onChange={(e) => handleChange('moneda', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="PEN">Soles Peruanos (PEN)</option>
              <option value="USD">Dólares (USD)</option>
              <option value="EUR">Euros (EUR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Símbolo de Moneda
            </label>
            <input
              type="text"
              value={config.simboloMoneda}
              onChange={(e) => handleChange('simboloMoneda', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        </div>
      </div>

      {/* Configuración del Sistema */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-gray-600" />
          Configuración del Sistema
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Sistema
            </label>
            <input
              type="text"
              value={config.nombreSistema}
              onChange={(e) => handleChange('nombreSistema', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Versión
            </label>
            <input
              type="text"
              value={config.version}
              onChange={(e) => handleChange('version', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Mínimo por Defecto
            </label>
            <input
              type="number"
              value={config.stockMinimoPorDefecto}
              onChange={(e) => handleChange('stockMinimoPorDefecto', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Configuración de Impresión */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <Printer className="w-5 h-5 text-blue-600" />
          Configuración de Impresión
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Impresora
            </label>
            <select
              value={config.impresora}
              onChange={(e) => handleChange('impresora', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="Térmica 80mm">Térmica 80mm</option>
              <option value="Térmica 58mm">Térmica 58mm</option>
              <option value="Láser A4">Láser A4</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamaño de Ticket
            </label>
            <select
              value={config.tamañoTicket}
              onChange={(e) => handleChange('tamañoTicket', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="80mm">80mm</option>
              <option value="58mm">58mm</option>
              <option value="A4">A4</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={config.mostrarLogo}
                onChange={(e) => handleChange('mostrarLogo', e.target.checked)}
                className="w-5 h-5 text-sky-400 border-gray-300 rounded focus:ring-sky-300"
              />
              <span className="text-sm font-medium text-gray-700">
                Mostrar logo en tickets
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Backup y Seguridad */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-sky-400" />
          Backup y Seguridad
        </h3>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={config.backupAutomatico}
                onChange={(e) => handleChange('backupAutomatico', e.target.checked)}
                className="w-5 h-5 text-sky-400 border-gray-300 rounded focus:ring-sky-300"
              />
              <span className="text-sm font-medium text-gray-700">
                Activar backup automático
              </span>
            </label>

            {config.backupAutomatico && (
              <div className="ml-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia de Backup
                </label>
                <select
                  value={config.frecuenciaBackup}
                  onChange={(e) => handleChange('frecuenciaBackup', e.target.value)}
                  className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="diario">Diario</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensual">Mensual</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button className="px-6 py-2 bg-sky-300 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Crear Backup Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfiguracionMain;