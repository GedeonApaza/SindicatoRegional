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

const EditarConductor = ({ conductor, colors, roles, onUpdateConductor, show, onClose }) => {
  const [editedConductor, setEditedConductor] = useState({
    ci: '',
    nombre_completo: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    celular: '',
    licencia: '',
    fecha_vencimiento_licencia: '',
    estado: 'activo',
    id_rol: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (conductor) {
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setEditedConductor({
        ci: String(conductor.ci || ''),
        nombre_completo: String(conductor.nombre_completo || ''),
        apellido_paterno: String(conductor.apellido_paterno || ''),
        apellido_materno: String(conductor.apellido_materno || ''),
        email: String(conductor.email || ''),
        celular: String(conductor.celular || ''),
        licencia: String(conductor.licencia || ''),
        fecha_vencimiento_licencia: formatDate(conductor.fecha_vencimiento_licencia),
        estado: conductor.estado || 'activo',
        id_rol: conductor.id_rol || ''
      });
    }
  }, [conductor]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!String(editedConductor.ci || '').trim()) newErrors.ci = 'CI es obligatorio';
    if (!String(editedConductor.nombre_completo || '').trim()) newErrors.nombre_completo = 'Nombre es obligatorio';
    if (!String(editedConductor.apellido_paterno || '').trim()) newErrors.apellido_paterno = 'Apellido paterno es obligatorio';
    if (!String(editedConductor.apellido_materno || '').trim()) newErrors.apellido_materno = 'Apellido materno es obligatorio';
    if (!String(editedConductor.email || '').trim()) newErrors.email = 'Email es obligatorio';
    if (!String(editedConductor.celular || '').trim()) newErrors.celular = 'Teléfono es obligatorio';
    if (!String(editedConductor.licencia || '').trim()) newErrors.licencia = 'Número de licencia es obligatorio';
    if (!editedConductor.fecha_vencimiento_licencia) newErrors.fecha_vencimiento_licencia = 'Fecha de vencimiento es obligatoria';
    if (!editedConductor.id_rol) newErrors.id_rol = 'Rol es obligatorio';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editedConductor.email && !emailRegex.test(editedConductor.email)) {
      newErrors.email = 'Email inválido';
    }

    if (editedConductor.fecha_vencimiento_licencia) {
      const vencimiento = new Date(editedConductor.fecha_vencimiento_licencia);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (vencimiento < hoy) {
        newErrors.fecha_vencimiento_licencia = 'La licencia está vencida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    onUpdateConductor(conductor.id_conductor, editedConductor);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setEditedConductor({ ...editedConductor, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (!conductor) return null;

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
          <Typography variant="h6">Editar Conductor</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información Personal
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CI"
                variant="outlined"
                fullWidth
                required
                value={editedConductor.ci}
                onChange={(e) => handleInputChange('ci', e.target.value)}
                error={!!errors.ci}
                helperText={errors.ci}
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
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={editedConductor.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          <TextField
            label="Nombre Completo"
            variant="outlined"
            fullWidth
            required
            value={editedConductor.nombre_completo}
            onChange={(e) => handleInputChange('nombre_completo', e.target.value)}
            error={!!errors.nombre_completo}
            helperText={errors.nombre_completo}
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
                required
                value={editedConductor.apellido_paterno}
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
                required
                value={editedConductor.apellido_materno}
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

          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            required
            value={editedConductor.celular}
            onChange={(e) => handleInputChange('celular', e.target.value)}
            error={!!errors.celular}
            helperText={errors.celular}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información de Licencia
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de Licencia"
                variant="outlined"
                fullWidth
                required
                value={editedConductor.licencia}
                onChange={(e) => handleInputChange('licencia', e.target.value)}
                error={!!errors.licencia}
                helperText={errors.licencia}
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
                label="Fecha de Vencimiento"
                variant="outlined"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={editedConductor.fecha_vencimiento_licencia}
                onChange={(e) => handleInputChange('fecha_vencimiento_licencia', e.target.value)}
                error={!!errors.fecha_vencimiento_licencia}
                helperText={errors.fecha_vencimiento_licencia}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Información del Sistema
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Rol"
                variant="outlined"
                fullWidth
                required
                value={editedConductor.id_rol}
                onChange={(e) => handleInputChange('id_rol', e.target.value)}
                error={!!errors.id_rol}
                helperText={errors.id_rol}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: colors?.background || '#f9f9f9',
                    borderRadius: '12px'
                  }
                }}
              >
                <MenuItem value="">
                  <em>Seleccionar rol</em>
                </MenuItem>
                {roles?.map(role => (
                  <MenuItem key={role.id_rol} value={role.id_rol}>
                    {role.nombre_rol}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Estado"
                variant="outlined"
                fullWidth
                required
                value={editedConductor.estado}
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
              </TextField>
            </Grid>
          </Grid>

          <Alert severity="info" sx={{ mt: 2 }}>
            La contraseña no se puede modificar desde este formulario por seguridad.
          </Alert>
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

export default EditarConductor;