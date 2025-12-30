import React, { useState } from 'react';
import Login from './components/auth/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import PuntoVenta from './components/placeholders/PuntoVenta';
import Inventario from './components/placeholders/Inventario';
import Reportes from './components/placeholders/Reportes';
import Usuarios from './components/placeholders/Usuarios';
import Configuracion from './components/placeholders/Configuracion';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');

  // Manejar login
  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  // Manejar logout
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      setUsuario(null);
      setActiveView('dashboard');
    }
  };

  // Si no hay usuario autenticado, mostrar Login
  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  // Renderizar vista según navegación
  const renderView = () => {
    // Verificar permisos antes de renderizar
    if (!usuario.permisos[activeView] && activeView !== 'dashboard') {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Acceso Denegado</h3>
          <p className="text-gray-600">No tienes permisos para acceder a este módulo</p>
          <p className="text-sm text-gray-500 mt-2">Contacta al administrador si necesitas acceso</p>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <PuntoVenta />;
      case 'inventario':
        return <Inventario />;
      case 'reportes':
        return <Reportes />;
      case 'usuarios':
        return <Usuarios />;
      case 'configuracion':
        return <Configuracion />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout 
      activeView={activeView} 
      setActiveView={setActiveView}
      usuario={usuario}
      onLogout={handleLogout}
    >
      {renderView()}
    </MainLayout>
  );
}

export default App;