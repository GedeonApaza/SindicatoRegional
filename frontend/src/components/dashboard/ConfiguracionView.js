import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Box,
  Button,
  Switch,
  Typography,
  Divider
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

const ConfiguracionView = ({
  theme,
  is2FAEnabled,
  handleToggle2FA,
  logout
}) => {
  return (
    <Grid container spacing={3}>
      {/* Configuración general */}
      <Grid item xs={12} md={8}>
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <CardHeader title="Configuración del Sistema" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre del Sindicato"
                  defaultValue="Sindicato Regional de Transporte"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Dirección"
                  defaultValue="Av. Mariscal Santa Cruz, La Paz"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  defaultValue="(591) 2-2345678"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue="info@sindicato.bo"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  bgcolor: theme.primary,
                  "&:hover": { bgcolor: `${theme.primary}dd` }
                }}
              >
                Guardar Cambios
              </Button>
              <Button variant="outlined">Cancelar</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Configuración de seguridad */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <CardHeader title="Seguridad" />
          <CardContent>
            <Box sx={{ mb: 2, p: 2, bgcolor: theme.background, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Autenticación 2FA
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.muted }}>
                    Seguridad adicional
                  </Typography>
                </Box>
                <Switch checked={is2FAEnabled} onChange={handleToggle2FA} />
              </Box>
            </Box>

            <Box sx={{ mb: 2, p: 2, bgcolor: theme.background, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Notificaciones
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.muted }}>
                    Alertas del sistema
                  </Typography>
                </Box>
                <Switch defaultChecked />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ConfiguracionView;
