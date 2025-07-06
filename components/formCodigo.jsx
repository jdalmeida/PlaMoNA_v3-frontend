import { Box, Button, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { validateCodigo } from '@/api/user';
import { useNotification } from '@/hooks/useNotification';

export default function FormCodigo () {
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async event => {
    event.preventDefault();
    setCarregando(true);
    try {
      const resultado = await validateCodigo(codigo);
      if (resultado) {
        showSuccess('Código validado com sucesso!');
      } else {
        showError('Código inválido!');
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Input
        value={codigo}
        onChange={event => setCodigo(event.target.value)}
        placeholder='Digite o código'
      />
      <Button type='submit' disabled={carregando} variant='contained' color='primary'>
        {carregando ? <CircularProgress size={24} /> : 'Validar Código'}
      </Button>
    </Box>
  );
}
