// src/hooks/useHandlers.js
import { useCallback } from "react";

export const useHandlers = (axiosJWT, token, {
  getUsers,
  getPasajeros,
  getViajes,
  getPasajerosViajes,
  getVehiculos,
  getConductores,
  getRoles
}) => {

  // -------------------- USUARIOS --------------------
  const handleCreateUser = useCallback(async (userData, fotoPerfil) => {
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => formData.append(key, value));
      if (fotoPerfil) formData.append('foto_perfil', fotoPerfil);

      await axiosJWT.post('http://localhost:5000/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });

      getUsers();
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.response?.data?.msg || 'Error al crear usuario');
    }
  }, [axiosJWT, token, getUsers]);

  const handleEditUser = useCallback(async (id, userData) => {
    try {
      await axiosJWT.put(`http://localhost:5000/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getUsers();
      alert('Usuario actualizado exitosamente');
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.response?.data?.msg || 'Error al actualizar usuario');
    }
  }, [axiosJWT, token, getUsers]);

  const handleDeleteUser = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de desactivar este usuario?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/users/${id}`);
      getUsers();
      alert('Usuario desactivado exitosamente');
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.msg || 'Error al desactivar usuario');
    }
  }, [axiosJWT, getUsers]);

  const handleActivateUser = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de activar este usuario?')) return;
    try {
      await axiosJWT.put(`http://localhost:5000/users/${id}/activate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getUsers();
      alert('Usuario activado exitosamente');
    } catch (error) {
      console.error("Error activating user:", error);
      alert(error.response?.data?.msg || 'Error al activar usuario');
    }
  }, [axiosJWT, token, getUsers]);

  const handleViewUser = useCallback((userData) => {
    console.log('Ver detalles:', userData);
    alert('Función de vista en desarrollo');
  }, []);

  // -------------------- PASAJEROS --------------------
  const handleCreatePasajero = useCallback(async (pasajeroData) => {
    try {
      await axiosJWT.post('http://localhost:5000/pasajeros', pasajeroData);
      getPasajeros();
      alert('Pasajero registrado exitosamente');
    } catch (error) {
      console.error("Error creating pasajero:", error);
      alert(error.response?.data?.msg || 'Error al registrar pasajero');
    }
  }, [axiosJWT, getPasajeros]);

  const handleEditPasajero = useCallback(async (id, pasajeroData) => {
    try {
      await axiosJWT.put(`http://localhost:5000/pasajeros/${id}`, pasajeroData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getPasajeros();
      alert('Pasajero actualizado exitosamente');
    } catch (error) {
      console.error("Error updating pasajero:", error);
      alert(error.response?.data?.msg || 'Error al actualizar pasajero');
    }
  }, [axiosJWT, token, getPasajeros]);

  const handleDeletePasajero = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este pasajero?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/pasajeros/${id}`);
      getPasajeros();
      alert('Pasajero eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting pasajero:", error);
      alert('Error al eliminar pasajero');
    }
  }, [axiosJWT, getPasajeros]);

  // -------------------- VIAJES --------------------
  const handleCreateViaje = useCallback(async (viajeData) => {
    try {
      await axiosJWT.post('http://localhost:5000/viajes', viajeData);
      getViajes();
      alert('Viaje registrado exitosamente');
    } catch (error) {
      console.error("Error creating viaje:", error);
      alert(error.response?.data?.msg || 'Error al registrar viaje');
    }
  }, [axiosJWT, getViajes]);

  const handleEditViaje = useCallback(async (id, viajeData) => {
    try {
      await axiosJWT.put(`http://localhost:5000/viajes/${id}`, viajeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getViajes();
      alert('Viaje actualizado exitosamente');
    } catch (error) {
      console.error("Error updating viaje:", error);
      alert(error.response?.data?.msg || 'Error al actualizar viaje');
    }
  }, [axiosJWT, token, getViajes]);

  const handleDeleteViaje = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este viaje?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/viajes/${id}`);
      getViajes();
      alert('Viaje eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting viaje:", error);
      alert('Error al eliminar viaje');
    }
  }, [axiosJWT, getViajes]);

  // -------------------- PASAJEROS VIAJE --------------------
  const handleCreatePasajeroViaje = useCallback(async (data) => {
    try {
      await axiosJWT.post('http://localhost:5000/pasajeros_viaje', data);
      getPasajerosViajes();
      getViajes();
      alert('Pasajero asignado al viaje exitosamente');
    } catch (error) {
      console.error("Error creating pasajero viaje:", error);
      alert(error.response?.data?.msg || 'Error al asignar pasajero al viaje');
    }
  }, [axiosJWT, getPasajerosViajes, getViajes]);

  const handleDeletePasajeroViaje = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este pasajero del viaje?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/pasajeros_viaje/${id}`);
      getPasajerosViajes();
      getViajes();
      alert('Pasajero eliminado del viaje exitosamente');
    } catch (error) {
      console.error("Error deleting pasajero viaje:", error);
      alert('Error al eliminar pasajero del viaje');
    }
  }, [axiosJWT, getPasajerosViajes, getViajes]);

  // -------------------- VEHICULOS --------------------
  const handleCreateVehiculo = useCallback(async (data) => {
    try {
      await axiosJWT.post('http://localhost:5000/vehiculos', data);
      getVehiculos();
      alert('Vehiculo registrado exitosamente');
    } catch (error) {
      console.error("Error creating vehiculo:", error);
      alert(error.response?.data?.msg || 'Error al registrar vehiculo');
    }
  }, [axiosJWT, getVehiculos]);

  const handleEditVehiculo = useCallback(async (id, data) => {
    try {
      await axiosJWT.put(`http://localhost:5000/vehiculos/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getVehiculos();
      alert('Vehículo actualizado exitosamente');
    } catch (error) {
      console.error("Error updating vehiculo:", error);
      alert(error.response?.data?.msg || 'Error al actualizar vehículo');
    }
  }, [axiosJWT, token, getVehiculos]);

  const handleDeleteVehiculo = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este vehiculo?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/vehiculos/${id}`);
      getVehiculos();
      alert('Vehiculo eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting vehiculo:", error);
      alert('Error al eliminar vehiculo');
    }
  }, [axiosJWT, getVehiculos]);

  const handleChangeVehiculoEstado = useCallback(async (id, nuevoEstado) => {
    try {
      await axiosJWT.put(`http://localhost:5000/vehiculos/${id}`, { estado: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getVehiculos();
      alert(`Vehículo marcado como ${nuevoEstado}`);
    } catch (error) {
      console.error("Error changing vehiculo estado:", error);
      alert('Error al cambiar estado del vehículo');
    }
  }, [axiosJWT, getVehiculos]);

  // -------------------- CONDUCTORES --------------------
  const handleCreateConductor = useCallback(async (data) => {
    try {
      await axiosJWT.post('http://localhost:5000/conductores', data);
      getConductores();
      alert('Conductor registrado exitosamente');
    } catch (error) {
      console.error("Error creating conductor:", error);
      alert(error.response?.data?.msg || 'Error al registrar conductor');
    }
  }, [axiosJWT, getConductores]);

  const handleEditConductor = useCallback(async (id, data) => {
    try {
      await axiosJWT.put(`http://localhost:5000/conductores/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getConductores();
      alert('Conductor actualizado exitosamente');
    } catch (error) {
      console.error("Error updating conductor:", error);
      alert(error.response?.data?.msg || 'Error al actualizar conductor');
    }
  }, [axiosJWT, token, getConductores]);

  const handleDeleteConductor = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este conductor?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/conductores/${id}`);
      getConductores();
      alert('Conductor eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting conductor:", error);
      alert('Error al eliminar conductor');
    }
  }, [axiosJWT, getConductores]);

  // -------------------- ROLES --------------------
  const handleCreateRole = useCallback(async (data) => {
    try {
      await axiosJWT.post('http://localhost:5000/roles', data);
      getRoles();
      alert('Rol creado exitosamente');
    } catch (error) {
      console.error("Error creating role:", error);
      alert('Error al crear rol');
    }
  }, [axiosJWT, getRoles]);

  const handleDeleteRole = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este rol?')) return;
    try {
      await axiosJWT.delete(`http://localhost:5000/roles/${id}`);
      getRoles();
      alert('Rol eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting role:", error);
      alert('Error al eliminar rol');
    }
  }, [axiosJWT, getRoles]);

  // -------------------- RETORNO --------------------
  return {
    // Usuarios
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleActivateUser,
    handleViewUser,

    // Pasajeros
    handleCreatePasajero,
    handleEditPasajero,
    handleDeletePasajero,

    // Viajes
    handleCreateViaje,
    handleEditViaje,
    handleDeleteViaje,

    // Pasajero-Viaje
    handleCreatePasajeroViaje,
    handleDeletePasajeroViaje,

    // Vehículos
    handleCreateVehiculo,
    handleEditVehiculo,
    handleDeleteVehiculo,
    handleChangeVehiculoEstado,

    // Conductores
    handleCreateConductor,
    handleEditConductor,
    handleDeleteConductor,

    // Roles
    handleCreateRole,
    handleDeleteRole
  };
};
