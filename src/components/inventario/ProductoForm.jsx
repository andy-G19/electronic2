import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import ImageUploader from './ImageUploader';

function ProductoForm({ producto, onSave, onClose, categorias, proveedores }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    proveedor: '',
    stock: 0,
    stockMinimo: 5,
    precioCompra: 0,
    precio: 0, // Este es el campo que usaremos para el precio de venta en el formulario
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
      setFormData({
        ...producto,
        // CORRECCIÓN: Carga el precio de venta priorizando precioVenta, luego precio, o 0
        precio: producto.precioVenta || producto.precio || 0
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productoToSave = {
      ...formData,
      // Guardamos estandarizado como precioVenta
      precioVenta: formData.precio,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h3 className="text-xl font-bold text-gray-900">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Columna Izquierda */}
            <div className="space-y-4">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                <ImageUploader 
                  imagenActual={formData.imagen}
                  onImageChange={handleImagenChange}
                  onImageRemove={handleImagenRemove}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                {!showNewCategoria ? (
                  <div className="flex gap-2">
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
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
                    >+ Nueva</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategoria}
                      onChange={(e) => setNewCategoria(e.target.value)}
                      placeholder="Nueva categoría"
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                    <button type="button" onClick={() => setShowNewCategoria(false)} className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mínimo</label>
                  <input
                    type="number"
                    name="stockMinimo"
                    value={formData.stockMinimo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Compra</label>
                  <input
                    type="number"
                    name="precioCompra"
                    value={formData.precioCompra}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Venta</label>
                  <input
                    type="number"
                    name="precio" 
                    value={formData.precio}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800">Margen de ganancia:</span>
                  <span className="text-lg font-bold text-green-600">{calcularGanancia()}</span>
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
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    >
                      <option value="">Seleccionar...</option>
                      {proveedores.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => setShowNewProveedor(true)} className="px-3 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 text-sm font-medium">+</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" value={newProveedor} onChange={(e) => setNewProveedor(e.target.value)} placeholder="Nuevo proveedor" className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg" />
                    <button type="button" onClick={() => setShowNewProveedor(false)} className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductoForm;