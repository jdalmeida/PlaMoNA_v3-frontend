'use client';
import { 
  TrendingUp, 
  CompareArrows,
  Analytics,
  Timeline,
  WaterDrop,
  Speed
} from '@mui/icons-material';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Tabs, 
  Tab, 
  Chip,
  Skeleton,
  Alert
} from '@mui/material';
import React, { useState } from 'react';

import { tokens } from '@/app/theme';
import Footer from '@/components/Footer';
import Grafico from '@/components/Grafico';
import GraficoComp from '@/components/GraficoComp';
import GraficoDia from '@/components/GraficoDia';
import Navbar from '@/components/Navbar';
import { useObterMedicao } from '@/hooks/useTRPC';

export const dynamic = 'force-dynamic';

export default function MonitoramentoPage () {
  const { data: resultado, isLoading, error } = useObterMedicao('semana');
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabConfig = [
    {
      label: 'Visão Geral',
      icon: <Analytics />,
      description: 'Dados consolidados da semana'
    },
    {
      label: 'Comparativo',
      icon: <CompareArrows />,
      description: 'Compare períodos diferentes'
    },
    {
      label: 'Detalhado',
      icon: <Timeline />,
      description: 'Análise dia a dia'
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[800]} 100%)`,
          color: 'white',
          py: { xs: 4, md: 6 },
          mb: 4
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Monitoramento Detalhado
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 300,
                mb: 3,
                opacity: 0.9
              }}
            >
              Visualize dados históricos, tendências e análises comparativas do nível das águas
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<WaterDrop />}
                label="Dados em Tempo Real"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              />
              <Chip
                icon={<TrendingUp />}
                label="Análise de Tendências"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                }}
              />
              <Chip
                icon={<CompareArrows />}
                label="Comparações"
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

      <Container maxWidth='xl' sx={{ pb: 8 }}>
        {/* Tabs de Navegação */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${tokens.grey[200]}`,
            overflow: 'hidden'
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                minHeight: 80,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                color: tokens.text.secondary,
                '&.Mui-selected': {
                  color: tokens.primary[600]
                }
              },
              '& .MuiTabs-indicator': {
                height: 4,
                backgroundColor: tokens.primary[600]
              }
            }}
          >
            {tabConfig.map((tab) => (
              <Tab
                key={tab.label}
                icon={tab.icon}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      {tab.label}
                    </Typography>
                    <Typography variant='caption' sx={{ opacity: 0.7 }}>
                      {tab.description}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Paper>

        {/* Conteúdo das Tabs */}
        {activeTab === 0 && (
          <Box>
            {/* Cards Informativos */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${tokens.primary[50]} 0%, ${tokens.primary[100]} 100%)`,
                    border: `1px solid ${tokens.primary[200]}`,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Analytics sx={{ fontSize: 48, color: tokens.primary[600], mb: 2 }} />
                  <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
                    Visão Geral Semanal
                  </Typography>
                  <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                    Dados consolidados dos últimos 7 dias com análise de tendências
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${tokens.secondary[50]} 0%, ${tokens.secondary[100]} 100%)`,
                    border: `1px solid ${tokens.secondary[200]}`,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <TrendingUp sx={{ fontSize: 48, color: tokens.secondary[600], mb: 2 }} />
                  <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
                    Análise de Tendências
                  </Typography>
                  <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                    Identificação de padrões e previsões baseadas em dados históricos
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${tokens.warning[50]} 0%, ${tokens.warning[100]} 100%)`,
                    border: `1px solid ${tokens.warning[200]}`,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Speed sx={{ fontSize: 48, color: tokens.warning[600], mb: 2 }} />
                  <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
                    Monitoramento Contínuo
                  </Typography>
                  <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                    Coleta automática de dados 24/7 com alertas em tempo real
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Gráfico Principal */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: `1px solid ${tokens.grey[200]}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Analytics sx={{ color: tokens.primary[600], mr: 2, fontSize: 28 }} />
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
                <Alert severity="error" sx={{ mb: 3 }}>
                  Erro ao carregar dados: {error.message}
                </Alert>
              ) : (
                <Grafico data={resultado?.data || []} />
              )}
            </Paper>
          </Box>
        )}

        {activeTab === 1 && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: `1px solid ${tokens.grey[200]}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CompareArrows sx={{ color: tokens.secondary[600], mr: 2, fontSize: 28 }} />
              <Typography variant='h5' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                Análise Comparativa
              </Typography>
            </Box>
            <Typography variant='body1' sx={{ color: tokens.text.secondary, mb: 4 }}>
              Compare dados de diferentes períodos para identificar padrões e variações
            </Typography>
            <GraficoComp />
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: `1px solid ${tokens.grey[200]}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Timeline sx={{ color: tokens.warning[600], mr: 2, fontSize: 28 }} />
              <Typography variant='h5' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                Análise Detalhada por Dia
              </Typography>
            </Box>
            <Typography variant='body1' sx={{ color: tokens.text.secondary, mb: 4 }}>
              Visualize dados detalhados de um dia específico com navegação temporal
            </Typography>
            <GraficoDia />
          </Paper>
        )}
      </Container>

      <Footer />
    </div>
  );
}
