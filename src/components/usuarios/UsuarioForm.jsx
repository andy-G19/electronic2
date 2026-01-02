import React, { useState, useEffect } from 'react';
import { X, Save, User, Shield, Check } from 'lucide-react';

function UsuarioForm({ usuario, onSave, onClose, roles }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rol: 'Vendedor',
    estado: 'Activo',
    permisos: {
      dashboard: true,
      pos: true,
      inventario: false,
      reportes: false,
      usuarios: false,
      configuracion: false
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (usuario) {
      setFormData(usuario);
    }
  }, [usuario]);

  // Configurar permisos por defecto según el rol
  useEffect(() => {
    if (!usuario) { // Solo aplicar si es usuario nuevo
      const permisosDefecto = {
        'Administrador': {
          dashboard: true,
          pos: true,
          inventario: true,
          reportes: true,
          usuarios: true,
          configuracion: true
        },
        'Supervisor': {
          dashboard: true,
          pos: true,
          inventario: true,
          reportes: true,
          usuarios: false,
          configuracion: false
        },
        'Vendedor': {
          dashboard: true,
          pos: true,
          inventario: true,
          reportes: false,
          usuarios: false,
          configuracion: false
        }
      };

      if (permisosDefecto[formData.rol]) {
        setFormData(prev => ({
          ...prev,
          permisos: permisosDefecto[formData.rol]
        }));
      }
    }
  }, [formData.rol, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePermisoChange = (permiso) => {
    setFormData(prev => ({
      ...prev,
      permisos: {
        ...prev.permisos,
        [permiso]: !prev.permisos[permiso]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
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

  const permisos = [
    { id: 'dashboard', label: 'Dashboard', descripcion: 'Ver panel de control' },
    { id: 'pos', label: 'Punto de Venta', descripcion: 'Realizar ventas' },
    { id: 'inventario', label: 'Inventario', descripcion: 'Gestionar productos' },
    { id: 'reportes', label: 'Reportes', descripcion: 'Ver reportes y análisis' },
    { id: 'usuarios', label: 'Usuarios', descripcion: 'Administrar usuarios' },
    { id: 'configuracion', label: 'Configuración', descripcion: 'Configurar sistema' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
              <p className="text-sm text-gray-500">
                {usuario ? `Editando ${usuario.id}` : 'Completa la información del usuario'}
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
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información Básica
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Juan Pérez García"
              />
              {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="usuario@Electronica Andy.com"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                    errors.telefono ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+51 987 654 321"
                />
                {errors.telefono && <p className="text-sm text-red-600 mt-1">{errors.telefono}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol *
                </label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  {roles.map(rol => (
                    <option key={rol} value={rol}>{rol}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Permisos */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Permisos de Acceso
            </h4>
            
            <p className="text-sm text-gray-600">
              Selecciona los módulos a los que este usuario tendrá acceso
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {permisos.map((permiso) => (
                <button
                  key={permiso.id}
                  type="button"
                  onClick={() => handlePermisoChange(permiso.id)}
                  className={`relative border-2 rounded-lg p-4 text-left transition-all ${
                    formData.permisos[permiso.id]
                      ? 'border-indigo-500 bg-sky-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {formData.permisos[permiso.id] && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-sky-300 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <p className="font-medium text-gray-900 mb-1">{permiso.label}</p>
                  <p className="text-sm text-gray-600">{permiso.descripcion}</p>
                </button>
              ))}
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
              className="flex-1 px-4 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {usuario ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsuarioForm;