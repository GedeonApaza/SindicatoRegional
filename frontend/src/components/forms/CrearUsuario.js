import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert
} from '@mui/material';
import { Close as CloseIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

const CrearUsuario = ({ colors, roles, onCreateUser, show, onClose }) => {
  const [newUser, setNewUser] = useState({
    ci: '', 
    nombre_completo: '', 
    apellido_paterno: '', 
    apellido_materno: '',
    email: '', 
    password: '', 
    confPassword: '', 
    id_rol: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!newUser.ci.trim()) newErrors.ci = 'CI es obligatorio';
    if (!newUser.nombre_completo.trim()) newErrors.nombre_completo = 'Nombre es obligatorio';
    if (!newUser.email.trim()) newErrors.email = 'Email es obligatorio';
    if (!newUser.password.trim()) newErrors.password = 'Contraseña es obligatoria';
    if (!newUser.confPassword.trim()) newErrors.confPassword = 'Confirmar contraseña es obligatorio';
    if (!newUser.id_rol) newErrors.id_rol = 'Rol es obligatorio';
    
    if (newUser.password !== newUser.confPassword) {
      newErrors.confPassword = 'Las contraseñas no coinciden';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newUser.email && !emailRegex.test(newUser.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    onCreateUser(newUser);
    handleClose();
  };

  const handleClose = () => {
    setNewUser({
      ci: '', 
      nombre_completo: '', 
      apellido_paterno: '', 
      apellido_materno: '',
      email: '', 
      password: '', 
      confPassword: '', 
      id_rol: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
    // Limpiar error del campo cuando el usuario empiece a escribir
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
          <PersonAddIcon />
          <Typography variant="h6">Crear Usuario</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
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
                value={newUser.ci}
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
                label="Nombre Completo"
                variant="outlined"
                fullWidth
                required
                value={newUser.nombre_completo}
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
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido Paterno"
                variant="outlined"
                fullWidth
                value={newUser.apellido_paterno}
                onChange={(e) => handleInputChange('apellido_paterno', e.target.value)}
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
                value={newUser.apellido_materno}
                onChange={(e) => handleInputChange('apellido_materno', e.target.value)}
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
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={newUser.email}
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

          <FormControl 
            fullWidth 
            required 
            error={!!errors.id_rol}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors?.background || '#f9f9f9',
                borderRadius: '12px'
              }
            }}
          >
            <InputLabel>Rol</InputLabel>
            <Select
              value={newUser.id_rol}
              label="Rol"
              onChange={(e) => handleInputChange('id_rol', e.target.value)}
            >
              <MenuItem value="">
                <em>Seleccionar rol</em>
              </MenuItem>
              {roles?.map(role => (
                <MenuItem key={role.id_rol} value={role.id_rol}>
                  {role.nombre_rol}
                </MenuItem>
              ))}
            </Select>
            {errors.id_rol && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.id_rol}
              </Typography>
            )}
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={newUser.password}
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
                value={newUser.confPassword}
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

          {/* Mostrar alerta si las contraseñas no coinciden */}
          {newUser.password && newUser.confPassword && newUser.password !== newUser.confPassword && (
            <Alert severity="error">
              Las contraseñas no coinciden
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
          startIcon={<PersonAddIcon />}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0'
            }
          }}
        >
          Crear Usuario
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearUsuario;