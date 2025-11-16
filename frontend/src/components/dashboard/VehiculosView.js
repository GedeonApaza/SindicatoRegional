import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import { DriveEta as DriveEtaIcon } from '@mui/icons-material';
import ListaVehiculos from '../tables/ListaVehiculos';
import CrearVehiculo from '../forms/CrearVehiculo';
import EditarVehiculo from '../forms/EditarVehiculo';
import VerDetalles from '../modals/VerDetalles';
import { vehiculoDetallesConfig } from '../configs/vehiculoDetallesConfig';

const VehiculosView = ({ 
  theme, 
  vehiculos, 
  conductores, 
  handleCreateVehiculo,
  handleEditVehiculo,
  handleDeleteVehiculo,
  handleViewVehiculo,
  handleChangeEstado
}) => {
  // TODOS LOS ESTADOS NECESARIOS
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  // Función para obtener el nombre del conductor
  const getConductorName = (idConductor) => {
    if (!idConductor) return 'Sin asignar';
    const conductor = conductores?.find(c => c.conductor?.id_conductor === idConductor);
    return conductor ? conductor.usuario?.nombre_completo : 'No encontrado';
  };

  // Handler para abrir modal de edición
  const handleOpenEdit = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowEditModal(true);
  };

  // Handler para actualizar vehículo
  const handleUpdate = (id, vehiculoData) => {
    handleEditVehiculo(id, vehiculoData);
    setShowEditModal(false);
    setSelectedVehiculo(null);
  };

  // Handler para abrir el modal de detalles
  const handleViewDetails = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowDetalles(true);
  };

  // Handler para cerrar el modal de detalles
  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setSelectedVehiculo(null);
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
          title="Gestión de Vehículos"
          action={
            <Button 
              variant="contained"
              startIcon={<DriveEtaIcon />}
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
              onClick={() => setShowModal(true)}
            >
              Nuevo Vehículo
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
            <ListaVehiculos 
              colors={theme} 
              vehiculos={vehiculos}
              conductores={conductores}
              onDelete={handleDeleteVehiculo}
              onEditVehiculo={handleOpenEdit}
              onOpenModal={() => setShowModal(true)}
              onViewDetails={handleViewDetails}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Modal para crear vehículo */}
      {showModal && (
        <CrearVehiculo
          colors={theme} 
          conductores={conductores} 
          onCreateVehiculo={handleCreateVehiculo}
          show={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}

      {/* Modal de edición */}
      {showEditModal && (
        <EditarVehiculo
          vehiculo={selectedVehiculo}
          conductores={conductores}
          colors={theme}
          onUpdateVehiculo={handleUpdate}
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedVehiculo(null);
          }}
        />
      )}

      {/* Modal para ver detalles del vehículo */}
      {showDetalles && selectedVehiculo && (
        <VerDetalles
          data={selectedVehiculo}
          show={showDetalles}
          onClose={handleCloseDetalles}
          colors={theme}
          config={vehiculoDetallesConfig}
          helperFunctions={{
            getConductorName: getConductorName
          }}
        />
      )}
    </Box>
  );
};

export default VehiculosView;