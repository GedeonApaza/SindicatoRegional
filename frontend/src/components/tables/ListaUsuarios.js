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
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const ListaUsuarios = ({ colors, users = [], onDeleteUser, onActivateUser, onEditUser, onViewUser }) => {
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
            <PeopleIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: colors?.dark || 'text.primary'
              }}
            >
              Lista de Usuarios
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
                  Nombre
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  Email
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  border: 'none',
                  py: 2
                }}>
                  CI
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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, border: 'none' }}>
                    <Typography variant="body2" color="text.secondary">
                      No hay usuarios registrados
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow 
                    key={user.id_usuario}
                    hover
                    sx={{ '&:hover': { backgroundColor: 'grey.50' } }}
                  >
                    <TableCell sx={{ px: 3, py: 2, border: 'none' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.nombre_completo}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.apellido_paterno} {user.apellido_materno}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.ci}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2, border: 'none' }}>
                      <Chip
                        icon={<CircleIcon sx={{ fontSize: 8 }} />}
                        label={user.estado}
                        size="small"
                        color={user.estado === 'activo' ? 'success' : 'default'}
                        variant={user.estado === 'activo' ? 'filled' : 'outlined'}
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
                          onClick={() => onViewUser && onViewUser(user)}
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
                        
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEditUser && onEditUser(user)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'primary.main',
                            borderRadius: 5,
                            width: 32,
                            height: 32
                          }}
                          title="Editar usuario"
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        
                        {/* Mostrar botón de Activar o Eliminar según el estado */}
                        {user.estado === 'inactivo' ? (
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => onActivateUser && onActivateUser(user.id_usuario)}
                            sx={{ 
                              border: '1px solid',
                              borderColor: 'success.main',
                              borderRadius: 5,
                              width: 32,
                              height: 32
                            }}
                            title="Activar usuario"
                          >
                            <CheckCircleIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDeleteUser && onDeleteUser(user.id_usuario)}
                            sx={{ 
                              border: '1px solid',
                              borderColor: 'error.main',
                              borderRadius: 5,
                              width: 32,
                              height: 32
                            }}
                            title="Desactivar usuario"
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        )}
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

export default ListaUsuarios;