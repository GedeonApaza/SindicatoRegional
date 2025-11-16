import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

const CrearRol = ({ colors, onCreateRole, show, onClose }) => {
  const [newRole, setNewRole] = useState({ nombre_rol: '', descripcion: '' });

  const handleSubmit = () => {
    if (!newRole.nombre_rol.trim()) {
      alert('Nombre obligatorio');
      return;
    }
    onCreateRole(newRole);
    setNewRole({ nombre_rol: '', descripcion: '' });
    onClose();
  };

  const handleClose = () => {
    setNewRole({ nombre_rol: '', descripcion: '' });
    onClose();
  };

  return (
    <Dialog 
      open={show} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          backgroundColor: colors?.background || '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon />
          <Typography variant="h6">Crear Rol</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nombre del Rol"
            variant="outlined"
            fullWidth
            required
            value={newRole.nombre_rol}
            onChange={(e) => setNewRole({...newRole, nombre_rol: e.target.value})}
            error={!newRole.nombre_rol.trim() && newRole.nombre_rol !== ''}
            helperText={!newRole.nombre_rol.trim() && newRole.nombre_rol !== '' ? 'El nombre es obligatorio' : ''}
          />
          
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={newRole.descripcion}
            onChange={(e) => setNewRole({...newRole, descripcion: e.target.value})}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!newRole.nombre_rol.trim()}
          startIcon={<AddIcon />}
        >
          Crear Rol
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearRol;