import React from 'react';
import { 
  Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Typography, Box 
} from '@mui/material';
import { Person as PersonIcon, Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ListaPasajeros = ({ pasajeros, colors, onDelete, onEditPasajero, onViewDetails }) => {
  return (
    <Card elevation={1} sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: colors?.background || 'grey.50' }}>
                <TableCell>CI</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Apellido Paterno</TableCell>
                <TableCell>Apellido Materno</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!pasajeros || pasajeros.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 5, textAlign: 'center' }}>
                    No hay pasajeros registrados
                  </TableCell>
                </TableRow>
              ) : (
                pasajeros.map(p => (
                  <TableRow key={p.id_pasajero}>
                    <TableCell>{p.ci}</TableCell>
                    <TableCell>{p.nombre_completo}</TableCell>
                    <TableCell>{p.apellido_paterno}</TableCell>
                    <TableCell>{p.apellido_materno}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="info" onClick={() => onViewDetails && onViewDetails(p)}>
                          <VisibilityIcon fontSize="small"/>
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => onEditPasajero && onEditPasajero(p)}>
                          <EditIcon fontSize="small"/>
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => onDelete && onDelete(p.id)}>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ListaPasajeros;
