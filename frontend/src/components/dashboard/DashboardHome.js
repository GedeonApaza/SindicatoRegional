import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Badge
} from '@mui/material';
import { NotificationsActive as NotificationsIcon } from '@mui/icons-material';
import StatsCards from '../StatsCards.js';
import AlertModal from '../modals/AlertModal.js'; 

const DashboardHome = ({ 
  theme, 
  alertas, 
  viajes, 
  setActiveView,
  showNewAlertModal,
  newAlertas,
  handleCloseAlertModal,
  handleOpenAlertModal  // AGREGAR ESTA PROP
}) => {
  return (
    <Box sx={{ width: '100%', px: 2 }}>
      {/*  USO DEL COMPONENTE AlertModal */}
      <AlertModal 
        open={showNewAlertModal}
        onClose={handleCloseAlertModal}
        newAlertas={newAlertas || alertas}
        totalAlertas={alertas.length}
        theme={theme}
      />

      {/* Badge con contador de alertas */}
      {alertas.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Badge 
            badgeContent={alertas.length} 
            color="error"
            sx={{ 
              '& .MuiBadge-badge': { 
                fontSize: '1rem',
                height: '28px',
                minWidth: '28px',
                borderRadius: '14px'
              }
            }}
          >
            <Button
              variant="outlined"
              startIcon={<NotificationsIcon />}
              onClick={() => {
                console.log('Botón clickeado'); //  Para debug
                if (handleOpenAlertModal) {
                  console.log('Abriendo modal...'); //  Para debug
                  handleOpenAlertModal();
                } else {
                  console.log('handleOpenAlertModal no existe, navegando...'); //  Para debug
                  setActiveView('alertas');
                }
              }}
              sx={{ 
                borderColor: theme.primary,
                color: theme.primary,
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: theme.primary,
                  bgcolor: `${theme.primary}10`,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                transition: 'all 0.2s'
              }}
            >
              Alertas Activas
            </Button>
          </Badge>
        </Box>
      )}

      <StatsCards />
      
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12} md={8} sx={{ width: '100%' }}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              width: '100%'
            }}
          >
            <CardHeader 
              title={
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.dark }}>
                  Viajes Recientes
                </Typography>
              }
              action={
                <Button 
                  variant="contained"
                  sx={{ 
                    bgcolor: theme.primary,
                    borderRadius: 2,
                    '&:hover': { bgcolor: `${theme.primary}dd` }
                  }}
                  onClick={() => setActiveView('viajes')}
                >
                  Ver todos
                </Button>
              }
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table sx={{ width: '100%' }}>
                  <TableHead sx={{ bgcolor: theme.background }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Ruta</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Conductor</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Pasajeros</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Hora</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {viajes.slice(0, 5).map((viaje) => (
                      <TableRow key={viaje.id} hover>
                        <TableCell>{viaje.ruta}</TableCell>
                        <TableCell>{viaje.id_conductor}</TableCell>
                        <TableCell>
                          <Chip 
                            label={viaje.pasajeros}
                            size="small"
                            sx={{ bgcolor: theme.background }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={viaje.estado}
                            size="small"
                            color={
                              viaje.estado === 'Completado' ? 'success' :
                              viaje.estado === 'En curso' ? 'warning' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ color: theme.muted }}>{viaje.hora}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;