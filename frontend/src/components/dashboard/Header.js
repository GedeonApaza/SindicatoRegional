// src/components/Header.jsx
import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useTheme,
  Container,
  Paper,
  Fade,
  Tooltip
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  Logout,
  Visibility
} from '@mui/icons-material';
import VerPerfil from './VerPerfil'; 

const Header = ({ colors, activeView, menuItems,id ,name, fotoPerfil, logout, token, axiosJWT }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [openPerfil, setOpenPerfil] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const handleViewProfile = () => {
  handleProfileMenuClose();
  setOpenPerfil(true);
  };
  
  const handleSettings = () => {
    handleProfileMenuClose();
    console.log('Configuraciones');
  };

  const currentMenuItem = menuItems?.find((item) => item.id === activeView);

  // Configuración de colores con fallbacks
  const headerColors = {
    primary: colors?.primary || '#1976d2',
    secondary: colors?.secondary || '#dc004e',
    dark: colors?.dark || '#333333',
    danger: colors?.danger || '#d32f2f'
  };

  return (
    <>
      {/* Header Principal */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, md: 3 },
          m: { xs: 0, md: 2 },
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Toolbar 
            sx={{ 
              minHeight: { xs: 80, md: 100 },
              px: 0,
              justifyContent: 'space-between'
            }}
          >
            {/* Sección Izquierda - Título */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              {/* Información de la vista actual */}
              <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 300,
                    color: headerColors.dark,
                    lineHeight: 1.2,
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                  }}
                >
                  {currentMenuItem?.label || 'Dashboard'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontSize: { sm: '0.875rem', md: '1rem' }
                  }}
                >
                  Bienvenido {name}, al sistema de gestión del sindicato
                </Typography>
              </Box>
            </Box>

            {/* Sección Derecha - Avatar y Menú */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                textAlign: 'right', 
                mr: 2,
                display: { xs: 'none', md: 'block' }
              }}>
                <Typography variant="body2" fontWeight={500} color={headerColors.dark}>
                  {name}
                </Typography>
                <Typography variant="caption" color="success.main">
                  En línea
                </Typography>
              </Box>

              {/* Avatar con Badge de estado */}
              <Tooltip title={`Usuario: ${name}`} placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="menú de usuario"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    p: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.08) translateY(-2px)',
                    }
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#44b700',
                        color: '#44b700',
                        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                        '&::after': {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          animation: 'ripple 1.2s infinite ease-in-out',
                          border: '1px solid currentColor',
                          content: '""',
                        },
                      },
                      '@keyframes ripple': {
                        '0%': {
                          transform: 'scale(.8)',
                          opacity: 1,
                        },
                        '100%': {
                          transform: 'scale(2.4)',
                          opacity: 0,
                        },
                      },
                    }}
                  >
                    <Avatar
                      src={`http://localhost:5000${fotoPerfil}`}
                      alt={name}
                      sx={{
                        width: { xs: 44, md: 48 },
                        height: { xs: 44, md: 48 },
                        background: `linear-gradient(135deg, ${headerColors.primary}, ${headerColors.secondary})`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      <AccountCircle sx={{ fontSize: { xs: 24, md: 26 } }} />
                    </Avatar>
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>

        {/* Menú desplegable del perfil */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 8,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              minWidth: 220,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          TransitionComponent={Fade}
        >
          {/* Header del menú */}
          <Box sx={{ px: 2, py: 1.5, bgcolor: 'grey.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: `linear-gradient(135deg, ${headerColors.primary}, ${headerColors.secondary})`,
                }}
              >
                <AccountCircle sx={{ fontSize: 18 }} />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {name}
                </Typography>
                <Typography variant="caption" color="success.main">
                  En línea
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Opciones del menú */}
          <MenuItem onClick={handleViewProfile} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            <ListItemText>Ver Perfil</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Configuraciones</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: headerColors.danger }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: headerColors.danger }} />
            </ListItemIcon>
            <ListItemText>Cerrar Sesión</ListItemText>
          </MenuItem>
        </Menu>
      </Paper>
<VerPerfil 
  open={openPerfil} 
  onClose={() => setOpenPerfil(false)} 
  userId={id} // 
  token={token}          
  axiosJWT={axiosJWT}   
/>


    </>
  );
};

export default Header;
