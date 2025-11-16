import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Container,
  Paper,
  Grid,
  Fade,
  Slide
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  Login as LoginIcon,
  QrCode,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Tema personalizado con la paleta de colores original
const theme = createTheme({
  palette: {
    primary: {
      main: '#D96668',
      light: '#E58B8D',
      dark: '#B84547',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#A5879B',
      light: '#C4AAB8',
      dark: '#8A6A7E',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F7F6F5',
      paper: '#FEFEFE'
    },
    text: {
      primary: '#2D2A2E',
      secondary: '#6B6B6B'
    },
    tertiary: {
      main: '#BFB1AB',
      light: '#D4C8C3',
      dark: '#A0938E'
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.02em'
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(45, 42, 46, 0.1), 0 8px 24px rgba(45, 42, 46, 0.08)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            '& fieldset': {
              borderWidth: '2px',
              borderColor: '#BFB1AB60'
            },
            '&:hover fieldset': {
              borderColor: '#A5879B'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D96668'
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          padding: '16px',
          fontSize: '16px',
          textTransform: 'none',
          transition: 'all 0.3s ease'
        },
        contained: {
          background: 'linear-gradient(135deg, #D96668 0%, #A5879B 100%)',
          boxShadow: '0 8px 24px rgba(217, 102, 104, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 32px rgba(217, 102, 104, 0.4)'
          }
        }
      }
    }
  }
});

const Login = () => {
  const navigate = useNavigate();
  
  // Estados del componente
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);
  const [twoFactorError, setTwoFactorError] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [remember, setRemember] = useState(false);

  const API_URL = "http://localhost:5000";

  // React Hook Form
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const watchedFields = watch();

  // Configurar axios con interceptores
  useEffect(() => {
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 500) {
          setMsg('Error interno del servidor');
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          setMsg('Error de conexión - tiempo de espera agotado');
        } else if (error.code === 'ERR_NETWORK') {
          setMsg('Error de red - verifique su conexión');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Efecto para redirigir al dashboard cuando hay access token
  useEffect(() => {
    if (accessToken) {
      const timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [accessToken, navigate]);

  // Verificar si ya está logueado al cargar el componente
  useEffect(() => {
    if (window.userData?.token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // Función de login
  const onSubmit = async (formData) => {
    setLoading(true);
    setMsg('');
    console.log('Intentando login con:', formData);

    try {
      const response = await axios.post('/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Respuesta login:', response);
      const data = response.data;

      if (response.status === 200) {
        console.log('Login exitoso, token:', data.accessToken);
        setAccessToken(data.accessToken);

        if (remember) {
          window.userData = {
            usuario: formData.email,
            tipo: 'transportista',
            token: data.accessToken,
          };
          console.log('Datos guardados en memoria:', window.userData);
        }
      } else if (response.status === 206) {
        console.log('Se requiere 2FA, QR:', data.qrCode);
        setShowTwoFactor(true);
        setTwoFactorEnabled(true);
      }
    } catch (error) {
      console.error('Error en login catch:', error);

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 206) {
          setShowTwoFactor(true);

        } else {
          setMsg(data.msg || `Error ${status}: ${error.response.statusText}`);
        }
      } else if (error.request) {
        setMsg("No se pudo conectar con el servidor. Verifique su conexión.");
      } else {
        setMsg("Error en la configuración de la petición");
      }
    } finally {
      setLoading(false);
    }
  };

  // Verificar 2FA con axios
  const handleTwoFactorVerification = async () => {
    const fullCode = twoFactorCode.join('');
    if (fullCode.length !== 6) {
      setTwoFactorError('Por favor ingresa el código completo de 6 dígitos');
      return;
    }

    setLoading(true);
    setTwoFactorError('');

    try {
      const response = await axios.post('/2fa/verify', {
        email: watchedFields.email,
        token: fullCode,
      });

      const data = response.data;
      setAccessToken(data.accessToken);
      setShowTwoFactor(false);
      
      if (remember) {
        window.userData = {
          usuario: watchedFields.email,
          tipo: 'transportista',
          token: data.accessToken,
        };
      }
    } catch (error) {
      console.error('Error en verificación 2FA:', error);
      
      if (error.response) {
        setTwoFactorError(error.response.data.msg || "Código 2FA incorrecto");
      } else {
        setTwoFactorError("Error de conexión con el servidor");
      }
      
      setTwoFactorCode(['', '', '', '', '', '']);
      setTimeout(() => document.getElementById('code-0')?.focus(), 100);
    } finally {
      setLoading(false);
    }
  };

  // Manejar input de código 2FA
  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (twoFactorError) setTwoFactorError('');
  };

  // Manejar backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newCode = [...twoFactorCode];
        newCode[index - 1] = '';
        setTwoFactorCode(newCode);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container 
        maxWidth={false}
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F7F6F5 0%, rgba(191, 177, 171, 0.3) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3
        }}
      >
        <Fade in timeout={800}>
          <Card sx={{ maxWidth: 480, width: '100%' }}>
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #D96668 0%, #A5879B 100%)',
                color: 'white',
                py: 5,
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
                  background: 'radial-gradient(circle at 30% 20%, rgba(217, 102, 104, 0.4) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }
              }}
            >
              <Typography variant="h4" sx={{ position: 'relative', zIndex: 2, mb: 1 }}>
                Sindicato Regional
              </Typography>
              <Typography variant="body1" sx={{ position: 'relative', zIndex: 2, opacity: 0.9 }}>
                Sistema de Autenticación Segura
              </Typography>
            </Box>

            <CardContent sx={{ p: 5 }}>
              {/* Mensaje de Error Global */}
              {msg && (
                <Slide direction="down" in={!!msg}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {msg}
                  </Alert>
                </Slide>
              )}

              {/* Mensaje de Éxito */}
              {accessToken && (
                <Slide direction="down" in={!!accessToken}>
                  <Alert 
                    severity="success" 
                    icon={<CheckCircle />}
                    sx={{ mb: 3, borderRadius: 2 }}
                  >
                    ¡Login exitoso! Redirigiendo...
                  </Alert>
                </Slide>
              )}



              {showTwoFactor ? (
                /* Vista 2FA */
                <Slide direction="up" in={showTwoFactor}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Security sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                      Verificación 2FA
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.5 }}>
                      Ingresa el código de 6 dígitos generado por tu aplicación de autenticación
                    </Typography>

                    {/* Error 2FA */}
                    {twoFactorError && (
                      <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {twoFactorError}
                      </Alert>
                    )}

                    {/* Código 2FA */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                      {twoFactorCode.map((digit, index) => (
                        <TextField
                          key={index}
                          id={`code-${index}`}
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          inputProps={{
                            maxLength: 1,
                            style: { 
                              textAlign: 'center', 
                              fontSize: '20px',
                              fontWeight: 'bold',
                              fontFamily: 'monospace'
                            }
                          }}
                          sx={{
                            width: '50px',
                            '& .MuiOutlinedInput-root': {
                              height: '60px',
                              borderRadius: 2,
                              '& fieldset': {
                                borderWidth: digit ? '3px' : '2px',
                                borderColor: digit ? 'secondary.main' : 'rgba(191, 177, 171, 0.6)'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                                borderWidth: '3px'
                              }
                            }
                          }}
                          placeholder="0"
                        />
                      ))}
                    </Box>

                    <Box sx={{ position: 'relative', mb: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Security />}
                        onClick={handleTwoFactorVerification}
                        disabled={loading || twoFactorCode.some(digit => digit === '')}
                      >
                        {loading ? 'Verificando...' : 'Verificar Código'}
                      </Button>
                    </Box>

                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<ArrowBack />}
                      onClick={() => setShowTwoFactor(false)}
                    >
                      Regresar al login
                    </Button>
                  </Box>
                </Slide>
              ) : (
                /* Formulario de Login */
                <Slide direction="up" in={!showTwoFactor}>
                  <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      type="email"
                      {...register('email', {
                        required: 'El correo electrónico es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Ingresa un correo electrónico válido'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{ mb: 3 }}
                      placeholder="tu@email.com"
                    />

                    <TextField
                      fullWidth
                      label="Contraseña"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: {
                          value: 6,
                          message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                      placeholder="••••••••••"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Recordar sesión"
                      sx={{ mb: 3 }}
                    />

                    <Box sx={{ position: 'relative' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                        disabled={loading || !isValid}
                      >
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                      </Button>
                    </Box>
                  </Box>
                </Slide>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </ThemeProvider>
  );
};

export default Login;