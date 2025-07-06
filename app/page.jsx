'use client';
import { TrendingUp, WaterDrop, Visibility, Speed } from '@mui/icons-material';
import { Container, Box, Typography, Paper, Grid, Chip, Skeleton } from '@mui/material';
import React from 'react';

import { tokens } from '@/app/theme';
import Footer from '@/components/Footer';
import Grafico from '@/components/Grafico';
import Navbar from '@/components/Navbar';
import WeatherDisplay from '@/components/WeatherDisplay';
import { useObterMedicao } from '@/hooks/useTRPC';

export const dynamic = 'force-dynamic';

export default function HomePage () {
  const { data: resultado, isLoading, error } = useObterMedicao('semana');

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[800]} 100%)`,
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: 6
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              PlaMoNA
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 300,
                mb: 3,
                opacity: 0.9
              }}
            >
              Sistema Inteligente de Monitoramento do Nível das Águas
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<WaterDrop />}
                label="Monitoramento em Tempo Real"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              />
              <Chip
                icon={<TrendingUp />}
                label="Análise de Dados"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              />
              <Chip
                icon={<Visibility />}
                label="Alertas Inteligentes"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth='lg' sx={{ pb: 8 }}>
        {/* Dashboard Grid */}
        <Grid container spacing={4}>
          {/* Gráfico de Medições */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: `1px solid ${tokens.grey[200]}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ color: tokens.primary[600], mr: 2, fontSize: 28 }} />
                <Typography variant='h5' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                  Dados de Medição - Última Semana
                </Typography>
              </Box>
              
              {isLoading ? (
                <Box sx={{ py: 4 }}>
                  <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </Box>
                </Box>
              ) : error ? (
                <Box
                  sx={{
                    py: 8,
                    textAlign: 'center',
                    color: tokens.error[600]
                  }}
                >
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    Erro ao carregar dados
                  </Typography>
                  <Typography variant='body2' sx={{ opacity: 0.8 }}>
                    {error.message}
                  </Typography>
                </Box>
              ) : (
                <Grafico data={resultado?.data || []} />
              )}
            </Paper>
          </Grid>

          {/* Weather Display */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: `1px solid ${tokens.grey[200]}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Speed sx={{ color: tokens.secondary[600], mr: 2, fontSize: 28 }} />
                <Typography variant='h5' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                  Condições Climáticas
                </Typography>
              </Box>
              <WeatherDisplay />
            </Paper>
          </Grid>
        </Grid>

        {/* Informações Adicionais */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: tokens.text.primary,
              mb: 4
            }}
          >
            Sobre o Sistema
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${tokens.grey[200]}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <WaterDrop sx={{ fontSize: 48, color: tokens.primary[600], mb: 2 }} />
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                  Monitoramento Contínuo
                </Typography>
                <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                  Coleta de dados em tempo real para análise precisa do nível das águas
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${tokens.grey[200]}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <TrendingUp sx={{ fontSize: 48, color: tokens.secondary[600], mb: 2 }} />
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                  Análise Avançada
                </Typography>
                <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                  Gráficos interativos e relatórios detalhados para tomada de decisões
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${tokens.grey[200]}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Visibility sx={{ fontSize: 48, color: tokens.warning[600], mb: 2 }} />
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                  Alertas Inteligentes
                </Typography>
                <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                  Sistema de notificações para situações críticas e mudanças significativas
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}
