import React, { useState, useEffect } from 'react';
import { X, Save, Package } from 'lucide-react';
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
      // Mapear los nombres de campos si difieren (ej: precioVenta -> precio)
      setFormData({
        ...producto,
        precio: producto.precioVenta || producto.precio || 0 // Asegurar compatibilidad
      });
    }
  }, [producto]);

  const handleImagenChange = (imagenBase64) => {
    setFormData(prev => ({ ...prev, imagen: imagenBase64 }));
  };

  const handleImagenRemove = () => {
    setFormData(prev => ({ ...prev, imagen: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.categoria && !newCategoria) newErrors.categoria = 'La categoría es obligatoria';
    if (!formData.precio || Number(formData.precio) <= 0) newErrors.precio = 'Precio inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productoToSave = {
      ...formData,
      precioVenta: formData.precio, // Normalizar nombres
      categoria: showNewCategoria ? newCategoria : formData.categoria,
      proveedor: showNewProveedor ? newProveedor : formData.proveedor
    };

    onSave(productoToSave);
  };

  const calcularGanancia = () => {
    if (!formData.precio || !formData.precioCompra) return '0%';
    const ganancia = ((formData.precio - formData.precioCompra) / formData.precioCompra * 100);
    return isFinite(ganancia) ? `${ganancia.toFixed(1)}%` : '0%';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-auto">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {/* CAMBIO: Grid responsive (1 col móvil, 2 col desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* COLUMNA IZQUIERDA: Info Básica */}
            <div className="space-y-4">
              {/* Imagen Uploader */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
                <ImageUploader 
                  imagenActual={formData.imagen}
                  onImageChange={handleImagenChange}
                  onImageRemove={handleImagenRemove}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors ${
                    errors.nombre ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Ej: Arduino Uno R3"
                />
                {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
              </div>

              {/* Categoría con opción de agregar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                {!showNewCategoria ? (
                  <div className="flex gap-2">
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    >
                      <option value="">Seleccionar...</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewCategoria(true)}
                      className="px-3 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 text-sm font-medium"
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
                      placeholder="Nueva categoría"
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewCategoria(false)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {errors.categoria && <p className="text-sm text-red-600 mt-1">{errors.categoria}</p>}
              </div>
            </div>

            {/* COLUMNA DERECHA: Precios y Stock */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                  <input
                    type="number"
                    name="stockMinimo"
                    value={formData.stockMinimo}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Compra</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">S/</span>
                    <input
                      type="number"
                      name="precioCompra"
                      value={formData.precioCompra}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Venta</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">S/</span>
                    <input
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full pl-8 pr-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 ${
                        errors.precio ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Indicador de Ganancia */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800 font-medium">Margen de ganancia estimado:</span>
                  <span className="text-lg font-bold text-green-700">{calcularGanancia()}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                 {!showNewProveedor ? (
                  <div className="flex gap-2">
                    <select
                      name="proveedor"
                      value={formData.proveedor}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="">Seleccionar...</option>
                      {proveedores.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewProveedor(true)}
                      className="px-3 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProveedor}
                      onChange={(e) => setNewProveedor(e.target.value)}
                      placeholder="Nuevo proveedor"
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewProveedor(false)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Botones */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20"
            >
              <Save className="w-4 h-4" />
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductoForm;