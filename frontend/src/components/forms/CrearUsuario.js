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
  Alert,
  Avatar
} from '@mui/material';
import { 
  Close as CloseIcon, 
  PersonAdd as PersonAddIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

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
  
  // ✅ AGREGAR ESTADO PARA LA FOTO
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
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

  // ✅ MANEJAR SELECCIÓN DE FOTO
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, foto: 'Solo se permiten imágenes' });
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, foto: 'La imagen no debe superar 5MB' });
        return;
      }
      
      setFotoPerfil(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Limpiar error de foto
      if (errors.foto) {
        setErrors({ ...errors, foto: '' });
      }
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    // ✅ PASAR TANTO LOS DATOS COMO LA FOTO
    onCreateUser(newUser, fotoPerfil);
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
    setFotoPerfil(null);
    setPreviewUrl(null);
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
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
          
          {/* ✅ SECCIÓN DE FOTO DE PERFIL */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Foto de Perfil (Opcional)
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={previewUrl}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: colors?.primary || '#1976d2',
                  fontSize: '3rem'
                }}
              >
                {!previewUrl && newUser.nombre_completo?.charAt(0)}
              </Avatar>
              
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ borderRadius: '12px' }}
              >
                Seleccionar Foto
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              
              {fotoPerfil && (
                <Typography variant="caption" color="text.secondary">
                  {fotoPerfil.name}
                </Typography>
              )}
              
              {errors.foto && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.foto}
                </Alert>
              )}
            </Box>
          </Box>

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