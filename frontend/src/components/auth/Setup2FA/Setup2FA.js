import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Chip,
  IconButton,
  Card,
  CardContent,
  Divider,
  Fade,
  CircularProgress,
  Container,
  useTheme,
  alpha
} from '@mui/material';
import {
  QrCode2,
  Security,
  SmartphoneOutlined,
  ContentCopy,
  CheckCircle,
  Close,
  GetApp,
  Visibility,
  Warning
} from '@mui/icons-material';
import { styled } from '@mui/system';


// Componentes estilizados personalizados
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '24px',
    maxWidth: '600px',
    width: '100%',
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.background.paper, 0.95)} 0%, 
      ${alpha(theme.palette.background.default, 0.98)} 100%)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    boxShadow: `0 24px 60px ${alpha(theme.palette.common.black, 0.15)}, 
                0 12px 24px ${alpha(theme.palette.common.black, 0.08)}`,
  },
}));

const GradientHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 30% 20%, 
      ${alpha(theme.palette.common.white, 0.1)} 0%, 
      transparent 70%)`,
  }
}));

const QRContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.8)} 0%, 
    ${alpha(theme.palette.background.default, 0.4)} 100%)`,
  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const SecretCodeBox = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.default, 0.5),
  borderRadius: '12px',
  padding: theme.spacing(2),
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  fontFamily: 'monospace',
  fontSize: '14px',
  fontWeight: 600,
  wordBreak: 'break-all',
  lineHeight: 1.4,
  position: 'relative',
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '15px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const Setup2FA = ({ userEmail, onComplete, onCancel, open = true }) => {
  const theme = useTheme();
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [secretCopied, setSecretCopied] = useState(false);

  const API_URL = "http://localhost:5000";

  const steps = [
    {
      label: 'Descargar Aplicación',
      description: 'Instala una app de autenticación en tu dispositivo móvil',
      icon: <GetApp />
    },
    {
      label: 'Escanear Código QR',
      description: 'Usa la app para escanear el código QR o introduce el código manual',
      icon: <QrCode2 />
    },
    {
      label: 'Verificar Configuración',
      description: 'Confirma que la configuración fue exitosa',
      icon: <CheckCircle />
    }
  ];

  const authenticatorApps = [
    {
      name: 'Google Authenticator',
      android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
      ios: 'https://apps.apple.com/app/google-authenticator/id388497605'
    },
    {
      name: 'Microsoft Authenticator',
      android: 'https://play.google.com/store/apps/details?id=com.azure.authenticator',
      ios: 'https://apps.apple.com/app/microsoft-authenticator/id983156458'
    },
    {
      name: 'Authy',
      android: 'https://play.google.com/store/apps/details?id=com.authy.authy',
      ios: 'https://apps.apple.com/app/authy/id494168017'
    }
  ];

  // Configurar 2FA (obtener QR)
  const setupTwoFactor = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/2fa/setup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setQrCode(data.qr);
        setSecret(data.secret);
        setActiveStep(1);
      } else {
        setError(data.msg || "Error al configurar 2FA");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // Copiar código secreto
  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setSecretCopied(true);
      setTimeout(() => setSecretCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Cargar QR al montar el componente
  useEffect(() => {
    if (open) {
      setupTwoFactor();
    }
  }, [open]);

  const handleComplete = () => {
    setActiveStep(2);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <StyledDialog
      open={open}
      onClose={onCancel}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
    >
      {/* Header con gradiente */}
      <GradientHeader>
        <IconButton
          onClick={onCancel}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'inherit',
            zIndex: 1
          }}
        >
          <Close />
        </IconButton>
        
        <Security sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
        <Typography variant="h4" fontWeight="700" sx={{ mb: 1, zIndex: 1, position: 'relative' }}>
          Configurar 2FA
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, zIndex: 1, position: 'relative' }}>
          Autenticación de Dos Factores para {userEmail}
        </Typography>
      </GradientHeader>

      <DialogContent sx={{ p: 0 }}>
        <Container maxWidth="sm" sx={{ py: 4 }}>
          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: '12px' }}
              icon={<Warning />}
            >
              <strong>{error}</strong>
            </Alert>
          )}

          {/* Stepper */}
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 4 }}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: completed || active
                          ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                          : alpha(theme.palette.action.disabled, 0.12),
                        color: completed || active ? 'white' : theme.palette.action.disabled,
                      }}
                    >
                      {React.cloneElement(step.icon, { fontSize: 'small' })}
                    </Box>
                  )}
                >
                  <Typography variant="h6" fontWeight="600">
                    {step.label}
                  </Typography>
                </StepLabel>
                
                <StepContent>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>

                  {/* Contenido específico por paso */}
                  {index === 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom fontWeight="600">
                        Aplicaciones recomendadas:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {authenticatorApps.map((app) => (
                          <Chip
                            key={app.name}
                            label={app.name}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: '8px' }}
                          />
                        ))}
                      </Box>
                      <Alert severity="info" sx={{ borderRadius: '12px' }}>
                        Descarga cualquiera de estas aplicaciones desde tu tienda de apps
                      </Alert>
                    </Box>
                  )}

                  {index === 1 && (
                    <QRContainer elevation={0}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <QrCode2 sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight="600">
                          Escanear Código QR
                        </Typography>
                      </Box>

                      {qrCode ? (
                        <Box sx={{ mb: 3 }}>
                          <img
                            src={qrCode}
                            alt="QR 2FA"
                            style={{
                              maxWidth: '200px',
                              width: '100%',
                              borderRadius: '16px',
                              boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                              border: `3px solid ${theme.palette.background.paper}`
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 200,
                            mb: 3,
                            borderRadius: '16px',
                            border: `2px dashed ${alpha(theme.palette.divider, 0.3)}`,
                            background: alpha(theme.palette.background.default, 0.5)
                          }}
                        >
                          {loading ? (
                            <CircularProgress />
                          ) : (
                            <Typography color="text.secondary">
                              Cargando código QR...
                            </Typography>
                          )}
                        </Box>
                      )}

                      {/* Código manual alternativo */}
                      {secret && (
                        <Card variant="outlined" sx={{ borderRadius: '12px', mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Visibility sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" fontWeight="600">
                                CÓDIGO MANUAL ALTERNATIVO
                              </Typography>
                            </Box>
                            
                            <SecretCodeBox>
                              {secret}
                              <IconButton
                                onClick={copySecret}
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  right: 8,
                                  top: 8,
                                  background: alpha(theme.palette.background.paper, 0.8)
                                }}
                              >
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </SecretCodeBox>
                            
                            {secretCopied && (
                              <Alert severity="success" sx={{ mt: 1, py: 0 }}>
                                ¡Código copiado!
                              </Alert>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </QRContainer>
                  )}

                  {index === 2 && (
                    <Alert severity="success" sx={{ borderRadius: '12px' }}>
                      <Typography fontWeight="600">
                        ¡Configuración completada exitosamente!
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Tu cuenta ahora está protegida con autenticación de dos factores.
                      </Typography>
                    </Alert>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {/* Botones de acción */}
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <AnimatedButton
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
              startIcon={<Close />}
              sx={{
                borderColor: alpha(theme.palette.error.main, 0.5),
                color: theme.palette.error.main,
                '&:hover': {
                  borderColor: theme.palette.error.main,
                  background: alpha(theme.palette.error.main, 0.04),
                },
              }}
            >
              Cancelar
            </AnimatedButton>

            <AnimatedButton
              variant="contained"
              onClick={handleComplete}
              disabled={!qrCode || loading || activeStep === 2}
              startIcon={loading ? <CircularProgress size={16} /> : <CheckCircle />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                minWidth: 180,
              }}
            >
              {loading ? 'Configurando...' : activeStep === 2 ? 'Completado' : 'Ya configuré mi app'}
            </AnimatedButton>
          </Box>
        </Container>
      </DialogContent>
    </StyledDialog>
  );
};

export default Setup2FA;