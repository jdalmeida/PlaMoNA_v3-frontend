'use client';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  input,
  Paper,
  ThemeProvider,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

import { theme, tokens } from '../theme';

import Footer from '@/components/Footer';
import FormConfiguracaoSensor from '@/components/FormConfiguracaoSensor.jsx';
import Navbar from '@/components/Navbar';

const buttons = [
  {
    text: 'Home',
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

export default function Page () {
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
          <FormConfiguracaoSensor />

          <Footer />
        </Box>
        /
      </ThemeProvider>
    </>
  );
}
