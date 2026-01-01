import React, { useState } from 'react';
import { Package, Plus, Download, Filter } from 'lucide-react';
import { useProductos } from '../../context/ProductosContext'; // IMPORTAR
import ProductoTable from './ProductoTable';
import ProductoForm from './ProductoForm';
import ProductoFilters from './ProductoFilters';
import ProductoModal from './ProductoModal';

function InventarioMain() {
  // USAR EL HOOK DEL CONTEXT
  const { 
    productos, 
    agregarProducto, 
    actualizarProducto, 
    eliminarProducto,
    obtenerEstadisticas 
  } = useProductos();

  // Estados UI
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [editingProducto, setEditingProducto] = useState(null);

  // Estados de filtros
  const [filters, setFilters] = useState({
    search: '',
    categoria: '',
    proveedor: '',
    estado: ''
  });

  // Agregar producto
  const handleAddProducto = (newProducto) => {
    agregarProducto(newProducto);
    setShowForm(false);
  };

  // Editar producto
  const handleEditProducto = (updatedProducto) => {
    actualizarProducto(updatedProducto.id, updatedProducto);
    setEditingProducto(null);
    setShowForm(false);
  };

  // Eliminar producto
  const handleDeleteProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(id);
      setSelectedProducto(null);
    }
  };

  // Abrir formulario para editar
  const handleOpenEdit = (producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  // Filtrar productos
  const filteredProductos = productos.filter(producto => {
    const matchSearch = producto.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
                       producto.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategoria = !filters.categoria || producto.categoria === filters.categoria;
    const matchProveedor = !filters.proveedor || producto.proveedor === filters.proveedor;
    const matchEstado = !filters.estado || producto.estado === filters.estado;
    
    return matchSearch && matchCategoria && matchProveedor && matchEstado;
  });

  // Obtener categorías únicas
  const categorias = [...new Set(productos.map(p => p.categoria))];
  const proveedores = [...new Set(productos.map(p => p.proveedor))];

  // Estadísticas
  const stats = obtenerEstadisticas();

  // Exportar a CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Nombre', 'Categoría', 'Proveedor', 'Stock', 'Stock Mínimo', 'Precio Compra', 'Precio Venta', 'Estado'];
    const rows = filteredProductos.map(p => [
      p.id,
      p.nombre,
      p.categoria,
      p.proveedor,
      p.stock,
      p.stockMinimo,
      p.precioCompra,
      p.precio,
      p.estado
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Inventario</h2>
          <p className="text-gray-500 mt-1">Administra tu catálogo de productos</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
          <button 
            onClick={() => {
              setEditingProducto(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Productos</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">En Stock</p>
          <p className="text-2xl font-bold text-green-600">{stats.enStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Stock Bajo</p>
          <p className="text-2xl font-bold text-orange-600">{stats.stockBajo}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Agotados</p>
          <p className="text-2xl font-bold text-red-600">{stats.agotados}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Con Imagen</p>
          <p className="text-2xl font-bold text-sky-400">{stats.conImagen}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Valor Total</p>
          <p className="text-xl font-bold text-gray-900">S/ {stats.valorTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <ProductoFilters
          filters={filters}
          setFilters={setFilters}
          categorias={categorias}
          proveedores={proveedores}
        />
      )}

      {/* Tabla de Productos */}
      <ProductoTable
        productos={filteredProductos}
        onView={setSelectedProducto}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteProducto}
      />

      {/* Formulario Modal */}
      {showForm && (
        <ProductoForm
          producto={editingProducto}
          onSave={editingProducto ? handleEditProducto : handleAddProducto}
          onClose={() => {
            setShowForm(false);
            setEditingProducto(null);
          }}
          categorias={categorias}
          proveedores={proveedores}
        />
      )}

      {/* Modal de Detalle */}
      {selectedProducto && (
        <ProductoModal
          producto={selectedProducto}
          onClose={() => setSelectedProducto(null)}
          onEdit={() => {
            handleOpenEdit(selectedProducto);
            setSelectedProducto(null);
          }}
          onDelete={() => handleDeleteProducto(selectedProducto.id)}
        />
      )}
    </div>
  );
}

export default InventarioMain;