import React from 'react';
import { Package, ShoppingCart, BarChart3, Users, Settings, X } from 'lucide-react';

function Sidebar({ activeView, setActiveView, usuario, onClose }) { // onClose es opcional si lo pasas
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, section: 'PRINCIPAL' },
    { id: 'pos', label: 'Punto de Venta', icon: ShoppingCart, section: 'PRINCIPAL' },
    { id: 'inventario', label: 'Inventario', icon: Package, section: 'PRINCIPAL' },
    { id: 'reportes', label: 'Reportes', icon: BarChart3, section: 'ADMINISTRACIÓN' },
    { id: 'usuarios', label: 'Usuarios', icon: Users, section: 'ADMINISTRACIÓN' },
    { id: 'configuracion', label: 'Configuración', icon: Settings, section: 'ADMINISTRACIÓN' },
  ];

  // Filtrar menú según permisos del usuario
  const menuItemsFiltrados = menuItems.filter(item => {
    if (item.id === 'dashboard') return true;
    return usuario?.permisos?.[item.id] || false; // Manejo seguro de undefined
  });

  const groupedItems = menuItemsFiltrados.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 text-white">
      {/* Header del Sidebar */}
      <div className="h-16 flex items-center justify-between px-6 bg-slate-950">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
            E
            </div>
            <span>ElecSales</span>
        </div>
        {/* Botón cerrar solo visible en móvil (opcional, ya que el overlay cierra) */}
        {onClose && (
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        )}
      </div>

      {/* Navegación Scrollable */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section}>
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {section}
            </p>
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Perfil de Usuario al pie */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-full flex items-center justify-center font-bold text-sm shadow-inner">
            {usuario?.nombre?.substring(0, 2).toUpperCase() || 'US'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate text-white">{usuario?.nombre || 'Usuario'}</p>
            <p className="text-xs text-slate-400 truncate">{usuario?.rol || 'Vendedor'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;