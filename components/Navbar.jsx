import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  Home,
  Monitor,
  Person,
  Settings,
  Logout,
  Notifications,
  WaterDrop
} from '@mui/icons-material';
import {
  Button,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  AppBar,
  Toolbar,
  Container,
  Badge,
  Chip,
  Divider,
  Tooltip,
  Fade,
  Slide
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import Breadcrumb from './Breadcrumb';
import SystemStatus from './SystemStatus';

import { tokens } from '@/app/theme';
import { useUser } from '@/contexts/UserContext';
import { useNotification } from '@/hooks/useNotification';

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.primary[600]
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});

// Configuração de navegação
const navigationItems = [
  {
    text: 'Início',
    href: '/',
    icon: <Home />,
    description: 'Página principal'
  },
  {
    text: 'Monitoramento',
    href: '/monitoramento',
    icon: <Monitor />,
    description: 'Dados em tempo real'
  },
  {
    text: 'Sobre',
    href: '/sobre',
    icon: <WaterDrop />,
    description: 'Sobre o projeto'
  }
];

const Navbar = ({ buttons = navigationItems }) => {
  const { user, logout, isAuthenticated } = useUser();
  const { showSuccess } = useNotification();
  const router = useRouter();
  const pathname = usePathname();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      logout();
      showSuccess('Logout realizado com sucesso!');
      handleMenuClose();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (href) => {
    router.push(href);
    setMobileOpen(false);
  };

  const isActivePage = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header do Drawer */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${tokens.grey[200]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[800]} 100%)`,
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image 
            src='/logo_plamona.png' 
            alt='PlaMoNA' 
            width={40} 
            height={40}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            PlaMoNA
          </Typography>
        </Box>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Lista de Navegação */}
      <List sx={{ pt: 2, flex: 1 }}>
        {buttons.map(button => (
          <ListItem key={button.href} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(button.href)}
              sx={{
                mx: 2,
                borderRadius: 2,
                mb: 1,
                backgroundColor: isActivePage(button.href) ? tokens.primary[50] : 'transparent',
                color: isActivePage(button.href) ? tokens.primary[600] : tokens.text.primary,
                border: isActivePage(button.href) ? `1px solid ${tokens.primary[200]}` : 'none',
                '&:hover': {
                  backgroundColor: tokens.primary[50],
                  color: tokens.primary[600],
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: 'inherit',
                minWidth: 40
              }}>
                {button.icon}
              </ListItemIcon>
              <ListItemText 
                primary={button.text}
                secondary={button.description}
                primaryTypographyProps={{
                  fontWeight: isActivePage(button.href) ? 600 : 500
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  opacity: 0.7
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer do Drawer - Informações do Usuário */}
      {isAuthenticated() && (
        <Box sx={{ p: 2, borderTop: `1px solid ${tokens.grey[200]}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: tokens.primary[500],
                width: 40,
                height: 40
              }}
            >
              {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {user?.nome || 'Usuário'}
              </Typography>
              <Typography variant='caption' sx={{ color: tokens.text.secondary }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            variant='outlined'
            color='error'
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Sair
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="sticky"
          elevation={scrolled ? 8 : 0}
          sx={{
            background: scrolled 
              ? 'rgba(255, 255, 255, 0.98)' 
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${tokens.grey[200]}`,
            color: tokens.text.primary,
            transition: 'all 0.3s ease-in-out',
            transform: scrolled ? 'translateY(0)' : 'translateY(0)'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
              {/* Logo Section */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexGrow: { xs: 1, sm: 0 }
                }}
              >
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ 
                    mr: 1, 
                    display: { sm: 'none' },
                    color: tokens.primary[600],
                    '&:hover': {
                      backgroundColor: tokens.primary[50],
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => router.push('/')}
                >
                  <Image 
                    src='/logo_plamona.png' 
                    alt='PlaMoNA' 
                    width={40} 
                    height={40}
                  />
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography 
                      variant='h6' 
                      sx={{ 
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[800]} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      PlaMoNA
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Desktop Navigation */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  flexGrow: 1,
                  justifyContent: 'center'
                }}
              >
                {buttons.map(button => (
                  <Tooltip 
                    key={button.href}
                    title={button.description}
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 200 }}
                  >
                    <Button
                      onClick={() => handleNavigation(button.href)}
                      variant={isActivePage(button.href) ? 'contained' : 'text'}
                      size='medium'
                      startIcon={button.icon}
                      sx={{
                        color: isActivePage(button.href) ? 'white' : tokens.text.primary,
                        backgroundColor: isActivePage(button.href) 
                          ? `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[700]} 100%)`
                          : 'transparent',
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        transition: 'all 0.3s ease-in-out',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          backgroundColor: isActivePage(button.href)
                            ? `linear-gradient(135deg, ${tokens.primary[700]} 0%, ${tokens.primary[800]} 100%)`
                            : tokens.primary[50],
                          color: isActivePage(button.href) ? 'white' : tokens.primary[600],
                          transform: 'translateY(-2px)',
                          boxShadow: isActivePage(button.href) 
                            ? '0 8px 25px rgba(30, 136, 229, 0.3)'
                            : '0 4px 15px rgba(0,0,0,0.1)'
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s'
                        },
                        '&:hover::before': {
                          left: '100%'
                        }
                      }}
                    >
                      {button.text}
                    </Button>
                  </Tooltip>
                ))}
              </Box>

              {/* User Menu */}
              {isAuthenticated() && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Status do Sistema */}
                  <SystemStatus />
                  
                  {/* Notificações */}
                  <Tooltip title="Notificações" arrow>
                    <IconButton
                      sx={{
                        color: tokens.text.secondary,
                        '&:hover': {
                          backgroundColor: tokens.primary[50],
                          color: tokens.primary[600]
                        }
                      }}
                    >
                      <Badge badgeContent={3} color="error">
                        <Notifications />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  {/* Avatar e Menu */}
                  <Tooltip title="Menu do usuário" arrow>
                    <Avatar
                      sx={{
                        bgcolor: tokens.primary[500],
                        width: 42,
                        height: 42,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        border: `2px solid ${tokens.primary[200]}`,
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 8px 25px rgba(30, 136, 229, 0.3)',
                          borderColor: tokens.primary[400]
                        }
                      }}
                      onClick={handleMenuClick}
                    >
                      {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        border: `1px solid ${tokens.grey[200]}`,
                        minWidth: 200
                      }
                    }}
                    TransitionComponent={Slide}
                    transitionDuration={200}
                  >
                    {/* Header do Menu */}
                    <Box sx={{ p: 2, borderBottom: `1px solid ${tokens.grey[200]}` }}>
                      <Typography variant='subtitle2' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                        Olá, {user?.nome}
                      </Typography>
                      <Typography variant='caption' sx={{ color: tokens.text.secondary }}>
                        {user?.email}
                      </Typography>
                    </Box>

                    {/* Opções do Menu */}
                    <MenuItem 
                      onClick={() => {
                        handleMenuClose();
                        router.push('/user');
                      }}
                      sx={{
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: tokens.primary[50],
                          color: tokens.primary[600]
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Person />
                      </ListItemIcon>
                      Perfil
                    </MenuItem>
                    
                    <MenuItem 
                      onClick={() => {
                        handleMenuClose();
                        router.push('/configurarSensor');
                      }}
                      sx={{
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: tokens.primary[50],
                          color: tokens.primary[600]
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Settings />
                      </ListItemIcon>
                      Configurações
                    </MenuItem>

                    <Divider />

                    <MenuItem 
                      onClick={handleLogout}
                      sx={{
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: tokens.error[50],
                          color: tokens.error[600]
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Logout />
                      </ListItemIcon>
                      Sair
                    </MenuItem>
                  </Menu>
                </Box>
              )}

              {/* Botões de Ação para Usuários Não Autenticados */}
              {!isAuthenticated() && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant='text'
                    onClick={() => router.push('/login')}
                    sx={{
                      color: tokens.text.primary,
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: tokens.primary[50],
                        color: tokens.primary[600]
                      }
                    }}
                  >
                    Entrar
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => router.push('/cadastro')}
                    sx={{
                      background: `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[700]} 100%)`,
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      borderRadius: 2,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${tokens.primary[700]} 0%, ${tokens.primary[800]} 100%)`,
                        transform: 'translateY(-1px)',
                        boxShadow: '0 8px 25px rgba(30, 136, 229, 0.3)'
                      }
                    }}
                  >
                    Cadastrar
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)'
            }
          }}
        >
          {drawer}
        </Drawer>

        {/* Breadcrumb */}
        <Breadcrumb />
        
        {/* Banner para Usuários Não Autenticados */}
        {!isAuthenticated() && (
          <Slide direction="down" in={true} timeout={500}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 2,
                px: 3,
                background: `linear-gradient(135deg, ${tokens.warning[50]} 0%, ${tokens.warning[100]} 100%)`,
                borderBottom: `1px solid ${tokens.warning[200]}`,
                color: tokens.warning[800]
              }}
            >
              <Chip
                icon={<WaterDrop />}
                label="Faça login para acessar todas as funcionalidades do sistema"
                sx={{
                  fontWeight: 500,
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  border: `1px solid ${tokens.warning[300]}`,
                  '& .MuiChip-icon': {
                    color: tokens.warning[600]
                  }
                }}
              />
            </Box>
          </Slide>
        )}
      </ThemeProvider>
    </>
  );
};

export default Navbar;
