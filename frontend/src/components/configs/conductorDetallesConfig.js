import {
  Person as PersonIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

export const conductorDetallesConfig = {
  title: 'Detalles del Conductor',
  subtitle: 'Información completa del conductor',
  statusField: 'usuario.estado',
  statusOptions: {
    'activo': { label: 'Activo', color: 'success', icon: <CheckCircleIcon /> },
    'inactivo': { label: 'Inactivo', color: 'error', icon: <CancelIcon /> },
  },
  sections: [
    {
      title: 'Información Personal',
      fields: [
        { key: 'usuario.nombre_completo', label: 'Nombre', icon: <PersonIcon /> },
        { key: 'usuario.ci', label: 'CI', icon: <BadgeIcon /> },
        { key: 'usuario.email', label: 'Email', icon: <EmailIcon /> },
        { key: 'conductor.celular', label: 'Celular', icon: <PhoneIcon /> },
        { key: 'conductor.licencia', label: 'Licencia', icon: <BadgeIcon /> },
        { key: 'conductor.fecha_vencimiento_licencia', label: 'Vencimiento Licencia', icon: <CalendarIcon />, type: 'date' },
      ]
    }
  ]
};
