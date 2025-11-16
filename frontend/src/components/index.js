import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Fab,
  Chip,
  Avatar,
  Paper,
  Divider,
  useMediaQuery,
  Slide,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ArrowBackIos,
  ArrowForwardIos,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  DirectionsBus,
  Security,
  Schedule,
  Groups,
  KeyboardArrowUp,
  ExpandMore,
  CheckCircle,
  Business,
  Route,
  People
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material';


// Imágenes
import img1 from '../assets/images/image1.jpeg';
import img2 from '../assets/images/image2.jpeg';
import img3 from '../assets/images/image3.jpeg';

const Index = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(false);

  const slides = [
    {
      title: "Transportistas Unidos",
      subtitle: "SINDICATO REGIONAL",
      year: "DESDE 1964",
      bgImage: img1
    },
    {
      title: "Servicios de Calidad",
      subtitle: "TRANSPORTE SEGURO",
      year: "DESDE 1964",
      bgImage: img2
    },
    {
      title: "Flota Moderna",
      subtitle: "TOYOTA & MÁS",
      year: "DESDE 1964",
      bgImage: img3
    }
  ];

  // Tema personalizado con los colores originales
  const theme = createTheme({
    palette: {
      primary: {
        main: '#D96668',
        light: '#E5999B',
        dark: '#B44547',
      },
      secondary: {
        main: '#A5879B',
        light: '#C1A7B7',
        dark: '#876A7C',
      },
      background: {
        default: '#F7F6F5',
        paper: '#FEFEFE',
      },
      text: {
        primary: '#2D2A2E',
        secondary: '#6B6B6B',
      },
      info: {
        main: '#BFB1AB',
      },
      warning: {
        main: '#8B7355',
      }
    },
    typography: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      h1: {
        fontWeight: 700,
        letterSpacing: '2px',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '1px',
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '1px',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '25px',
            padding: '12px 30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            }
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(135deg, rgba(45,42,46,0.95), rgba(165,135,155,0.9))',
            backdropFilter: 'blur(15px)',
            borderBottom: '1px solid rgba(191,177,171,0.3)',
          },
        },
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (window.scrollY > 800) {
        setAnimatedCards(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDropdownClick = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setDropdownAnchor(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ fontFamily: theme.typography.fontFamily }}>
        {/* Navigation */}
        <AppBar position="fixed" elevation={0}>
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1 }}>
              <Typography variant="h5" component="div" sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                letterSpacing: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                SINDICATO REGIONAL
              </Typography>
              
              {/* Desktop Menu */}
              {!isMobile ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button 
                    color="inherit" 
                    sx={{ 
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 0,
                      '&:hover': { bgcolor: 'rgba(217,102,104,0.1)' }
                    }}
                  >
                    Inicio
                  </Button>
                  {['Nosotros', 'Servicios', 'Transportistas'].map((item) => (
                    <Button 
                      key={item}
                      color="inherit" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': { 
                          color: 'primary.main',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                  <Button
                    color="inherit"
                    onClick={handleDropdownClick}
                    endIcon={<ExpandMore />}
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Más
                  </Button>
                  <Menu
                    anchorEl={dropdownAnchor}
                    open={Boolean(dropdownAnchor)}
                    onClose={handleDropdownClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        bgcolor: 'rgba(45,42,46,0.95)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(191,177,171,0.3)',
                        borderRadius: 3,
                        minWidth: 150
                      }
                    }}
                  >
                    <MenuItem onClick={handleDropdownClose} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(217,102,104,0.2)' } }}>
                      Galería
                    </MenuItem>
                    <MenuItem onClick={handleDropdownClose} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(217,102,104,0.2)' } }}>
                      Noticias
                    </MenuItem>
                  </Menu>
                  <Button color="inherit" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'primary.main' } }}>
                    Contacto
                  </Button>
                  <Button 
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{ ml: 2 }}
                  >
                    Iniciar Sesión
                  </Button>
                </Box>
              ) : (
                <IconButton
                  color="inherit"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              background: 'linear-gradient(135deg, rgba(45,42,46,0.95), rgba(165,135,155,0.9))',
              backdropFilter: 'blur(15px)',
            }
          }}
        >
          <List sx={{ pt: 4 }}>
            {['Inicio', 'Nosotros', 'Servicios', 'Transportistas', 'Galería', 'Noticias', 'Contacto'].map((text) => (
              <ListItem button key={text}>
                <ListItemText 
                  primary={text} 
                  sx={{ 
                    color: 'white',
                    '&:hover': { color: 'primary.main' }
                  }} 
                />
              </ListItem>
            ))}
            <ListItem sx={{ pt: 2 }}>
              <Button 
                fullWidth
                variant="contained" 
                color="primary"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </Button>
            </ListItem>
          </List>
        </Drawer>

        {/* Hero Section */}
        <Box
          sx={{
            height: '100vh',
            position: 'relative',
            backgroundImage: `linear-gradient(135deg, rgba(45,42,46,0.8), rgba(165,135,155,0.6), rgba(217,102,104,0.5)), url(${slides[currentSlide].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'all 1s ease-in-out'
          }}
        >
          {/* Navigation Arrows */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: 20,
              zIndex: 3,
              color: 'white',
              fontSize: '3rem',
              '&:hover': { 
                color: 'primary.main',
                transform: 'scale(1.1)' 
              }
            }}
          >
            <ArrowBackIos fontSize="inherit" />
          </IconButton>
          
          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: 20,
              zIndex: 3,
              color: 'white',
              fontSize: '3rem',
              '&:hover': { 
                color: 'primary.main',
                transform: 'scale(1.1)' 
              }
            }}
          >
            <ArrowForwardIos fontSize="inherit" />
          </IconButton>

          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12} lg={8}>
                <Slide direction="up" in={true} timeout={1000}>
                  <Box>
                    <Chip 
                      label={slides[currentSlide].title}
                      sx={{ 
                        mb: 3,
                        bgcolor: 'rgba(217,102,104,0.2)',
                        color: 'white',
                        fontSize: '1.1rem',
                        py: 2,
                        px: 3,
                        borderRadius: 3
                      }}
                    />
                    
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                        color: 'white',
                        textShadow: '3px 3px 12px rgba(0,0,0,0.4)',
                        lineHeight: 1.1,
                        mb: 4,
                        letterSpacing: '3px'
                      }}
                    >
                      {slides[currentSlide].subtitle}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                      <Box sx={{ 
                        width: 60, 
                        height: 3, 
                        background: 'linear-gradient(90deg, #D96668, #A5879B)',
                        mr: 3 
                      }} />
                      <Typography
                        variant="h5"
                        sx={{
                          color: 'primary.main',
                          letterSpacing: '2px',
                          fontWeight: 600,
                          textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                        }}
                      >
                        {slides[currentSlide].year}
                      </Typography>
                      <Box sx={{ 
                        width: 60, 
                        height: 3, 
                        background: 'linear-gradient(90deg, #A5879B, #D96668)',
                        ml: 3 
                      }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        sx={{
                          px: 5,
                          py: 2,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(135deg, #D96668, #A5879B)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #B44547, #876A7C)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        Afiliarse Ahora
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 5,
                          py: 2,
                          fontSize: '1.1rem',
                          color: 'white',
                          borderColor: 'rgba(255,255,255,0.5)',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'rgba(217,102,104,0.1)',
                            color: 'primary.main'
                          }
                        }}
                      >
                        Ver Servicios
                      </Button>
                    </Box>
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </Container>

          {/* Slide Indicators */}
          <Box sx={{ 
            position: 'absolute', 
            bottom: 40, 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2
          }}>
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: currentSlide === index ? 40 : 15,
                  height: 15,
                  borderRadius: 10,
                  background: currentSlide === index 
                    ? 'linear-gradient(45deg, #D96668, #A5879B)'
                    : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* About Section */}
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="xl">
            {/* Section Header */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  letterSpacing: 4, 
                  color: 'secondary.main',
                  fontSize: '1rem',
                  fontWeight: 600,
                  position: 'relative',
                  '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    width: 100,
                    height: 1,
                    bgcolor: 'secondary.light'
                  },
                  '&::before': { left: -120 },
                  '&::after': { right: -120 }
                }}
              >
                Sobre nosotros
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  color: 'text.primary',
                  mt: 3,
                  '& span': { color: 'primary.main' }
                }}
              >
                Sirviendo desde <span>1964</span>
              </Typography>
            </Box>

            <Grid container spacing={6} alignItems="center">
              {/* Story Card */}
              <Grid item xs={12} lg={4}>
                <Zoom in={animatedCards} timeout={1000}>
                  <Card elevation={0}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Business sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <Typography variant="h4" color="text.primary" fontWeight={600}>
                          Nuestra Historia
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                        Fundado en 1964 por un grupo de visionarios transportistas paceños, nuestro sindicato 
                        nació con el sueño de conectar el altiplano con los fértiles valles de los Yungas.
                      </Typography>
                      
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                        Lo que comenzó con apenas cinco vehículos Toyota recorriendo caminos de tierra, 
                        hoy se ha transformado en una red de transporte que moviliza miles de pasajeros mensualmente.
                      </Typography>
                      
                      <Button 
                        variant="contained" 
                        size="large"
                        sx={{
                          background: 'linear-gradient(135deg, #A5879B, #D96668)',
                        }}
                      >
                        Conoce Más
                      </Button>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              {/* Center Image */}
              <Grid item xs={12} lg={4}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Fade in={animatedCards} timeout={1500}>
                    <Paper
                      elevation={8}
                      sx={{
                        p: 4,
                        borderRadius: 6,
                        background: 'linear-gradient(135deg, rgba(217,102,104,0.1), rgba(165,135,155,0.1))',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -15,
                          right: -15,
                          width: 50,
                          height: 50,
                          background: 'linear-gradient(135deg, #D96668, #A5879B)',
                          borderRadius: 3,
                          opacity: 0.9
                        }
                      }}
                    >
                      <Avatar
                        src="https://images.evisos.com.bo/2014/05/12/en-venta-toyota-ipsum_848b981d_3.jpg"
                        sx={{ 
                          width: 280, 
                          height: 200, 
                          borderRadius: 4,
                          mx: 'auto'
                        }}
                        variant="rounded"
                      />
                    </Paper>
                  </Fade>
                </Box>
              </Grid>

              {/* Mission Card */}
              <Grid item xs={12} lg={4}>
                <Zoom in={animatedCards} timeout={1200}>
                  <Card elevation={0}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Groups sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                        <Typography variant="h4" color="text.primary" fontWeight={600}>
                          Nuestra Misión
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                        Garantizar un transporte seguro, puntual y accesible para todas las familias bolivianas, 
                        mientras defendemos los derechos laborales de nuestros transportistas.
                      </Typography>
                      
                      {[
                        'Vehículos bien mantenidos y seguros',
                        'Conductores capacitados y certificados',
                        'Tarifas justas y transparentes'
                      ].map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CheckCircle sx={{ color: 'primary.main', mr: 2, fontSize: 20 }} />
                          <Typography variant="body1" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      ))}

                      <Button 
                        variant="contained" 
                        size="large"
                        sx={{
                          mt: 3,
                          background: 'linear-gradient(135deg, #D96668, #A5879B)',
                        }}
                      >
                        Únete a Nosotros
                      </Button>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Vision Section */}
        <Box sx={{
          py: 8,
          background: 'linear-gradient(135deg, #2D2A2E 0%, rgba(165,135,155,0.9) 50%, rgba(217,102,104,0.9) 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(191,177,171,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(217,102,104,0.2) 0%, transparent 50%)',
            opacity: 0.6
          }
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 5,
                  textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                  fontSize: { xs: '2.5rem', md: '4rem' }
                }}
              >
                Nuestra Visión
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  lineHeight: 1.8,
                  opacity: 0.95,
                  fontWeight: 400
                }}
              >
                Ser la organización líder en transporte interprovincial de Bolivia, expandiendo nuestras 
                rutas estratégicas como La Paz - Caranavi y conectando los Yungas con el altiplano.
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 5,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.8)'
                }}
              >
                Aspiramos a modernizar constantemente nuestros vehículos, implementar tecnologías de 
                vanguardia para el seguimiento de rutas, y mantener los más altos estándares de seguridad vial.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<Route />}
                onClick={() => window.location.href = "http://127.0.0.1/mapa.html"}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                  color: '#2D2A2E',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.9))',
                  }
                }}
              >
                Ver Todas las Rutas
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Services Section */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="xl">
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ mb: 6, color: 'text.primary' }}
            >
              Nuestros Servicios
            </Typography>
            
            <Grid container spacing={4}>
              {[
                { icon: DirectionsBus, title: 'Transporte Seguro', desc: 'Flota moderna con mantenimiento constante' },
                { icon: Security, title: 'Viajes Seguros', desc: 'Conductores certificados y experimentados' },
                { icon: Schedule, title: 'Horarios Puntuales', desc: 'Respetamos tus tiempos de viaje' },
                { icon: People, title: 'Atención al Cliente', desc: 'Servicio personalizado para cada pasajero' }
              ].map((service, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <service.icon sx={{ 
                        fontSize: 60, 
                        color: 'primary.main', 
                        mb: 3 
                      }} />
                      <Typography variant="h6" gutterBottom color="text.primary">
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 6,
            background: 'linear-gradient(135deg, #2D2A2E 0%, rgba(165,135,155,0.8) 100%)',
            color: 'white',
            position: 'relative'
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              {/* Contact Info */}
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom sx={{ letterSpacing: 2, mb: 3 }}>
                  CONTÁCTANOS
                </Typography>
                {[
                  { icon: LocationOn, text: 'Terminal Minasa, La Paz, Bolivia' },
                  { icon: Phone, text: '+591 2 123-4567' },
                  { icon: Email, text: 'info@sindicatoregional.bo' }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <item.icon sx={{ color: 'primary.main', mr: 2, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Grid>

              {/* Social Media */}
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom sx={{ letterSpacing: 2, mb: 3 }}>
                  SÍGUENOS
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  Conéctate con nosotros en nuestras redes sociales para mantenerte informado sobre novedades.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[
                    { icon: Facebook, color: '#1877F2' },
                    { icon: Twitter, color: '#1DA1F2' },
                    { icon: Instagram, color: '#E4405F' },
                    { icon: LinkedIn, color: '#0077B5' }
                  ].map((social, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        width: 45,
                        height: 45,
                        '&:hover': {
                          bgcolor: social.color,
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <social.icon fontSize="small" />
                    </IconButton>
                  ))}
                </Box>
              </Grid>

              {/* Operating Hours */}
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom sx={{ letterSpacing: 2, mb: 3 }}>
                  HORARIOS
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                    Lunes - Viernes
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    7:00 AM - 6:00 PM
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                    Sábado - Domingo
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    7:00 AM - 5:00 PM
                  </Typography>
                </Box>
              </Grid>

            </Grid>

            {/* Copyright */}
            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Copyright © <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    SINDICATO REGIONAL
                  </Box>. Todos los derechos reservados.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: { xs: 'left', md: 'right' },
                    mt: { xs: 1, md: 0 }
                  }}
                >
                  Diseñado por <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    GEDEON NATANIEL CHOQUE APAZA
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Scroll to Top Button */}
        <Zoom in={showScrollTop}>
          <Fab
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.1)'
              }
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </Zoom>

        {/* Global Styles */}
        <Box
          sx={{
            '& *': {
              scrollBehavior: 'smooth'
            },
            '& ::-webkit-scrollbar': {
              width: 8
            },
            '& ::-webkit-scrollbar-track': {
              bgcolor: 'background.default'
            },
            '& ::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(135deg, #D96668, #A5879B)',
              borderRadius: 2
            },
            '& ::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(135deg, #A5879B, #D96668)'
            }
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Index;