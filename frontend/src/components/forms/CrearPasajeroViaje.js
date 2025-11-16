import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { Close as CloseIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

const CrearPasajeroViaje = ({ 
  colors, 
  pasajeros = [], 
  viajes = [], 
  vehiculos = [], // 👈 ahora también acepta los vehículos
  pasajerosViajes = [], // 👈 lista de relaciones pasajero-viaje (si la tienes)
  onCreatePasajeroViaje, 
  show, 
  onClose 
}) => {
  const [nuevoRegistro, setNuevoRegistro] = useState({
    id_viaje: '',
    id_pasajero: '',
    numero_asiento: '',
    estado: 'registrado',
  });

  const [errors, setErrors] = useState({});
  const [alerta, setAlerta] = useState(null);

  // 🔍 Obtener info del viaje seleccionado
  const viajeSeleccionado = useMemo(
    () => viajes.find(v => v.id_viaje === parseInt(nuevoRegistro.id_viaje)),
    [nuevoRegistro.id_viaje, viajes]
  );

  // 🔍 Obtener vehículo asociado (desde el viaje o desde el listado global)
  const vehiculoSeleccionado = useMemo(() => {
    if (viajeSeleccionado?.vehiculo) return viajeSeleccionado.vehiculo;
    if (viajeSeleccionado?.id_vehiculo)
      return vehiculos.find(v => v.id_vehiculo === viajeSeleccionado.id_vehiculo);
    return null;
  }, [viajeSeleccionado, vehiculos]);

  // 🧮 Calcular capacidad, pasajeros y asientos
  const capacidadVehiculo = vehiculoSeleccionado?.capacidad_pasajeros || 0;

  // pasajeros ya asignados (puede venir en viaje o en lista externa)
  const pasajerosAsignados =
    viajeSeleccionado?.pasajeros?.length ||
    pasajerosViajes.filter(pv => pv.id_viaje === viajeSeleccionado?.id_viaje).length ||
    0;

  const asientosOcupados =
    viajeSeleccionado?.pasajeros?.map(p => p.numero_asiento) ||
    pasajerosViajes
      .filter(pv => pv.id_viaje === viajeSeleccionado?.id_viaje)
      .map(pv => pv.numero_asiento) ||
    [];

  const asientosDisponibles = Array.from({ length: capacidadVehiculo }, (_, i) => i + 1)
    .filter(num => !asientosOcupados.includes(num));

  // 🧩 Validación
  const validateForm = () => {
    const newErrors = {};
    if (!nuevoRegistro.id_viaje) newErrors.id_viaje = 'Debe seleccionar un viaje';
    if (!nuevoRegistro.id_pasajero) newErrors.id_pasajero = 'Debe seleccionar un pasajero';
    if (!nuevoRegistro.numero_asiento) newErrors.numero_asiento = 'Debe seleccionar un número de asiento';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧩 Guardar registro
  const handleSubmit = () => {
    if (!validateForm()) return;

    if (asientosDisponibles.length === 0) {
      setAlerta({
        type: 'error',
        msg: 'El vehículo ya alcanzó su capacidad máxima de pasajeros.',
      });
      return;
    }

    onCreatePasajeroViaje({
      id_viaje: parseInt(nuevoRegistro.id_viaje),
      id_pasajero: parseInt(nuevoRegistro.id_pasajero),
      numero_asiento: parseInt(nuevoRegistro.numero_asiento),
      estado: nuevoRegistro.estado,
    });

    handleClose();
  };

  const handleClose = () => {
    setNuevoRegistro({
      id_viaje: '',
      id_pasajero: '',
      numero_asiento: '',
      estado: 'registrado',
    });
    setErrors({});
    setAlerta(null);
    onClose();
  };

  const handleChange = (field, value) => {
    setNuevoRegistro(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // 🧱 Render
  return (
    <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: colors?.background || '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonAddIcon />
          <Typography variant="h6">Asignar Pasajero a Viaje</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {alerta && <Alert severity={alerta.type}>{alerta.msg}</Alert>}

          {/* VIAJE */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Selección de Viaje
          </Typography>
          <TextField
            select
            label="Viaje"
            variant="outlined"
            fullWidth
            value={nuevoRegistro.id_viaje}
            onChange={(e) => handleChange('id_viaje', e.target.value)}
            error={!!errors.id_viaje}
            helperText={errors.id_viaje || 'Seleccione el viaje al que se asignará el pasajero'}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          >
            <MenuItem value="">
              <em>Seleccionar viaje</em>
            </MenuItem>
            {viajes.map(v => (
              <MenuItem key={v.id_viaje} value={v.id_viaje}>
                {v.origen} → {v.destino}
              </MenuItem>
            ))}
          </TextField>

          {/* INFO DEL VEHÍCULO */}
          {viajeSeleccionado && (
            <Alert severity="info">
              Vehículo: <strong>{vehiculoSeleccionado?.placa || '—'}</strong> — Capacidad: <strong>{capacidadVehiculo}</strong> pasajeros.
              <br />
              Asientos ocupados: <strong>{pasajerosAsignados}</strong> / {capacidadVehiculo}
            </Alert>
          )}

          {/* PASAJERO */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Selección de Pasajero
          </Typography>
          <TextField
            select
            label="Pasajero"
            variant="outlined"
            fullWidth
            value={nuevoRegistro.id_pasajero}
            onChange={(e) => handleChange('id_pasajero', e.target.value)}
            error={!!errors.id_pasajero}
            helperText={errors.id_pasajero || 'Seleccione el pasajero'}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          >
            <MenuItem value="">
              <em>Seleccionar pasajero</em>
            </MenuItem>
            {pasajeros.map(p => (
              <MenuItem key={p.id_pasajero} value={p.id_pasajero}>
                {p.nombre_completo} ({p.ci})
              </MenuItem>
            ))}
          </TextField>

          {/* ASIENTO */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: -2 }}>
            Número de Asiento
          </Typography>
          <TextField
            select
            label="Asiento"
            variant="outlined"
            fullWidth
            value={nuevoRegistro.numero_asiento}
            onChange={(e) => handleChange('numero_asiento', e.target.value)}
            error={!!errors.numero_asiento}
            helperText={errors.numero_asiento || 'Seleccione el número de asiento disponible'}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          >
            <MenuItem value="">
              <em>Seleccionar asiento</em>
            </MenuItem>
            {asientosDisponibles.length > 0 ? (
              asientosDisponibles.map(num => (
                <MenuItem key={num} value={num}>
                  Asiento N°{num}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled><em>No hay asientos disponibles</em></MenuItem>
            )}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<PersonAddIcon />}
          disabled={asientosDisponibles.length === 0}
          sx={{
            backgroundColor: colors?.primary || '#1976d2',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: colors?.primary ? `${colors.primary}dd` : '#1565c0',
            },
          }}
        >
          Asignar Pasajero
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearPasajeroViaje;
