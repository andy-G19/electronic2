import React from 'react';
import { Package, ShoppingCart, BarChart3, Users, Settings } from 'lucide-react';

function Sidebar({ activeView, setActiveView, isOpen, setIsOpen, usuario }) {
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
    // Dashboard siempre visible
    if (item.id === 'dashboard') return true;
    // Verificar permisos
    return usuario?.permisos?.[item.id] || false;
  });

  const groupedItems = menuItemsFiltrados.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className={`${isOpen ? 'w-72' : 'w-0'} transition-all duration-300 bg-slate-900 text-white flex flex-col overflow-hidden`}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ElecSales</h1>
            <p className="text-xs text-slate-400">Gestión v1.0</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-6">
            <p className="text-xs font-semibold text-slate-500 mb-3 px-3">{section}</p>
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
            {usuario?.nombre?.split(' ').map(n => n[0]).join('') || 'US'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{usuario?.nombre || 'Usuario'}</p>
            <p className="text-xs text-slate-400 truncate">{usuario?.rol || 'Sin rol'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;