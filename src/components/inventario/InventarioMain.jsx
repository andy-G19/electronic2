import React, { useState } from 'react';
import { Package, Plus, Filter, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { useProductos } from '../../context/ProductosContext';
import ProductoTable from './ProductoTable';
import ProductoForm from './ProductoForm';
import ProductoFilters from './ProductoFilters';
import ProductoModal from './ProductoModal';

function InventarioMain() {
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

  const [filters, setFilters] = useState({
    search: '',
    categoria: '',
    proveedor: '',
    estado: ''
  });

  const stats = obtenerEstadisticas();

  // Obtener listas únicas para filtros
  const categorias = [...new Set(productos.map(p => p.categoria))];
  const proveedores = [...new Set(productos.map(p => p.proveedor))];

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
                         producto.codigo?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategoria = !filters.categoria || producto.categoria === filters.categoria;
    const matchesProveedor = !filters.proveedor || producto.proveedor === filters.proveedor;
    const matchesEstado = !filters.estado || producto.estado === filters.estado;

    return matchesSearch && matchesCategoria && matchesProveedor && matchesEstado;
  });

  const handleAddProducto = (newProducto) => {
    agregarProducto(newProducto);
    setShowForm(false);
  };

  const handleEditProducto = (updatedProducto) => {
    actualizarProducto(updatedProducto.id, updatedProducto);
    setEditingProducto(null);
    setShowForm(false);
  };

  const handleDeleteProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(id);
      setSelectedProducto(null); // Cerrar modal si estaba abierto
    }
  };

  const handleOpenEdit = (producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header y Acciones */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventario</h2>
          <p className="text-gray-500">Gestiona tu catálogo de productos</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-xl flex items-center justify-center gap-2 transition-colors ${
              showFilters ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
          <button 
            onClick={() => {
              setEditingProducto(null);
              setShowForm(true);
            }}
            className="flex-1 sm:flex-none px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Cards de Estadísticas Responsivas */}
      {/* CAMBIO: grid-cols-1 (móvil) -> sm:grid-cols-2 -> lg:grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Productos</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProductos}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Stock Bajo</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.stockBajo}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Valor Inventario</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">S/ {stats.valorTotal.toFixed(2)}</p>
        </div>
        
        {/* Card extra opcional para completar el grid o mostrar otra métrica */}
         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Categorías</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{categorias.length}</p>
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