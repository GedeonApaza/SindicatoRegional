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
import {
  Close as CloseIcon,
  Save as SaveIcon,
  DriveEta as DriveEtaIcon
} from '@mui/icons-material';

const EditarVehiculo = ({ vehiculo, colors, conductores, onUpdateVehiculo, show, onClose }) => {
  const [editedVehiculo, setEditedVehiculo] = useState({
    placa: '',
    marca: '',
    modelo: '',
    anio: '',
    capacidad_pasajeros: '',
    id_conductor: '',
    estado: 'activo'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehiculo) {
      setEditedVehiculo({
        placa: String(vehiculo.placa || ''),
        marca: String(vehiculo.marca || ''),
        modelo: String(vehiculo.modelo || ''),
        anio: String(vehiculo.anio || ''),
        capacidad_pasajeros: String(vehiculo.capacidad_pasajeros || ''),
        id_conductor: vehiculo.id_conductor || '',
        estado: vehiculo.estado || 'activo'
      });
    }
  }, [vehiculo]);

  const validateForm = () => {
    const newErrors = {};

    if (!editedVehiculo.placa.trim()) newErrors.placa = 'La placa es obligatoria';
    if (!editedVehiculo.marca.trim()) newErrors.marca = 'La marca es obligatoria';
    if (!editedVehiculo.modelo.trim()) newErrors.modelo = 'El modelo es obligatorio';
    if (!editedVehiculo.anio.trim()) newErrors.anio = 'El año es obligatorio';
    if (!editedVehiculo.capacidad_pasajeros.trim()) newErrors.capacidad_pasajeros = 'La capacidad es obligatoria';
    if (!editedVehiculo.id_conductor) newErrors.id_conductor = 'Debe asignar un conductor';

    // Validar año (opcional)
    if (editedVehiculo.anio && (isNaN(editedVehiculo.anio) || editedVehiculo.anio < 1900 || editedVehiculo.anio > new Date().getFullYear() + 1)) {
      newErrors.anio = 'Año inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onUpdateVehiculo(vehiculo.id_vehiculo, editedVehiculo);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setEditedVehiculo({ ...editedVehiculo, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (!vehiculo) return null;

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
          <DriveEtaIcon />
          <Typography variant="h6">Editar Vehículo</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Información del Vehículo */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información del Vehículo
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Placa"
                variant="outlined"
                fullWidth
                required
                value={editedVehiculo.placa}
                onChange={(e) => handleInputChange('placa', e.target.value.toUpperCase())}
                error={!!errors.placa}
                helperText={errors.placa}
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
                label="Marca"
                variant="outlined"
                fullWidth
                required
                value={editedVehiculo.marca}
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
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Modelo"
                variant="outlined"
                fullWidth
                required
                value={editedVehiculo.modelo}
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

            <Grid item xs={12} sm={6}>
              <TextField
                label="Año"
                variant="outlined"
                fullWidth
                required
                value={editedVehiculo.anio}
                onChange={(e) => handleInputChange('anio', e.target.value)}
                error={!!errors.anio}
                helperText={errors.anio}
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
                label="Capacidad de Pasajeros"
                variant="outlined"
                type="number"
                fullWidth
                required
                value={editedVehiculo.capacidad_pasajeros}
                onChange={(e) => handleInputChange('capacidad_pasajeros', e.target.value)}
                error={!!errors.capacidad_pasajeros}
                helperText={errors.capacidad_pasajeros}
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
                select
                label="Conductor Asignado"
                variant="outlined"
                fullWidth
                required
                value={editedVehiculo.id_conductor}
                onChange={(e) => handleInputChange('id_conductor', e.target.value)}
                error={!!errors.id_conductor}
                helperText={errors.id_conductor}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              >
                <MenuItem value="">
                  <em>Seleccionar conductor</em>
                </MenuItem>
                {conductores?.map((c) => (
                  <MenuItem key={c.conductor.id_conductor} value={c.conductor.id_conductor}>
                    {c.usuario?.nombre_completo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Estado */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Estado del Vehículo
          </Typography>

          <TextField
            select
            label="Estado"
            variant="outlined"
            fullWidth
            required
            value={editedVehiculo.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
            <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
          </TextField>

          <Alert severity="info" sx={{ mt: 2 }}>
            Revise los datos antes de guardar. La edición impactará en los registros activos.
          </Alert>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SaveIcon />}
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

export default EditarVehiculo;
