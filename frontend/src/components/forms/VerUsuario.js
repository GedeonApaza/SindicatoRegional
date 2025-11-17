import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Avatar
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const VerUsuario = ({ usuario, show, onClose, colors }) => {
  if (!usuario) return null;

  //console.log("DEBUG USUARIO:", usuario);
  const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '10px',
        backgroundColor: `${colors?.primary || '#1976d2'}15`
      }}>
        {React.cloneElement(icon, { 
          sx: { fontSize: 20, color: colors?.primary || '#1976d2' } 
        })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value || 'No especificado'}
        </Typography>
      </Box>
    </Box>
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificado';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog 
      open={show} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          backgroundColor: colors?.background || '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={usuario.foto_perfil ? `http://localhost:5000${usuario.foto_perfil}` : ''}  
            sx={{ 
              width: 50, 
              height: 50,
              backgroundColor: colors?.primary || '#1976d2'
            }}
          >
            {usuario.nombre_completo?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Detalles del Usuario
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Información completa del perfil
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Estado del Usuario */}
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Chip
              icon={usuario.estado === 'activo' ? <CheckCircleIcon /> : <CancelIcon />}
              label={usuario.estado}
              size="large"
              color={usuario.estado === 'activo' ? 'success' : 'default'}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '1rem',
                px: 3,
                py: 3
              }}
            />
          </Box>

          <Divider />

          {/* Información Personal */}
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: colors?.primary || '#1976d2'
              }}
            >
              Información Personal
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoRow
                  icon={<PersonIcon />}
                  label="Nombre Completo"
                  value={`${usuario.nombre_completo} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <InfoRow
                  icon={<BadgeIcon />}
                  label="Cédula de Identidad"
                  value={usuario.ci}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InfoRow
                  icon={<EmailIcon />}
                  label="Correo Electrónico"
                  value={usuario.email}
                />
              </Grid>

              {usuario.celular && (
                <Grid item xs={12} sm={6}>
                  <InfoRow
                    icon={<PhoneIcon />}
                    label="Teléfono"
                    value={usuario.celular}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider />

          {/* Información del Sistema */}
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: colors?.primary || '#1976d2'
              }}
            >
              Información del Sistema
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InfoRow
                  icon={<SecurityIcon />}
                  label="Rol"
                  value={usuario.rol.nombre_rol || 'Sin rol asignado'}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InfoRow
                  icon={<CalendarIcon />}
                  label="Fecha de Registro"
                  value={formatDate(usuario.fecha_creacion)}
                />
              </Grid>

              {usuario.fecha_modificacion && (
                <Grid item xs={12} sm={6}>
                  <InfoRow
                    icon={<CalendarIcon />}
                    label="Última Modificación"
                    value={formatDate(usuario.fecha_modificacion)}
                  />
                </Grid>
              )}

              {usuario.fecha_eliminacion && (
                <Grid item xs={12} sm={6}>
                  <InfoRow
                    icon={<CalendarIcon />}
                    label="Fecha de Desactivación"
                    value={formatDate(usuario.fecha_eliminacion)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          {/* Información de 2FA */}
          {usuario.is_2fa_enabled !== undefined && (
            <>
              <Divider />
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: colors?.primary || '#1976d2'
                  }}
                >
                  Seguridad
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={usuario.is_2fa_enabled ? <CheckCircleIcon /> : <CancelIcon />}
                    label={usuario.is_2fa_enabled ? 'Autenticación 2FA Activada' : 'Autenticación 2FA Desactivada'}
                    color={usuario.is_2fa_enabled ? 'success' : 'default'}
                    variant={usuario.is_2fa_enabled ? 'filled' : 'outlined'}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VerUsuario;