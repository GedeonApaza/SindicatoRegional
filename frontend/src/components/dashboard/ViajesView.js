import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import { DirectionsBus as BusIcon } from '@mui/icons-material';
import ListaViajes from '../tables/ListaViajes';
import CrearViaje from '../forms/CrearViaje';
import EditarViaje from '../forms/EditarViaje';
import VerDetalles from '../modals/VerDetalles';
import { viajeDetallesConfig } from '../configs/viajeDetallesConfig';
import { useDashboardData } from '../../context/DashboardDataContext';

const ViajesView = ({ theme }) => {
  const {
    viajes,
    vehiculos,
    conductores,
    handlers
  } = useDashboardData();
  const {
    handleCreateViaje,
    handleEditViaje,
    handleDeleteViaje
  } = handlers;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedViaje, setSelectedViaje] = useState(null);

  const handleOpenEdit = (viaje) => {
    setSelectedViaje(viaje);
    setShowEditModal(true);
  };

  const handleOpenDetails = (viaje) => {
    setSelectedViaje(viaje);
    setShowDetailsModal(true);
  };

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
          title="Gestión de Viajes"
          action={
            <Button 
              variant="contained"
              startIcon={<BusIcon />}
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
              onClick={() => setShowCreateModal(true)}
            >
              Nuevo Viaje
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
            <ListaViajes 
              colors={theme} 
              viajes={viajes}
              vehiculos={vehiculos}
              conductores={conductores}
              onDelete={handleDeleteViaje}
              onEdit={handleOpenEdit}
              onView={handleOpenDetails}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Modal Crear */}
      {showCreateModal && (
        <CrearViaje
          colors={theme} 
          vehiculos={vehiculos}
          conductores={conductores}
          onCreateViaje={handleCreateViaje}
          show={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      )}

      {/* Modal Editar */}
      {showEditModal && selectedViaje && (
        <EditarViaje
          viaje={selectedViaje}
          colors={theme}
          vehiculos={vehiculos}
          conductores={conductores}
          onUpdateViaje={handleEditViaje}
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedViaje(null);
          }}
        />
      )}

      {/* Modal Ver Detalles */}
      {showDetailsModal && selectedViaje && (
        <VerDetalles
          data={selectedViaje}
          config={viajeDetallesConfig}
          colors={theme}
          show={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedViaje(null);
          }}
        />
      )}
    </Box>
  );
};

export default ViajesView;