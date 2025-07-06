import { Box, Button, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { useNotification } from '@/hooks/useNotification';
import { useRecuperarSenha } from '@/hooks/useTRPC';

export default function FormRecuperar () {
  const [email, setEmail] = useState('');
  const { showSuccess, showError } = useNotification();
  const recuperarMutation = useRecuperarSenha();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await recuperarMutation.mutateAsync({ email });
      if (resultado.success) {
        showSuccess('Email de recuperação enviado!');
      } else {
        showError('Email não encontrado!');
      }
    } catch (error) {
      showError(error.message || 'Erro ao enviar email de recuperação');
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Input value={email} onChange={event => setEmail(event.target.value)} placeholder='Email' />
      <Button type='submit' disabled={recuperarMutation.isLoading} variant='contained' color='primary'>
        {recuperarMutation.isLoading ? <CircularProgress size={24} /> : 'Recuperar Senha'}
      </Button>
    </Box>
  );
}
