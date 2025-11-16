import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { People, DirectionsBus, LocalTaxi, Person } from '@mui/icons-material';

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

const stats = [
  {
    title: "Pasajeros Registrados",
    value: "1,24",
    change: "+12%",
    isPositive: true,
    color: "#ef4444",
    icon: <People sx={{ fontSize: 32, color: "#ef4444" }} />
  },
  {
    title: "Viajes Completados", 
    value: "20",
    change: "+8%",
    isPositive: true,
    color: "#8b5cf6",
    icon: <DirectionsBus sx={{ fontSize: 32, color: "#8b5cf6" }} />
  },
  {
    title: "Conductores Activos",
    value: "6", 
    change: "+3",
    isPositive: true,
    color: "#f59e0b",
    icon: <LocalTaxi sx={{ fontSize: 32, color: "#f59e0b" }} />
  },
  {
    title: "Usuarios del Sistema",
    value: "4",
    change: "+4", 
    isPositive: true,
    color: "#6b7280",
    icon: <Person sx={{ fontSize: 32, color: "#6b7280" }} />
  }
];

const StatsCards = () => {
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