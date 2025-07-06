'use client';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { obterMedicao } from '@/api/database';
import Footer from '@/components/Footer';
import Grafico from '@/components/Grafico';
import GraficoComp from '@/components/GraficoComp';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

export default function MonitoramentoPage () {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultado = await obterMedicao('semana');
        setDados(resultado);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Navbar />

      <Container maxWidth='lg' className='py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Monitoramento Detalhado</h1>
          <p className='text-lg text-gray-600'>Visualize dados históricos e tendências</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Gráfico Simples</h2>
            {loading ? (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Carregando dados...</p>
              </div>
            ) : (
              <Grafico dados={dados} />
            )}
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Gráfico Comparativo</h2>
            {loading ? (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Carregando dados...</p>
              </div>
            ) : (
              <GraficoComp dados={dados} />
            )}
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
