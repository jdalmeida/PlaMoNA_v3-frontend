'use client';
import { Box, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

import { theme, tokens } from './theme';

import { obterMedicao } from '@/api/database';
import Footer from '@/components/Footer';
import Grafico from '@/components/Grafico';
import GraficoComp from '@/components/GraficoComp';
import Navbar from '@/components/Navbar';
import WeatherDisplay from '@/components/WeatherDisplay';

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
  },
  {
    text: 'Configurar Sensor',
    href: '/configurarSensor'
  }
];

export default function Page () {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const result = await obterMedicao('semana');
      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      const ontem = dia - 1;

      localStorage.setItem('data1', ano + '/' + mes + '/' + dia);
      localStorage.setItem('data2', ano + '/' + mes + '/' + ontem);
      setData(result);
    }

    fetchData();
  }, []);

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
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: { sm: '30em', xs: '20em' },
                height: '26em',
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
                  height: '25em',
                  padding: '1em'
                }}
              >
                <Grafico data={data} />
              </Box>
            </Box>
            <WeatherDisplay />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
