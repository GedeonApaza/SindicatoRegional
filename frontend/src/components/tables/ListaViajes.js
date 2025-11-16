import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box
} from '@mui/material';
import {
  DirectionsBus as BusIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
  DriveEta as DriveEtaIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const ListaViajes = ({ 
  colors, 
  viajes, 
  vehiculos, 
  conductores, 
  onDelete, 
  onEdit,    // ✅ Nueva prop
  onView     // ✅ Nueva prop
}) => {
  
  // Función para obtener datos del vehículo
  const getVehiculoInfo = (idVehiculo) => {
    const vehiculo = vehiculos?.find(v => v.id_vehiculo === idVehiculo);
    return vehiculo ? `${vehiculo.placa}` : 'N/A';
  };

  // Función para obtener el nombre del conductor
  const getConductorName = (idVehiculo) => {
    const idConductor = vehiculos?.find(v => v.id_vehiculo === idVehiculo)?.id_conductor;
    const conductor = conductores?.find(c => c.conductor?.id_conductor === idConductor);
    return conductor ? conductor.usuario?.nombre_completo : 'N/A';
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    switch(estado?.toLowerCase()) {
      case 'programado': return 'info';
      case 'en_proceso': return 'warning';
      case 'registrado': return 'success';
      case 'finalizado': return 'success';
      case 'cancelado': return 'error';
      default: return 'default';
    }
  };

  // Función para obtener el ícono del estado
  const getEstadoIcon = (estado) => {
    switch(estado?.toLowerCase()) {
      case 'programado': return <ScheduleIcon sx={{ fontSize: 12 }} />;
      case 'en_proceso': return <PlayIcon sx={{ fontSize: 12 }} />;
      case 'registrado': return <CheckIcon sx={{ fontSize: 12 }} />;
      case 'finalizado': return <CheckIcon sx={{ fontSize: 12 }} />;
      case 'cancelado': return <CancelIcon sx={{ fontSize: 12 }} />;
      default: return <CircleIcon sx={{ fontSize: 8 }} />;
    }
  };

  // Función para formatear fecha
  const formatFecha = (fecha) => {
    if (!fecha) return 'No definida';
    const date = new Date(fecha);
    return date.toLocaleString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card 
      elevation={1} 
      sx={{ 
        borderRadius: 5,
        border: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        backgroundColor: 'white',
        borderBottom: 'none'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors?.dark || 'text.primary'
              }}
            >
              Lista de Viajes
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Table */}
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: colors?.background || 'grey.50' }}>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2,
                  px: 3
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DriveEtaIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Vehículo
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Conductor
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlaceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Ruta
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Fecha Inicio
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Fecha Fin
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  Estado
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!viajes || viajes.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ border: 'none', py: 8 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 2 
                    }}>
                      <BusIcon sx={{ fontSize: 60, color: 'text.disabled', opacity: 0.5 }} />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                          No hay viajes registrados
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                          Haz clic en el botón + para programar el primer viaje
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                viajes.map((viaje) => (
                  <TableRow 
                    key={viaje.id_viaje}
                    hover
                    sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                  >
                    <TableCell sx={{ px: 3, py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {getVehiculoInfo(viaje.id_vehiculo)}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {getConductorName(viaje.id_vehiculo)}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {viaje.origen || 'La Paz'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          → {viaje.destino || 'Caranavi'}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        {formatFecha(viaje.fecha_inicio)}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        {formatFecha(viaje.fecha_fin)}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Chip
                        icon={getEstadoIcon(viaje.estado)}
                        label={viaje.estado?.replace('_', ' ') || 'programado'}
                        size="small"
                        color={getEstadoColor(viaje.estado)}
                        variant="filled"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* ✅ BOTÓN VER - CON onClick */}
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => onView && onView(viaje)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'info.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Ver detalles"
                        >
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        
                        {/* ✅ BOTÓN EDITAR - CON onClick */}
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEdit && onEdit(viaje)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'primary.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Editar viaje"
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        
                        {/* ✅ BOTÓN ELIMINAR - Ya tenía onClick */}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete && onDelete(viaje.id_viaje)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'error.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Eliminar viaje"
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ListaViajes;