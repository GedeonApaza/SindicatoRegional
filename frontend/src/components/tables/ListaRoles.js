import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery,
  Grid,
  List,
  ListItem,
  Divider,
  Stack
} from '@mui/material';
import {
  Shield as ShieldIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const ListaRoles = ({ roles = [], onDeleteRole, onEditRole, onOpenModal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Vista móvil con cards
  const MobileView = () => (
    <Box sx={{ position: 'relative' }}>
      <List sx={{ p: 0 }}>
        {roles.map((role, index) => (
          <React.Fragment key={role.id}>
            <ListItem
              sx={{
                flexDirection: 'column',
                alignItems: 'stretch',
                py: 2,
                px: 3,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <Box sx={{ width: '100%', mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      fontSize: '1.1rem'
                    }}
                  >
                    {role.nombre_rol}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => onEditRole?.(role)}
                        sx={{ 
                          color: theme.palette.primary.main,
                          backgroundColor: theme.palette.primary.main + '10',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main + '20',
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        onClick={() => onDeleteRole?.(role.id)}
                        sx={{ 
                          color: theme.palette.error.main,
                          backgroundColor: theme.palette.error.main + '10',
                          '&:hover': {
                            backgroundColor: theme.palette.error.main + '20',
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.4 }}
                >
                  {role.descripcion || 'Sin descripción disponible'}
                </Typography>
              </Box>
            </ListItem>
            {index < roles.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  // Vista tablet con grid de cards
  const TabletView = () => (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid item xs={12} sm={6} key={role.id}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  elevation: 8,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8]
                },
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 1,
                      flex: 1,
                      mr: 2
                    }}
                  >
                    {role.nombre_rol}
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => onEditRole?.(role)}
                        sx={{ 
                          color: theme.palette.primary.main,
                          backgroundColor: theme.palette.primary.main + '10',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main + '20',
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        onClick={() => onDeleteRole?.(role.id)}
                        sx={{ 
                          color: theme.palette.error.main,
                          backgroundColor: theme.palette.error.main + '10',
                          '&:hover': {
                            backgroundColor: theme.palette.error.main + '20',
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {role.descripcion || 'Sin descripción disponible'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Vista desktop con tabla
  const DesktopView = () => (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{ 
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        '& .MuiTable-root': {
          minWidth: 650
        }
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.divider}`,
                py: 2
              }}
            >
              Nombre del Rol
            </TableCell>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.divider}`,
                py: 2
              }}
            >
              Descripción
            </TableCell>
            <TableCell 
              align="center"
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.divider}`,
                py: 2
              }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow 
              key={role.id}
              sx={{ 
                '&:hover': { 
                  backgroundColor: theme.palette.action.hover 
                },
                '&:last-child td, &:last-child th': { 
                  border: 0 
                },
                borderBottom: index < roles.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
              }}
            >
              <TableCell sx={{ py: 2.5 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 500,
                    color: theme.palette.text.primary
                  }}
                >
                  {role.nombre_rol}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2.5 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    maxWidth: 300,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {role.descripcion || 'Sin descripción disponible'}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ py: 2.5 }}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Tooltip title="Editar rol">
                    <IconButton
                      size="small"
                      onClick={() => onEditRole?.(role)}
                      sx={{ 
                        color: theme.palette.primary.main,
                        backgroundColor: theme.palette.primary.main + '10',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main + '20',
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar rol">
                    <IconButton
                      size="small"
                      onClick={() => onDeleteRole?.(role.id)}
                      sx={{ 
                        color: theme.palette.error.main,
                        backgroundColor: theme.palette.error.main + '10',
                        '&:hover': {
                          backgroundColor: theme.palette.error.main + '20',
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Card 
        elevation={3}
        sx={{ 
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          boxShadow: theme.shadows[3]
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 100%)`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            px: 3,
            py: 2.5
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ShieldIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontSize: 24
                }} 
              />
              <Typography 
                variant="h5" 
                component="h2"
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Lista de Roles
              </Typography>
              <Chip 
                label={roles.length} 
                size="small" 
                color="primary" 
                sx={{ 
                  minWidth: 24,
                  height: 24,
                  '& .MuiChip-label': {
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 0 }}>
          {roles.length === 0 ? (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                px: 3
              }}
            >
              <ShieldIcon 
                sx={{ 
                  fontSize: 64, 
                  color: theme.palette.grey[300],
                  mb: 2
                }} 
              />
              <Typography 
                variant="h6" 
                color="text.secondary" 
                gutterBottom
              >
                No hay roles registrados
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Comienza agregando tu primer rol al sistema
              </Typography>
            </Box>
          ) : (
            <>
              {isMobile ? (
                <MobileView />
              ) : isTablet ? (
                <Box sx={{ p: 2 }}>
                  <TabletView />
                </Box>
              ) : (
                <DesktopView />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListaRoles;