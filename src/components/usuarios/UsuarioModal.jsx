import React from 'react';
import { X, Edit, Trash2, Power, User, Mail, Phone, Shield, Calendar, Clock, Check, X as XIcon } from 'lucide-react';

function UsuarioModal({ usuario, onClose, onEdit, onDelete, onToggleEstado }) {
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRolColor = (rol) => {
    switch (rol) {
      case 'Administrador':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Supervisor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const permisos = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pos', label: 'Punto de Venta' },
    { id: 'inventario', label: 'Inventario' },
    { id: 'reportes', label: 'Reportes' },
    { id: 'usuarios', label: 'Usuarios' },
    { id: 'configuracion', label: 'Configuración' },
  ];

  const permisosActivos = permisos.filter(p => usuario.permisos[p.id]).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 text-lg">
              {usuario.nombre.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{usuario.nombre}</h3>
              <p className="text-sm text-gray-500">{usuario.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Estado y Rol */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${getRolColor(usuario.rol)}`}>
                <Shield className="w-4 h-4" />
                {usuario.rol}
              </span>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                usuario.estado === 'Activo'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {usuario.estado}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={onToggleEstado}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  usuario.estado === 'Activo'
                    ? 'text-orange-600 border-orange-300 hover:bg-orange-50'
                    : 'text-green-600 border-green-300 hover:bg-green-50'
                }`}
              >
                <Power className="w-4 h-4" />
                {usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información de Contacto
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{usuario.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Teléfono</p>
                  <p className="font-medium text-gray-900">{usuario.telefono}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actividad */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Actividad
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Fecha de Creación</p>
                  <p className="font-medium text-gray-900 text-sm">{formatFecha(usuario.fechaCreacion)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Último Acceso</p>
                  <p className="font-medium text-gray-900 text-sm">{formatFecha(usuario.ultimoAcceso)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Permisos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Permisos de Acceso
              <span className="ml-auto text-sm font-normal text-gray-600">
                {permisosActivos} de {permisos.length} módulos
              </span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {permisos.map((permiso) => {
                const tienePermiso = usuario.permisos[permiso.id];
                return (
                  <div
                    key={permiso.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      tienePermiso
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {tienePermiso ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${
                      tienePermiso ? 'text-green-900' : 'text-gray-600'
                    }`}>
                      {permiso.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumen */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Resumen del Usuario</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Días en el sistema:</p>
                <p className="font-semibold text-gray-900">
                  {Math.floor((new Date() - new Date(usuario.fechaCreacion)) / (1000 * 60 * 60 * 24))} días
                </p>
              </div>
              <div>
                <p className="text-gray-600">Nivel de acceso:</p>
                <p className="font-semibold text-gray-900">
                  {Math.round((permisosActivos / permisos.length) * 100)}% de módulos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuarioModal;