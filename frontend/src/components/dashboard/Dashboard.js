import React, { useState, useEffect } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
// Material-UI imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from '@mui/material';

// Material-UI Icons
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  DirectionsBus as BusIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  DriveEta as DriveEtaIcon
} from '@mui/icons-material';

// Importación de componentes (manteniendo los existentes por ahora)
import Setup2FA from '../auth/Setup2FA/Setup2FA.js';
import Sidebar from './Sidebar'; // Adjust the path as needed
// *** IMPORTACIÓN DEL COMPONENTE HEADER ***
import Header from './Header.js';
import DashboardHome from './DashboardHome.js';
import RolesView from './RolesView.js';
import ConfiguracionView from "./ConfiguracionView";
import UsuariosView from './UsuariosView.js';
import ConductoresView from './ConductoresView.js';
import VehiculosView from './VehiculosView.js';
import PasajerosView from './PasajerosView.js';
import ViajesView from './ViajesView.js';
import PasajerosViajesView from './PasajerosViajesView.js';

const Dashboard = () => {
  // Paleta de colores adaptada para Material-UI
  const theme = {
    primary: '#D96668',
    secondary: '#A5879B',
    tertiary: '#BFB1AB',
    background: '#F7F6F5',
    dark: '#2D2A2E',
    accent: '#8B7355',
    light: '#FEFEFE',
    muted: '#6B6B6B',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336'
  };

  // Estados de autenticación
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [foto_perfil, setFoto] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [alertas, setAlertas] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [pasajerosViajes, setPasajerosViajes] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup2FA, setShowSetup2FA] = useState(false);
  //alertas
  const [previousAlertCount, setPreviousAlertCount] = useState(0);
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);
  const [newAlertas, setNewAlertas] = useState([]);
  const [alertasVistas, setAlertasVistas] = useState([]); 
  
  const navigate = useNavigate();
  
  // Estados del dashboard
  const [activeView, setActiveView] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

 

  // Menu items con iconos de Material-UI
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'usuarios', label: 'Usuarios', icon: <PeopleIcon /> },
    { id: 'roles', label: 'Roles', icon: <SecurityIcon /> },
    { id: 'pasajeros', label: 'Pasajeros', icon: <PeopleIcon /> },
    { id: 'viajes', label: 'Gestión de Viajes', icon: <BusIcon /> },
    { id: 'pasajerosViajes', label: 'Pasajeros en Viajes', icon: <PeopleIcon /> },
    { id: 'conductores', label: 'Conductores', icon: <DriveEtaIcon /> },
    { id: 'vehiculos', label: 'Vehiculos', icon: <DriveEtaIcon /> },
    { id: 'reportes', label: 'Reportes', icon: <AssessmentIcon /> },
    { id: 'configuracion', label: 'Configuración', icon: <SettingsIcon /> }
  ];

// Funciones de autenticación
useEffect(() => {
  const initializeDashboard = async () => {
    await refreshToken(); // ✅ ESPERAR a que el token esté listo
  };
  
  initializeDashboard();
}, []); // Solo se ejecuta una vez al montar

// ✅ SEPARAR: useEffect para cargar datos cuando el token esté listo
useEffect(() => {
  if (token) { // Solo ejecutar si el token existe
    getAlertas();
    getUsers();
    getRoles();
    getConductores();
    getVehiculos();
    getPasajeros();
    getViajes();
    getPasajerosViajes();
  }
}, [token]); // Se ejecuta cuando el token cambia

// ✅ SEPARAR: useEffect para el polling de alertas
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      getAlertas();
    }, 3000);

    return () => clearInterval(interval);
  }, [token, alertasVistas]); // Reiniciar polling si el token cambia

  const refreshToken = async () => {
    try {
      console.log('Intentando refrescar token...');
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log('Token decodificado:', decoded);
      setId(decoded.id_usuario);
      setName(decoded.nombre_completo);
      setFoto(decoded.foto_perfil);
      setUserEmail(decoded.email); 
      setExpire(decoded.exp);
      setIs2FAEnabled(decoded.is2FAEnabled);
    } catch (error) {
      navigate("/");
    } 
  };

  const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(async (config) => {
  try {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.nombre_completo);
      setFoto(decoded.foto_perfil);
      setExpire(decoded.exp);
    } else {
      // AGREGA ESTA PARTE: Si el token no ha expirado, usa el token actual
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    navigate("/");
    return Promise.reject(error);
  }
}, (error) => {
  return Promise.reject(error);
});
  // Funciones API para las alertas(manteniendo la lógica existente)
// Modificar la función getAlertas
  const getAlertas = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/alertas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // ✅ Filtrar alertas que NO han sido vistas
      const todasLasAlertas = response.data;
      const alertasNoVistas = todasLasAlertas.filter(
        alerta => !alertasVistas.includes(alerta.id_alerta)
      );
      
      // ✅ Si hay más alertas no vistas que antes, mostrar modal con SOLO las nuevas
      if (previousAlertCount > 0 && alertasNoVistas.length > previousAlertCount) {
        const cantidadNuevas = alertasNoVistas.length - previousAlertCount;
        const alertasNuevas = alertasNoVistas.slice(-cantidadNuevas);
        setNewAlertas(alertasNuevas);
        setShowNewAlertModal(true);
      }
      
      setAlertas(alertasNoVistas);
      setPreviousAlertCount(alertasNoVistas.length);
      
      console.log(`📊 Total alertas: ${todasLasAlertas.length}, No vistas: ${alertasNoVistas.length}, Vistas: ${alertasVistas.length}`);
    } catch (error) {
      console.error("❌ Error fetching alertas:", error);
    }
  };

  // ✅ FUNCIÓN PARA ABRIR EL MODAL MANUALMENTE
  const handleOpenAlertModal = () => {
    setNewAlertas(alertas);
    setShowNewAlertModal(true);
  };

  // ✅ FUNCIÓN MEJORADA: Marcar alertas como vistas (SOLO FRONTEND)
  const handleCloseAlertModal = async () => {
    try {
      // Obtener los IDs de las nuevas alertas
      const alertaIds = newAlertas.map(alerta => alerta.id_alerta);
      
      console.log('🔔 Marcando como vistas:', alertaIds);
      
      // ✅ OPCIÓN 1: Guardar en localStorage (persiste entre sesiones)
      const alertasVistasActualizadas = [...alertasVistas, ...alertaIds];
      setAlertasVistas(alertasVistasActualizadas);
      localStorage.setItem('alertasVistas', JSON.stringify(alertasVistasActualizadas));
      
      // ✅ OPCIÓN 2: Solo en memoria (se pierde al recargar)
      // setAlertasVistas(prev => [...prev, ...alertaIds]);
      
      // Cerrar el modal
      setShowNewAlertModal(false);
      setNewAlertas([]);
      
      // ✅ Actualizar la lista de alertas inmediatamente
      const alertasActualizadas = alertas.filter(
        alerta => !alertaIds.includes(alerta.id_alerta)
      );
      setAlertas(alertasActualizadas);
      setPreviousAlertCount(alertasActualizadas.length);
      
      console.log(`✅ ${alertaIds.length} alerta(s) marcada(s) como vista(s)`);
      console.log(`📋 Alertas restantes: ${alertasActualizadas.length}`);
    } catch (error) {
      console.error("❌ Error al cerrar modal de alertas:", error);
      setShowNewAlertModal(false);
      setNewAlertas([]);
    }
  };

  // ✅ CARGAR ALERTAS VISTAS DESDE LOCALSTORAGE AL INICIAR
  useEffect(() => {
    const alertasVistasGuardadas = localStorage.getItem('alertasVistas');
    if (alertasVistasGuardadas) {
      setAlertasVistas(JSON.parse(alertasVistasGuardadas));
      console.log('📥 Alertas vistas cargadas desde localStorage');
    }
  }, []);
  // Funciones API (manteniendo la lógica existente)
  const getUsers = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/roles');
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const getConductores = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/conductores');
      setConductores(response.data);
    } catch (error) {
      console.error("Error fetching conductores:", error);
    }
  };
  const getVehiculos = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/vehiculos');
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error fetching vehiculos:", error);
    }
  };
    const getPasajeros= async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/pasajeros');
      setPasajeros(response.data);
    } catch (error) {
      console.error("Error fetching pasajeros:", error);
    }
  };
    const getViajes= async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/viajes');
      setViajes(response.data);
    } catch (error) {
      console.error("Error fetching viajes:", error);
    }
  };
  // PASAJEROS VIAJES - API CALLS
