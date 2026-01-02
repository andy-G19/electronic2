import React, { useState } from 'react';
import Login from './components/auth/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import PuntoVenta from './components/placeholders/PuntoVenta';
import Inventario from './components/placeholders/Inventario';
import Reportes from './components/placeholders/Reportes';
import Usuarios from './components/placeholders/Usuarios';
import Configuracion from './components/placeholders/Configuracion';
import ECommerceMain from './components/ecommerce/ECommerceMain'; // NUEVO
import { ProductosProvider } from './context/ProductosContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false); // NUEVO

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
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

  // NUEVO: Si no está logueado, mostrar E-Commerce
  if (!isLoggedIn) {
    return (
      <ProductosProvider>
        {showLogin ? (
          <Login onLogin={handleLogin}
          onBack={() => setShowLogin(false)}
          />
        ) : (
          <ECommerceMain onLogin={() => setShowLogin(true)} />
        )}
      </ProductosProvider>
    );
  }

  // Si está logueado, mostrar panel de administración
  return (
    <ProductosProvider>
      <MainLayout 
        activeView={activeView} 
        setActiveView={setActiveView}
        usuario={user}
        onLogout={handleLogout}
      >
        {renderView()}
      </MainLayout>
    </ProductosProvider>
  );
}

export default App;