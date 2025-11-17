import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';
import ListaRoles from '../tables/ListaRoles';
import CrearRol from '../forms/CrearRol';
import { useDashboardData } from '../../context/DashboardDataContext';

const RolesView = ({ theme }) => {
  const { roles, handlers } = useDashboardData();
  const { handleDeleteRole, handleCreateRole } = handlers;
  const [showModal, setShowModal] = useState(false);

  return (
    <Box>
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <CardHeader 
          title="Gestión de Roles"
          action={
            <Button 
              variant="contained"
              startIcon={<SecurityIcon />}
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
              onClick={() => setShowModal(true)}
            >
              Nuevo Rol
            </Button>
          }
        />
        <CardContent>
          <ListaRoles 
            colors={theme} 
            roles={roles} 
            onDeleteRole={handleDeleteRole}
            onOpenModal={() => setShowModal(true)}
          />
        </CardContent>
      </Card>

      {showModal && (
        <CrearRol 
          colors={theme} 
          onCreateRole={handleCreateRole} 
          show={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </Box>
  );
};

export default RolesView;