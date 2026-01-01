import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, Search, Menu, X, MessageCircle, 
  Plus, Minus, Trash2, Phone, Mail, MapPin,
  Facebook, Instagram, Twitter, LogIn 
} from 'lucide-react';

// Importar datos desde tu contexto
import { useProductos } from '../../context/ProductosContext';

function ECommerceMain({ onLogin }) {
  const { productos } = useProductos(); // Usar productos reales del context
  
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [ordenar, setOrdenar] = useState('destacado');
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);

  // Obtener categorías únicas de tus productos
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  // Filtrar y ordenar productos
  const productosFiltrados = useMemo(() => {
    let prods = productos.filter(p => {
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoriaFiltro === 'Todos' || p.categoria === categoriaFiltro;
      const matchStock = p.stock > 0; // Solo mostrar productos con stock
      return matchBusqueda && matchCategoria && matchStock;
    });

    switch (ordenar) {
      case 'precio-asc':
        prods.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        prods.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        prods.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        break;
    }

    return prods;
  }, [productos, busqueda, categoriaFiltro, ordenar]);

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      if (itemExistente.cantidad >= producto.stock) {
        alert(`Solo hay ${producto.stock} unidades disponibles`);
        return;
      }
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    
    const producto = productos.find(p => p.id === id);
    if (nuevaCantidad > producto.stock) {
      alert(`Solo hay ${producto.stock} unidades disponibles`);
      return;
    }
    
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // Enviar pedido a WhatsApp
  const enviarAWhatsApp = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    let mensaje = '*🛒 Nuevo Pedido - ElecSales*%0A%0A';
    
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.nombre}*%0A`;
      mensaje += `   Cantidad: ${item.cantidad}%0A`;
      mensaje += `   Precio: S/ ${item.precio.toFixed(2)} c/u%0A`;
      mensaje += `   Subtotal: S/ ${(item.precio * item.cantidad).toFixed(2)}%0A%0A`;
    });

    mensaje += `*Total: S/ ${calcularTotal().toFixed(2)}*%0A%0A`;
    mensaje += '¿Deseo proceder con este pedido?';

    const numeroWhatsApp = '51957123815'; // CAMBIAR POR TU NÚMERO
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER - Ver código completo en el artifact */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="bg-gradient-to-r bg-sky-400 to-pink-500 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +51 987 654 321
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br bg-sky-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">ElecSales</h1>
                <p className="text-xs text-gray-500">Tienda Electrónica</p>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              {/* Botón de Login Admin */}
              <button 
                onClick={onLogin}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r bg-sky-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                <LogIn className="w-5 h-5" />
                Admin
              </button>

              {/* Carrito */}
              <button
                onClick={() => setMostrarCarrito(!mostrarCarrito)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r bg-sky-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navegación por categorías */}
        <nav className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6 overflow-x-auto py-3">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${
                    categoriaFiltro === cat
                      ? 'bg-gradient-to-r bg-sky-500 to-pink-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>
      </main>

      {/* PANEL DEL CARRITO */}
      {mostrarCarrito && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setMostrarCarrito(false)}>
          <div className="bg-white w-full max-w-md h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Carrito ({totalItems})</h3>
              <button onClick={() => setMostrarCarrito(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {carrito.map(item => (
                <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                  <img src={item.imagen || 'https://via.placeholder.com/80'} alt={item.nombre} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.nombre}</h4>
                    <p className="text-sky-400 font-bold">S/ {item.precio.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="w-8 h-8 border rounded-lg">
                        <Minus className="w-4 h-4 mx-auto" />
                      </button>
                      <span className="w-8 text-center">{item.cantidad}</span>
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="w-8 h-8 border rounded-lg">
                        <Plus className="w-4 h-4 mx-auto" />
                      </button>
                      <button onClick={() => eliminarDelCarrito(item.id)} className="ml-auto text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {carrito.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-sky-400">S/ {calcularTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={enviarAWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Comprar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botón flotante WhatsApp */}
      {carrito.length > 0 && !mostrarCarrito && (
        <button
          onClick={enviarAWhatsApp}
          className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all animate-bounce z-40"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

// Componente ProductoCard
function ProductoCard({ producto, onAgregar }) {
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    onAgregar(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative overflow-hidden">
        {producto.estado === 'Stock Bajo' && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            ¡Últimas unidades!
          </div>
        )}
        
        <img
          src={producto.imagen || 'https://via.placeholder.com/400'}
          alt={producto.nombre}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <span className="text-xs text-sky-400 font-medium">{producto.categoria}</span>
        <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{producto.nombre}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-sky-400">
            S/ {producto.precio.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAgregar}
          disabled={producto.stock === 0}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            producto.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : agregado
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r bg-sky-500 to-pink-500 text-white hover:shadow-lg'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {producto.stock === 0 ? 'Agotado' : agregado ? '¡Agregado!' : 'Agregar al Carrito'}
        </button>
        
        {producto.stock > 0 && producto.stock < 5 && (
          <p className="text-xs text-orange-600 text-center mt-2">
            Solo quedan {producto.stock} unidades
          </p>
        )}
      </div>
    </div>
  );
}

export default ECommerceMain;