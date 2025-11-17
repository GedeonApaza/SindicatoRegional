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
  CircularProgress,
  Chip
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

const Sidebar = ({ colors, activeView, setActiveView, user, logout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const themeColors = colors || {
    primary: '#4299E1',
    secondary: '#ED64A6',
    dark: '#2D3748'
  };

  const ROLE_ALIASES = {
    administrador: 'admin',
    admin: 'admin',
    administradora: 'admin',
    conductor: 'conductor',
    chofer: 'conductor'
  };

  const rawRole = (user?.rol?.nombre_rol || user?.rol?.nombre || user?.rol || '')
    .toString()
    .trim()
    .toLowerCase();

  const normalizedRole = ROLE_ALIASES[rawRole] || rawRole;

  const normalizeAllowed = (role) => ROLE_ALIASES[role?.toLowerCase()] || role?.toLowerCase();

  const hasAccess = (allowed = []) => {
    if (!allowed.length) return true;
    if (!normalizedRole) return false;
    return allowed.map(normalizeAllowed).includes(normalizedRole);
  };

  const menuStructure = [
    { type: 'item', id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, roles: ['admin', 'conductor'] },
    { type: 'item', id: 'usuarios', label: 'Usuarios', icon: <People />, roles: ['admin'] },
    { type: 'item', id: 'roles', label: 'Roles', icon: <Security />, roles: ['admin'] },
    { type: 'item', id: 'pasajeros', label: 'Pasajeros', icon: <HowToReg />, roles: ['admin'] },
    {
      type: 'submenu',
      id: 'gestion-viajes',
      label: 'Gestión de Viajes',
      icon: <Route />,
      roles: ['admin', 'conductor'],
      children: [
        { type: 'item', id: 'viajes', label: 'Viajes Programados', roles: ['admin', 'conductor'] },
        { type: 'item', id: 'pasajerosViajes', label: 'Viajes con Pasajeros', roles: ['admin'] }
      ]
    },
    { type: 'item', id: 'conductores', label: 'Conductores', icon: <DirectionsCar />, roles: ['admin'] },
    { type: 'item', id: 'vehiculos', label: 'Vehículos', icon: <DirectionsCar />, roles: ['admin'] },
    { type: 'item', id: 'reportes', label: 'Reportes', icon: <Description />, roles: ['admin'] },
    { type: 'item', id: 'configuracion', label: 'Configuración', icon: <Settings />, roles: ['admin', 'conductor'] }
  ];

  // ✅ VERIFICAR SI EL USUARIO ESTÁ CARGADO
  if (!user) {
    return (
      <ProSidebar
        collapsed={false}
        width="280px"
        rootStyles={{
          '.ps-sidebar-container': {
            background: `linear-gradient(180deg, ${themeColors.dark} 0%, #1A202C 100%)`,
            boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)',
            border: 'none !important',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <CircularProgress sx={{ color: themeColors.primary }} />
          <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
            Cargando perfil...
          </Typography>
        </Box>
      </ProSidebar>
    );
  }

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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

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
        <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
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
                backgroundColor: 'transparent',
              },
            }}
          >
            {menuStructure.map((item) => {
              if (!hasAccess(item.roles)) return null;

              if (item.type === 'submenu') {
                const visibleChildren = item.children?.filter((child) => hasAccess(child.roles));
                if (!visibleChildren?.length) return null;
                return (
                  <SubMenu key={item.id} icon={item.icon} label={item.label}>
                    {visibleChildren.map((child) => (
                      <MenuItem
                        key={child.id}
                        active={activeView === child.id}
                        onClick={() => setActiveView(child.id)}
                      >
                        {child.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                );
              }

              return (
                <MenuItem
                  key={item.id}
                  active={activeView === item.id}
                  icon={item.icon}
                  onClick={() => setActiveView(item.id)}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>

        {/* FOOTER - PERFIL DEL USUARIO */}
        <Box
          sx={{
            p: collapsed ? 1 : 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <Avatar
              src={user.foto_perfil ? `http://localhost:5000${user.foto_perfil}` : ''}
              sx={{
                width: collapsed ? 40 : 50,
                height: collapsed ? 40 : 50,
                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                mr: collapsed ? 0 : 2
              }}
            >
              {user.nombre_completo?.charAt(0) || 'U'}  {/* ✅ Fallback */}
            </Avatar>
            {!collapsed && (
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  {user.nombre_completo || 'Usuario'}  {/* ✅ auth()->user->nombre_completo */}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {user.rol?.nombre_rol || 'Sin rol'}  {/* ✅ auth()->user->rol->nombre_rol */}
                </Typography>

                {/* ✅ MOSTRAR 2FA SI ESTÁ ACTIVO */}
                {user.is2FAEnabled && (
                  <Chip
                    label="2FA"
                    size="small"
                    sx={{
                      mt: 0.5,
                      height: '18px',
                      fontSize: '0.65rem',
                      bgcolor: 'rgba(76, 175, 80, 0.2)',
                      color: '#4caf50',
                      border: '1px solid rgba(76, 175, 80, 0.5)'
                    }}
                  />
                )}
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
      </Box>
    </ProSidebar>
  );
};

export default Sidebar;