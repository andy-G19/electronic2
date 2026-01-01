import React, { useState } from 'react';
import Login from './components/auth/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import PuntoVenta from './components/placeholders/PuntoVenta';
import Inventario from './components/placeholders/Inventario';
import Reportes from './components/placeholders/Reportes';
import Usuarios from './components/placeholders/Usuarios';
import Configuracion from './components/placeholders/Configuracion';
import { ProductosProvider } from './context/ProductosContext'; // IMPORTAR

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveView('dashboard');
  };

  const renderView = () => {
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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    // ENVOLVER TODO CON EL PROVIDER
    <ProductosProvider>
      <MainLayout 
        activeView={activeView} 
        setActiveView={setActiveView}
        user={user}
        onLogout={handleLogout}
      >
        {renderView()}
      </MainLayout>
    </ProductosProvider>
  );
}

export default App;