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
  Person as PersonIcon
} from '@mui/icons-material';

const EditarUsuario = ({ usuario, colors, roles, onUpdateUser, show, onClose }) => {
  const [editedUser, setEditedUser] = useState({
    ci: '',
    nombre_completo: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    id_rol: '',
    estado: 'activo'
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (usuario) {
      setEditedUser({
        ci: String(usuario.ci || ''),
        nombre_completo: String(usuario.nombre_completo || ''),
        apellido_paterno: String(usuario.apellido_paterno || ''),
        apellido_materno: String(usuario.apellido_materno || ''),
        email: String(usuario.email || ''),
        id_rol: usuario.id_rol || '',
        estado: usuario.estado || 'activo'
      });
    }
  }, [usuario]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!String(editedUser.ci || '').trim()) newErrors.ci = 'CI es obligatorio';
    if (!String(editedUser.nombre_completo || '').trim()) newErrors.nombre_completo = 'Nombre es obligatorio';
    if (!String(editedUser.apellido_paterno || '').trim()) newErrors.apellido_paterno = 'Apellido paterno es obligatorio';
    if (!String(editedUser.apellido_materno || '').trim()) newErrors.apellido_materno = 'Apellido materno es obligatorio';
    if (!String(editedUser.email || '').trim()) newErrors.email = 'Email es obligatorio';
    if (!editedUser.id_rol) newErrors.id_rol = 'Rol es obligatorio';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editedUser.email && !emailRegex.test(editedUser.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    onUpdateUser(usuario.id_usuario, editedUser);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (!usuario) return null;

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
          <PersonIcon />
          <Typography variant="h6">Editar Usuario</Typography>
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
                value={editedUser.ci}
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
                value={editedUser.email}
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
            value={editedUser.nombre_completo}
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
                value={editedUser.apellido_paterno}
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
                value={editedUser.apellido_materno}
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

          {/* Información del Sistema */}
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
                value={editedUser.id_rol}
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
                value={editedUser.estado}
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

export default EditarUsuario;