import React from 'react';
import { Search, Bell, LogOut, Menu, User } from 'lucide-react';

function Header({ sidebarOpen, setSidebarOpen, usuario, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 shrink-0 sticky top-0 z-10">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        
        {/* Izquierda: Botón Menú + Buscador */}
        <div className="flex items-center gap-4 flex-1">
          {/* Botón Hamburguesa: Visible solo en móvil (md:hidden) */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden focus:outline-none focus:ring-2 focus:ring-sky-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Barra de Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
            />
          </div>
        </div>
        
        {/* Derecha: Acciones y Perfil */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Notificaciones */}
          <button className="relative p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

          {/* Info Usuario (Solo Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{usuario?.nombre}</p>
              <p className="text-xs text-gray-500 font-medium">{usuario?.rol}</p>
            </div>
            <div className="p-2 bg-sky-50 rounded-full">
               <User className="w-5 h-5 text-sky-600" />
            </div>
          </div>

          {/* Botón Salir */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-2"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-medium">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;