const getPasajerosViajes = async () => {
  try {
    const response = await axiosJWT.get('http://localhost:5000/pasajeros_viaje');
    setPasajerosViajes(response.data);
  } catch (error) {
    console.error("Error fetching pasajeros viajes:", error);
  }
};
  // Handlers (manteniendo la lógica existente pero simplificada)
  const handleCreateUser = async (userData) => {
    try {
      await axiosJWT.post('http://localhost:5000/users', userData);
      getUsers();
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error("Error creating user:", error);
      alert('Error al crear usuario');
    }
  };
const handleEditUser = async (id, userData) => {
  try {
    await axiosJWT.put(`http://localhost:5000/users/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    getUsers();
    alert('Usuario actualizado exitosamente');
  } catch (error) {
    console.error("Error updating user:", error);
    const errorMsg = error.response?.data?.msg || 'Error al actualizar usuario';
    alert(errorMsg);
  }
};

const handleDeleteUser = async (id) => {
  if (window.confirm('¿Estás seguro de desactivar este usuario?')) {
    try {
      await axiosJWT.delete(`http://localhost:5000/users/${id}`);
      getUsers();
      alert('Usuario desactivado exitosamente');
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorMsg = error.response?.data?.msg || 'Error al desactivar usuario';
      alert(errorMsg);
    }
  }
};

