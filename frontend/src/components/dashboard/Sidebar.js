import React, { useState } from 'react';
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu
} from 'react-pro-sidebar';
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  People,
  Security,
  HowToReg,
  Route,
  DirectionsCar,
  Description,
  Settings,
  Logout,
  DirectionsBus,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

const Sidebar = ({ colors, activeView, setActiveView, name, fotoPerfil, logout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const themeColors = colors || {
    primary: '#4299E1',
    secondary: '#ED64A6',
    dark: '#2D3748'
  };

  return (
    <ProSidebar
      collapsed={collapsed}
      width="280px"
      collapsedWidth="80px"
      rootStyles={{
        '.ps-sidebar-container': {
          background: `linear-gradient(180deg, ${themeColors.dark} 0%, #1A202C 100%)`,
          boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          border: 'none !important',
          display: 'flex',
          flexDirection: 'column',
        }
      }}
    >

      {/* HEADER */}
      <Box
        sx={{
          p: collapsed ? 1 : 3,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: '80px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: collapsed ? 40 : 45,
              height: collapsed ? 40 : 45,
              background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
              mr: collapsed ? 0 : 2
            }}
          >
            <DirectionsBus sx={{ color: 'white' }} />
          </Avatar>
          {!collapsed && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                SINDICATO
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Sistema de Control
              </Typography>
            </Box>
          )}
        </Box>

        <Tooltip title={collapsed ? 'Expandir' : 'Colapsar'} arrow>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.1)',
              '&:hover': {
                background: `${themeColors.primary}20`,
                color: themeColors.primary
              }
            }}
          >
            {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* MENU */}
      <Menu
  menuItemStyles={{
    button: ({ active }) => ({
      backgroundColor: active ? `${themeColors.primary}30` : 'transparent',
      borderRadius: '0 25px 25px 0',
      margin: '4px 8px 4px 0',
      padding: '10px 20px',
      color: 'rgba(255,255,255,0.85)',
      '&:hover': { backgroundColor: `${themeColors.primary}25` },
      transition: 'all 0.2s ease'
    }),
    icon: ({ active }) => ({
      color: active ? themeColors.primary : 'rgba(255,255,255,0.7)',
    }),
    label: ({ active }) => ({
      color: active ? 'white' : 'rgba(255,255,255,0.85)',
      fontWeight: active ? 600 : 400
    }),
    subMenuContent: {
      backgroundColor: 'transparent', // 👈 evita el fondo blanco
    },
  }}
  style={{
    flexGrow: 1,
    paddingTop: '16px',
    paddingBottom: '16px',
    zIndex: 2
  }}
>
  <MenuItem
    active={activeView === 'dashboard'}
    icon={<Dashboard />}
    onClick={() => setActiveView('dashboard')}
  >
    Dashboard
  </MenuItem>

  <MenuItem
    active={activeView === 'usuarios'}
    icon={<People />}
    onClick={() => setActiveView('usuarios')}
  >
    Usuarios
  </MenuItem>

  <MenuItem
    active={activeView === 'roles'}
    icon={<Security />}
    onClick={() => setActiveView('roles')}
  >
    Roles
  </MenuItem>

  <MenuItem
    active={activeView === 'pasajeros'}
    icon={<HowToReg />}
    onClick={() => setActiveView('pasajeros')}
  >
    Pasajeros
  </MenuItem>

  {/* 🔹 Submenú con fondo oscuro corregido */}
  <SubMenu
    icon={<Route />}
    label="Gestión de Viajes"
    style={{
      backgroundColor: 'transparent',
    }}
  >
    <MenuItem
      active={activeView === 'viajes'}
      onClick={() => setActiveView('viajes')}
      style={{
        backgroundColor: activeView === 'viajes' ? `${themeColors.primary}30` : 'transparent',
        color: 'white',
      }}
    >
      Viajes Programados
    </MenuItem>

   <MenuItem
  active={activeView === 'pasajerosViajes'}
  onClick={() => setActiveView('pasajerosViajes')}
  style={{
    backgroundColor: activeView === 'pasajerosViajes' ? `${themeColors.primary}30` : 'transparent',
    color: 'white',
  }}
>
  Viajes con Pasajeros
</MenuItem>

  </SubMenu>

        <MenuItem
          active={activeView === 'conductores'}
          icon={<DirectionsCar />}
          onClick={() => setActiveView('conductores')}
        >
          Conductores
        </MenuItem>

        <MenuItem
          active={activeView === 'vehiculos'}
          icon={<DirectionsCar />}
          onClick={() => setActiveView('vehiculos')}
        >
          Vehículos
        </MenuItem>

        <MenuItem
          active={activeView === 'reportes'}
          icon={<Description />}
          onClick={() => setActiveView('reportes')}
        >
          Reportes
        </MenuItem>

        <MenuItem
          active={activeView === 'configuracion'}
          icon={<Settings />}
          onClick={() => setActiveView('configuracion')}
        >
          Configuración
        </MenuItem>
      </Menu>

      {/* FOOTER */}
      <Box
        sx={{
          p: collapsed ? 1 : 3,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Avatar
            src={`http://localhost:5000${fotoPerfil}`}
            sx={{
              width: collapsed ? 40 : 50,
              height: collapsed ? 40 : 50,
              background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
              mr: collapsed ? 0 : 2
            }}
          />
          {!collapsed && (
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 600 }}>
                {name || 'Usuario'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Administrador
              </Typography>
            </Box>
          )}
        </Box>
        {!collapsed ? (
          <Button
            onClick={logout}
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            sx={{
              mt: 2,
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                borderColor: themeColors.primary,
                backgroundColor: `${themeColors.primary}10`
              }
            }}
          >
            Cerrar Sesión
          </Button>
        ) : (
          <Tooltip title="Cerrar Sesión" arrow placement="right">
            <IconButton onClick={logout} sx={{ mt: 2, color: 'white' }}>
              <Logout fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </ProSidebar>
  );
};

export default Sidebar;
