import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardData } from "../../context/DashboardDataContext";

// Material-UI imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from '@mui/material';

// Material-UI Icons
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  DirectionsBus as BusIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  DriveEta as DriveEtaIcon
} from '@mui/icons-material';

// Importación de componentes (manteniendo los existentes por ahora)
import Setup2FA from '../auth/Setup2FA/Setup2FA.js';
import Sidebar from './Sidebar'; // Adjust the path as needed
// *** IMPORTACIÓN DEL COMPONENTE HEADER ***
import Header from './Header.js';
import DashboardHome from './DashboardHome.js';
import RolesView from './RolesView.js';
import ConfiguracionView from "./ConfiguracionView";
import UsuariosView from './UsuariosView.js';
import ConductoresView from './ConductoresView.js';
import VehiculosView from './VehiculosView.js';
import PasajerosView from './PasajerosView.js';
import ViajesView from './ViajesView.js';
import PasajerosViajesView from './PasajerosViajesView.js';

const Dashboard = () => {
  // Paleta de colores adaptada para Material-UI
  const theme = {
    primary: '#D96668',
    secondary: '#A5879B',
    tertiary: '#BFB1AB',
    background: '#F7F6F5',
    dark: '#2D2A2E',
    accent: '#8B7355',
    light: '#FEFEFE',
    muted: '#6B6B6B',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336'
  };

  const {
    user,
    token,
    axiosJWT,
    logout,
    is2FAEnabled,
    showSetup2FA,
    handleToggle2FA,
    handleSetup2FAComplete,
    handleSetup2FACancel
  } = useAuth();

  const {
    alertas,
    viajes,
    showNewAlertModal,
    newAlertas,
    handleCloseAlertModal,
    handleOpenAlertModal
  } = useDashboardData();

  // Estados del dashboard
  const [activeView, setActiveView] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Menu items con iconos de Material-UI
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'usuarios', label: 'Usuarios', icon: <PeopleIcon /> },
    { id: 'roles', label: 'Roles', icon: <SecurityIcon /> },
    { id: 'pasajeros', label: 'Pasajeros', icon: <PeopleIcon /> },
    { id: 'viajes', label: 'Gestión de Viajes', icon: <BusIcon /> },
    { id: 'pasajerosViajes', label: 'Pasajeros en Viajes', icon: <PeopleIcon /> },
    { id: 'conductores', label: 'Conductores', icon: <DriveEtaIcon /> },
    { id: 'vehiculos', label: 'Vehiculos', icon: <DriveEtaIcon /> },
    { id: 'reportes', label: 'Reportes', icon: <AssessmentIcon /> },
    { id: 'configuracion', label: 'Configuración', icon: <SettingsIcon /> }
  ];

  // *** HANDLER PARA EL TOGGLE DEL MENÚ MÓVIL ***
  const handleMenuToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Funciones de renderizado simplificadas para otras vistas
  const renderSimplifiedView = (title, icon, description) => (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <CardHeader 
        title={title}
        action={
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: theme.primary,
              '&:hover': { bgcolor: `${theme.primary}dd` }
            }}
          >
            Nuevo
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          {React.cloneElement(icon, { sx: { fontSize: 80, color: theme.primary, mb: 2 } })}
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.muted, mb: 4 }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
            >
              Comenzar
            </Button>
            <Button variant="outlined">
              Ver Más
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': 
        return <DashboardHome 
          theme={theme} 
          alertas={alertas} 
          viajes={viajes} 
          setActiveView={setActiveView}
          showNewAlertModal={showNewAlertModal}
          newAlertas={newAlertas}
          handleCloseAlertModal={handleCloseAlertModal}
          handleOpenAlertModal={handleOpenAlertModal}
        />;
      case 'usuarios': 
        return <UsuariosView theme={theme} />;

      case 'roles': 
        return <RolesView theme={theme} />;

      case 'pasajeros': 
        return <PasajerosView theme={theme} />;

      case 'pasajerosViajes': 
        return <PasajerosViajesView theme={theme} />;

      case 'viajes': 
        return <ViajesView theme={theme} />;

      case 'conductores': 
        return <ConductoresView theme={theme} />;

      case 'vehiculos': 
        return <VehiculosView theme={theme} />;

      case 'reportes': return renderSimplifiedView('Reportes y Estadísticas', <AssessmentIcon />, 'Análisis de rendimiento operacional');
      case 'configuracion': 
        return (
          <ConfiguracionView 
            theme={theme} 
            is2FAEnabled={is2FAEnabled}
            handleToggle2FA={handleToggle2FA}
            logout={logout}
          />
        );

      default: 
        return <DashboardHome 
          theme={theme} 
          alertas={alertas} 
          viajes={viajes} 
          setActiveView={setActiveView}
          showNewAlertModal={showNewAlertModal}
          newAlertas={newAlertas}
          handleCloseAlertModal={handleCloseAlertModal}
          handleOpenAlertModal={handleOpenAlertModal}
        />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.background }}>
      
<Sidebar 
  theme={theme}
  user={user} 
  activeView={activeView}
  setActiveView={setActiveView}
  logout={logout}
/>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.background,
          minHeight: '100vh'
          
        }}
      >
        {/* *** AQUÍ SE INTEGRA EL COMPONENTE HEADER *** */}
        <Header 
          colors={theme}
          activeView={activeView}
          menuItems={menuItems}
          user={user} 
          logout={logout}
          onMenuToggle={handleMenuToggle}
          token={token}          
          axiosJWT={axiosJWT}    
        />

        {/* Contenido principal con padding */}
        <Box sx={{ p: 3 }}>
          {/* Dynamic Content */}
          {renderContent()}
        </Box>

        {/* 2FA Modal */}
        {showSetup2FA && (
          <Setup2FA 
            userEmail={user.email}
            onComplete={handleSetup2FAComplete}
            onCancel={handleSetup2FACancel}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;