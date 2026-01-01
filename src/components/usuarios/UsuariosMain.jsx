import React, { useState } from 'react';
import { Users, Plus, Shield, UserCog, Search } from 'lucide-react';
import UsuariosTabla from './UsuariosTabla';
import UsuarioForm from './UsuarioForm';
import UsuarioModal from './UsuarioModal';

function UsuariosMain() {
  // Datos de usuarios
  const [usuarios, setUsuarios] = useState([
    {
      id: 'USR-001',
      nombre: 'Juan Perez',
      email: 'juan.perez@elecsales.com',
      rol: 'Administrador',
      telefono: '+51 987 654 321',
      estado: 'Activo',
      fechaCreacion: new Date('2024-01-15'),
      ultimoAcceso: new Date('2024-12-26'),
      permisos: {
        dashboard: true,
        pos: true,
        inventario: true,
        reportes: true,
        usuarios: true,
        configuracion: true
      }
    },
    {
      id: 'USR-002',
      nombre: 'María García',
      email: 'maria.garcia@elecsales.com',
      rol: 'Vendedor',
      telefono: '+51 987 654 322',
      estado: 'Activo',
      fechaCreacion: new Date('2024-02-20'),
      ultimoAcceso: new Date('2024-12-25'),
      permisos: {
        dashboard: true,
        pos: true,
        inventario: true,
        reportes: false,
        usuarios: false,
        configuracion: false
      }
    },
    {
      id: 'USR-003',
      nombre: 'Carlos López',
      email: 'carlos.lopez@elecsales.com',
      rol: 'Supervisor',
      telefono: '+51 987 654 323',
      estado: 'Activo',
      fechaCreacion: new Date('2024-03-10'),
      ultimoAcceso: new Date('2024-12-24'),
      permisos: {
        dashboard: true,
        pos: true,
        inventario: true,
        reportes: true,
        usuarios: false,
        configuracion: false
      }
    },
    {
      id: 'USR-004',
      nombre: 'Ana Martínez',
      email: 'ana.martinez@elecsales.com',
      rol: 'Vendedor',
      telefono: '+51 987 654 324',
      estado: 'Inactivo',
      fechaCreacion: new Date('2024-04-05'),
      ultimoAcceso: new Date('2024-12-10'),
      permisos: {
        dashboard: true,
        pos: true,
        inventario: false,
        reportes: false,
        usuarios: false,
        configuracion: false
      }
    },
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchBusqueda = usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
                         usuario.id.toLowerCase().includes(busqueda.toLowerCase());
    const matchRol = !filtroRol || usuario.rol === filtroRol;
    const matchEstado = !filtroEstado || usuario.estado === filtroEstado;
    
    return matchBusqueda && matchRol && matchEstado;
  });

  // Generar nuevo ID
  const generateNewId = () => {
    const lastId = usuarios.length > 0 
      ? parseInt(usuarios[usuarios.length - 1].id.split('-')[1]) 
      : 0;
    return `USR-${String(lastId + 1).padStart(3, '0')}`;
  };

  // Agregar usuario
  const handleAddUsuario = (newUsuario) => {
    const usuario = {
      ...newUsuario,
      id: generateNewId(),
      fechaCreacion: new Date(),
      ultimoAcceso: new Date()
    };
    setUsuarios([...usuarios, usuario]);
    setShowForm(false);
  };

  // Editar usuario
  const handleEditUsuario = (updatedUsuario) => {
    setUsuarios(usuarios.map(u => u.id === updatedUsuario.id ? updatedUsuario : u));
    setEditingUsuario(null);
    setShowForm(false);
  };

  // Eliminar usuario
  const handleDeleteUsuario = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
      setSelectedUsuario(null);
    }
  };

  // Cambiar estado
  const handleToggleEstado = (id) => {
    setUsuarios(usuarios.map(u => 
      u.id === id 
        ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' }
        : u
    ));
  };

  // Abrir formulario para editar
  const handleOpenEdit = (usuario) => {
    setEditingUsuario(usuario);
    setShowForm(true);
  };

  // Estadísticas
  const stats = {
    total: usuarios.length,
    activos: usuarios.filter(u => u.estado === 'Activo').length,
    inactivos: usuarios.filter(u => u.estado === 'Inactivo').length,
    administradores: usuarios.filter(u => u.rol === 'Administrador').length,
    vendedores: usuarios.filter(u => u.rol === 'Vendedor').length,
    supervisores: usuarios.filter(u => u.rol === 'Supervisor').length,
  };

  const roles = ['Administrador', 'Supervisor', 'Vendedor'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
          <p className="text-gray-500 mt-1">Administra usuarios y permisos del sistema</p>
        </div>
        <button 
          onClick={() => {
            setEditingUsuario(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-sky-400" />
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Activos</p>
          <p className="text-2xl font-bold text-green-600">{stats.activos}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Inactivos</p>
          <p className="text-2xl font-bold text-red-600">{stats.inactivos}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-sky-400" />
            <p className="text-sm text-gray-600">Admin</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.administradores}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Supervisores</p>
          <p className="text-2xl font-bold text-gray-900">{stats.supervisores}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Vendedores</p>
          <p className="text-2xl font-bold text-gray-900">{stats.vendedores}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, email o ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <option value="">Todos los roles</option>
            {roles.map(rol => (
              <option key={rol} value={rol}>{rol}</option>
            ))}
          </select>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <UsuariosTabla
        usuarios={usuariosFiltrados}
        onView={setSelectedUsuario}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteUsuario}
        onToggleEstado={handleToggleEstado}
      />

      {/* Formulario Modal */}
      {showForm && (
        <UsuarioForm
          usuario={editingUsuario}
          onSave={editingUsuario ? handleEditUsuario : handleAddUsuario}
          onClose={() => {
            setShowForm(false);
            setEditingUsuario(null);
          }}
          roles={roles}
        />
      )}

      {/* Modal de Detalle */}
      {selectedUsuario && (
        <UsuarioModal
          usuario={selectedUsuario}
          onClose={() => setSelectedUsuario(null)}
          onEdit={() => {
            handleOpenEdit(selectedUsuario);
            setSelectedUsuario(null);
          }}
          onDelete={() => handleDeleteUsuario(selectedUsuario.id)}
          onToggleEstado={() => handleToggleEstado(selectedUsuario.id)}
        />
      )}
    </div>
  );
}

export default UsuariosMain;