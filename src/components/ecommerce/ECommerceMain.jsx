import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, Search, X, MessageCircle, 
  Plus, Minus, Trash2, LogIn, 
  Zap, Star, Filter, ArrowRight,
  Facebook, Instagram, Twitter, MapPin, Mail, Phone, User, Truck
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

  // Obtener categorías
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  // === HELPER DE PRECIO SEGURO (Tu lógica antigua) ===
  const getPrecio = (p) => {
    // Prioriza 'precio', luego 'precioVenta', o devuelve 0
    return parseFloat(p.precio || p.precioVenta || 0);
  };

  // Filtrado y Ordenamiento
  const productosFiltrados = useMemo(() => {
    let prods = productos.filter(p => {
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoriaFiltro === 'Todos' || p.categoria === categoriaFiltro;
      const matchStock = p.stock > 0;
      return matchBusqueda && matchCategoria && matchStock;
    });

    switch (ordenar) {
      case 'precio-asc': prods.sort((a, b) => getPrecio(a) - getPrecio(b)); break;
      case 'precio-desc': prods.sort((a, b) => getPrecio(b) - getPrecio(a)); break;
      case 'nombre': prods.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      default: break;
    }
    return prods;
  }, [productos, busqueda, categoriaFiltro, ordenar]);

  // Carrito: Lógica
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

  // Cálculos de Totales y Envío
  const totalActual = carrito.reduce((sum, item) => sum + (getPrecio(item) * item.cantidad), 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  
  const META_ENVIO_GRATIS = 200;
  const porcentajeEnvio = Math.min((totalActual / META_ENVIO_GRATIS) * 100, 100);
  const faltaParaEnvio = Math.max(META_ENVIO_GRATIS - totalActual, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;
    let mensaje = '👋 *Hola Electronica Andy, quiero realizar el siguiente pedido:*%0A%0A';
    carrito.forEach((item) => {
      const precioUnit = getPrecio(item);
      mensaje += `▪️ ${item.cantidad}x *${item.nombre}* (S/ ${precioUnit.toFixed(2)}) → S/ ${(precioUnit * item.cantidad).toFixed(2)}%0A`;
    });
    mensaje += `%0A💰 *Subtotal: S/ ${totalActual.toFixed(2)}*%0A`;
    if(totalActual >= META_ENVIO_GRATIS) {
        mensaje += `🚚 *¡Envío Gratis Aplicado!*%0A`;
    } else {
        mensaje += `📦 *Envío: Por calcular*%0A`;
    }
    mensaje += `====================%0A*TOTAL A PAGAR: S/ ${totalActual.toFixed(2)}*%0A====================%0A%0A📍 *Dirección de envío:* (Indicar aquí)`;
    
    window.open(`https://wa.me/51957123815?text=${mensaje}`, '_blank');
  };

  return (
    <div 
      className="min-h-screen font-sans text-slate-800 bg-fixed bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/40 border-b border-white/10 shadow-lg transition-all duration-300 text-white">
          <div className="bg-gradient-to-r from-sky-600/90 to-pink-600/90 text-white py-1.5 px-4 text-[10px] sm:text-xs font-medium text-center tracking-wide backdrop-blur-sm">
            🚀 Envíos gratis por compras mayores a S/ {META_ENVIO_GRATIS}.00
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center py-4 md:h-24 gap-4 md:gap-8">
              <div className="flex justify-between items-center w-full md:w-auto">
                <div className="flex items-center gap-3 shrink-0 cursor-pointer group">
                  <div className="relative w-10 h-10 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300 group-hover:scale-105">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                    Electronica Andy
                  </h1>
                </div>
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={onLogin} className="p-2 text-slate-300 hover:text-white"><User className="w-5 h-5" /></button>
                    <button onClick={() => setMostrarCarrito(true)} className="relative p-2 bg-white/10 rounded-full">
                        <ShoppingCart className="w-5 h-5 text-white" />
                        {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                            {totalItems}
                        </span>
                        )}
                    </button>
                </div>
              </div>

              <div className="w-full md:flex-1 md:max-w-xl relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-300 group-focus-within:text-pink-400 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder-slate-300 focus:ring-2 focus:ring-pink-500/50 focus:bg-white/20 transition-all shadow-inner backdrop-blur-md outline-none"
                  placeholder="Buscar componentes..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <div className="hidden md:flex items-center gap-4">
                <button onClick={onLogin} className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
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
          <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar mask-fade-sides pb-2">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`whitespace-nowrap px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
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

        {/* HERO */}
        {!busqueda && categoriaFiltro === 'Todos' && (
          <div className="relative overflow-hidden mb-8 border-b border-white/10 bg-slate-900/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-12 sm:py-24 relative z-10 text-center sm:text-left">
              <h2 className="text-3xl sm:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-xl leading-tight">
                Tecnología <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-pink-300">
                  Al Siguiente Nivel
                </span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-200 mb-8 max-w-2xl drop-shadow-md mx-auto sm:mx-0">
                Encuentra los componentes electrónicos, arduinos y gadgets que necesitas para tus proyectos. Calidad garantizada.
              </p>
              <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Ver Ofertas
              </button>
            </div>
          </div>
        )}

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-4 pb-20 pt-6 flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                {categoriaFiltro === 'Todos' ? 'Destacados' : categoriaFiltro}
                <span className="text-sm font-normal text-slate-300 bg-white/10 px-2 py-1 rounded-md ml-2 border border-white/10">
                  {productosFiltrados.length} items
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 shadow-sm w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-300" />
              <select 
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
                className="bg-transparent border-none text-sm font-medium text-white focus:ring-0 cursor-pointer outline-none w-full [&>option]:text-slate-900"
              >
                <option value="destacado">Destacados</option>
                <option value="precio-asc">Menor Precio</option>
                <option value="precio-desc">Mayor Precio</option>
              </select>
            </div>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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

        {/* FOOTER */}
        <footer className="mt-auto bg-black/40 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 text-sm text-slate-300">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg">Electronica Andy</h4>
              </div>
              <p className="opacity-70 leading-relaxed text-slate-400">
                Tu tienda de confianza para componentes electrónicos.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contáctanos</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>Av. Garcilaso de la Vega 1234, Lima</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>+51 957 123 815</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>ventas@electronicaandy.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-600 flex items-center justify-center transition-all hover:-translate-y-1 text-white"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all hover:-translate-y-1 text-white"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-400 flex items-center justify-center transition-all hover:-translate-y-1 text-white"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center opacity-50 text-xs">
            &copy; {new Date().getFullYear()} Electronica Andy. Todos los derechos reservados.
          </div>
        </footer>

        {/* === DRAWER CARRITO DETALLADO (Diseño "tipo así") === */}
        {mostrarCarrito && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMostrarCarrito(false)}
            />
            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right border-l border-white/20">
              
              {/* Header Carrito */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between z-10 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-full">
                    <ShoppingCart className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Tu Carrito</h3>
                    <p className="text-xs text-slate-500">{totalItems} productos</p>
                  </div>
                </div>
                <button onClick={() => setMostrarCarrito(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Barra de Envío Gratis */}
              <div className="px-5 py-4 bg-sky-50 border-b border-sky-100">
                <div className="flex justify-between text-xs font-bold text-sky-700 mb-2">
                  <span>{faltaParaEnvio > 0 ? `Falta S/ ${faltaParaEnvio.toFixed(2)} para envío gratis` : '¡Tienes envío gratis!'}</span>
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3"/> {Math.round(porcentajeEnvio)}%</span>
                </div>
                <div className="w-full bg-sky-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${porcentajeEnvio >= 100 ? 'bg-green-500' : 'bg-sky-500'}`}
                    style={{ width: `${porcentajeEnvio}%` }}
                  ></div>
                </div>
              </div>

              {/* Lista de Items Detallada */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                {carrito.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-10 h-10 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium text-slate-600">Tu carrito está vacío</p>
                  </div>
                ) : (
                  carrito.map(item => {
                    const precioUnit = getPrecio(item);
                    return (
                      <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex gap-3 group transition-all hover:shadow-md hover:border-sky-200">
                        {/* Imagen */}
                        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 p-1">
                          <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        
                        {/* Detalles */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">{item.categoria}</p>
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-tight">{item.nombre}</h4>
                          </div>
                          
                          <div className="flex items-end justify-between mt-2">
                            {/* Control Cantidad */}
                            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-200">
                              <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-sky-600 transition-colors"><Minus className="w-3 h-3" /></button>
                              <span className="text-xs font-bold w-4 text-center">{item.cantidad}</span>
                              <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-sky-600 transition-colors"><Plus className="w-3 h-3" /></button>
                            </div>
                            
                            {/* Precio Desglosado */}
                            <div className="text-right">
                              <p className="text-[10px] text-slate-400">S/ {precioUnit.toFixed(2)} x {item.cantidad}</p>
                              <p className="font-bold text-sky-600 text-base">S/ {(precioUnit * item.cantidad).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Eliminar */}
                        <button onClick={() => eliminarDelCarrito(item.id)} className="self-start -mt-1 -mr-1 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Footer Resumen */}
              {carrito.length > 0 && (
                <div className="border-t border-slate-100 bg-white p-6 space-y-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 mb-3">Resumen del Pedido</h4>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>S/ {totalActual.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Costo de Envío</span>
                      <span>{totalActual >= META_ENVIO_GRATIS ? 'GRATIS' : 'Por calcular'}</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-dashed border-slate-200">
                      <span>Total</span>
                      <span>S/ {totalActual.toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={enviarAWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1fae53] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 transform active:scale-[0.98] transition-all">
                    <MessageCircle className="w-5 h-5" /> Completar pedido por WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// TARJETA DE PRODUCTO SEGURA
function ProductoCard({ producto, onAgregar }) {
  const [agregado, setAgregado] = useState(false);
  const handleAgregar = () => { onAgregar(producto); setAgregado(true); setTimeout(() => setAgregado(false), 1500); };
  
  const stock = producto.stock || 0;
  const isStockLow = stock > 0 && stock < 5;
  const isOutOfStock = stock === 0;

  // 🛡️ CORRECCIÓN PRECIOS (Usa p.precio primero)
  const precio = parseFloat(producto.precio || producto.precioVenta || 0);
  const precioDisplay = isNaN(precio) ? '0.00' : precio.toFixed(2);

  return (
    <div className="group bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden relative">
      {isStockLow && (
        <div className="absolute top-3 left-3 bg-amber-100/90 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-20 flex items-center gap-1 border border-amber-200">
          <Zap className="w-3 h-3 fill-amber-500 text-amber-500" /> ¡Quedan {stock}!
        </div>
      )}
      <div className="relative aspect-square overflow-hidden bg-white p-6 rounded-t-xl">
        <img src={producto.imagen} alt={producto.nombre} className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-50' : ''}`} />
        {isOutOfStock && <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 backdrop-blur-[2px]"><span className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm transform -rotate-6">AGOTADO</span></div>}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-auto">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{producto.categoria}</p>
          <h3 className="font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">{producto.nombre}</h3>
          <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200/60">
          <div className="flex flex-col"><span className="text-xs text-slate-500 font-medium">Precio</span><span className="text-xl font-black text-slate-900">S/ {precioDisplay}</span></div>
          <button onClick={handleAgregar} disabled={isOutOfStock} className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isOutOfStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : agregado ? 'bg-green-500 text-white shadow-green-500/30 shadow-lg' : 'bg-slate-900 text-white hover:bg-sky-600 shadow-lg hover:shadow-sky-500/30'}`}>
            {agregado ? <>Agregado <ArrowRight className="w-4 h-4" /></> : <><ShoppingCart className="w-4 h-4" /> Comprar</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ECommerceMain;