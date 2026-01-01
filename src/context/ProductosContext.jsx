import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const ProductosContext = createContext();

// Hook personalizado para usar el contexto
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider');
  }
  return context;
};

// Productos iniciales
const productosIniciales = [
  { 
    id: 'PROD-001', 
    nombre: 'Audífonos Bluetooth X1', 
    categoria: 'Audio',
    proveedor: 'AliExpress', 
    stock: 12, 
    stockMinimo: 5,
    precioCompra: 25.00,
    precio: 35.00, 
    estado: 'En Stock',
    descripcion: 'Audífonos inalámbricos con cancelación de ruido',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  { 
    id: 'PROD-002', 
    nombre: 'Smartwatch Series 5', 
    categoria: 'Wearables',
    proveedor: 'Alibaba', 
    stock: 3, 
    stockMinimo: 5,
    precioCompra: 80.00,
    precio: 120.00, 
    estado: 'Stock Bajo',
    descripcion: 'Smartwatch con monitor de salud',
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
  },
  { 
    id: 'PROD-003', 
    nombre: 'Teclado Mecánico RGB', 
    categoria: 'Accesorios',
    proveedor: 'Local', 
    stock: 8, 
    stockMinimo: 3,
    precioCompra: 45.00,
    precio: 65.00, 
    estado: 'En Stock',
    descripcion: 'Teclado mecánico con iluminación RGB',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop'
  },
  { 
    id: 'PROD-004', 
    nombre: 'Funda Tablet 10"', 
    categoria: 'Accesorios',
    proveedor: 'AliExpress', 
    stock: 0, 
    stockMinimo: 5,
    precioCompra: 12.00,
    precio: 20.00, 
    estado: 'Agotado',
    descripcion: 'Funda protectora para tablet de 10 pulgadas',
    imagen: null
  },
  { 
    id: 'PROD-005', 
    nombre: 'Mouse Inalámbrico Pro', 
    categoria: 'Accesorios',
    proveedor: 'Local', 
    stock: 15, 
    stockMinimo: 5,
    precioCompra: 18.00,
    precio: 28.00, 
    estado: 'En Stock',
    descripcion: 'Mouse ergonómico inalámbrico de alta precisión',
    imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop'
  },
  { 
    id: 'PROD-006', 
    nombre: 'Cargador USB-C 65W', 
    categoria: 'Accesorios',
    proveedor: 'AliExpress', 
    stock: 4, 
    stockMinimo: 5,
    precioCompra: 15.00,
    precio: 25.00, 
    estado: 'Stock Bajo',
    descripcion: 'Cargador rápido USB-C de 65W',
    imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop'
  },
];

// Provider del contexto
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    // Intentar cargar desde memoria (en producción sería de una API o base de datos)
    const stored = sessionStorage.getItem('productos');
    return stored ? JSON.parse(stored) : productosIniciales;
  });

  // Guardar en sessionStorage cada vez que cambian los productos
  useEffect(() => {
    sessionStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  // Calcular estado basado en stock
  const calcularEstado = (stock, stockMinimo) => {
    if (stock === 0) return 'Agotado';
    if (stock < stockMinimo) return 'Stock Bajo';
    return 'En Stock';
  };

  // Generar nuevo ID
  const generateNewId = () => {
    if (productos.length === 0) return 'PROD-001';
    const ids = productos.map(p => parseInt(p.id.split('-')[1]));
    const maxId = Math.max(...ids);
    return `PROD-${String(maxId + 1).padStart(3, '0')}`;
  };

  // Agregar producto
  const agregarProducto = (nuevoProducto) => {
    const producto = {
      ...nuevoProducto,
      id: generateNewId(),
      estado: calcularEstado(nuevoProducto.stock, nuevoProducto.stockMinimo)
    };
    setProductos(prev => [...prev, producto]);
    return producto;
  };

  // Actualizar producto
  const actualizarProducto = (id, datosActualizados) => {
    setProductos(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...datosActualizados };
        updated.estado = calcularEstado(updated.stock, updated.stockMinimo);
        return updated;
      }
      return p;
    }));
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  // Actualizar stock (para el POS)
  const actualizarStock = (id, cantidadVendida) => {
    setProductos(prev => prev.map(p => {
      if (p.id === id) {
        const nuevoStock = Math.max(0, p.stock - cantidadVendida);
        return {
          ...p,
          stock: nuevoStock,
          estado: calcularEstado(nuevoStock, p.stockMinimo)
        };
      }
      return p;
    }));
  };

  // Obtener producto por ID
  const obtenerProducto = (id) => {
    return productos.find(p => p.id === id);
  };

  // Obtener productos con stock disponible (para POS)
  const obtenerProductosDisponibles = () => {
    return productos.filter(p => p.stock > 0);
  };

  // Estadísticas
  const obtenerEstadisticas = () => {
    return {
      total: productos.length,
      enStock: productos.filter(p => p.estado === 'En Stock').length,
      stockBajo: productos.filter(p => p.estado === 'Stock Bajo').length,
      agotados: productos.filter(p => p.estado === 'Agotado').length,
      valorTotal: productos.reduce((sum, p) => sum + (p.precio * p.stock), 0),
      conImagen: productos.filter(p => p.imagen).length
    };
  };

  const value = {
    productos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    actualizarStock,
    obtenerProducto,
    obtenerProductosDisponibles,
    obtenerEstadisticas
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
}