import React from 'react';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Box
} from '@mui/material';
import { Delete as DeleteIcon, DirectionsBus, AirlineSeatReclineNormal as SeatIcon } from '@mui/icons-material';

const ListaPasajerosViajes = ({ colors, pasajerosViajes, viajes, pasajeros, onDelete }) => {
  
  const getPasajeroName = (idPasajero) => {
    const pasajero = pasajeros?.find(p => p.id_pasajero === idPasajero);
    return pasajero ? pasajero.nombre_completo : 'N/A';
  };

  const getViajeInfo = (idViaje) => {
    const viaje = viajes?.find(v => v.id_viaje === idViaje);
    return viaje ? `${viaje.origen} → ${viaje.destino}` : 'N/A';
  };

  const getEstadoColor = (estado) => {
    switch(estado?.toLowerCase()) {
      case 'registrado': return 'success';
      case 'en_proceso': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <Box sx={{ p: 3, backgroundColor: 'white', borderBottom: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DirectionsBus sx={{ color: 'primary.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors?.dark || 'text.primary' }}>
            Lista de Pasajeros por Viaje
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: colors?.background || 'grey.50' }}>
                <TableCell>Pasajero</TableCell>
                <TableCell>Viaje</TableCell>
                <TableCell>Asiento</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!pasajerosViajes || pasajerosViajes.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <Typography variant="body2" color="text.secondary">
                      No hay pasajeros registrados en viajes
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pasajerosViajes.map((pv) => (
                  <TableRow key={pv.id_pasajero_viaje}>
                    <TableCell>{getPasajeroName(pv.id_pasajero)}</TableCell>
                    <TableCell>{getViajeInfo(pv.id_viaje)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SeatIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        {pv.numero_asiento}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pv.estado}
                        size="small"
                        color={getEstadoColor(pv.estado)}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete && onDelete(pv.id_pasajero_viaje)}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
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

export default ListaPasajerosViajes;
