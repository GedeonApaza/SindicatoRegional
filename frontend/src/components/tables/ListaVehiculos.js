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
  DriveEta as DriveEtaIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
  DirectionsCar as DirectionsCarIcon,
  CalendarToday as CalendarTodayIcon,
  EventSeat as EventSeatIcon,
  Person as PersonIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const ListaVehiculos = ({ 
  colors, 
  vehiculos, 
  conductores, 
  onDelete,
  onEditVehiculo, // ✅ Cambiado de onEdit a onEditVehiculo para consistencia
  onViewDetails
}) => {
  // Función para obtener el nombre del conductor
  const getConductorName = (idConductor) => {
    if (!idConductor) return 'Sin asignar';
    const conductor = conductores?.find(c => c.conductor?.id_conductor === idConductor);
    return conductor ? conductor.usuario?.nombre_completo : 'No encontrado';
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    switch(estado?.toLowerCase()) {
      case 'activo': return 'success';
      case 'mantenimiento': return 'warning';
      case 'inactivo': return 'error';
      default: return 'default';
    }
  };

  // Función para obtener el ícono del estado
  const getEstadoIcon = (estado) => {
    switch(estado?.toLowerCase()) {
      case 'activo': return <CircleIcon sx={{ fontSize: 8 }} />;
      case 'mantenimiento': return <SettingsIcon sx={{ fontSize: 12 }} />;
      case 'inactivo': return <CircleIcon sx={{ fontSize: 8 }} />;
      default: return <CircleIcon sx={{ fontSize: 8 }} />;
    }
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
            <DriveEtaIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors?.dark || 'text.primary'
              }}
            >
              Lista de Vehículos
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
                    <DirectionsCarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Placa
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DriveEtaIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Marca/Modelo
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Año
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventSeatIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Capacidad
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
              {(!vehiculos || vehiculos.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ border: 'none', py: 8 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 2 
                    }}>
                      <DriveEtaIcon sx={{ fontSize: 60, color: 'text.disabled', opacity: 0.5 }} />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                          No hay vehículos registrados
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                          Haz clic en el botón + para agregar el primer vehículo
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                vehiculos.map((vehiculo) => (
                  <TableRow 
                    key={vehiculo.id_vehiculo}
                    hover
                    sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                  >
                    <TableCell sx={{ px: 3, py: 2, border: 'none' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                          {vehiculo.placa}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {vehiculo.marca || 'N/A'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {vehiculo.modelo || 'Sin modelo'}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {vehiculo.anio || 'N/A'}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Chip
                        label={`${vehiculo.capacidad_pasajeros || 6} pasajeros`}
                        size="small"
                        icon={<EventSeatIcon sx={{ fontSize: 14 }} />}
                        sx={{
                          backgroundColor: colors?.secondary || 'secondary.main',
                          color: 'white',
                          fontWeight: 500,
                          px: 1
                        }}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography 
                        variant="body2" 
                        color={vehiculo.id_conductor ? 'text.primary' : 'text.secondary'}
                        sx={{ 
                          fontWeight: vehiculo.id_conductor ? 500 : 400,
                          fontStyle: vehiculo.id_conductor ? 'normal' : 'italic'
                        }}
                      >
                        {getConductorName(vehiculo.id_conductor)}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Chip
                        icon={getEstadoIcon(vehiculo.estado)}
                        label={vehiculo.estado || 'activo'}
                        size="small"
                        color={getEstadoColor(vehiculo.estado)}
                        variant="filled"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => onViewDetails && onViewDetails(vehiculo)}
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
                        
                        {/* ✅ BOTÓN DE EDITAR CORREGIDO */}
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEditVehiculo && onEditVehiculo(vehiculo)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'primary.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Editar vehículo"
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete && onDelete(vehiculo.id_vehiculo)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'error.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Eliminar vehículo"
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

export default ListaVehiculos;