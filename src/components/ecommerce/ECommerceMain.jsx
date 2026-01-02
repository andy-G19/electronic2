import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, Search, X, MessageCircle, 
  Plus, Minus, Trash2, LogIn, 
  Zap, Star, Filter, ArrowRight,
  Facebook, Instagram, Twitter, MapPin, Mail, Phone
} from 'lucide-react';

// Importar datos desde tu contexto
import { useProductos } from '../../context/ProductosContext';

function ECommerceMain({ onLogin }) {
  const { productos } = useProductos();
  
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [ordenar, setOrdenar] = useState('destacado');
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = useMemo(() => {
    let prods = productos.filter(p => {
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoriaFiltro === 'Todos' || p.categoria === categoriaFiltro;
      const matchStock = p.stock > 0;
      return matchBusqueda && matchCategoria && matchStock;
    });

    switch (ordenar) {
      case 'precio-asc': prods.sort((a, b) => a.precio - b.precio); break;
      case 'precio-desc': prods.sort((a, b) => b.precio - a.precio); break;
      case 'nombre': prods.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      default: break;
    }
    return prods;
  }, [productos, busqueda, categoriaFiltro, ordenar]);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      if (itemExistente.cantidad >= producto.stock) {
        alert(`Solo quedan ${producto.stock} unidades`);
        return;
      }
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setMostrarCarrito(true);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) { eliminarDelCarrito(id); return; }
    const producto = productos.find(p => p.id === id);
    if (nuevaCantidad > producto.stock) { alert(`Stock máximo alcanzado`); return; }
    setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item));
  };

  const eliminarDelCarrito = (id) => setCarrito(carrito.filter(item => item.id !== id));
  const calcularTotal = () => carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;
    let mensaje = '👋 *Hola Electronica Andy, quiero realizar el siguiente pedido:*%0A%0A';
    carrito.forEach((item) => {
      mensaje += `▪️ ${item.cantidad}x *${item.nombre}* - S/ ${(item.precio * item.cantidad).toFixed(2)}%0A`;
    });
    mensaje += `%0A💰 *Total a pagar: S/ ${calcularTotal().toFixed(2)}*%0A%0A📍 *Dirección de envío:* (Indicar aquí)`;
    window.open(`https://wa.me/51957123815?text=${mensaje}`, '_blank');
  };

  return (
    // FONDO GLOBAL CON IMAGEN Y OVERLAY
    <div 
      className="min-h-screen font-sans text-slate-800 bg-fixed bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      {/* OVERLAY OSCURO */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] z-0 pointer-events-none"></div>

      {/* WRAPPER PRINCIPAL */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* === HEADER === */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/40 border-b border-white/10 shadow-lg transition-all duration-300 text-white">
          <div className="bg-gradient-to-r from-sky-600/90 to-pink-600/90 text-white py-1.5 px-4 text-xs font-medium text-center tracking-wide backdrop-blur-sm">
            🚀 Envíos gratis por compras mayores a S/ 200.00
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20 gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3 shrink-0 cursor-pointer group">
                <div className="relative w-10 h-10 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300 group-hover:scale-105">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-black bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                    Electronica Andy
                  </h1>
                </div>
              </div>
              {/* Buscador */}
              <div className="hidden md:flex flex-1 max-w-xl relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-300 group-focus-within:text-pink-400 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder-slate-300 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/20 transition-all shadow-inner backdrop-blur-md"
                  placeholder="¿Qué componentes buscas hoy?"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              {/* Botones */}
              <div className="flex items-center gap-4">
                <button onClick={onLogin} className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
                  <LogIn className="w-4 h-4" /> Staff
                </button>
                <button onClick={() => setMostrarCarrito(true)} className="relative p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all hover:shadow-md group">
                  <ShoppingCart className="w-5 h-5 text-white group-hover:text-pink-300 transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm animate-bounce-short">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Categorías */}
          <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar mask-fade-sides">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`whitespace-nowrap px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    categoriaFiltro === cat
                      ? 'bg-white text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* === HERO SECTION === */}
        {!busqueda && categoriaFiltro === 'Todos' && (
          <div className="relative overflow-hidden mb-8 border-b border-white/10 bg-slate-900/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 relative z-10 text-center sm:text-left">
              <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-xl">
                Tecnología <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-pink-300">
                  Al Siguiente Nivel
                </span>
              </h2>
              <p className="text-lg text-slate-200 mb-8 max-w-2xl drop-shadow-md">
                Encuentra los componentes electrónicos, arduinos y gadgets que necesitas para tus proyectos. Calidad garantizada.
              </p>
              <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Ver Ofertas
              </button>
            </div>
          </div>
        )}

        {/* === CONTENIDO PRINCIPAL === */}
        <main className="max-w-7xl mx-auto px-4 pb-20 pt-6 flex-1 w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                {categoriaFiltro === 'Todos' ? 'Destacados' : categoriaFiltro}
                <span className="text-sm font-normal text-slate-300 bg-white/10 px-2 py-1 rounded-md ml-2 border border-white/10">
                  {productosFiltrados.length} items
                </span>
              </h3>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 shadow-sm">
              <Filter className="w-4 h-4 text-slate-300" />
              <select 
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
                className="bg-transparent border-none text-sm font-medium text-white focus:ring-0 cursor-pointer outline-none [&>option]:text-slate-900"
              >
                <option value="destacado">Destacados</option>
                <option value="precio-asc">Menor Precio</option>
                <option value="precio-desc">Mayor Precio</option>
                <option value="nombre">Nombre (A-Z)</option>
              </select>
            </div>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {productosFiltrados.map(producto => (
                <ProductoCard key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/10 backdrop-blur-md rounded-3xl border border-dashed border-white/30 text-white">
              <Search className="w-16 h-16 text-slate-400 mx-auto mb-4 opacity-50" />
              <p className="text-lg opacity-80">No encontramos productos con esa búsqueda.</p>
              <button onClick={() => {setBusqueda(''); setCategoriaFiltro('Todos')}} className="mt-4 text-pink-300 font-medium hover:underline">
                Limpiar filtros
              </button>
            </div>
          )}
        </main>

        {/* === FOOTER (NUEVO) === */}
        <footer className="mt-auto bg-black/40 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 text-sm text-slate-300">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Col 1: Marca */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg">Electronica Andy</h4>
              </div>
              <p className="opacity-70 leading-relaxed text-slate-400">
                Tu tienda de confianza para componentes electrónicos, robótica e innovación. Calidad y soporte garantizado.
              </p>
            </div>

            {/* Col 2: Enlaces */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Navegación</h4>
              <ul className="space-y-3">
                <li><button onClick={() => {setBusqueda(''); setCategoriaFiltro('Todos')}} className="hover:text-pink-400 transition-colors flex items-center gap-2">Inicio</button></li>
                <li><button className="hover:text-pink-400 transition-colors flex items-center gap-2">Catálogo Completo</button></li>
                <li><button className="hover:text-pink-400 transition-colors flex items-center gap-2">Ofertas del Mes</button></li>
                <li><button onClick={onLogin} className="hover:text-sky-400 transition-colors flex items-center gap-2">Acceso Administrativo</button></li>
              </ul>
            </div>

            {/* Col 3: Contacto */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contáctanos</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>Av. Garcilaso de la Vega 1234, Centro de Lima, Perú</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>+51 957 123 815</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>ventas@Electronica Andy.com</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Social */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-600 flex items-center justify-center transition-all hover:-translate-y-1 text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all hover:-translate-y-1 text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-400 flex items-center justify-center transition-all hover:-translate-y-1 text-white">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 mb-2">Suscríbete a nuestro boletín</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="bg-black/30 w-full rounded-lg px-3 py-1 text-sm border border-white/10 focus:outline-none focus:border-sky-500" />
                  <button className="bg-sky-600 px-3 py-1 rounded-lg text-white text-xs hover:bg-sky-500">OK</button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="opacity-50 text-xs">
              &copy; {new Date().getFullYear()} Electronica Andy Technology. Todos los derechos reservados.
            </p>
          </div>
        </footer>

        {/* === DRAWER DEL CARRITO === */}
        {mostrarCarrito && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMostrarCarrito(false)}
            />
            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right border-l border-white/20">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-full">
                    <ShoppingCart className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Tu Carrito</h3>
                </div>
                <button onClick={() => setMostrarCarrito(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {carrito.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-10 h-10 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium">Tu carrito está vacío</p>
                  </div>
                ) : (
                  carrito.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 bg-white rounded-xl border border-slate-200 overflow-hidden shrink-0 p-2">
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-2 leading-tight mb-1">{item.nombre}</h4>
                          <p className="text-sm text-slate-500">Unitario: S/ {item.precio.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1">
                            <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="p-1 hover:text-sky-600"><Minus className="w-3 h-3" /></button>
                            <span className="text-sm font-bold w-4 text-center">{item.cantidad}</span>
                            <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="p-1 hover:text-sky-600"><Plus className="w-3 h-3" /></button>
                          </div>
                          <p className="font-bold text-sky-600">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                        </div>
                      </div>
                      <button onClick={() => eliminarDelCarrito(item.id)} className="self-start text-slate-300 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))
                )}
              </div>
              {carrito.length > 0 && (
                <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xl font-black text-slate-900">
                      <span>Total</span>
                      <span>S/ {calcularTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={enviarAWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1fae53] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 transform active:scale-95 transition-all">
                    <MessageCircle className="w-5 h-5" /> Completar pedido por WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAB WHATSAPP */}
        {!mostrarCarrito && carrito.length > 0 && (
          <button onClick={() => setMostrarCarrito(true)} className="fixed bottom-8 right-8 bg-white text-slate-900 p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform z-40 flex items-center gap-2 group animate-bounce-slow">
            <ShoppingCart className="w-6 h-6 text-pink-500" />
            <span className="font-bold pr-1">S/ {calcularTotal().toFixed(2)}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// TARJETA DE PRODUCTO (Sin cambios funcionales, solo visuales para fondo oscuro)
function ProductoCard({ producto, onAgregar }) {
  const [agregado, setAgregado] = useState(false);
  const handleAgregar = () => { onAgregar(producto); setAgregado(true); setTimeout(() => setAgregado(false), 1500); };
  const isStockLow = producto.stock > 0 && producto.stock < 5;
  const isOutOfStock = producto.stock === 0;

  return (
    <div className="group bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden relative">
      {isStockLow && (
        <div className="absolute top-3 left-3 bg-amber-100/90 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-20 flex items-center gap-1 border border-amber-200">
          <Zap className="w-3 h-3 fill-amber-500 text-amber-500" /> ¡Quedan {producto.stock}!
        </div>
      )}
      <div className="relative aspect-square overflow-hidden bg-white p-6 rounded-t-xl">
        <img src={producto.imagen} alt={producto.nombre} className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-50' : ''}`} />
        {isOutOfStock && <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 backdrop-blur-[2px]"><span className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm transform -rotate-6">AGOTADO</span></div>}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-auto">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{producto.categoria}</p>
          <h3 className="font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-sky-600 transition-colors">{producto.nombre}</h3>
          <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200/60">
          <div className="flex flex-col"><span className="text-xs text-slate-500 font-medium">Precio</span><span className="text-xl font-black text-slate-900">S/ {producto.precio.toFixed(2)}</span></div>
          <button onClick={handleAgregar} disabled={isOutOfStock} className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isOutOfStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : agregado ? 'bg-green-500 text-white shadow-green-500/30 shadow-lg' : 'bg-slate-900 text-white hover:bg-sky-600 shadow-lg hover:shadow-sky-500/30'}`}>
            {agregado ? <>Agregado <ArrowRight className="w-4 h-4" /></> : <><ShoppingCart className="w-4 h-4" /> Comprar</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ECommerceMain;