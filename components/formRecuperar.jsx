import { Box, Button, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { recuperarSenha } from '@/api/user';
import { useNotification } from '@/hooks/useNotification';

export default function FormRecuperar () {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async event => {
    event.preventDefault();
    setCarregando(true);
    try {
      const resultado = await recuperarSenha(email);
      if (resultado) {
        showSuccess('Email de recuperação enviado!');
      } else {
        showError('Email não encontrado!');
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Input value={email} onChange={event => setEmail(event.target.value)} placeholder='Email' />
      <Button type='submit' disabled={carregando} variant='contained' color='primary'>
        {carregando ? <CircularProgress size={24} /> : 'Recuperar Senha'}
      </Button>
    </Box>
  );
}
