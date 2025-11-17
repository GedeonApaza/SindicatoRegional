import {
  DirectionsBus as BusIcon,
  DriveEta as DriveEtaIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  AirlineSeatReclineNormal as SeatIcon
} from '@mui/icons-material';

export const viajeDetallesConfig = {
  title: 'Detalles del Viaje',
  subtitle: 'Información completa del viaje',
  statusField: 'estado',
  statusOptions: {
    'programado': { 
      label: 'Programado', 
      color: 'info', 
      icon: <ScheduleIcon /> 
    },
    'en_ruta': { 
      label: 'En ruta', 
      color: 'warning', 
      icon: <PlayIcon /> 
    },
    'finalizado': { 
      label: 'Finalizado', 
      color: 'success', 
      icon: <CheckIcon /> 
    },
    'cancelado': { 
      label: 'Cancelado', 
      color: 'error', 
      icon: <CancelIcon /> 
    },
  },
  sections: [
    {
      title: 'Información de Ruta',
      fields: [
        { 
          key: 'origen', 
          label: 'Origen', 
          icon: <PlaceIcon /> 
        },
        { 
          key: 'destino', 
          label: 'Destino', 
          icon: <PlaceIcon /> 
        },
      ]
    },
    {
      title: 'Fechas y Horarios',
      fields: [
        { 
          key: 'fecha_inicio', 
          label: 'Fecha de Inicio', 
          icon: <CalendarIcon />, 
          type: 'datetime' 
        },
        { 
          key: 'fecha_fin', 
          label: 'Fecha de Fin', 
          icon: <CalendarIcon />, 
          type: 'datetime' 
        },
      ]
    }
  ]
};