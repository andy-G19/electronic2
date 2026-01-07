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

  // Datos de usuario (Originales)
  const usuariosDemo = [
    {
      email: 'andyg123@elec.com',
      password: 'admin123',
      nombre: 'Anderson Godoy',
      rol: 'Administrador',
      permisos: { dashboard: true, pos: true, inventario: true, reportes: true, usuarios: true, configuracion: true }
    },
    {
      email: 'supervisor@elec.com',
      password: 'super123',
      nombre: 'María García',
      rol: 'Supervisor',
      permisos: { dashboard: true, pos: true, inventario: true, reportes: true, usuarios: false, configuracion: false }
    },
    {
      email: 'vendedor@elec.com',
      password: 'vende123',
      nombre: 'Juan Pérez',
      rol: 'Vendedor',
      permisos: { dashboard: true, pos: true, inventario: true, reportes: false, usuarios: false, configuracion: false }
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const usuarioEncontrado = usuariosDemo.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (usuarioEncontrado) {
        onLogin(usuarioEncontrado);
      } else {
        setError('Credenciales inválidas. Por favor verifique.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* === SECCIÓN IZQUIERDA (Formulario) === */}
      {/* w-full en móvil para ocupar todo, lg:w-1/2 en escritorio */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 relative bg-white">
        
        {/* Botón Volver */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all flex items-center gap-2 group z-10"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-sm font-medium">Volver a la tienda</span>
        </button>

        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 shadow-xl shadow-sky-200 mb-6 transform hover:scale-105 transition-transform duration-300">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bienvenido</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Ingresa a tu panel de control administrativo
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white"
                    placeholder="nombre@empresa.com"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Contraseña
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex gap-3 items-start animate-fade-in">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-sky-500/30 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            {/* Accesos Rápidos (Demo) */}
            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-400 font-bold uppercase text-xs tracking-wider">
                    Accesos Rápidos (Demo)
                  </span>
                </div>
              </div>

              {/* GRID RESPONSIVO:
                - Móvil (grid-cols-1): Botones horizontales (icono izq, texto der).
                - Tablet/PC (sm:grid-cols-3): Botones verticales (icono arriba, texto abajo).
              */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Admin */}
                <button
                  type="button"
                  onClick={() => handleDemoLogin('andyg123@elec.com', 'admin123')}
                  className="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white"
                >
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-700">Administrador</p>
                    <p className="text-[10px] text-slate-400 sm:hidden">Acceso total</p>
                  </div>
                </button>

                {/* Supervisor */}
                <button
                  type="button"
                  onClick={() => handleDemoLogin('supervisor@elec.com', 'super123')}
                  className="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all group bg-white"
                >
                  <div className="p-2 bg-sky-100 text-sky-600 rounded-lg group-hover:scale-110 transition-transform shadow-sm">
                    <UserCog className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                     <p className="text-xs font-bold text-slate-700 group-hover:text-sky-700">Supervisor</p>
                     <p className="text-[10px] text-slate-400 sm:hidden">Gestión y reportes</p>
                  </div>
                </button>

                {/* Vendedor */}
                <button
                  type="button"
                  onClick={() => handleDemoLogin('vendedor@elec.com', 'vende123')}
                  className="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50 transition-all group bg-white"
                >
                  <div className="p-2 bg-pink-100 text-pink-600 rounded-lg group-hover:scale-110 transition-transform shadow-sm">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-xs font-bold text-slate-700 group-hover:text-pink-700">Vendedor</p>
                    <p className="text-[10px] text-slate-400 sm:hidden">Ventas e inventario</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === SECCIÓN DERECHA (Decorativa) === */}
      {/* hidden en móvil, block en pantallas grandes (lg) */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-900 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay scale-105 hover:scale-110 transition-transform duration-[20s]"
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
          alt="Electronic Background"
        />
        {/* Gradiente Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-900/40 mix-blend-multiply" />
        
        {/* Contenido Decorativo */}
        <div className="absolute inset-0 flex flex-col justify-between p-20 z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                <Package className="w-6 h-6 text-white" />
             </div>
             <span className="text-white font-bold text-xl tracking-wide drop-shadow-md">Electronica Andy</span>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-black text-white mb-6 leading-tight drop-shadow-xl">
              Gestiona tu negocio de electrónica al <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">máximo nivel</span>.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
              Control total de inventario, punto de venta ágil y reportes en tiempo real. Todo lo que necesitas para crecer, en un solo lugar.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-200 font-medium">Inventario Real</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
                <span className="text-sm text-slate-200 font-medium">Facturación Rápida</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-500 font-medium border-t border-white/10 pt-6">
            © 2024 Electronica Andy System. Versión 2.0
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;