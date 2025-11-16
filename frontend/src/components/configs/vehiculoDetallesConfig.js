import React from 'react';
import {
  DirectionsCar as CarIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Speed as SpeedIcon,
  LocalGasStation as GasIcon,
  EventSeat as EventSeatIcon,
  Palette as PaletteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Settings as SettingsIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

// Configuración para el modal de detalles de vehículos
export const vehiculoDetallesConfig = {
  title: 'Detalles del Vehículo',
  subtitle: 'Información completa del vehículo',
  avatarField: 'foto_vehiculo', // Si tienes fotos de vehículos
  statusField: 'estado',
  statusOptions: {
    'activo': {
      label: 'Activo',
      color: 'success',
      icon: <CheckCircleIcon />
    },
    'mantenimiento': {
      label: 'En Mantenimiento',
      color: 'warning',
      icon: <SettingsIcon />
    },
    'inactivo': {
      label: 'Inactivo',
      color: 'error',
      icon: <CancelIcon />
    },
    'reparacion': {
      label: 'En Reparación',
      color: 'error',
      icon: <SettingsIcon />
    }
  },
  sections: [
    {
      title: 'Información del Vehículo',
      fields: [
        {
          key: 'placa',
          label: 'Placa',
          icon: <BadgeIcon />,
          showIfEmpty: true
        },
        {
          key: 'marca',
          label: 'Marca',
          icon: <CarIcon />,
          showIfEmpty: true
        },
        {
          key: 'modelo',
          label: 'Modelo',
          icon: <CarIcon />,
          showIfEmpty: true
        },
        {
          key: 'anio',
          label: 'Año',
          icon: <CalendarIcon />,
          showIfEmpty: true
        },
        {
          key: 'capacidad_pasajeros',
          label: 'Capacidad',
          icon: <EventSeatIcon />,
          render: (value) => value ? `${value} pasajeros` : 'No especificado'
        },
        {
          key: 'kilometraje',
          label: 'Kilometraje',
          icon: <SpeedIcon />,
          render: (value) => value ? `${value.toLocaleString()} km` : 'No especificado'
        },
        {
          key: 'tipo_combustible',
          label: 'Tipo de Combustible',
          icon: <GasIcon />
        },
        {
          key: 'color',
          label: 'Color',
          icon: <PaletteIcon />
        }
      ]
    },

    {
      title: 'Asignación',
      fields: [
        {
          key: 'id_conductor',
          label: 'Conductor Asignado',
          icon: <PersonIcon />,
          fullWidth: true,
          render: (value, data, getConductorName) => {
            // getConductorName se pasará como función auxiliar
            return getConductorName ? getConductorName(value) : (value || 'Sin asignar');
          }
        }
      ]
    },
  ]
};

export default vehiculoDetallesConfig;