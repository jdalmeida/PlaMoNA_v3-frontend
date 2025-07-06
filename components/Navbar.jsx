import { Menu as MenuIcon } from '@mui/icons-material';
import {
  Button,
  Box,
  Typography,
  Slide,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import { tokens } from '@/app/theme';
import { useUser } from '@/contexts/UserContext';
import { useNotification } from '@/hooks/useNotification';

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.grey[900]
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

export default function Navbar({ buttons, logo }) {
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
    <Box sx={{ width: 250 }}>
      <List>
        {buttons.map(button => (
          <ListItem key={button.text} component='a' href={button.href} onClick={handleDrawerToggle}>
            <ListItemButton>
              <ListItemText primary={button.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          className='flex py-3 shadow-lg lg:px-40 md:px-10'
          sx={{
            backgroundColor: tokens.blueAccent[300] + '77',
            flexDirection: { sm: 'row', xs: 'column' },
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, sm: 3, md: 4, lg: 5 }
          }}
        >
          <Box
            sx={{
              color: tokens.grey[900],
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
            className='align-center justify-center p-3 lg:text-3xl md:text-lg'
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {logo}
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              alignItems: 'center',
              display: { xs: 'none', sm: 'flex' },
              gap: '.5em'
            }}
            className='align-center lg:justify-center,space-x-4,p-3 md:justify-end,space-x-2 p-2'
          >
            {buttons.map(button => (
              <Button
                variant='outlined'
                size={'small'}
                color='primary'
                key={button.text}
                href={button.href}
                sx={{
                  fontSize: { sm: '0.75rem', md: '0.875rem' },
                  px: { sm: 1, md: 2 }
                }}
              >
                {button.text}
              </Button>
            ))}

            {isAuthenticated() && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: tokens.blueAccent[500],
                    width: 32,
                    height: 32,
                    cursor: 'pointer'
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
                >
                  <MenuItem disabled>
                    <Typography variant='body2' color='textSecondary'>
                      Olá, {user?.nome}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
          }}
        >
          {drawer}
        </Drawer>

        {/* Mostar se usuário não está cadastrado */}
        {!isAuthenticated() && (
          <Box
            sx={{
              display: 'flex',
              backgroundColor: tokens.blueAccent[900],
              height: '2.3em',
              flexDirection: { sm: 'row', xs: 'column' },
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 1, sm: 2 }
            }}
          >
            <Slide direction='left' in={true} mountOnEnter unmountOnExit>
              <Typography
                variant={`${theme.breakpoints.down('md') ? 'body2' : 'body1'}`}
                color={'#fff'}
                textAlign={'center'}
                maxHeight={'2em'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}
                sx={{ px: { xs: 1, sm: 2 } }}
              >
                Registre-se para receber alertas de cheia ou inundação!
              </Typography>
            </Slide>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
