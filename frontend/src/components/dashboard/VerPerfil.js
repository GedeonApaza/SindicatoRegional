import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Avatar, Box } from "@mui/material";

const VerPerfil = ({ open, onClose, userId, token, axiosJWT }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId || !token) return;

    const fetchUser = async () => {
      try {
        const response = await axiosJWT.get(`http://localhost:5000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, [userId, token, axiosJWT]);

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Perfil de Usuario</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Avatar
            src={`http://localhost:5000${user.foto_perfil}`}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6">{user.nombre_completo}</Typography>
          <Typography variant="body2">Email: {user.email}</Typography>
          <Typography variant="body2">Estado: {user.estado}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VerPerfil;
