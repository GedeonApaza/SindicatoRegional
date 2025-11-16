import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, IconButton, Typography, Box, Alert
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon, Person as PersonIcon } from '@mui/icons-material';

const EditarPasajero = ({ pasajero, colors, onUpdatePasajero, show, onClose }) => {
  const [editedPasajero, setEditedPasajero] = useState({
    ci: '', nombre_completo: '', apellido_paterno: '', apellido_materno: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pasajero) {
      setEditedPasajero({
        ci: String(pasajero.ci || ''),
        nombre_completo: String(pasajero.nombre_completo || ''),
        apellido_paterno: String(pasajero.apellido_paterno || ''),
        apellido_materno: String(pasajero.apellido_materno || '')
      });
    }
  }, [pasajero]);

  const validateForm = () => {
    const newErrors = {};
    if (!editedPasajero.ci.trim()) newErrors.ci = 'CI es obligatorio';
    if (!editedPasajero.nombre_completo.trim()) newErrors.nombre_completo = 'Nombre es obligatorio';
    if (!editedPasajero.apellido_paterno.trim()) newErrors.apellido_paterno = 'Apellido paterno obligatorio';
    if (!editedPasajero.apellido_materno.trim()) newErrors.apellido_materno = 'Apellido materno obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onUpdatePasajero(pasajero.id_pasajero, editedPasajero);
    handleClose();
  };

  const handleClose = () => { setErrors({}); onClose(); };
  const handleInputChange = (field, value) => { setEditedPasajero({ ...editedPasajero, [field]: value }); if (errors[field]) setErrors({ ...errors, [field]: '' }); };

  if (!pasajero) return null;

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PersonIcon />Editar Pasajero</Box>
        <IconButton onClick={handleClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="CI" fullWidth required value={editedPasajero.ci} onChange={(e)=>handleInputChange('ci', e.target.value)} error={!!errors.ci} helperText={errors.ci} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre Completo" fullWidth required value={editedPasajero.nombre_completo} onChange={(e)=>handleInputChange('nombre_completo', e.target.value)} error={!!errors.nombre_completo} helperText={errors.nombre_completo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Apellido Paterno" fullWidth required value={editedPasajero.apellido_paterno} onChange={(e)=>handleInputChange('apellido_paterno', e.target.value)} error={!!errors.apellido_paterno} helperText={errors.apellido_paterno} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Apellido Materno" fullWidth required value={editedPasajero.apellido_materno} onChange={(e)=>handleInputChange('apellido_materno', e.target.value)} error={!!errors.apellido_materno} helperText={errors.apellido_materno} />
          </Grid>
        </Grid>

        <Alert severity="info" sx={{ mt: 2 }}>La contraseña no se puede modificar desde este formulario.</Alert>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" startIcon={<SaveIcon />}>Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarPasajero;
