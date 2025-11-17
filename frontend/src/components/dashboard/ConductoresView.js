import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import { DriveEta as DriveEtaIcon } from '@mui/icons-material';
import ListaConductores from '../tables/ListaConductores';
import CrearConductor from '../forms/CrearConductor';
import EditarConductor from '../forms/EditarConductor';
import VerDetalles from '../modals/VerDetalles';
import { conductorDetallesConfig } from '../configs/conductorDetallesConfig';
import { useDashboardData } from '../../context/DashboardDataContext';

const ConductoresView = ({ theme }) => {
  const {
    conductores,
    roles,
    handlers
  } = useDashboardData();
  const {
    handleCreateConductor,
    handleEditConductor,
    handleDeleteConductor
  } = handlers;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);
  const [selectedConductor, setSelectedConductor] = useState(null);

  // Transformar datos según la estructura REAL de tu BD
  const transformConductorData = (conductorObj) => {
    return {
      // ID del conductor
      id_conductor: conductorObj.conductor.id_conductor,
      
      // Datos de la tabla conductores (solo los que existen)
      licencia: conductorObj.conductor.licencia || '',
      celular: conductorObj.conductor.celular || '',
      fecha_vencimiento_licencia: conductorObj.conductor.fecha_vencimiento_licencia || '',

      
      // Datos de la tabla usuarios
      ci: conductorObj.usuario.ci || '',
      nombre_completo: conductorObj.usuario.nombre_completo || '',
      apellido_paterno: conductorObj.usuario.apellido_paterno || '',
      apellido_materno: conductorObj.usuario.apellido_materno || '',
      email: conductorObj.usuario.email || '',
      id_rol: conductorObj.usuario.id_rol || '',
      estado: conductorObj.usuario.estado || 'activo'
    };
  };

  const handleOpenEdit = (conductorObj) => {
    const transformedData = transformConductorData(conductorObj);
    console.log('Datos transformados:', transformedData);
    setSelectedConductor(transformedData);
    setShowEditModal(true);
  };


  const handleUpdate = (id, conductorData) => {
    handleEditConductor(id, conductorData);
    setShowEditModal(false);
    setSelectedConductor(null);
  };
  // Handler para abrir el modal de detalles
  const handleViewDetails = (conductor) => {
    setSelectedConductor(conductor);
    setShowDetalles(true);
  };

  // Handler para cerrar el modal de detalles
  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setSelectedConductor(null);
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
          title="Gestión de Conductores"
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
              Nuevo Conductor
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
            <ListaConductores 
              colors={theme} 
              conductores={conductores}
              onDelete={handleDeleteConductor}
              onEditConductor={handleOpenEdit}
              onViewDetails={handleViewDetails}
            />
          </Box>
        </CardContent>
      </Card>

      {showModal && (
        <CrearConductor
          colors={theme} 
          roles={roles} 
          onCreateConductor={handleCreateConductor}
          show={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
{showDetalles && selectedConductor && (
  <VerDetalles
    data={selectedConductor}
    show={showDetalles}
    onClose={handleCloseDetalles}
    colors={theme}
    config={conductorDetallesConfig} // <-- esto lo defines como hiciste con vehículos
  />
)}

      {showEditModal && selectedConductor && (
        <EditarConductor
          conductor={selectedConductor}
          colors={theme}
          roles={roles}
          onUpdateConductor={handleUpdate}
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedConductor(null);
          }}
        />
      )}
    </Box>
  );
};

export default ConductoresView;