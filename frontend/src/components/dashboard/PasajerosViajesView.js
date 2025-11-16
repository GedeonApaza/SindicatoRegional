import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import { PersonAddAlt1 as PersonAddIcon } from '@mui/icons-material';
import ListaPasajerosViajes from '../tables/ListaPasajerosViajes';
import CrearPasajeroViaje from '../forms/CrearPasajeroViaje';

const PasajerosViajesView = ({ 
  theme, 
  pasajerosViajes,
  pasajeros, 
  viajes,
  vehiculos,
  handleCreatePasajeroViaje, 
  handleDeletePasajeroViaje 
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box 
      sx={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}
    >
      <Card 
        sx={{ 
          borderRadius: 3, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0
        }}
      >
        <CardHeader 
          title="Gestión de Pasajeros en Viajes"
          action={
            <Button 
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
              onClick={() => setShowModal(true)}
            >
              Asignar Pasajero
            </Button>
          }
        />
        <CardContent 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            p: 0,
            '&:last-child': { pb: 0 }
          }}
        >
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <ListaPasajerosViajes 
              colors={theme} 
              pasajerosViajes={pasajerosViajes}
              viajes={viajes}
              pasajeros={pasajeros}
              onDelete={handleDeletePasajeroViaje}
            />
          </Box>
        </CardContent>
      </Card>

      {showModal && (
        <CrearPasajeroViaje
          colors={theme} 
          viajes={viajes}
          pasajeros={pasajeros}
          vehiculos={vehiculos}
          pasajerosViajes={pasajerosViajes}
          onCreatePasajeroViaje={handleCreatePasajeroViaje}
          show={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </Box>
  );
};

export default PasajerosViajesView;