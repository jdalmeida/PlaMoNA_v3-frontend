import { tokens } from "@/app/theme";
import { Button, Box, Typography, Slide, Avatar, Menu, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from '@/contexts/UserContext';
import { useNotification } from '@/hooks/useNotification';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
        main: tokens.grey[900],
    },
  },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

export default function Navbar({buttons, logo}) {
  const { user, logout, isAuthenticated } = useUser();
  const { showSuccess } = useNotification();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      logout();
      showSuccess("Logout realizado com sucesso!");
      handleMenuClose();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <Box className="flex py-3 shadow-lg lg:px-40 md:px-10" sx={{
        backgroundColor: tokens.blueAccent[300]+"77", 
        flexDirection: {sm: 'row', xs: 'column'},
        justifyContent: 'space-between',
        alignItems: 'center'
        }}>
        <Box sx={{
          color: tokens.grey[900],
        }}className="align-center justify-center p-3 lg:text-3xl md:text-lg">
          {logo}
        </Box>
        <Box sx={{alignItems: 'center', display: 'flex', gap: '.5em'}} className="align-center lg:justify-center,space-x-4,p-3 md:justify-end,space-x-2 p-2">
          {buttons.map((b, index) => (
            <Button variant="outlined" size={'small'} color='primary' key={index} href={b.href}>
              {b.text}
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
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="textSecondary">
                    Olá, {user?.nome}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Sair
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
      {/* Mostar se usuário não está cadastrado */}
      {!isAuthenticated() && (
        <Box sx={{
          display: 'flex',
          backgroundColor: tokens.blueAccent[900],
          height: '2.3em', 
          flexDirection: {sm: 'row', xs: 'column'},
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Typography variant={`${
                theme.breakpoints.down("md") ? "body2" : "body1"
              }`} color={'#fff'} textAlign={'center'} maxHeight={'2em'} overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}> 
            Registre-se para receber alertas de cheia ou inundação!
            </Typography>
          </Slide> 
        </Box>
      )}
      </ThemeProvider>
    </>
  );
}