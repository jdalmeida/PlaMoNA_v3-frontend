'use client';
import { Container } from '@mui/material';
import React from 'react';

import Footer from '@/components/Footer';
import FormConfiguracaoSensor from '@/components/FormConfiguracaoSensor';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

export default function ConfigurarSensorPage () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Navbar />

      <Container maxWidth='lg' className='py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Configurar Sensor</h1>
          <p className='text-lg text-gray-600'>Configure os parâmetros do sensor</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8'>
          <FormConfiguracaoSensor />
        </div>
      </Container>

      <Footer />
    </div>
  );
}
