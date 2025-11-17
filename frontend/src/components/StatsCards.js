import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { People, DirectionsBus, LocalTaxi, Person } from '@mui/icons-material';
import { useDashboardData } from '../context/DashboardDataContext';

const theme = {
  primary: "#667eea",
  secondary: "#f093fb", 
  success: "#4ade80",
  error: "#f87171",
  warning: "#fbbf24",
  muted: "#6b7280",
  background: "#f8fafc",
  surface: "#ffffff"
};

const getTodayRange = () => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const StatsCards = () => {
  const { pasajeros = [], viajes = [], conductores = [], users = [] } = useDashboardData();
  const { start: startToday, end: endToday } = getTodayRange();

  const stats = useMemo(() => {
    const pasajerosHoy = pasajeros.filter((pasajero) => {
      const fechaRegistro = pasajero.fecha_registro || pasajero.created_at;
      if (!fechaRegistro) return false;
      const fecha = new Date(fechaRegistro);
      return fecha >= startToday && fecha <= endToday;
    }).length;

    const totalPasajeros = pasajeros.length;
    const porcentajePasajeros = totalPasajeros
      ? `${((pasajerosHoy / totalPasajeros) * 100).toFixed(0)}%`
      : '0%';

    const viajesCompletados = viajes.filter(
      (viaje) => viaje.estado?.toLowerCase() === 'finalizado'
    ).length;

    const conductoresActivos = conductores.filter((conductor) => {
      const estadoUsuario = conductor.usuario?.estado;
      return  estadoUsuario === 'activo';
    }).length;

    const usuariosActivos = users.filter((user) => user.estado === 'activo').length;

    return [
      {
        title: "Pasajeros Registrados",
        value: totalPasajeros.toLocaleString('es-BO'),
        change: `+${porcentajePasajeros}`,
        isPositive: true,
        color: "#ef4444",
        icon: <People sx={{ fontSize: 32, color: "#ef4444" }} />
      },
      {
        title: "Viajes Completados", 
        value: viajesCompletados.toString(),
        change: `Total ${viajes.length}`,
        isPositive: true,
        color: "#8b5cf6",
        icon: <DirectionsBus sx={{ fontSize: 32, color: "#8b5cf6" }} />
      },
      {
        title: "Conductores Activos",
        value: conductoresActivos.toString(), 
        change: `${conductores.length} en total`,
        isPositive: true,
        color: "#f59e0b",
        icon: <LocalTaxi sx={{ fontSize: 32, color: "#f59e0b" }} />
      },
      {
        title: "Usuarios del Sistema",
        value: users.length.toString(),
        change: `${usuariosActivos} activos`, 
        isPositive: true,
        color: "#6b7280",
        icon: <Person sx={{ fontSize: 32, color: "#6b7280" }} />
      }
    ];
  }, [conductores, conductores.length, pasajeros, viajes, users, startToday, endToday]);

  return (
    <Box sx={{ 
      mb: 4,
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr', // 1 columna en móvil
        sm: 'repeat(2, 1fr)', // 2 columnas en tablet
        lg: 'repeat(4, 1fr)' // 4 columnas en desktop
      },
      gap: 3, // spacing consistente
      width: '100%'
    }}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(0,0,0,0.05)',
            '&:hover': { 
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header con icono y número */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              mb: 2 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {stat.icon}
                <Typography
                  variant="h3"
                  sx={{ 
                    fontWeight: 700, 
                    color: stat.color,
                    lineHeight: 1
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </Box>
            
            {/* Título */}
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.muted, 
                mb: 1.5,
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              {stat.title}
            </Typography>
            
            {/* Badge de cambio */}
            <Chip
              label={stat.change}
              size="small"
              sx={{
                bgcolor: stat.isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: stat.isPositive ? '#16a34a' : '#dc2626',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 24,
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsCards;