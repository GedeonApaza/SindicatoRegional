import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { Close as CloseIcon, People as PeopleIcon } from '@mui/icons-material';

const CrearPasajero = ({ colors, onCreatePasajero, show, onClose }) => {
  const [newPasajero, setNewPasajero] = useState({
    ci: '',
    nombre_completo: '',
    apellido_paterno: '',
    apellido_materno: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!newPasajero.ci.trim()) {
      newErrors.ci = 'CI es obligatorio';
    } else if (newPasajero.ci.length > 15) {
      newErrors.ci = 'El CI no puede tener más de 15 caracteres';
    }
    
    if (!newPasajero.nombre_completo.trim()) {
      newErrors.nombre_completo = 'Nombre completo es obligatorio';
    } else if (newPasajero.nombre_completo.length > 50) {
      newErrors.nombre_completo = 'El nombre no puede tener más de 50 caracteres';
    }
    
    if (newPasajero.apellido_paterno && newPasajero.apellido_paterno.length > 50) {
      newErrors.apellido_paterno = 'El apellido paterno no puede tener más de 50 caracteres';
    }
    
    if (newPasajero.apellido_materno && newPasajero.apellido_materno.length > 15) {
      newErrors.apellido_materno = 'El apellido materno no puede tener más de 15 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    // Preparar los datos para enviar
    const pasajeroData = {
      ci: newPasajero.ci.trim(),
      nombre_completo: newPasajero.nombre_completo.trim(),
      apellido_paterno: newPasajero.apellido_paterno.trim() || null,
      apellido_materno: newPasajero.apellido_materno.trim() || null
    };
    
    onCreatePasajero(pasajeroData);
    handleClose();
  };

  const handleClose = () => {
    setNewPasajero({
      ci: '',
      nombre_completo: '',
      apellido_paterno: '',
      apellido_materno: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewPasajero({ ...newPasajero, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Dialog 
      open={show} 
      onClose={handleClose}
      maxWidth="sm"
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
          <PeopleIcon />
          <Typography variant="h6">Registrar Nuevo Pasajero</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Complete la información del pasajero. Los campos marcados con * son obligatorios.
          </Alert>

          {/* Información Personal */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información Personal
          </Typography>
          
          <TextField
            label="Carnet de Identidad (CI)"
            variant="outlined"
            fullWidth
            required
            placeholder="Ej: 12345678"
            value={newPasajero.ci}
            onChange={(e) => handleInputChange('ci', e.target.value)}
            error={!!errors.ci}
            helperText={errors.ci || 'Ingrese el CI del pasajero (obligatorio)'}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          />

          <TextField
            label="Nombre Completo"
            variant="outlined"
            fullWidth
            required
            placeholder="Ej: Juan Carlos"
            value={newPasajero.nombre_completo}
            onChange={(e) => handleInputChange('nombre_completo', e.target.value)}
            error={!!errors.nombre_completo}
            helperText={errors.nombre_completo || 'Ingrese el nombre completo del pasajero'}
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
                label="Apellido Paterno"
                variant="outlined"
                fullWidth
                placeholder="Ej: Pérez"
                value={newPasajero.apellido_paterno}
                onChange={(e) => handleInputChange('apellido_paterno', e.target.value)}
                error={!!errors.apellido_paterno}
                helperText={errors.apellido_paterno}
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
                label="Apellido Materno"
                variant="outlined"
                fullWidth
                placeholder="Ej: García"
                value={newPasajero.apellido_materno}
                onChange={(e) => handleInputChange('apellido_materno', e.target.value)}
                error={!!errors.apellido_materno}
                helperText={errors.apellido_materno}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Resumen de datos */}
          {newPasajero.ci && newPasajero.nombre_completo && (
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>Resumen:</strong> Registrando a{' '}
                <strong>{newPasajero.nombre_completo}</strong>
                {newPasajero.apellido_paterno && ` ${newPasajero.apellido_paterno}`}
                {newPasajero.apellido_materno && ` ${newPasajero.apellido_materno}`}
                {' '}con CI <strong>{newPasajero.ci}</strong>.
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
          startIcon={<PeopleIcon />}
          disabled={!newPasajero.ci.trim() || !newPasajero.nombre_completo.trim()}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0'
            }
          }}
        >
          Registrar Pasajero
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearPasajero;