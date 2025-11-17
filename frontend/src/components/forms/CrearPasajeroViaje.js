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
  vehiculos = [],
  pasajerosViajes = [],
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

  // Obtener info del viaje seleccionado
  const viajeSeleccionado = useMemo(
    () => viajes.find(v => v.id_viaje === parseInt(nuevoRegistro.id_viaje)),
    [nuevoRegistro.id_viaje, viajes]
  );

  // Obtener vehículo asociado
  const vehiculoSeleccionado = useMemo(() => {
    if (viajeSeleccionado?.vehiculo) return viajeSeleccionado.vehiculo;
    if (viajeSeleccionado?.id_vehiculo)
      return vehiculos.find(v => v.id_vehiculo === viajeSeleccionado.id_vehiculo);
    return null;
  }, [viajeSeleccionado, vehiculos]);

  // Calcular capacidad, pasajeros y asientos
  const capacidadVehiculo = vehiculoSeleccionado?.capacidad_pasajeros || 0;

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

  // Validación
  const validateForm = () => {
    const newErrors = {};
    if (!nuevoRegistro.id_viaje) newErrors.id_viaje = 'Debe seleccionar un viaje';
    if (!nuevoRegistro.id_pasajero) newErrors.id_pasajero = 'Debe seleccionar un pasajero';
    if (!nuevoRegistro.numero_asiento) newErrors.numero_asiento = 'Debe seleccionar un número de asiento';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar registro
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

  // Renderizar mapa de asientos interactivo (layout real de bus)
  const renderSeatMap = () => {
    if (!viajeSeleccionado || capacidadVehiculo === 0) return null;

    // Layout especial para buses: 1 copiloto + filas de 3 o 2 asientos
    const renderAsiento = (num) => {
      if (num > capacidadVehiculo) return null;
      
      const ocupado = asientosOcupados.includes(num);
      const seleccionado = nuevoRegistro.numero_asiento === num;

      return (
        <Box
          key={num}
          onClick={() => !ocupado && handleChange('numero_asiento', num)}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            backgroundColor: ocupado ? '#ef5350' : seleccionado ? '#4caf50' : '#81d4fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: ocupado ? 'not-allowed' : 'pointer',
            border: seleccionado ? '3px solid #2e7d32' : '2px solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': ocupado ? {} : {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          <Typography sx={{ fontSize: '18px', fontWeight: 700, color: ocupado ? '#fff' : '#01579b' }}>
            {num}
          </Typography>
        </Box>
      );
    };

    return (
      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '16px', 
        p: 3,
        border: '2px solid #e0e0e0'
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
          Selecciona tu Asiento
        </Typography>

        {/* Fila del conductor y copiloto */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          {/* Conductor */}
          <Box sx={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            backgroundColor: '#607d8b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
          }}>
            CHOFER
          </Box>
          
          {/* Copiloto - Asiento 1 */}
          {renderAsiento(1)}
        </Box>

        {/* Resto de asientos */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* Primera fila: Asientos 2, 3, 4 */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
            {renderAsiento(2)}
            {renderAsiento(3)}
            {renderAsiento(4)}
          </Box>

          {/* Filas siguientes: 2 asientos por fila (5-6, 7-8, etc.) */}
          {Array.from({ length: Math.ceil((capacidadVehiculo - 4) / 2) }, (_, idx) => {
            const asiento1 = 5 + idx * 2;
            const asiento2 = 6 + idx * 2;
            
            return (
              <Box key={idx} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
                {renderAsiento(asiento1)}
                {renderAsiento(asiento2)}
              </Box>
            );
          })}
        </Box>

        {/* Leyenda */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 24, height: 24, backgroundColor: '#81d4fa', borderRadius: '6px' }} />
            <Typography variant="caption">Disponible</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 24, height: 24, backgroundColor: '#ef5350', borderRadius: '6px' }} />
            <Typography variant="caption">Ocupado</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 24, height: 24, backgroundColor: '#4caf50', borderRadius: '6px', border: '2px solid #2e7d32' }} />
            <Typography variant="caption">Seleccionado</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  // Render
  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
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
        <Grid container spacing={3}>
          {/* COLUMNA IZQUIERDA - Formulario */}
          <Grid item xs={12} md={5}>
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
                helperText={errors.id_viaje || 'Seleccione el viaje'}
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
                  <strong>{vehiculoSeleccionado?.placa || '—'}</strong>
                  <br />
                  Capacidad: <strong>{capacidadVehiculo}</strong> pasajeros
                  <br />
                  Ocupados: <strong>{pasajerosAsignados}</strong> / {capacidadVehiculo}
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
            </Box>
          </Grid>

          {/* COLUMNA DERECHA - Mapa de Asientos */}
          <Grid item xs={12} md={7}>
            {renderSeatMap()}
          </Grid>
        </Grid>
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