import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { Close as CloseIcon, DirectionsBus as BusIcon } from '@mui/icons-material';

const CrearViaje = ({ colors, vehiculos, conductores, onCreateViaje, show, onClose }) => {
  const [newViaje, setNewViaje] = useState({
    id_vehiculo: '',
    fecha_inicio: '',
    fecha_fin: '',
    origen: 'La Paz',
    destino: 'Caranavi',
    estado: 'programado'
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!newViaje.id_vehiculo) {
      newErrors.id_vehiculo = 'Debe seleccionar un vehículo';
    }
    
    if (newViaje.origen && newViaje.origen.length > 50) {
      newErrors.origen = 'El origen no puede tener más de 50 caracteres';
    }
    
    if (newViaje.destino && newViaje.destino.length > 50) {
      newErrors.destino = 'El destino no puede tener más de 50 caracteres';
    }
    
    // Validar que fecha_fin sea posterior a fecha_inicio si ambas están definidas
    if (newViaje.fecha_inicio && newViaje.fecha_fin) {
      const inicio = new Date(newViaje.fecha_inicio);
      const fin = new Date(newViaje.fecha_fin);
      if (fin < inicio) {
        newErrors.fecha_fin = 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    const vehiculoSeleccionado = vehiculosActivos.find(
      (v) => v.id_vehiculo === parseInt(newViaje.id_vehiculo)
    );
    const conductorId = vehiculoSeleccionado?.id_conductor || vehiculoSeleccionado?.conductor?.id_conductor || null;

    // Preparar los datos para enviar
    const viajeData = {
      id_vehiculo: parseInt(newViaje.id_vehiculo),
      id_conductor: conductorId || null,
      fecha_inicio: newViaje.fecha_inicio || null,
      fecha_fin: newViaje.fecha_fin || null,
      origen: newViaje.origen.trim() || 'La Paz',
      destino: newViaje.destino.trim() || 'Caranavi',
      estado: newViaje.estado
    };
    
    onCreateViaje(viajeData);
    handleClose();
  };

  const handleClose = () => {
    setNewViaje({
      id_vehiculo: '',
      fecha_inicio: '',
      fecha_fin: '',
      origen: 'La Paz',
      destino: 'Caranavi',
      estado: 'programado'
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewViaje({ ...newViaje, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Obtener vehículos activos
  const vehiculosActivos = vehiculos?.filter(v => v.estado === 'activo') || [];
  
  // Obtener conductores activos
  const conductoresActivos = conductores?.filter(c => c.usuario?.estado === 'activo') || [];

  const vehiculoSeleccionado = vehiculosActivos.find(
    (v) => v.id_vehiculo === parseInt(newViaje.id_vehiculo)
  );

  const conductorAsignado = vehiculoSeleccionado
    ? conductoresActivos.find(
        (c) => c.conductor?.id_conductor === (vehiculoSeleccionado.id_conductor || vehiculoSeleccionado.conductor?.id_conductor)
      )
      || vehiculoSeleccionado.conductor
    : null;
  const nombreConductor = conductorAsignado?.usuario?.nombre_completo || conductorAsignado?.nombre_completo || 'No asignado';
  const conductorDisponible = Boolean(conductorAsignado);

  return (
    <Dialog 
      open={show} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          backgroundColor: colors?.background || '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusIcon />
          <Typography variant="h6">Programar Nuevo Viaje</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Complete la información del viaje. El vehículo determina automáticamente el conductor asignado.
          </Alert>

          {/* Asignación de Recursos */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Asignación de Recursos
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Vehículo"
                variant="outlined"
                fullWidth
                required
                value={newViaje.id_vehiculo}
                onChange={(e) => handleInputChange('id_vehiculo', e.target.value)}
                error={!!errors.id_vehiculo}
                helperText={errors.id_vehiculo || 'Seleccione el vehículo para el viaje'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              >
                <MenuItem value="">
                  <em>Seleccionar vehículo</em>
                </MenuItem>
                {vehiculosActivos.length === 0 ? (
                  <MenuItem disabled>
                    <em>No hay vehículos activos disponibles</em>
                  </MenuItem>
                ) : (
                  vehiculosActivos.map(v => (
                    <MenuItem key={v.id_vehiculo} value={v.id_vehiculo}>
                      {v.placa} - {v.marca} {v.modelo} ({v.capacidad_pasajeros} pasajeros)
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Conductor asignado"
                variant="outlined"
                fullWidth
                value={newViaje.id_vehiculo ? nombreConductor : ''}
                helperText={
                  newViaje.id_vehiculo
                    ? (conductorDisponible ? 'Conductor vinculado al vehículo seleccionado' : 'Este vehículo no tiene conductor asignado')
                    : 'Seleccione un vehículo para ver el conductor'
                }
                InputProps={{ readOnly: true }}
                disabled={!newViaje.id_vehiculo}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Información de Ruta */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información de Ruta
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Origen"
                variant="outlined"
                fullWidth
                value={newViaje.origen}
                onChange={(e) => handleInputChange('origen', e.target.value)}
                error={!!errors.origen}
                helperText={errors.origen || 'Ciudad o lugar de origen'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destino"
                variant="outlined"
                fullWidth
                value={newViaje.destino}
                onChange={(e) => handleInputChange('destino', e.target.value)}
                error={!!errors.destino}
                helperText={errors.destino || 'Ciudad o lugar de destino'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Fechas y Horarios */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Fechas y Horarios
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha y Hora de Inicio"
                variant="outlined"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newViaje.fecha_inicio}
                onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
                error={!!errors.fecha_inicio}
                helperText={errors.fecha_inicio || 'Fecha y hora de salida'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha y Hora de Fin"
                variant="outlined"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newViaje.fecha_fin}
                onChange={(e) => handleInputChange('fecha_fin', e.target.value)}
                error={!!errors.fecha_fin}
                helperText={errors.fecha_fin || 'Fecha y hora estimada de llegada'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Estado del Viaje */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Estado del Viaje
          </Typography>

          <TextField
            select
            label="Estado"
            variant="outlined"
            fullWidth
            value={newViaje.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            helperText="Estado inicial del viaje"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          >
            <MenuItem value="programado">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'info.main' }} />
                Programado
              </Box>
            </MenuItem>
            <MenuItem value="en_ruta">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
                En ruta
              </Box>
            </MenuItem>
            <MenuItem value="finalizado">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                Finalizado
              </Box>
            </MenuItem>
            <MenuItem value="cancelado">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                Cancelado
              </Box>
            </MenuItem>
          </TextField>

          {/* Resumen de datos */}
          {newViaje.id_vehiculo && conductorDisponible && (
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>Resumen:</strong> Viaje de <strong>{newViaje.origen}</strong> a <strong>{newViaje.destino}</strong>
                {newViaje.fecha_inicio && ` programado para el ${new Date(newViaje.fecha_inicio).toLocaleString('es-BO')}`}.
              </Typography>
            </Alert>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<BusIcon />}
          disabled={!newViaje.id_vehiculo || (newViaje.id_vehiculo && !conductorDisponible)}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0'
            }
          }}
        >
          Programar Viaje
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearViaje;