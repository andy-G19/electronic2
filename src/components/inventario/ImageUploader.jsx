import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { compressImage, validateImageType, validateImageSize } from '../../utils/imageUtils';

function ImageUploader({ imagen, onImagenChange, onImagenRemove }) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    // Validar tipo
    if (!validateImageType(file)) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP, GIF)');
      return;
    }

    // Validar tamaño
    if (!validateImageSize(file, 5)) {
      alert('La imagen es muy grande. Tamaño máximo: 5MB');
      return;
    }

    setLoading(true);

    try {
      const compressed = await compressImage(file, 800, 0.8);
      onImagenChange(compressed);
    } catch (error) {
      console.error('Error al procesar imagen:', error);
      alert('Error al procesar la imagen. Intenta con otra.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Imagen del Producto
      </label>
      
      {loading && (
        <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-gray-600">Procesando imagen...</p>
          </div>
        </div>
      )}
      
      {!loading && imagen ? (
        <div className="relative group">
          <img
            src={imagen}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onImagenRemove}
              className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Eliminar
            </button>
            <label
              htmlFor="file-upload-replace"
              className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Cambiar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="file-upload-replace"
            />
          </div>
        </div>
      ) : !loading && (
        <div
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-gray-500 mb-4">
            JPG, PNG, WebP, GIF (máximo 5MB)
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="file-upload-new"
          />
          <label
            htmlFor="file-upload-new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Seleccionar Imagen
          </label>
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        La imagen se comprimirá automáticamente para optimizar el almacenamiento
      </p>
    </div>
  );
}

export default ImageUploader;