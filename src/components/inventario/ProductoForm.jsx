import React, { useState, useEffect } from 'react';
import { X, Save, Package} from 'lucide-react';
import ImageUploader from './ImageUploader';

function ProductoForm({ producto, onSave, onClose, categorias, proveedores }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    proveedor: '',
    stock: 0,
    stockMinimo: 5,
    precioCompra: 0,
    precio: 0,
    descripcion: '',
    imagen: null
  });

  const [errors, setErrors] = useState({});
  const [showNewCategoria, setShowNewCategoria] = useState(false);
  const [showNewProveedor, setShowNewProveedor] = useState(false);
  const [newCategoria, setNewCategoria] = useState('');
  const [newProveedor, setNewProveedor] = useState('');

  useEffect(() => {
    if (producto) {
      setFormData(producto);
    }
  }, [producto]);

  const handleImagenChange = (imagenBase64) => {
    setFormData(prev => ({ ...prev, imagen: imagenBase64 }));
  };

  const handleImagenRemove = () => {
    setFormData(prev => ({ ...prev, imagen: null }));
  };

  /*const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProducto({
        ...producto,
        imagen: file.name // Solo el nombre, el usuario debe copiar la imagen a la carpeta
      });
    }
  };*/

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.categoria) {
      newErrors.categoria = 'Selecciona una categoría';
    }
    if (!formData.proveedor) {
      newErrors.proveedor = 'Selecciona un proveedor';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    if (formData.stockMinimo < 0) {
      newErrors.stockMinimo = 'El stock mínimo no puede ser negativo';
    }
    if (formData.precioCompra <= 0) {
      newErrors.precioCompra = 'El precio de compra debe ser mayor a 0';
    }
    if (formData.precio <= 0) {
      newErrors.precio = 'El precio de venta debe ser mayor a 0';
    }
    if (formData.precio <= formData.precioCompra) {
      newErrors.precio = 'El precio de venta debe ser mayor al precio de compra';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleAddCategoria = () => {
    if (newCategoria.trim()) {
      setFormData(prev => ({ ...prev, categoria: newCategoria }));
      setNewCategoria('');
      setShowNewCategoria(false);
    }
  };

  const handleAddProveedor = () => {
    if (newProveedor.trim()) {
      setFormData(prev => ({ ...prev, proveedor: newProveedor }));
      setNewProveedor('');
      setShowNewProveedor(false);
    }
  };

  const calcularGanancia = () => {
    if (formData.precioCompra > 0 && formData.precio > formData.precioCompra) {
      const ganancia = ((formData.precio - formData.precioCompra) / formData.precioCompra * 100).toFixed(1);
      return `+${ganancia}%`;
    }
    return '0%';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {producto ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <p className="text-sm text-gray-500">
                {producto ? `Editando ${producto.id}` : 'Completa la información del producto'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">    
          {/* Información Básica */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Información Básica</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Audífonos Bluetooth X1"
              />


              {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                {!showNewCategoria ? (
                  <div className="flex gap-2">
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.categoria ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccionar...</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewCategoria(true)}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      + Nueva
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategoria}
                      onChange={(e) => setNewCategoria(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Nueva categoría"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategoria}
                      className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Agregar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewCategoria(false)}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
                {errors.categoria && <p className="text-sm text-red-600 mt-1">{errors.categoria}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proveedor *
                </label>
                {!showNewProveedor ? (
                  <div className="flex gap-2">
                    <select
                      name="proveedor"
                      value={formData.proveedor}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.proveedor ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccionar...</option>
                      {proveedores.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewProveedor(true)}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      + Nuevo
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProveedor}
                      onChange={(e) => setNewProveedor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Nuevo proveedor"
                    />
                    <button
                      type="button"
                      onClick={handleAddProveedor}
                      className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Agregar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewProveedor(false)}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
                {errors.proveedor && <p className="text-sm text-red-600 mt-1">{errors.proveedor}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Descripción del producto..."
              />
            </div>
          </div>


          {/* Sección de Imagen */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Imagen del Producto</h4>
            <ImageUploader
              imagen={formData.imagen}
              onImagenChange={handleImagenChange}
              onImagenRemove={handleImagenRemove}
            />
          </div>
          

          {/* Stock */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Control de Stock</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Actual *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.stock && <p className="text-sm text-red-600 mt-1">{errors.stock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Mínimo *
                </label>
                <input
                  type="number"
                  name="stockMinimo"
                  value={formData.stockMinimo}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.stockMinimo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.stockMinimo && <p className="text-sm text-red-600 mt-1">{errors.stockMinimo}</p>}
              </div>
            </div>
          </div>

          {/* Precios */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Precios</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio de Compra *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">S/</span>
                  <input
                    type="number"
                    name="precioCompra"
                    value={formData.precioCompra}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.precioCompra ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.precioCompra && <p className="text-sm text-red-600 mt-1">{errors.precioCompra}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio de Venta *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">S/</span>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.precio ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.precio && <p className="text-sm text-red-600 mt-1">{errors.precio}</p>}
              </div>
            </div>

            {/* Ganancia calculada */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-800">Margen de ganancia:</span>
                <span className="text-lg font-bold text-green-600">{calcularGanancia()}</span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {producto ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductoForm;