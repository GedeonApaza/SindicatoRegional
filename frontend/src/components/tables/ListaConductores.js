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
  Person as PersonIcon,
  Email as EmailIcon,
  CreditCard as CreditCardIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const ListaConductores = ({ 
  colors, 
  conductores, 
  onDelete,           // ✅ Prop para eliminar
  onEditConductor,    // ✅ Prop para editar
  onViewDetails       // ✅ Prop para ver detalles
}) => {
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
              Lista de Conductores
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
                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Nombre Completo
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCardIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    CI
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Email
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BadgeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Licencia
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    Celular
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
              {(!conductores || conductores.length === 0) ? (
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
                          No hay conductores registrados
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                          Haz clic en el botón + para agregar el primer conductor
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                conductores.map((c) => (
                  <TableRow 
                    key={c.conductor.id_conductor}
                    hover
                    sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                  >
                    <TableCell sx={{ px: 3, py: 2, border: 'none' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {c.usuario.nombre_completo}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.usuario.apellido_paterno} {c.usuario.apellido_materno}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {c.usuario.ci}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          maxWidth: 200, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {c.usuario.email}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Chip
                        label={c.conductor.licencia}
                        size="small"
                        sx={{
                          backgroundColor: colors?.primary || 'primary.main',
                          color: 'white',
                          fontWeight: 500,
                          px: 1
                        }}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography 
                        variant="body2" 
                        component="a"
                        href={`tel:${c.conductor.celular}`}
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {c.conductor.celular}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Chip
                        icon={<CircleIcon sx={{ fontSize: 8 }} />}
                        label={c.usuario.estado}
                        size="small"
                        color={c.usuario.estado === 'activo' ? 'success' : 'default'}
                        variant={c.usuario.estado === 'activo' ? 'filled' : 'outlined'}
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* ✅ Botón Ver Detalles */}
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => onViewDetails && onViewDetails(c)}
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
                        
                        {/* ✅ Botón Editar */}
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEditConductor && onEditConductor(c)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'primary.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Editar conductor"
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        
                        {/* ✅ Botón Eliminar */}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete && onDelete(c.conductor.id_conductor)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'error.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Eliminar conductor"
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

export default ListaConductores;