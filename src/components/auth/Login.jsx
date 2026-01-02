import React, { useState } from 'react';
import { 
  Package, Eye, EyeOff, Mail, Lock, AlertCircle, 
  ShieldCheck, UserCog, Store, ArrowLeft, CheckCircle2 
} from 'lucide-react';

function Login({ onLogin = () => {}, onBack }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Datos de usuario (Lógica original mantenida)
  const usuariosDemo = [
    {
      email: 'admin@Electronica Andy.com',
      password: 'admin123',
      nombre: 'Juan Pérez',
      rol: 'Administrador',
      permisos: { dashboard: true, pos: true, inventario: true, reportes: true, usuarios: true, configuracion: true }
    },
    {
      email: 'supervisor@Electronica Andy.com',
      password: 'super123',
      nombre: 'María García',
      rol: 'Supervisor',
      permisos: { dashboard: true, pos: true, inventario: true, reportes: true, usuarios: false, configuracion: false }
    },
    {
      email: 'vendedor@Electronica Andy.com',
      password: 'vende123',
      nombre: 'Carlos López',
      rol: 'Vendedor',
      permisos: { dashboard: true, pos: true, inventario: true, reportes: false, usuarios: false, configuracion: false }
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
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
        setError('Credenciales incorrectas. Intenta con las cuentas demo.');
        setLoading(false);
      }
    }, 800);
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password });
    // Pequeño delay visual para que se vea el llenado
    setTimeout(() => {
        handleSubmit();
    }, 100);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 font-sans text-slate-800 bg-cover bg-center relative"
      style={{ 
        // 1. AQUÍ VA LA URL DE TU IMAGEN DE FONDO
        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      {/* 2. OVERLAY: Capa negra semitransparente para oscurecer la imagen y que resalte el login */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-0"></div>

      {/* 3. CARD PRINCIPAL: Agregamos 'relative z-10' para que flote sobre el fondo */}
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row min-h-[650px] relative z-10 transition-all hover:shadow-slate-300/50">
        
        {/* PANEL IZQUIERDO - DECORATIVO (Mantenemos el diseño oscuro para contraste) */}
        <div className="relative lg:w-5/12 bg-slate-900 p-12 flex flex-col justify-between overflow-hidden text-white">
          
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-[1px]"></div>

          {/* Contenido */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Electronica Andy</span>
            </div>

            <h1 className="text-4xl font-black leading-tight mb-6">
              Gestiona tu negocio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-pink-400">
                sin límites.
              </span>
            </h1>
            
            <p className="text-slate-400 leading-relaxed mb-8">
              Accede al panel de administración para controlar inventario, ventas y métricas en tiempo real.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-sm font-medium">Control de Stock en vivo</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                <span className="text-sm font-medium">Reportes Inteligentes</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs text-slate-500 mt-8">
            © 2024 ElectronicAndy System v2.0
          </div>
        </div>

        {/* PANEL DERECHO - FORMULARIO (Fondo blanco translúcido) */}
        <div className="flex-1 p-8 lg:p-16 bg-white/50 flex flex-col justify-center relative">

           {/* El resto del formulario sigue igual que antes... */}
           {/* --- AQUÍ ESTÁ EL BOTÓN DE VOLVER --- */}
          {onBack && (
            <button 
                onClick={onBack}
                className="absolute top-8 right-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-600 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                Volver a tienda
              </button>
            )}
          {/* ------------------------------------ */}
           {/* ... (Botón volver, Inputs, etc.) ... */}
           
           {/* Solo asegúrate de copiar el contenido interior del formulario que te pasé antes aquí */}
           
           {/* COPIA AQUÍ EL CONTENIDO INTERNO DEL PANEL DERECHO DEL CÓDIGO ANTERIOR */}
           {onBack && (
            <button 
              onClick={onBack}
              className="absolute top-8 right-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              Volver a tienda
            </button>
          )}


          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido de nuevo</h2>
              <p className="text-slate-500">Ingresa tus credenciales para acceder.</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Corporativo</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@empresa.com"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Contraseña</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pink-500 focus:ring-pink-500 cursor-pointer" />
                  <span className="text-slate-500 group-hover:text-slate-700 transition-colors">Recordarme</span>
                </label>
                <a href="#" className="font-semibold text-sky-600 hover:text-sky-700 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>Iniciando Sesión</>
                )}
              </button>
            </form>

            {/* SECCIÓN DEMO */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Acceso Rápido (Modo Demo)</p>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin@Electronica Andy.com', 'admin123')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all group"
                >
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-full group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-purple-700">Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('supervisor@Electronica Andy.com', 'super123')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all group"
                >
                  <div className="p-2 bg-sky-100 text-sky-600 rounded-full group-hover:scale-110 transition-transform">
                    <UserCog className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-sky-700">Supervisor</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('vendedor@Electronica Andy.com', 'vende123')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50 transition-all group"
                >
                  <div className="p-2 bg-pink-100 text-pink-600 rounded-full group-hover:scale-110 transition-transform">
                    <Store className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-pink-700">Vendedor</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;