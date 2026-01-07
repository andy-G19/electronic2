import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function MainLayout({ children, activeView, setActiveView, usuario, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. OVERLAY MÓVIL (Fondo oscuro al abrir menú) */}
      {/* Solo visible si sidebarOpen es true y estamos en móvil (md:hidden) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. CONTENEDOR DEL SIDEBAR RESPONSIVO */}
      {/* Móvil: Fixed, z-30, transición de transformación.
          Desktop: Relative (ocupa espacio real), siempre visible (translate-x-0). */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white 
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar 
          activeView={activeView} 
          setActiveView={(view) => {
            setActiveView(view);
            setSidebarOpen(false); // Cierra el menú al elegir opción en móvil
          }}
          usuario={usuario}
        />
      </aside>
      
      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          usuario={usuario}
          onLogout={onLogout}
        />
        
        {/* Área de contenido con scroll independiente */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;