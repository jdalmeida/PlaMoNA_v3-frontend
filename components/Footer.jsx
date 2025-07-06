import { School, LocationOn, Email, Phone } from '@mui/icons-material';
import { Box, Typography, Container, Grid, Link } from '@mui/material';
import Image from 'next/image';

import { tokens } from '@/app/theme';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${tokens.primary[800]} 0%, ${tokens.primary[900]} 100%)`,
        color: 'white',
        mt: 'auto',
        pt: 6,
        pb: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Image 
                src='/logo_horizontal.png' 
                alt='PlaMoNa' 
                width={200} 
                height={80}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Box>
            <Typography variant='body2' sx={{ opacity: 0.8, mb: 2 }}>
              Sistema inteligente de monitoramento do nível das águas, 
              desenvolvido para garantir a segurança e o bem-estar da comunidade.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <Email />
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <Phone />
              </Link>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                href="/" 
                sx={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Página Inicial
              </Link>
              <Link 
                href="/monitoramento" 
                sx={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Monitoramento
              </Link>
              <Link 
                href="/sobre" 
                sx={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Sobre o Projeto
              </Link>
              <Link 
                href="/user" 
                sx={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  textDecoration: 'none',
                  '&:hover': { 
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Área do Usuário
              </Link>
            </Box>
          </Grid>

          {/* Institution Info */}
          <Grid item xs={12} md={4}>
            <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
              Instituição
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ mr: 1, opacity: 0.8 }} />
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                IFSul - Campus Venâncio Aires
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, opacity: 0.8 }} />
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                Venâncio Aires, RS - Brasil
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Image 
                src='/ifsul_colorido.png' 
                alt='IFSUL' 
                width={120} 
                height={40}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            mt: 4,
            pt: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            © 2024 PlaMoNA - Sistema de Monitoramento do Nível das Águas. 
            Desenvolvido pelo IFSul Campus Venâncio Aires.
          </Typography>
          <Typography variant='caption' sx={{ opacity: 0.5, display: 'block', mt: 1 }}>
            Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
