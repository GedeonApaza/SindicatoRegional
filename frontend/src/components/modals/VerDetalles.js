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
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const VerDetalles = ({ 
  data, 
  show, 
  onClose, 
  colors,
  config,
  helperFunctions = {} // Funciones auxiliares para renderizado personalizado
}) => {
  if (!data) return null;

  const {
    title = 'Detalles',
    subtitle = 'Información completa',
    sections = [],
    avatarField = null,
    statusField = null,
    statusOptions = {}
  } = config;

  const InfoRow = ({ icon, label, value, render }) => (
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
          {render ? render(value) : (value || 'No especificado')}
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

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No especificado';
    return new Date(dateString).toLocaleString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/La_Paz'
    });
  };

  // Obtener valor anidado del objeto
  const getValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  // Obtener avatar
  const getAvatarContent = () => {
    if (!avatarField) return null;
    const avatarValue = getValue(data, avatarField);
    if (avatarValue) {
      return <Avatar src={avatarValue} sx={{ width: 50, height: 50, backgroundColor: colors?.primary || '#1976d2' }} />;
    }
    const firstLetter = data[Object.keys(data)[0]]?.toString().charAt(0) || '?';
    return (
      <Avatar sx={{ width: 50, height: 50, backgroundColor: colors?.primary || '#1976d2' }}>
        {firstLetter}
      </Avatar>
    );
  };

  // Renderizar estado
  const renderStatus = () => {
    if (!statusField) return null;
    const statusValue = getValue(data, statusField);
    const statusConfig = statusOptions[statusValue] || { 
      label: statusValue, 
      color: 'default',
      icon: <CancelIcon />
    };

    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Chip
          icon={statusConfig.icon}
          label={statusConfig.label || statusValue}
          size="large"
          color={statusConfig.color}
          sx={{
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: '1rem',
            px: 3,
            py: 3
          }}
        />
      </Box>
    );
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
          {getAvatarContent()}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Estado */}
          {renderStatus()}
          {statusField && <Divider />}

          {/* Secciones dinámicas */}
          {sections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: colors?.primary || '#1976d2'
                  }}
                >
                  {section.title}
                </Typography>
                
                <Grid container spacing={2}>
                  {section.fields.map((field, fieldIndex) => {
                    const fieldValue = getValue(data, field.key);
                    // Solo mostrar si tiene valor o si showIfEmpty es true
                    if (!fieldValue && !field.showIfEmpty) return null;
                    
                    return (
                      <Grid item xs={12} sm={field.fullWidth ? 12 : 6} key={fieldIndex}>
                        <InfoRow
                          icon={field.icon}
                          label={field.label}
                          value={fieldValue}
                          render={
                            field.render
                              ? (val) => field.render(val, data, helperFunctions.getConductorName)
                              : field.type === 'date'
                                ? formatDate
                                : field.type === 'datetime'
                                  ? formatDateTime
                                  : null
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              {sectionIndex < sections.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VerDetalles;