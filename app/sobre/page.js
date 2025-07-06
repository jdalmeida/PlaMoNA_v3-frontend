'use client';
import React from 'react';
import { Box, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import Grafico from '@/components/Grafico';
import { theme, tokens } from '../theme';
import Navbar from '@/components/Navbar';
import WeatherDisplay from '@/components/WeatherDisplay';
import Footer from '@/components/Footer';
import Image from 'next/image';

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
                width: { sm: '70em', xs: '20em' },
                height: 'auto',
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
                  height: 'auto',
                  padding: '1em'
                }}
              >
                <Typography variant='body1' color={'#fff'} textAlign={'justify'}>
                  Historicamente, as comunidades que habitam em regiões de inundação de rios e
                  córregos têm enfrentado os efeitos de chuvas intensas e das enchentes que as
                  seguem, causando riscos à vida, danos materiais e doenças decorrentes do contato
                  com águas contaminadas. Tais eventos poderiam ser amenizados por uma comunicação
                  mais rápida e efetiva por parte dos órgãos públicos, mas a falta de meios
                  automáticos de monitoramento do nível da água dispostos ao longo dos cursos d’água
                  e de sistemas de alerta à população, muitas vezes dificulta a ação rápida da
                  população para proteger suas vidas e bens materiais. Pensando nisso, o presente
                  trabalho propõe um sistema para monitoramento de nível de águas, que é composto
                  por um equipamento de monitoramento de operação remota e uma plataforma virtual de
                  gerenciamento online com emissão de alertas à população. É apresentado o
                  funcionamento do equipamento que monitora o nível de águas e transmite os dados a
                  um servidor online via comunicação GSM-GPRS, também é apresentada a plataforma
                  virtual de gerenciamento e suas funcionalidades, que incluem o armazenamento em
                  banco de dados, consulta online das variáveis monitoradas pelo equipamento e
                  emissão de alertas para pessoas cadastradas no sistema, oferecendo assim uma
                  alternativa para o gerenciamento de crises causadas por inundações.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
