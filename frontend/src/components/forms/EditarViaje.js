import React, { useState, useEffect } from 'react';
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
import { Close as CloseIcon, Save as SaveIcon, DirectionsBus as BusIcon } from '@mui/icons-material';

const EditarViaje = ({ viaje, colors, vehiculos, conductores, onUpdateViaje, show, onClose }) => {
  const [editedViaje, setEditedViaje] = useState({
    id_vehiculo: '',
    id_conductor: '',
    fecha_inicio: '',
    fecha_fin: '',
    origen: '',
    destino: '',
    estado: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (viaje) {
      setEditedViaje({
        id_vehiculo: viaje.id_vehiculo || '',
        id_conductor: viaje.id_conductor || '',
        fecha_inicio: viaje.fecha_inicio ? viaje.fecha_inicio.slice(0, 16) : '',
        fecha_fin: viaje.fecha_fin ? viaje.fecha_fin.slice(0, 16) : '',
        origen: viaje.origen || '',
        destino: viaje.destino || '',
        estado: viaje.estado || 'programado'
      });
    }
  }, [viaje]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!editedViaje.id_vehiculo) {
      newErrors.id_vehiculo = 'Debe seleccionar un vehículo';
    }
    
    if (!editedViaje.id_conductor) {
      newErrors.id_conductor = 'Debe seleccionar un conductor';
    }
    
    if (editedViaje.origen && editedViaje.origen.length > 50) {
      newErrors.origen = 'El origen no puede tener más de 50 caracteres';
    }
    
    if (editedViaje.destino && editedViaje.destino.length > 50) {
      newErrors.destino = 'El destino no puede tener más de 50 caracteres';
    }
    
    if (editedViaje.fecha_inicio && editedViaje.fecha_fin) {
      const inicio = new Date(editedViaje.fecha_inicio);
      const fin = new Date(editedViaje.fecha_fin);
      if (fin < inicio) {
        newErrors.fecha_fin = 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const viajeData = {
      id_vehiculo: parseInt(editedViaje.id_vehiculo),
      id_conductor: parseInt(editedViaje.id_conductor),
      fecha_inicio: editedViaje.fecha_inicio || null,
      fecha_fin: editedViaje.fecha_fin || null,
      origen: editedViaje.origen.trim(),
      destino: editedViaje.destino.trim(),
      estado: editedViaje.estado
    };
    
    onUpdateViaje(viaje.id_viaje, viajeData);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setEditedViaje({ ...editedViaje, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (!viaje) return null;

  const vehiculosActivos = vehiculos?.filter(v => v.estado === 'activo') || [];
  const conductoresActivos = conductores?.filter(c => c.usuario?.estado === 'activo') || [];

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
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
          <Typography variant="h6">Editar Viaje</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Modifique la información del viaje según sea necesario.
          </Alert>

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
                value={editedViaje.id_vehiculo}
                onChange={(e) => handleInputChange('id_vehiculo', e.target.value)}
                error={!!errors.id_vehiculo}
                helperText={errors.id_vehiculo}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {vehiculosActivos.length === 0 ? (
                  <MenuItem disabled>
                    <em>No hay vehículos activos disponibles</em>
                  </MenuItem>
                ) : (
                  vehiculosActivos.map(v => (
                    <MenuItem key={v.id_vehiculo} value={v.id_vehiculo}>
                      {v.placa} - {v.marca} {v.modelo}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Conductor"
                variant="outlined"
                fullWidth
                required
                value={editedViaje.id_conductor}
                onChange={(e) => handleInputChange('id_conductor', e.target.value)}
                error={!!errors.id_conductor}
                helperText={errors.id_conductor}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {conductoresActivos.length === 0 ? (
                  <MenuItem disabled>
                    <em>No hay conductores activos disponibles</em>
                  </MenuItem>
                ) : (
                  conductoresActivos.map(c => (
                    <MenuItem key={c.conductor?.id_conductor} value={c.conductor?.id_conductor}>
                      {c.usuario?.nombre_completo}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información de Ruta
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Origen"
                variant="outlined"
                fullWidth
                value={editedViaje.origen}
                onChange={(e) => handleInputChange('origen', e.target.value)}
                error={!!errors.origen}
                helperText={errors.origen}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destino"
                variant="outlined"
                fullWidth
                value={editedViaje.destino}
                onChange={(e) => handleInputChange('destino', e.target.value)}
                error={!!errors.destino}
                helperText={errors.destino}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>
          </Grid>

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
                value={editedViaje.fecha_inicio}
                onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
                error={!!errors.fecha_inicio}
                helperText={errors.fecha_inicio}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha y Hora de Fin"
                variant="outlined"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={editedViaje.fecha_fin}
                onChange={(e) => handleInputChange('fecha_fin', e.target.value)}
                error={!!errors.fecha_fin}
                helperText={errors.fecha_fin}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Estado del Viaje
          </Typography>

          <TextField
            select
            label="Estado"
            variant="outlined"
            fullWidth
            value={editedViaje.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!editedViaje.id_vehiculo || !editedViaje.id_conductor}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0'
            }
          }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarViaje;