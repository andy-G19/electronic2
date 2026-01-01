import React, { useState } from 'react';
import { Package, Eye, EyeOff, Mail, Lock, AlertCircle, Shield, User, ShoppingCart } from 'lucide-react';

function Login({ onLogin = () => {}, onBack }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usuariosDemo = [
    {
      email: 'admin@elecsales.com',
      password: 'admin123',
      nombre: 'Juan Pérez',
      rol: 'Administrador',
      permisos: {
        dashboard: true,
        pos: true,
        inventario: true,
        reportes: true,
        usuarios: true,
        configuracion: true
      }
    },
    {
      email: 'supervisor@elecsales.com',
      password: 'super123',
      nombre: 'María García',
      rol: 'Supervisor',
      permisos: {
        dashboard: true,
        pos: true,
        inventario: true,
        reportes: true,
        usuarios: false,
        configuracion: false
      }
    },
    {
      email: 'vendedor@elecsales.com',
      password: 'vende123',
      nombre: 'Carlos López',
      rol: 'Vendedor',
      permisos: {
        dashboard: true,
        pos: true,
        inventario: true,
        reportes: false,
        usuarios: false,
        configuracion: false
      }
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = () => {
    setError('');
    setLoading(true);

    setTimeout(() => {
      const usuario = usuariosDemo.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (usuario) {
        onLogin({
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          permisos: usuario.permisos
        });
      } else {
        setError('Email o contraseña incorrectos');
        setLoading(false);
      }
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password });
    setTimeout(() => {
      const usuario = usuariosDemo.find(u => u.email === email);
      if (usuario) {
        onLogin({
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          permisos: usuario.permisos
        });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-blue-full">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          
          {/* Panel Izquierdo - Bienvenida */}
          <div className="hidden lg:flex relative p-12 flex-col justify-center text-white overflow-hidden bg-gradient-blue-primary">
            
            {/* Elementos decorativos con la paleta */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-sky-50 opacity-20 rounded-full blur-3xl"></div>
            
            {/* Formas geométricas */}
            <div className="absolute w-24 h-3 bg-sky-100 rounded-full transform rotate-45 opacity-70 animate-pulse" style={{ top: '25%', right: '25%' }}></div>
            <div className="absolute w-32 h-3 bg-sky-50 rounded-full transform -rotate-12 opacity-60" style={{ top: '33%', right: '33%' }}></div>
            <div className="absolute w-20 h-20 bg-sky-200 rounded-full opacity-40 animate-bounce-slow" style={{ bottom: '33%', right: '25%' }}></div>
            
            {/* Iconos flotantes */}
            <div className="absolute w-12 h-12 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center rounded-xl animate-float" style={{ top: '50%', right: '5rem' }}>
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="absolute w-12 h-12 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center rounded-xl animate-float-delayed" style={{ bottom: '50%', left: '5rem' }}>
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            
            {/* Logo y contenido */}
            <div className="relative z-10 mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-25 backdrop-blur-lg mb-6 rounded-2xl shadow-xl">
                <Package className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Bienvenido a<br/>
                <span className="text-sky-100">ElecSales</span>
              </h1>
              <div className="w-20 h-1 bg-white opacity-50 rounded-full mb-6"></div>
              <p className="text-lg leading-relaxed max-w-md text-white text-opacity-90">
                Sistema integral de gestión comercial. Administra tu inventario, 
                ventas y reportes de manera eficiente y profesional.
              </p>
            </div>

            {/* Características */}
            <div className="relative z-10 space-y-3 mb-8">
              <div className="flex items-center gap-3 text-white text-opacity-90">
                <div className="w-2 h-2 bg-sky-100 rounded-full"></div>
                <span className="text-sm">Control total de inventario</span>
              </div>
              <div className="flex items-center gap-3 text-white text-opacity-90">
                <div className="w-2 h-2 bg-sky-100 rounded-full"></div>
                <span className="text-sm">Punto de venta integrado</span>
              </div>
              <div className="flex items-center gap-3 text-white text-opacity-90">
                <div className="w-2 h-2 bg-sky-100 rounded-full"></div>
                <span className="text-sm">Reportes en tiempo real</span>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-auto">
              <div className="w-full h-px bg-white opacity-20 mb-4"></div>
              <p className="text-sm text-white text-opacity-70">
                Sistema de Gestión v1.0 • © 2024 ElecSales
              </p>
            </div>
          </div>

          {/* Panel Derecho - Formulario */}
          <div className="p-6 lg:p-12 flex flex-col justify-center bg-gray-50">
            <div className="w-full max-w-md mx-auto">
              
              {/* Logo móvil */}
              <div className="lg:hidden text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-blue-primary flex items-center justify-center rounded-xl">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-xl font-bold text-sky-400">ElecSales</h1>
                    <p className="text-xs text-gray-500">Sistema de Gestión v1.0</p>
                  </div>
                </div>
              </div>

              {/* Botón volver (si viene del e-commerce) */}
              {onBack && (
                <button
                  onClick={onBack}
                  className="mb-4 text-sky-300 hover:text-sky-400 flex items-center gap-2 text-sm font-medium"
                >
                  ← Volver a la tienda
                </button>
              )}

              {/* Título */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-4">
                  <Lock className="w-8 h-8 text-sky-400" />
                </div>
                <h2 className="text-3xl font-bold text-sky-600 mb-2">Iniciar Sesión</h2>
                <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 bg-red-50 p-4 flex items-start gap-3 rounded-lg border-l-4 border-red-500">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-900">{error}</p>
                </div>
              )}

              {/* Formulario */}
              <div className="space-y-5">
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="tu@email.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Recordar / Olvidó */}
                <div className="flex items-center justify-between text-sm pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-sky-300 border-gray-300 rounded focus:ring-sky-300" />
                    <span className="text-gray-600">Recordarme</span>
                  </label>
                  <button className="font-medium text-sky-300 hover:text-sky-400">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Botón Login */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-blue-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Iniciando sesión...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" />
                      INICIAR SESIÓN
                    </span>
                  )}
                </button>
              </div>

              {/* Cuentas Demo */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <p className="text-sm font-medium text-gray-700 text-center mb-4 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Acceso rápido - Cuentas demo
                </p>
                <div className="space-y-2">
                  
                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin@elecsales.com', 'admin123')}
                    className="w-full px-4 py-3 bg-sky-50 text-sky-600 border-2 border-sky-200 rounded-xl font-medium hover:bg-sky-100 hover:border-sky-300 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Administrador
                    </span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">admin@elecsales.com</span>
                  </button>

                  {/* Supervisor */}
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('supervisor@elecsales.com', 'super123')}
                    className="w-full px-4 py-3 bg-sky-50 text-sky-600 border-2 border-sky-200 rounded-xl font-medium hover:bg-sky-100 hover:border-sky-300 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Supervisor
                    </span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">supervisor@elecsales.com</span>
                  </button>

                  {/* Vendedor */}
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('vendedor@elecsales.com', 'vende123')}
                    className="w-full px-4 py-3 bg-sky-50 text-sky-600 border-2 border-sky-200 rounded-xl font-medium hover:bg-sky-100 hover:border-sky-300 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Vendedor
                    </span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">vendedor@elecsales.com</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default Login;