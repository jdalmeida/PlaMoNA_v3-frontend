import { Box, Button, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { useNotification } from '@/hooks/useNotification';
import { useValidateCodigo } from '@/hooks/useTRPC';

export default function FormCodigo() {
  const [codigo, setCodigo] = useState('');
  const { showSuccess, showError } = useNotification();
  const validateMutation = useValidateCodigo();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await validateMutation.mutateAsync({ codigo });
      if (resultado.success && resultado.valid) {
        showSuccess('Código validado com sucesso!');
      } else {
        showError('Código inválido!');
      }
    } catch (error) {
      showError(error.message || 'Erro ao validar código');
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Input
        value={codigo}
        onChange={event => setCodigo(event.target.value)}
        placeholder='Digite o código'
      />
      <Button
        type='submit'
        disabled={validateMutation.isLoading}
        variant='contained'
        color='primary'
      >
        {validateMutation.isLoading ? <CircularProgress size={24} /> : 'Validar Código'}
      </Button>
    </Box>
  );
}
