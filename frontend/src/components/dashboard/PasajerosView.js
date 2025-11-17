import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Button } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import ListaPasajeros from '../tables/ListaPasajeros';
import EditarPasajero from '../forms/EditarPasajero';
import CrearPasajero from '../forms/CrearPasajero';
import VerDetalles from '../modals/VerDetalles';
import { pasajeroDetallesConfig } from '../configs/pasajeroDetallesConfig';
import { useDashboardData } from '../../context/DashboardDataContext';

const PasajerosView = ({ theme }) => {
  const { pasajeros, handlers } = useDashboardData();
  const {
    handleCreatePasajero,
    handleEditPasajero,
    handleDeletePasajero
  } = handlers;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);
  const [selectedPasajero, setSelectedPasajero] = useState(null);

  const handleOpenEdit = (pasajero) => {
    setSelectedPasajero(pasajero);
    setShowEditModal(true);
  };

  const handleUpdate = (id, data) => {
    handleEditPasajero(id, data);
    setShowEditModal(false);
    setSelectedPasajero(null);
  };

  const handleViewDetails = (pasajero) => {
    setSelectedPasajero(pasajero);
    setShowDetalles(true);
  };

  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setSelectedPasajero(null);
  };

  return (
    <Box sx={{ height: '100%', width: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <CardHeader 
          title="Gestión de Pasajeros"
          action={
            <Button 
              variant="contained"
              startIcon={<PersonIcon />}
              sx={{ bgcolor: theme.primary, '&:hover': { bgcolor: `${theme.primary}dd` } }}
              onClick={() => setShowModal(true)}
            >
              Nuevo Pasajero
            </Button>
          }
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 0 }}>
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <ListaPasajeros 
              pasajeros={pasajeros}
              colors={theme}
              onDelete={handleDeletePasajero}
              onEditPasajero={handleOpenEdit}
              onOpenModal={() => setShowModal(true)}
              onViewDetails={handleViewDetails}
            />
          </Box>
        </CardContent>
      </Card>

      {showModal && (
        <CrearPasajero show={showModal} onClose={() => setShowModal(false)} onCreatePasajero={handleCreatePasajero} colors={theme} />
      )}

      {showEditModal && selectedPasajero && (
        <EditarPasajero
          show={showEditModal}
          pasajero={selectedPasajero}
          onClose={() => { setShowEditModal(false); setSelectedPasajero(null); }}
          onUpdatePasajero={handleUpdate}
          colors={theme}
        />
      )}

      {showDetalles && selectedPasajero && (
        <VerDetalles
          show={showDetalles}
          onClose={handleCloseDetalles}
          data={selectedPasajero}
          colors={theme}
          config={pasajeroDetallesConfig}
        />
      )}
    </Box>
  );
};

export default PasajerosView;
