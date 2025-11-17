// handlers.js
// Archivo centralizado de handlers para todas las entidades

// ============================================
// USUARIOS HANDLERS
// ============================================
export const createUserHandlers = (axiosJWT, token, getUsers) => ({
  handleCreateUser: async (userData, fotoPerfil) => {
    try {
      const formData = new FormData();
      
      formData.append('ci', userData.ci);
      formData.append('nombre_completo', userData.nombre_completo);
      formData.append('apellido_paterno', userData.apellido_paterno);
      formData.append('apellido_materno', userData.apellido_materno);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('confPassword', userData.confPassword);
      formData.append('id_rol', userData.id_rol);
      formData.append('estado', 'activo');
      
      if (fotoPerfil) {
        formData.append('foto_perfil', fotoPerfil);
      }
      
      await axiosJWT.post('http://localhost:5000/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      getUsers();
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMsg = error.response?.data?.msg || 'Error al crear usuario';
      alert(errorMsg);
    }
  },

  handleEditUser: async (id, userData) => {
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
  },

  handleDeleteUser: async (id) => {
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
  },

  handleActivateUser: async (id) => {
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
  },

  handleViewUser: (userData) => {
    console.log('Ver detalles:', userData);
    alert('Función de vista en desarrollo');
  }
});

// ============================================
// ROLES HANDLERS
// ============================================
export const createRolesHandlers = (axiosJWT, token, getRoles) => ({
  handleCreateRole: async (roleData) => {
    try {
      await axiosJWT.post('http://localhost:5000/roles', roleData);
      getRoles();
      alert('Rol creado exitosamente');
    } catch (error) {
      console.error("Error creating role:", error);
      alert('Error al crear rol');
    }
  },

  handleDeleteRole: async (id) => {
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
  }
});

// ============================================
// PASAJEROS HANDLERS
// ============================================
export const createPasajerosHandlers = (axiosJWT, token, getPasajeros) => ({
  handleCreatePasajero: async (pasajeroData) => {
    try {
      await axiosJWT.post('http://localhost:5000/pasajeros', pasajeroData);
      getPasajeros();
      alert('Pasajero registrado exitosamente');
    } catch (error) {
      console.error("Error creating pasajero:", error);
      const errorMsg = error.response?.data?.msg || 'Error al registrar pasajero';
      alert(errorMsg);
    }
  },

  handleEditPasajero: async (id, pasajeroData) => {
    try {
      await axiosJWT.put(`http://localhost:5000/pasajeros/${id}`, pasajeroData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getPasajeros();
      alert('Pasajero actualizado exitosamente');
    } catch (error) {
      console.error("Error updating Pasajero:", error);
      const errorMsg = error.response?.data?.msg || 'Error al actualizar Pasajero';
      alert(errorMsg);
    }
  },

  handleDeletePasajero: async (id) => {
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
  }
});

// ============================================
// VIAJES HANDLERS
// ============================================
export const createViajesHandlers = (axiosJWT, token, getViajes) => ({
  handleCreateViaje: async (viajeData) => {
    try {
      await axiosJWT.post('http://localhost:5000/viajes', viajeData);
      getViajes();
      alert('Viaje registrado exitosamente');
    } catch (error) {
      console.error("Error creating viajes:", error);
      const errorMsg = error.response?.data?.msg || 'Error al registrar viaje';
      alert(errorMsg);
    }
  },

  handleEditViaje: async (id, viajeData) => {
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
  },

  handleDeleteViaje: async (id) => {
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
  }
});

// ============================================
// PASAJEROS VIAJES HANDLERS
// ============================================
export const createPasajerosViajesHandlers = (axiosJWT, token, getPasajerosViajes, getViajes) => ({
  handleCreatePasajeroViaje: async (pasajeroViajeData) => {
    try {
      await axiosJWT.post('http://localhost:5000/pasajeros_viaje', pasajeroViajeData);
      getPasajerosViajes();
      getViajes();
      alert('Pasajero asignado al viaje exitosamente');
    } catch (error) {
      console.error("Error creating pasajero viaje:", error);
      const errorMsg = error.response?.data?.msg || 'Error al asignar pasajero al viaje';
      alert(errorMsg);
    }
  },

  handleDeletePasajeroViaje: async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pasajero del viaje?')) {
      try {
        await axiosJWT.delete(`http://localhost:5000/pasajeros_viaje/${id}`);
        getPasajerosViajes();
        getViajes();
        alert('Pasajero eliminado del viaje exitosamente');
      } catch (error) {
        console.error("Error deleting pasajero viaje:", error);
        alert('Error al eliminar pasajero del viaje');
      }
    }
  }
});

// ============================================
// VEHICULOS HANDLERS
// ============================================
export const createVehiculosHandlers = (axiosJWT, token, getVehiculos) => ({
  handleCreateVehiculo: async (vehiculoData) => {
    try {
      await axiosJWT.post('http://localhost:5000/vehiculos', vehiculoData);
      getVehiculos();
      alert('Vehiculo registrado exitosamente');
    } catch (error) {
      console.error("Error creating vehiculo:", error);
      const errorMsg = error.response?.data?.msg || 'Error al registrar vehiculo';
      alert(errorMsg);
    }
  },

  handleEditVehiculo: async (id, vehiculoData) => {
    try {
      await axiosJWT.put(`http://localhost:5000/vehiculos/${id}`, vehiculoData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getVehiculos();
      alert('Vehículo actualizado exitosamente');
    } catch (error) {
      console.error("Error updating vehiculo:", error);
      const errorMsg = error.response?.data?.msg || 'Error al actualizar vehículo';
      alert(errorMsg);
    }
  },

  handleViewVehiculo: async (id) => {
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
  },

  handleDeleteVehiculo: async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este vehiculo?')) {
      try {
        await axiosJWT.delete(`http://localhost:5000/vehiculos/${id}`);
        getVehiculos();
        alert('Vehiculo eliminado exitosamente');
      } catch (error) {
        console.error("Error deleting vehiculo:", error);
        alert('Error al eliminar vehiculo');
      }
    }
  },

  handleChangeVehiculoEstado: async (id, nuevoEstado) => {
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
  }
});

// ============================================
// CONDUCTORES HANDLERS
// ============================================
export const createConductoresHandlers = (axiosJWT, token, getConductores) => ({
  handleCreateConductor: async (conductorData) => {
    try {
      await axiosJWT.post('http://localhost:5000/conductores', conductorData);
      getConductores();
      alert('Conductor registrado exitosamente');
    } catch (error) {
      console.error("Error creating conductor:", error);
      const errorMsg = error.response?.data?.msg || 'Error al registrar conductor';
      alert(errorMsg);
    }
  },

  handleEditConductor: async (id, conductorData) => {
    try {
      await axiosJWT.put(`http://localhost:5000/conductores/${id}`, conductorData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getConductores();
      alert('Conductor actualizado exitosamente');
    } catch (error) {
      console.error("Error updating conductor:", error);
      const errorMsg = error.response?.data?.msg || 'Error al actualizar conductor';
      alert(errorMsg);
    }
  },

  handleViewConductor: async (id) => {
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
  },

  handleDeleteConductor: async (id) => {
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
  }
});