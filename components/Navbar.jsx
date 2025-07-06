import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
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
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

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

const Navbar = ({ buttons = [], logo = null }) => {
  const { user, logout, isAuthenticated } = useUser();
  const { showSuccess } = useNotification();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%' }}>
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${tokens.grey[200]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {logo}
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 2 }}>
        {buttons.map(button => (
          <ListItem key={button.href} disablePadding>
            <ListItemButton
              component='a'
              href={button.href}
              onClick={handleDrawerToggle}
              sx={{
                mx: 2,
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: tokens.primary[600],
                  color: tokens.primary[600]
                }
              }}
            >
              <ListItemText 
                primary={button.text}
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${tokens.grey[200]}`,
            color: tokens.text.primary
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 0 } }}>
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
                    mr: 2, 
                    display: { sm: 'none' },
                    color: tokens.primary[600]
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  {logo}
                </Box>
              </Box>

              {/* Desktop Navigation */}
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 2,
                  flexGrow: 1,
                  justifyContent: 'center'
                }}
              >
                {buttons.map(button => (
                  <Button
                    key={button.href}
                    href={button.href}
                    variant='text'
                    size='medium'
                    sx={{
                      color: tokens.text.primary,
                      fontWeight: 500,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: tokens.primary[50],
                        color: tokens.primary[600],
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    {button.text}
                  </Button>
                ))}
              </Box>

              {/* User Menu */}
              {isAuthenticated() && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: tokens.primary[500],
                      width: 40,
                      height: 40,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }
                    }}
                    onClick={handleMenuClick}
                  >
                    {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
                  </Avatar>
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
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        border: `1px solid ${tokens.grey[200]}`
                      }
                    }}
                  >
                    <MenuItem disabled sx={{ opacity: 0.7 }}>
                      <Typography variant='body2' color='textSecondary'>
                        Olá, {user?.nome}
                      </Typography>
                    </MenuItem>
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{
                        '&:hover': {
                          backgroundColor: tokens.error[50],
                          color: tokens.error[600]
                        }
                      }}
                    >
                      Sair
                    </MenuItem>
                  </Menu>
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)'
            }
          }}
        >
          {drawer}
        </Drawer>

        {/* Mostar se usuário não está cadastrado */}
        {!isAuthenticated() && (
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
            <Typography variant='body2' sx={{ textAlign: 'center', fontWeight: 500 }}>
              Faça login para acessar todas as funcionalidades do sistema
            </Typography>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default Navbar;
