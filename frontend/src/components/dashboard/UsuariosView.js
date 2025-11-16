import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import ListaUsuarios from '../tables/ListaUsuarios';
import CrearUsuario from '../forms/CrearUsuario';
import EditarUsuario from '../forms/EditarUsuario';
import VerUsuario from '../forms/VerUsuario';

const UsuariosView = ({ 
  theme, 
  users, 
  roles, 
  handleCreateUser, 
  handleDeleteUser,
  handleActivateUser,
  handleEditUser,
  handleViewUser  
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleOpenView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleUpdate = (id, userData) => {
    handleEditUser(id, userData);
    setShowEditModal(false);
    setSelectedUser(null);
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
          title="Gestión de Usuarios"
          action={
            <Button 
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': { bgcolor: `${theme.primary}dd` }
              }}
              onClick={() => setShowCreateModal(true)}
            >
              Nuevo Usuario
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
            <ListaUsuarios 
              colors={theme}
              users={users}
              onDeleteUser={handleDeleteUser}
              onActivateUser={handleActivateUser}
              onEditUser={handleOpenEdit}
              onViewUser={handleOpenView}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Modal Crear Usuario */}
      {showCreateModal && (
        <CrearUsuario
          colors={theme} 
          roles={roles} 
          onCreateUser={handleCreateUser} 
          show={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      )}

      {/* Modal Editar Usuario */}
      {showEditModal && (
        <EditarUsuario
          usuario={selectedUser}
          colors={theme} 
          roles={roles} 
          onUpdateUser={handleUpdate} 
          show={showEditModal} 
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }} 
        />
      )}

      {/* Modal Ver Usuario */}
      {showViewModal && (
        <VerUsuario
          usuario={selectedUser}
          colors={theme}
          show={showViewModal} 
          onClose={() => {
            setShowViewModal(false);
            setSelectedUser(null);
          }} 
        />
      )}
    </Box>
  );
};

export default UsuariosView;