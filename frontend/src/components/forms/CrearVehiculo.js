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
import { Close as CloseIcon, DriveEta as DriveEtaIcon } from '@mui/icons-material';

const CrearVehiculo = ({ colors, conductores, onCreateVehiculo, show, onClose }) => {
  const [newVehiculo, setNewVehiculo] = useState({
    placa: '',
    marca: '',
    modelo: '',
    anio: '',
    capacidad_pasajeros: 6,
    id_conductor: '',
    estado: 'activo'
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!newVehiculo.placa.trim()) {
      newErrors.placa = 'Placa es obligatoria';
    } else if (newVehiculo.placa.length > 10) {
      newErrors.placa = 'La placa no puede tener más de 10 caracteres';
    }
    
    if (newVehiculo.marca && newVehiculo.marca.length > 30) {
      newErrors.marca = 'La marca no puede tener más de 30 caracteres';
    }
    
    if (newVehiculo.modelo && newVehiculo.modelo.length > 30) {
      newErrors.modelo = 'El modelo no puede tener más de 30 caracteres';
    }
    
    if (newVehiculo.anio) {
      const currentYear = new Date().getFullYear();
      const year = parseInt(newVehiculo.anio);
      if (isNaN(year) || year < 1900 || year > currentYear + 1) {
        newErrors.anio = `El año debe estar entre 1900 y ${currentYear + 1}`;
      }
    }
    
    if (newVehiculo.capacidad_pasajeros) {
      const capacidad = parseInt(newVehiculo.capacidad_pasajeros);
      if (isNaN(capacidad) || capacidad < 1 || capacidad > 100) {
        newErrors.capacidad_pasajeros = 'La capacidad debe estar entre 1 y 100 pasajeros';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    // Preparar los datos para enviar
    const vehiculoData = {
      placa: newVehiculo.placa.trim().toUpperCase(),
      marca: newVehiculo.marca.trim() || null,
      modelo: newVehiculo.modelo.trim() || null,
      anio: newVehiculo.anio ? parseInt(newVehiculo.anio) : null,
      capacidad_pasajeros: parseInt(newVehiculo.capacidad_pasajeros) || 6,
      id_conductor: newVehiculo.id_conductor || null,
      estado: newVehiculo.estado
    };
    
    onCreateVehiculo(vehiculoData);
    handleClose();
  };

  const handleClose = () => {
    setNewVehiculo({
      placa: '',
      marca: '',
      modelo: '',
      anio: '',
      capacidad_pasajeros: 6,
      id_conductor: '',
      estado: 'activo'
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewVehiculo({ ...newVehiculo, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

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
          <DriveEtaIcon />
          <Typography variant="h6">Registrar Nuevo Vehículo</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Complete la información del vehículo. Solo la placa es obligatoria.
          </Alert>

          {/* Información Básica del Vehículo */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información Básica
          </Typography>
          
          <TextField
            label="Placa"
            variant="outlined"
            fullWidth
            required
            placeholder="Ej: ABC-1234"
            value={newVehiculo.placa}
            onChange={(e) => handleInputChange('placa', e.target.value.toUpperCase())}
            error={!!errors.placa}
            helperText={errors.placa || 'Ingrese la placa del vehículo (obligatorio)'}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Marca"
                variant="outlined"
                fullWidth
                placeholder="Ej: Toyota, Nissan"
                value={newVehiculo.marca}
                onChange={(e) => handleInputChange('marca', e.target.value)}
                error={!!errors.marca}
                helperText={errors.marca}
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
                label="Modelo"
                variant="outlined"
                fullWidth
                placeholder="Ej: Hiace, Coaster"
                value={newVehiculo.modelo}
                onChange={(e) => handleInputChange('modelo', e.target.value)}
                error={!!errors.modelo}
                helperText={errors.modelo}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Año"
                variant="outlined"
                type="number"
                fullWidth
                placeholder={new Date().getFullYear().toString()}
                value={newVehiculo.anio}
                onChange={(e) => handleInputChange('anio', e.target.value)}
                error={!!errors.anio}
                helperText={errors.anio || 'Año de fabricación del vehículo'}
                inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
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
                label="Capacidad de Pasajeros"
                variant="outlined"
                type="number"
                fullWidth
                value={newVehiculo.capacidad_pasajeros}
                onChange={(e) => handleInputChange('capacidad_pasajeros', e.target.value)}
                error={!!errors.capacidad_pasajeros}
                helperText={errors.capacidad_pasajeros || 'Número de pasajeros permitidos'}
                inputProps={{ min: 1, max: 100 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Asignación y Estado */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Asignación y Estado
          </Typography>

          <TextField
            select
            label="Conductor Asignado"
            variant="outlined"
            fullWidth
            value={newVehiculo.id_conductor}
            onChange={(e) => handleInputChange('id_conductor', e.target.value)}
            helperText="Puede asignar un conductor ahora o dejarlo sin asignar"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          >
            <MenuItem value="">
              <em>Sin asignar</em>
            </MenuItem>
            {conductores?.map(c => (
              <MenuItem key={c.conductor?.id_conductor} value={c.conductor?.id_conductor}>
                {c.usuario?.nombre_completo} - {c.conductor?.licencia}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Estado del Vehículo"
            variant="outlined"
            fullWidth
            value={newVehiculo.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            helperText="Estado operativo del vehículo"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          >
            <MenuItem value="activo">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                Activo
              </Box>
            </MenuItem>
            <MenuItem value="mantenimiento">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
                Mantenimiento
              </Box>
            </MenuItem>
            <MenuItem value="inactivo">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                Inactivo
              </Box>
            </MenuItem>
          </TextField>

          {/* Resumen de datos */}
          {newVehiculo.placa && (
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>Resumen:</strong> Vehículo con placa <strong>{newVehiculo.placa}</strong>
                {newVehiculo.marca && `, marca ${newVehiculo.marca}`}
                {newVehiculo.modelo && ` modelo ${newVehiculo.modelo}`}
                {newVehiculo.anio && ` del año ${newVehiculo.anio}`}
                , con capacidad para <strong>{newVehiculo.capacidad_pasajeros} pasajeros</strong>.
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
          startIcon={<DriveEtaIcon />}
          disabled={!newVehiculo.placa.trim()}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0'
            }
          }}
        >
          Registrar Vehículo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearVehiculo;