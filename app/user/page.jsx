'use client';
import { Container } from '@mui/material';
import React from 'react';

import Footer from '@/components/Footer';
import DadosUsuario from '@/components/formDadosUsuario';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

export default function UserPage () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Navbar />

      <Container maxWidth='lg' className='py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Dados do Usuário</h1>
          <p className='text-lg text-gray-600'>Gerencie suas informações pessoais</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8'>
          <DadosUsuario />
        </div>
      </Container>

      <Footer />
    </div>
  );
}
