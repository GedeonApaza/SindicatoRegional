import {
  Person as PersonIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

export const pasajeroDetallesConfig = {
  title: 'Detalles del Pasajero',
  subtitle: 'Información completa del pasajero',
  avatarField: 'id_pasajero', // 
  sections: [
    {
      title: 'Información Personal',
      fields: [
        { key: 'nombre_completo', label: 'Nombre', icon: <PersonIcon /> },
        { key: 'apellido_paterno', label: 'Apellido Paterno', icon: <PersonIcon /> },
        { key: 'apellido_materno', label: 'Apellido Materno', icon: <PersonIcon /> },
        { key: 'ci', label: 'CI', icon: <BadgeIcon /> },
        { key: 'email', label: 'Email', icon: <EmailIcon /> },
        { key: 'celular', label: 'Celular', icon: <PhoneIcon /> }, // si lo agregas en DB
      ]
    }
  ]
};
