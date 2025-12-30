import React, { useState } from 'react';
import { Package, Eye, EyeOff, Mail, Lock, AlertCircle, Shield, User, ShoppingCart } from 'lucide-react';

function Login({ onLogin = () => {} }) {
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 50%, rgb(251, 146, 60) 100%)'
    }}>
      <div className="w-full max-w-6xl bg-white shadow-2xl overflow-hidden" style={{ borderRadius: '1.5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '600px' }}>
          {/* Panel Izquierdo - Bienvenida (oculto en móvil) */}
          <div className="hidden lg:flex relative p-12 flex-col justify-center text-white overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 50%, rgb(251, 146, 60) 100%)'
          }}>
            {/* Elementos decorativos */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 opacity-20 rounded-full blur-3xl" style={{ backgroundColor: 'rgb(253, 186, 116)' }}></div>
            
            {/* Formas geométricas decorativas */}
            <div className="absolute w-24 h-3 rounded-full transform rotate-45 opacity-70 animate-pulse" style={{ 
              top: '25%', 
              right: '25%',
              backgroundColor: 'rgb(251, 146, 60)'
            }}></div>
            <div className="absolute w-32 h-3 rounded-full transform -rotate-12 opacity-60" style={{ 
              top: '33%', 
              right: '33%',
              backgroundColor: 'rgb(244, 114, 182)'
            }}></div>
            <div className="absolute w-20 h-20 rounded-full opacity-40 animate-bounce" style={{ 
              bottom: '33%', 
              right: '25%',
              backgroundColor: 'rgb(192, 132, 252)',
              animationDuration: '3s'
            }}></div>
            <div className="absolute w-16 h-3 rounded-full transform rotate-12 opacity-70" style={{ 
              bottom: '25%', 
              left: '25%',
              backgroundColor: 'rgb(253, 186, 116)'
            }}></div>
            
            {/* Iconos flotantes */}
            <div className="absolute w-12 h-12 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center animate-float" style={{
              top: '50%',
              right: '5rem',
              borderRadius: '0.75rem'
            }}>
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="absolute w-12 h-12 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center animate-float-delayed" style={{
              bottom: '50%',
              left: '5rem',
              borderRadius: '0.75rem'
            }}>
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            
            {/* Logo */}
            <div className="relative z-10 mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-25 backdrop-blur-lg mb-6 shadow-xl" style={{ borderRadius: '1rem' }}>
                <Package className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Bienvenido a<br/>
                <span style={{ color: 'rgb(254, 215, 170)' }}>Electronica Andy</span>
              </h1>
              <div className="w-20 h-1 bg-white opacity-50 rounded-full mb-6"></div>
              <p className="text-lg leading-relaxed max-w-md" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Sistema integral de gestión comercial. Administra tu inventario, 
                ventas y reportes de manera eficiente y profesional.
              </p>
            </div>

            {/* Características destacadas */}
            <div className="relative z-10 space-y-3 mb-8">
              <div className="flex items-center gap-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(253, 186, 116)' }}></div>
                <span className="text-sm">Control total de inventario</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(244, 114, 182)' }}></div>
                <span className="text-sm">Punto de venta integrado</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(192, 132, 252)' }}></div>
                <span className="text-sm">Reportes en tiempo real</span>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-auto">
              <div className="w-full h-px bg-white opacity-20 mb-4"></div>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Sistema de Gestión v1.0 • © 2024 ElectronicAndy
              </p>
            </div>

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

          {/* Panel Derecho - Formulario */}
          <div className="p-6 lg:p-12 flex flex-col justify-center bg-gray-50">
            <div className="w-full max-w-md mx-auto">
              {/* Logo para móviles */}
              <div className="lg:hidden text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 100%)',
                    borderRadius: '0.75rem'
                  }}>
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-xl font-bold" style={{ color: 'rgb(147, 51, 234)' }}>ElectronicAndy</h1>
                    <p className="text-xs text-gray-500">Sistema de Gestión v1.0</p>
                  </div>
                </div>
              </div>

              {/* Título del formulario */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4" style={{
                  background: 'linear-gradient(135deg, rgb(243, 232, 255) 0%, rgb(251, 207, 232) 100%)',
                  borderRadius: '1rem'
                }}>
                  <Lock className="w-8 h-8" style={{ color: 'rgb(147, 51, 234)' }} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
                <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 p-4 flex items-start gap-3 animate-shake" style={{
                  borderLeft: '4px solid rgb(239, 68, 68)',
                  borderRadius: '0.5rem'
                }}>
                  <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: 'rgb(220, 38, 38)', flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'rgb(153, 27, 27)' }}>{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 transition-all"
                      style={{ paddingLeft: '3rem', borderRadius: '0.75rem' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgb(147, 51, 234)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(147, 51, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgb(229, 231, 235)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 transition-all"
                      style={{ paddingLeft: '3rem', paddingRight: '3rem', borderRadius: '0.75rem' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgb(147, 51, 234)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(147, 51, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgb(229, 231, 235)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(75, 85, 99)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Recordar y Olvidaste contraseña */}
                <div className="flex items-center justify-between text-sm pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                      style={{ accentColor: 'rgb(147, 51, 234)' }}
                    />
                    <span className="text-gray-600 transition-colors">Recordarme</span>
                  </label>
                  <button
                    type="button"
                    className="font-medium transition-colors"
                    style={{ color: 'rgb(147, 51, 234)' }}
                    onMouseEnter={(e) => e.target.style.color = 'rgb(126, 34, 206)'}
                    onMouseLeave={(e) => e.target.style.color = 'rgb(147, 51, 234)'}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Botón de Login */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full text-white py-4 font-semibold text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: loading ? 'rgb(156, 163, 175)' : 'linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 100%)',
                    borderRadius: '0.75rem'
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => !loading && (e.target.style.transform = 'scale(1)')}
                  onMouseDown={(e) => !loading && (e.target.style.transform = 'scale(0.98)')}
                  onMouseUp={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
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
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin@elecsales.com', 'admin123')}
                    className="w-full px-4 py-3 transition-all text-sm font-medium border-2 flex items-center justify-between group"
                    style={{
                      backgroundColor: 'rgb(250, 245, 255)',
                      color: 'rgb(126, 34, 206)',
                      borderColor: 'rgb(233, 213, 255)',
                      borderRadius: '0.75rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(243, 232, 255)';
                      e.currentTarget.style.borderColor = 'rgb(216, 180, 254)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(250, 245, 255)';
                      e.currentTarget.style.borderColor = 'rgb(233, 213, 255)';
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Administrador
                    </span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">admin@elecsales.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('supervisor@elecsales.com', 'super123')}
                    className="w-full px-4 py-3 transition-all text-sm font-medium border-2 flex items-center justify-between group"
                    style={{
                      backgroundColor: 'rgb(239, 246, 255)',
                      color: 'rgb(29, 78, 216)',
                      borderColor: 'rgb(191, 219, 254)',
                      borderRadius: '0.75rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(219, 234, 254)';
                      e.currentTarget.style.borderColor = 'rgb(147, 197, 253)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(239, 246, 255)';
                      e.currentTarget.style.borderColor = 'rgb(191, 219, 254)';
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Supervisor
                    </span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">supervisor@elecsales.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('vendedor@elecsales.com', 'vende123')}
                    className="w-full px-4 py-3 transition-all text-sm font-medium border-2 flex items-center justify-between group"
                    style={{
                      backgroundColor: 'rgb(240, 253, 244)',
                      color: 'rgb(21, 128, 61)',
                      borderColor: 'rgb(187, 247, 208)',
                      borderRadius: '0.75rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(220, 252, 231)';
                      e.currentTarget.style.borderColor = 'rgb(134, 239, 172)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(240, 253, 244)';
                      e.currentTarget.style.borderColor = 'rgb(187, 247, 208)';
                    }}
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

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Login;