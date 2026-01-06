import React, { useState } from 'react';
import { ShoppingCart, Search, X, Menu } from 'lucide-react';
import { useProductos } from '../../context/ProductosContext';
import ProductoSelector from './ProductoSelector';
import CarritoPanel from './CarritoPanel';
import PagoModal from './PagoModal';
import TicketModal from './TicketModal';

function POSMain() {
  const { obtenerProductosDisponibles, actualizarStock } = useProductos();
  const productos = obtenerProductosDisponibles();
  
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ventaCompletada, setVentaCompletada] = useState(null);
  const [showCarritoMobile, setShowCarritoMobile] = useState(false);

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.id.toLowerCase().includes(busqueda.toLowerCase())
  ).filter(p => p.stock > 0);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      if (itemExistente.cantidad >= producto.stock) {
        alert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`);
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
    
    // En móviles, mostrar el carrito al agregar
    if (window.innerWidth < 768) {
      setShowCarritoMobile(true);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const producto = productos.find(p => p.id === id);
    
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    
    if (nuevaCantidad > producto.stock) {
      alert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`);
      return;
    }
    
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const limpiarCarrito = () => {
    if (carrito.length > 0) {
      if (window.confirm('¿Estás seguro de limpiar el carrito?')) {
        setCarrito([]);
      }
    }
  };

  const calcularSubtotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const calcularIGV = (subtotal) => {
    return subtotal * 0.18;
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const igv = calcularIGV(subtotal);
    return subtotal + igv;
  };

  const procesarPago = (datosVenta) => {
    const venta = {
      id: `VTA-${Date.now()}`,
      fecha: new Date(),
      items: carrito,
      subtotal: calcularSubtotal(),
      igv: calcularIGV(calcularSubtotal()),
      total: calcularTotal(),
      ...datosVenta
    };

    carrito.forEach(item => {
      actualizarStock(item.id, item.cantidad);
    });

    setVentaCompletada(venta);
    setShowPagoModal(false);
    setShowTicketModal(true);
    setCarrito([]);
    setShowCarritoMobile(false);
  };

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">Punto de Venta</h2>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Sistema POS</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-sky-100 px-3 py-1.5 rounded-lg hidden sm:block">
              <p className="text-xs sm:text-sm text-sky-500 font-medium">
                Items: <span className="text-base sm:text-lg font-bold">{totalItems}</span>
              </p>
            </div>
            
            <button
              onClick={() => setShowCarritoMobile(true)}
              className="md:hidden relative p-2.5 bg-sky-300 text-white rounded-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={limpiarCarrito}
              disabled={carrito.length === 0}
              className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel de Productos */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Búsqueda */}
          <div className="p-3 sm:p-6 bg-white border-b border-gray-200 flex-shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm sm:text-base"
                autoFocus
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
            <ProductoSelector
              productos={productosFiltrados}
              onSelectProducto={agregarAlCarrito}
              busqueda={busqueda}
            />
          </div>
        </div>

        {/* Panel del Carrito - Desktop */}
        <div className="hidden md:flex w-96 border-l border-gray-200 bg-white flex-col">
          <CarritoPanel
            carrito={carrito}
            onActualizarCantidad={actualizarCantidad}
            onEliminar={eliminarDelCarrito}
            subtotal={calcularSubtotal()}
            igv={calcularIGV(calcularSubtotal())}
            total={calcularTotal()}
            onProcederPago={() => setShowPagoModal(true)}
          />
        </div>
      </div>

      {/* Carrito Drawer - Mobile */}
      {showCarritoMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCarritoMobile(false)}
          />
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <CarritoPanel
              carrito={carrito}
              onActualizarCantidad={actualizarCantidad}
              onEliminar={eliminarDelCarrito}
              subtotal={calcularSubtotal()}
              igv={calcularIGV(calcularSubtotal())}
              total={calcularTotal()}
              onProcederPago={() => {
                setShowCarritoMobile(false);
                setShowPagoModal(true);
              }}
              onClose={() => setShowCarritoMobile(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* FAB - Mobile (solo cuando hay items) */}
      {!showCarritoMobile && carrito.length > 0 && (
        <button
          onClick={() => setShowCarritoMobile(true)}
          className="md:hidden fixed bottom-6 right-6 bg-sky-300 text-white p-4 rounded-full shadow-lg flex items-center gap-3 z-40 animate-bounce-slow"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium">{totalItems} items</span>
            <span className="text-sm font-bold">S/ {calcularTotal().toFixed(2)}</span>
          </div>
        </button>
      )}

      {/* Modal de Pago */}
      {showPagoModal && (
        <PagoModal
          total={calcularTotal()}
          onClose={() => setShowPagoModal(false)}
          onConfirmar={procesarPago}
        />
      )}

      {/* Modal de Ticket */}
      {showTicketModal && ventaCompletada && (
        <TicketModal
          venta={ventaCompletada}
          onClose={() => {
            setShowTicketModal(false);
            setVentaCompletada(null);
          }}
        />
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default POSMain;