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
import { Close as CloseIcon, DriveEta as DriveEtaIcon } from '@mui/icons-material';

const CrearConductor = ({ colors, roles, onCreateConductor, show, onClose }) => {
  // Buscar el rol de Conductor
  const conductorRole = roles?.find(role => 
    role.nombre_rol?.toLowerCase() === 'conductor'
  );

  const [newConductor, setNewConductor] = useState({
    ci: '',
    nombre_completo: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    confPassword: '',
    id_rol: conductorRole?.id_rol || '',
    licencia: '',
    fecha_vencimiento_licencia: '',
    celular: '',
    contacto_emergencia: '',
    fecha_ingreso: ''
  });
  
  const [errors, setErrors] = useState({});

  // Actualizar el id_rol cuando cambie conductorRole
  useEffect(() => {
    if (conductorRole?.id_rol) {
      setNewConductor(prev => ({ ...prev, id_rol: conductorRole.id_rol }));
    }
  }, [conductorRole]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!newConductor.ci.trim()) newErrors.ci = 'CI es obligatorio';
    if (!newConductor.nombre_completo.trim()) newErrors.nombre_completo = 'Nombre es obligatorio';
    if (!newConductor.apellido_paterno.trim()) newErrors.apellido_paterno = 'Apellido paterno es obligatorio';
    if (!newConductor.apellido_materno.trim()) newErrors.apellido_materno = 'Apellido materno es obligatorio';
    if (!newConductor.email.trim()) newErrors.email = 'Email es obligatorio';
    if (!newConductor.password.trim()) newErrors.password = 'Contraseña es obligatoria';
    if (!newConductor.confPassword.trim()) newErrors.confPassword = 'Confirmar contraseña es obligatorio';
    if (!newConductor.id_rol) newErrors.id_rol = 'Rol es obligatorio';
    if (!newConductor.licencia.trim()) newErrors.licencia = 'Licencia es obligatoria';
    if (!newConductor.fecha_vencimiento_licencia) newErrors.fecha_vencimiento_licencia = 'Fecha de vencimiento es obligatoria';
    if (!newConductor.celular.trim()) newErrors.celular = 'Celular es obligatorio';
    if (!newConductor.contacto_emergencia.trim()) newErrors.contacto_emergencia = 'Contacto de emergencia es obligatorio';
    if (!newConductor.fecha_ingreso) newErrors.fecha_ingreso = 'Fecha de ingreso es obligatoria';
    
    if (newConductor.password !== newConductor.confPassword) {
      newErrors.confPassword = 'Las contraseñas no coinciden';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newConductor.email && !emailRegex.test(newConductor.email)) {
      newErrors.email = 'Email inválido';
    }

    if (newConductor.password && newConductor.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    onCreateConductor(newConductor);
    handleClose();
  };

  const handleClose = () => {
    setNewConductor({
      ci: '',
      nombre_completo: '',
      apellido_paterno: '',
      apellido_materno: '',
      email: '',
      password: '',
      confPassword: '',
      id_rol: conductorRole?.id_rol || '',
      licencia: '',
      fecha_vencimiento_licencia: '',
      celular: '',
      contacto_emergencia: '',
      fecha_ingreso: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewConductor({ ...newConductor, [field]: value });
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
          <Typography variant="h6">Crear Conductor</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {!conductorRole ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            No puedes registrar un conductor. El rol "Conductor" no existe en el sistema.
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Información Personal */}
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
                  value={newConductor.ci}
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
                  value={newConductor.email}
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
              value={newConductor.nombre_completo}
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
                  value={newConductor.apellido_paterno}
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
                  value={newConductor.apellido_materno}
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

            {/* Información de Cuenta */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
              Información de Cuenta
            </Typography>

            <TextField
              select
              label="Rol"
              variant="outlined"
              fullWidth
              required
              value={newConductor.id_rol}
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: colors?.background || '#f9f9f9',
                  borderRadius: '12px'
                }
              }}
            >
              <MenuItem value={conductorRole?.id_rol}>
                {conductorRole?.nombre_rol}
              </MenuItem>
            </TextField>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  value={newConductor.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
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
                  label="Confirmar Contraseña"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  value={newConductor.confPassword}
                  onChange={(e) => handleInputChange('confPassword', e.target.value)}
                  error={!!errors.confPassword}
                  helperText={errors.confPassword}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: colors?.background || '#f9f9f9',
                      borderRadius: '12px'
                    }
                  }}
                />
              </Grid>
            </Grid>

            {/* Información del Conductor */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
              Información del Conductor
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Licencia"
                  variant="outlined"
                  fullWidth
                  required
                  value={newConductor.licencia}
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
                  label="Fecha Vencimiento Licencia"
                  variant="outlined"
                  type="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={newConductor.fecha_vencimiento_licencia}
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

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Celular"
                  variant="outlined"
                  fullWidth
                  required
                  value={newConductor.celular}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contacto Emergencia"
                  variant="outlined"
                  fullWidth
                  required
                  value={newConductor.contacto_emergencia}
                  onChange={(e) => handleInputChange('contacto_emergencia', e.target.value)}
                  error={!!errors.contacto_emergencia}
                  helperText={errors.contacto_emergencia}
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
              label="Fecha Ingreso"
              variant="outlined"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={newConductor.fecha_ingreso}
              onChange={(e) => handleInputChange('fecha_ingreso', e.target.value)}
              error={!!errors.fecha_ingreso}
              helperText={errors.fecha_ingreso}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: colors?.background || '#f9f9f9',
                  borderRadius: '12px'
                }
              }}
            />

            {/* Alerta si las contraseñas no coinciden */}
            {newConductor.password && newConductor.confPassword && newConductor.password !== newConductor.confPassword && (
              <Alert severity="error">
                Las contraseñas no coinciden
              </Alert>
            )}
          </Box>
        )}
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
          disabled={!conductorRole}
          startIcon={<DriveEtaIcon />}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0'
            }
          }}
        >
          Crear Conductor
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearConductor;