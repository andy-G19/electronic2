import React, { useState } from 'react';
import { ShoppingCart, Search, X, Plus, Minus, Trash2, DollarSign, Receipt } from 'lucide-react';
import ProductoSelector from './ProductoSelector';
import CarritoPanel from './CarritoPanel';
import PagoModal from './PagoModal';
import TicketModal from './TicketModal';

function POSMain() {
  // Productos disponibles (en producción vendrían del inventario)
  const [productos] = useState([
    { 
      id: 'PROD-001', 
      nombre: 'Audífonos Bluetooth X1', 
      categoria: 'Audio',
      precio: 35.00, 
      stock: 12,
      imagen: null
    },
    { 
      id: 'PROD-002', 
      nombre: 'Smartwatch Series 5', 
      categoria: 'Wearables',
      precio: 120.00, 
      stock: 3,
      imagen: null
    },
    { 
      id: 'PROD-003', 
      nombre: 'Teclado Mecánico RGB', 
      categoria: 'Accesorios',
      precio: 65.00, 
      stock: 8,
      imagen: null
    },
    { 
      id: 'PROD-004', 
      nombre: 'Mouse Inalámbrico Pro', 
      categoria: 'Accesorios',
      precio: 28.00, 
      stock: 15,
      imagen: null
    },
    { 
      id: 'PROD-005', 
      nombre: 'Cargador USB-C 65W', 
      categoria: 'Accesorios',
      precio: 25.00, 
      stock: 4,
      imagen: null
    },
    { 
      id: 'PROD-006', 
      nombre: 'Funda Tablet 10"', 
      categoria: 'Accesorios',
      precio: 20.00, 
      stock: 0,
      imagen: null
    },
  ]);

  // Estado del carrito
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ventaCompletada, setVentaCompletada] = useState(null);

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.id.toLowerCase().includes(busqueda.toLowerCase())
  ).filter(p => p.stock > 0); // Solo mostrar productos con stock

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      // Verificar stock disponible
      if (itemExistente.cantidad >= producto.stock) {
        alert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`);
        return;
      }
      // Incrementar cantidad
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Agregar nuevo item
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Actualizar cantidad en carrito
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

  // Eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  // Limpiar carrito
  const limpiarCarrito = () => {
    if (carrito.length > 0) {
      if (window.confirm('¿Estás seguro de limpiar el carrito?')) {
        setCarrito([]);
      }
    }
  };

  // Calcular totales
  const calcularSubtotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const calcularIGV = (subtotal) => {
    return subtotal * 0.18; // 18% IGV en Perú
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const igv = calcularIGV(subtotal);
    return subtotal + igv;
  };

  // Procesar pago
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

    setVentaCompletada(venta);
    setShowPagoModal(false);
    setShowTicketModal(true);
    setCarrito([]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Punto de Venta (POS)</h2>
            <p className="text-gray-500 mt-1">Realiza ventas rápidas y eficientes</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 px-4 py-2 rounded-lg">
              <p className="text-sm text-indigo-700 font-medium">
                Items: <span className="text-lg font-bold">{carrito.length}</span>
              </p>
            </div>
            <button
              onClick={limpiarCarrito}
              disabled={carrito.length === 0}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel de Productos */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Búsqueda */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto por nombre o código..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                autoFocus
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <ProductoSelector
              productos={productosFiltrados}
              onSelectProducto={agregarAlCarrito}
              busqueda={busqueda}
            />
          </div>
        </div>

        {/* Panel del Carrito */}
        <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
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
    </div>
  );
}

export default POSMain;