const handleViewUser = (userData) => {
  // Esta función abrirá un modal con los detalles del usuario
  console.log('Ver detalles:', userData);
  alert('Función de vista en desarrollo');
};
const handleActivateUser = async (id) => {
  if (window.confirm('¿Estás seguro de activar este usuario?')) {
    try {
      await axiosJWT.put(`http://localhost:5000/users/${id}/activate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getUsers();
      alert('Usuario activado exitosamente');
    } catch (error) {
      console.error("Error activating user:", error);
      const errorMsg = error.response?.data?.msg || 'Error al activar usuario';
      alert(errorMsg);
    }
  }
};
//pasajero
    const handleCreatePasajero = async (pasajeroData) => {
  try {
    await axiosJWT.post('http://localhost:5000/pasajeros', pasajeroData);
    getPasajeros(); // Recargar la lista
    alert('Pasajero registrado exitosamente');
  } catch (error) {
    console.error("Error creating pasajero:", error);
    const errorMsg = error.response?.data?.msg || 'Error al registrar pasajero';
    alert(errorMsg);
  }
};
const handleEditPasajero = async (id, pasajeroData) => {
  try {
    await axiosJWT.put(`http://localhost:5000/pasajeros/${id}`, pasajeroData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    getPasajeros(); // Recargar lista
    alert('Pasajero actualizado exitosamente');
  } catch (error) {
    console.error("Error updating Pasajero:", error);
    const errorMsg = error.response?.data?.msg || 'Error al actualizar Pasajero';
    alert(errorMsg);
  }
};
const handleDeletePasajero = async (id) => {
  if (window.confirm('¿Estás seguro de eliminar este pasajero?')) {
    try {
      await axiosJWT.delete(`http://localhost:5000/pasajeros/${id}`);
      getPasajeros();
      alert('Pasajero eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting pasajero:", error);
      alert('Error al eliminar pasajero');
    }
  }
};
//viajes
  const handleCreateViaje = async (viajeData) => {
  try {
    await axiosJWT.post('http://localhost:5000/viajes', viajeData);
    getViajes(); // Recargar la lista
    alert('Viaje registrado exitosamente');
  } catch (error) {
    console.error("Error creating viajes:", error);
    const errorMsg = error.response?.data?.msg || 'Error al registrar viaje';
    alert(errorMsg);
  }
};


//  AGREGAR ESTAS DOS:
const handleEditViaje = async (id, viajeData) => {
  try {
    await axiosJWT.put(`http://localhost:5000/viajes/${id}`, viajeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    getViajes();
    alert('Viaje actualizado exitosamente');
  } catch (error) {
    console.error("Error updating viaje:", error);
    const errorMsg = error.response?.data?.msg || 'Error al actualizar viaje';
    alert(errorMsg);
  }
};

const handleViewViaje = async (id) => {
  try {
    const response = await axiosJWT.get(`http://localhost:5000/viajes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching viaje:", error);
    alert('Error al obtener detalles del viaje');
    return null;
  }
};
const handleDeleteViaje = async (id) => {
  if (window.confirm('¿Estás seguro de eliminar este viaje?')) {
    try {
      await axiosJWT.delete(`http://localhost:5000/viajes/${id}`);
      getViajes();
      alert('Viaje eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting viaje:", error);
      alert('Error al eliminar viaje');
    }
  }
};
//pasasjeros viajes
// PASAJEROS VIAJES - HANDLERS
const handleCreatePasajeroViaje = async (pasajeroViajeData) => {
  try {
    await axiosJWT.post('http://localhost:5000/pasajeros_viaje', pasajeroViajeData);
    getPasajerosViajes(); // Recargar la lista
    getViajes(); // Actualizar viajes (por si cambió el estado)
    alert('Pasajero asignado al viaje exitosamente');
  } catch (error) {
    console.error("Error creating pasajero viaje:", error);
    const errorMsg = error.response?.data?.msg || 'Error al asignar pasajero al viaje';
    alert(errorMsg);
  }
};

const handleDeletePasajeroViaje = async (id) => {
  if (window.confirm('¿Estás seguro de eliminar este pasajero del viaje?')) {
    try {
      await axiosJWT.delete(`http://localhost:5000/pasajeros_viaje/${id}`);
      getPasajerosViajes();
      getViajes(); // Actualizar viajes por si cambió el estado
      alert('Pasajero eliminado del viaje exitosamente');
    } catch (error) {
      console.error("Error deleting pasajero viaje:", error);
      alert('Error al eliminar pasajero del viaje');
    }
  }
};
  //vehiculo
  const handleCreateVehiculo = async (vehiculoData) => {
  try {
    await axiosJWT.post('http://localhost:5000/vehiculos', vehiculoData);
    getVehiculos(); // Recargar la lista
    alert('Vehiculo registrado exitosamente');
  } catch (error) {
    console.error("Error creating vehiculo:", error);
    const errorMsg = error.response?.data?.msg || 'Error al registrar vehiculo';
    alert(errorMsg);
  }
};
// Editar vehículo (NUEVA FUNCIÓN)
const handleEditVehiculo = async (id, vehiculoData) => {
  try {
    await axiosJWT.put(`http://localhost:5000/vehiculos/${id}`, vehiculoData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    getVehiculos(); // Recargar la lista
    alert('Vehículo actualizado exitosamente');
  } catch (error) {
    console.error("Error updating vehiculo:", error);
    const errorMsg = error.response?.data?.msg || 'Error al actualizar vehículo';
    alert(errorMsg);
  }
};
const handleViewVehiculo = async (id) => {
  try {
    const response = await axiosJWT.get(`http://localhost:5000/vehiculos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehiculo:", error);
    alert('Error al obtener detalles del vehículo');
    return null;
  }
};
const handleDeleteVehiculo = async (id) => {
  if (window.confirm('¿Estás seguro de eliminar este vehiculo?')) {
    try {
      await axiosJWT.delete(`http://localhost:5000/vehiculos/${id}`);
      getConductores();
      alert('Vehiculo eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting vehiculo:", error);
      alert('Error al eliminar vehiculo');
    }
  }
};
// Cambiar estado del vehículo (NUEVA FUNCIÓN ÚTIL)
const handleChangeVehiculoEstado = async (id, nuevoEstado) => {
  try {
    await axiosJWT.put(`http://localhost:5000/vehiculos/${id}`, 
      { estado: nuevoEstado },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getVehiculos();
    alert(`Vehículo marcado como ${nuevoEstado}`);
  } catch (error) {
    console.error("Error changing vehiculo estado:", error);
    alert('Error al cambiar estado del vehículo');
  }
};
const handleCreateConductor = async (conductorData) => {
  try {
    await axiosJWT.post('http://localhost:5000/conductores', conductorData);
    getConductores(); // Recargar la lista
    alert('Conductor registrado exitosamente');
  } catch (error) {
    console.error("Error creating conductor:", error);
    const errorMsg = error.response?.data?.msg || 'Error al registrar conductor';
    alert(errorMsg);
  }
};
const handleEditConductor = async (id, conductorData) => {
  try {
    await axiosJWT.put(`http://localhost:5000/conductores/${id}`, conductorData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    getConductores(); // Recargar lista
    alert('Conductor actualizado exitosamente');
  } catch (error) {
    console.error("Error updating conductor:", error);
    const errorMsg = error.response?.data?.msg || 'Error al actualizar conductor';
    alert(errorMsg);
  }
};

const handleViewConductor = async (id) => {
  try {
    const response = await axiosJWT.get(`http://localhost:5000/conductores/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching conductor:", error);
    alert('Error al obtener detalles del conductor');
    return null;
  }
};
const handleDeleteConductor = async (id) => {
  if (window.confirm('¿Estás seguro de eliminar este conductor?')) {
    try {
      await axiosJWT.delete(`http://localhost:5000/conductores/${id}`);
      getConductores();
      alert('Conductor eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting conductor:", error);
      alert('Error al eliminar conductor');
    }
  }
};
  const handleCreateRole = async (roleData) => {
    try {
      await axiosJWT.post('http://localhost:5000/roles', roleData);
      getRoles();
      alert('Rol creado exitosamente');
    } catch (error) {
      console.error("Error creating role:", error);
      alert('Error al crear rol');
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este rol?')) {
      try {
        await axiosJWT.delete(`http://localhost:5000/roles/${id}`);
        getRoles();
        alert('Rol eliminado exitosamente');
      } catch (error) {
        console.error("Error deleting role:", error);
        alert('Error al eliminar rol');
      }
    }
  };

  const logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      setToken('');
      setName('');
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // 2FA Handlers
  const handleToggle2FA = async () => {
    if (!userEmail) {
      alert("Usuario no cargado aún");
      return;
    }

    if (!is2FAEnabled) {
      setShowSetup2FA(true);
      return;
    }

    try {
      const response = await axiosJWT.post(
        'http://localhost:5000/2fa/toggle',
        { email: userEmail, enable: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIs2FAEnabled(false);
      alert(response.data.msg);
    } catch (error) {
      console.error("Error al desactivar 2FA:", error);
      alert('Error al desactivar 2FA');
    }
  };

  const handleSetup2FAComplete = async () => {
    try {
      const response = await axiosJWT.post(
        'http://localhost:5000/2fa/toggle',
        { email: userEmail, enable: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIs2FAEnabled(true);
      setShowSetup2FA(false);
      alert('¡2FA configurado y activado exitosamente!');
    } catch (error) {
      console.error("Error al activar 2FA:", error);
      alert('Error al activar 2FA');
    }
  };

  const handleSetup2FACancel = () => {
    setShowSetup2FA(false);
  };

  // *** HANDLER PARA EL TOGGLE DEL MENÚ MÓVIL ***
  const handleMenuToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Funciones de renderizado simplificadas para otras vistas
  const renderSimplifiedView = (title, icon, description) => (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <CardHeader 
        title={title}
        action={
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: theme.primary,
              '&:hover': { bgcolor: `${theme.primary}dd` }
            }}
          >
            Nuevo
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          {React.cloneElement(icon, { sx: { fontSize: 80, color: theme.primary, mb: 2 } })}
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.muted, mb: 4 }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
            >
              Comenzar
            </Button>
            <Button variant="outlined">
              Ver Más
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeView) {
case 'dashboard': 
        return <DashboardHome 
          theme={theme} 
          alertas={alertas} 
          viajes={viajes} 
          setActiveView={setActiveView}
          showNewAlertModal={showNewAlertModal}
          newAlertas={newAlertas}
          handleCloseAlertModal={handleCloseAlertModal}
          handleOpenAlertModal={handleOpenAlertModal}
        />;
case 'usuarios': 
  return <UsuariosView 
    theme={theme} 
    users={users} 
    roles={roles}
    handleCreateUser={handleCreateUser}
    handleDeleteUser={handleDeleteUser}
    handleActivateUser={handleActivateUser}
    handleEditUser={handleEditUser}
    handleViewUser={handleViewUser}
  />;
      case 'roles': 
      return <RolesView 
        theme={theme} 
        roles={roles} 
        handleDeleteRole={handleDeleteRole}
        handleCreateRole={handleCreateRole}
      />;
      case 'pasajeros': 
      return <PasajerosView 
        theme={theme} 
        pasajeros={pasajeros} 
        handleCreatePasajero={handleCreatePasajero}
        handleDeletePasajero={handleDeletePasajero}
        handleEditPasajero={handleEditPasajero} 
      />;
case 'pasajerosViajes': 
  return (
    <PasajerosViajesView 
      theme={theme} 
      pasajerosViajes={pasajerosViajes}
      pasajeros={pasajeros} 
      viajes={viajes}
      vehiculos={vehiculos}
      handleCreatePasajeroViaje={handleCreatePasajeroViaje}
      handleDeletePasajeroViaje={handleDeletePasajeroViaje}
    />
  );

      case 'viajes': 
      return <ViajesView 
        theme={theme} 
        viajes={viajes} 
        conductores={conductores}
        vehiculos={vehiculos}
        handleDeleteViaje={handleDeleteViaje}
        handleCreateViaje={handleCreateViaje}
        handleEditViaje={handleEditViaje} 
      />;
      case 'conductores': 
  return <ConductoresView 
    theme={theme} 
    conductores={conductores}
    roles={roles}
    handleCreateConductor={handleCreateConductor}
    handleEditConductor={handleEditConductor}      // ✅ Agregar
    handleViewConductor={handleViewConductor}      // ✅ Agregar
    handleDeleteConductor={handleDeleteConductor}
  />;
   case 'vehiculos': 
      return <VehiculosView 
        theme={theme} 
        vehiculos={vehiculos}
        conductores={conductores}
        handleCreateVehiculo={handleCreateVehiculo}
        handleEditVehiculo={handleEditVehiculo}
        handleDeleteVehiculo={handleDeleteVehiculo}
        handleViewVehiculo={handleViewVehiculo}
        handleChangeEstado={handleChangeVehiculoEstado}
      />;
      case 'reportes': return renderSimplifiedView('Reportes y Estadísticas', <AssessmentIcon />, 'Análisis de rendimiento operacional');
      case 'configuracion': 
      return (
     <ConfiguracionView 
      theme={theme} 
      is2FAEnabled={is2FAEnabled}
      handleToggle2FA={handleToggle2FA}
      logout={logout}
      />
     );

default: 
        return <DashboardHome 
          theme={theme} 
          alertas={alertas} 
          viajes={viajes} 
          setActiveView={setActiveView}
          showNewAlertModal={showNewAlertModal}
          newAlertas={newAlertas}
          handleCloseAlertModal={handleCloseAlertModal}
          handleOpenAlertModal={handleOpenAlertModal}
        />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.background }}>
      
<Sidebar 
  theme={theme}
  name={name}
  fotoPerfil={foto_perfil} 
  activeView={activeView}
  setActiveView={setActiveView}
  logout={logout}
/>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.background,
          minHeight: '100vh'
          
        }}
      >
        {/* *** AQUÍ SE INTEGRA EL COMPONENTE HEADER *** */}
        <Header 
          colors={theme}
          activeView={activeView}
          menuItems={menuItems}
          id={id}
          name={name}
          fotoPerfil={foto_perfil} 
          logout={logout}
          onMenuToggle={handleMenuToggle}
          token={token}          
          axiosJWT={axiosJWT}    
        />

        {/* Contenido principal con padding */}
        <Box sx={{ p: 3 }}>
          {/* Dynamic Content */}
          {renderContent()}
        </Box>

        {/* 2FA Modal */}
        {showSetup2FA && (
          <Setup2FA 
            userEmail={userEmail}
            onComplete={handleSetup2FAComplete}
            onCancel={handleSetup2FACancel}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;