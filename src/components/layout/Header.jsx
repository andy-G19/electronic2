import React from 'react';
import { Search, Bell, LogOut, Menu, X, User } from 'lucide-react';

function Header({ sidebarOpen, setSidebarOpen, usuario, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg transition-transform duration-300 shadow-md hover:scale-110 hover:bg-gray-200 focus:outline-none"
          >
            {sidebarOpen ? <X className={`w-6 h-6 text-sky-400 transform transition-transform duration-300 ${sidebarOpen ? 'rotate-0' : 'rotate-90'}`} /> : <Menu className="w-6 h-6 text-sky-400" />}
          </button>
          
          
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos, tickets o clientes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Info del usuario */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
            <User className="w-4 h-4 text-gray-600" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{usuario?.nombre}</p>
              <p className="text-xs text-gray-500">{usuario?.rol}</p>
            </div>
          </div>

          {/* Notificaciones */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;