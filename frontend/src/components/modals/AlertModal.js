import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { NotificationsActive as NotificationsIcon } from '@mui/icons-material';

const AlertModal = ({ 
  open, 
  onClose, 
  newAlertas, 
  totalAlertas,
  theme 
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: theme.primary, 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 2.5
      }}>
        <NotificationsIcon sx={{ fontSize: 28 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Nueva{newAlertas.length > 1 ? 's' : ''} Alerta{newAlertas.length > 1 ? 's' : ''}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {newAlertas.length} alerta{newAlertas.length > 1 ? 's' : ''} sin leer
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ mt: 2, px: 3 }}>
        {newAlertas.map((alerta, index) => (
          <Box key={index}>
            <Alert 
              severity={
                alerta.tipo === 'emergencia' || alerta.tipo === 'accidente' 
                  ? 'error' 
                  : 'warning'
              }
              sx={{ 
                mb: 2, 
                borderRadius: 2,
                border: `1px solid ${
                  alerta.tipo === 'emergencia' || alerta.tipo === 'accidente'
                    ? theme.error
                    : theme.warning
                }40`,
                '& .MuiAlert-icon': {
                  fontSize: 28
                }
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {alerta.titulo || alerta.tipo || 'Nueva alerta'}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.muted }}>
                {alerta.mensaje || alerta.descripcion || alerta.detalle || 'Sin descripción'}
              </Typography>
              
              {/* Información adicional */}
              {alerta.fecha && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                  Fecha: {new Date(alerta.fecha).toLocaleString('es-BO')}
                </Typography>
              )}
              
              {alerta.id_viaje && (
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                  Viaje ID: {alerta.id_viaje}
                </Typography>
              )}
            </Alert>
            
            {index < newAlertas.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
        
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          bgcolor: theme.background, 
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Total de alertas activas:
          </Typography>
          <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 'bold' }}>
            {totalAlertas}
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{ 
            bgcolor: theme.primary,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': { 
              bgcolor: `${theme.primary}dd`,
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s'
          }}
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;