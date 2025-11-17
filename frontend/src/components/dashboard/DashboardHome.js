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
import { useDashboardData } from '../../context/DashboardDataContext';

const DashboardHome = ({ 
  theme, 
  alertas, 
  viajes: legacyViajes = [], 
  setActiveView,
  showNewAlertModal,
  newAlertas,
  handleCloseAlertModal,
  handleOpenAlertModal  // AGREGAR ESTA PROP
}) => {
  const {
    viajes: contextViajes = legacyViajes,
    vehiculos = [],
    conductores = [],
    pasajerosViajes = []
  } = useDashboardData();

  const viajes = contextViajes && contextViajes.length ? contextViajes : legacyViajes;

  const getVehiculoById = (idVehiculo) =>
    vehiculos.find((vehiculo) => vehiculo.id_vehiculo === idVehiculo);

  const getConductorName = (viaje) => {
    const vehiculo = getVehiculoById(viaje.id_vehiculo);
    if (!vehiculo) return 'Sin asignar';
    const conductor = conductores.find(
      (item) => item.conductor?.id_conductor === vehiculo.id_conductor
    );
    return conductor?.usuario?.nombre_completo || 'Sin asignar';
  };

  const getPasajerosAsignados = (viaje) => {
    if (Array.isArray(viaje.pasajeros)) {
      return viaje.pasajeros.length;
    }
    const viajeId = viaje.id_viaje ?? viaje.id;
    return pasajerosViajes.filter((pv) => pv.id_viaje === viajeId).length;
  };

  const getCapacidadTotal = (viaje) => {
    const vehiculo = getVehiculoById(viaje.id_vehiculo);
    return (
      vehiculo?.capacidad_pasajeros ||
      viaje.capacidad_pasajeros ||
      0
    );
  };

  const formatHoraSalida = (viaje) => {
    const horaBase = viaje.hora_salida || viaje.fecha_salida_real || viaje.fecha_inicio;
    const ocupados = getPasajerosAsignados(viaje);
    const capacidad = getCapacidadTotal(viaje);
    const viajeLleno = capacidad > 0 && ocupados >= capacidad;

    if (!horaBase) {
      return viajeLleno ? 'Listo · capacidad completa' : 'Pendiente';
    }

    let fechaHora;
    if (viaje.hora_salida) {
      const horaStr = viaje.hora_salida.length === 5
        ? `${viaje.hora_salida}:00`
        : viaje.hora_salida;
      fechaHora = new Date(`1970-01-01T${horaStr}`);
    } else {
      fechaHora = new Date(horaBase);
    }

    if (Number.isNaN(fechaHora.getTime())) {
      return viajeLleno ? `${horaBase} · Listo` : horaBase;
    }

    const horaFormateada = fechaHora.toLocaleTimeString('es-BO', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return viajeLleno ? `${horaFormateada} · Listo para salir` : `${horaFormateada} · Programado`;
  };

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
                    {viajes.slice(0, 5).map((viaje) => {
                      const viajeId = viaje.id_viaje ?? viaje.id;
                      const pasajerosAsignados = getPasajerosAsignados(viaje);
                      const capacidad = getCapacidadTotal(viaje);
                      const viajeLleno = capacidad > 0 && pasajerosAsignados >= capacidad;

                      return (
                        <TableRow key={viajeId} hover>
                          <TableCell>{`${viaje.origen} → ${viaje.destino}`}</TableCell>
                          <TableCell>{getConductorName(viaje)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={
                                capacidad
                                  ? `${pasajerosAsignados}/${capacidad}`
                                  : `${pasajerosAsignados}`
                              }
                              size="small"
                              color={viajeLleno ? 'success' : 'default'}
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={viaje.estado?.replace(/_/g, ' ') || 'Programado'}
                              size="small"
                              color={(() => {
                                const estado = viaje.estado?.toLowerCase();
                                switch (estado) {
                                  case 'programado':
                                    return 'info';
                                  case 'en_ruta':
                                    return 'warning';
                                  case 'finalizado':
                                    return 'success';
                                  case 'cancelado':
                                    return 'error';
                                  default:
                                    return 'default';
                                }
                              })()}
                            />
                          </TableCell>
                          <TableCell sx={{ color: theme.muted }}>{formatHoraSalida(viaje)}</TableCell>
                        </TableRow>
                      );
                    })}
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