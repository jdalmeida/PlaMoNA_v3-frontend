'use client';
import React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

export default function SobrePage () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Navbar />
      <div className='container mx-auto py-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Sobre o PlaMoNA</h1>
        <p className='text-lg text-gray-600 mb-8'>
          O PlaMoNA é um sistema de monitoramento do nível das águas desenvolvido para alertar a
          população sobre enchentes e inundações.
        </p>
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>Equipe</h2>
          <ul className='list-disc pl-6 text-gray-700'>
            <li>Desenvolvedor 1</li>
            <li>Desenvolvedor 2</li>
            <li>Desenvolvedor 3</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
