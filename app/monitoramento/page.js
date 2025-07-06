'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { obterMedicao } from '@/api/database';
import Grafico from '@/components/Grafico';
import { theme, tokens } from '../theme';
import Navbar from '@/components/Navbar';
import WeatherDisplay from '@/components/WeatherDisplay';
import Footer from '@/components/Footer';
import Image from 'next/image';
import GraficoComp from '@/components/GraficoComp';

const buttons = [
  {
    text: 'home',
    href: '/'
  },
  {
    text: 'Monitoramento',
    href: '/monitoramento'
  },
  {
    text: 'Sobre',
    href: '/sobre'
  },
  {
    text: 'Login',
    href: '/login'
  }
];

export default function Page() {
  if (localStorage.getItem('periodoMonitoramento') == null) {
    localStorage.setItem('periodoMonitoramento', 'dia');
  }
  const [activePaper, setActivePaper] = useState(localStorage.getItem('periodoMonitoramento'));
  const handlePaperChange = paper => {
    setActivePaper(paper);
    localStorage.setItem('periodoMonitoramento', paper);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (activePaper != 'comparar') {
        const result = await obterMedicao(activePaper);
        setData(result);
      }
    }

    fetchData();
  }, [activePaper]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            background:
              'linear-gradient(180deg, #b7B7ff 0%, #727272 100%), radial-gradient(60.91% 100% at 50% 0%, #D1D1FF 0%, #260000 100%), linear-gradient(127.43deg, #00ddFF 0%, #FFFFFF 100%), radial-gradient(100.22% 100% at 70.57% 0%, #2b2dff 0%, #00ddE0 100%), linear-gradient(64.82deg, #DB22FF 0%, #3300FF 100%)',
            backgroundBlendMode: 'screen, overlay, color-burn, color-dodge, normal',
            backdropFilter: 'blur(2px)'
          }}
        >
          <Navbar
            logo={
              <Box
                sx={{
                  objectFit: 'contain',
                  width: { sm: '7em', xs: '8em' },
                  height: 'auto'
                }}
              >
                <Image src='/logo_horizontal.png' alt='' width={1000} height={400} />
              </Box>
            }
            buttons={buttons}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: '1em'
            }}
          >
            <ButtonGroup
              variant='contained'
              sx={{
                backgroundColor: tokens.blueAccent[500]
              }}
            >
              <Button
                onClick={() => handlePaperChange('semana')}
                disabled={activePaper === 'semana'}
              >
                Níveis Semanais
              </Button>
              <Button onClick={() => handlePaperChange('dia')} disabled={activePaper === 'dia'}>
                Níveis Do Dia
              </Button>
              <Button
                onClick={() => handlePaperChange('comparar')}
                disabled={activePaper === 'comparar'}
              >
                Comparar Níveis
              </Button>
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {activePaper === 'dia' && (
              <>
                <Box
                  sx={{
                    width: { sm: '70em', xs: '20em' },
                    height: '31em',
                    padding: '.5em',
                    margin: '1em',
                    backgroundColor: tokens.primary[600] + '88',
                    borderRadius: '2em',
                    overflowX: 'scroll'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '1.5em',
                      backgroundColor: tokens.blueAccent[600] + '0f',
                      height: '30em',
                      padding: '1em',
                      display: 'flex',
                      width: '70em',
                      justifyContent: 'center'
                    }}
                  >
                    <Grafico data={data} />
                  </Box>
                </Box>
              </>
            )}
            {activePaper === 'semana' && (
              <>
                <Box
                  sx={{
                    width: { sm: '70em', xs: '20em' },
                    height: '31em',
                    padding: '.5em',
                    margin: '1em',
                    backgroundColor: tokens.primary[600] + '88',
                    borderRadius: '2em'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '1.5em',
                      backgroundColor: tokens.blueAccent[600] + '0f',
                      height: '30em',
                      padding: '1em',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Grafico data={data} />
                  </Box>
                </Box>
              </>
            )}
            {activePaper === 'comparar' && (
              <>
                <Box
                  sx={{
                    width: { sm: '70em', xs: '20em' },
                    height: '50em',
                    padding: '.5em',
                    margin: '1em',
                    backgroundColor: tokens.primary[600] + '88',
                    borderRadius: '2em'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '1.5em',
                      backgroundColor: tokens.blueAccent[600] + '0f'
                    }}
                  >
                    <GraficoComp />
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
